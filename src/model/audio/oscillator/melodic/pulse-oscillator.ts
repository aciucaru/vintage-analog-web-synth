/*

Acknowledgement: this pulse oscillator is heavily inspired from the code of Andy Harman, from his GitHub page:
https://github.com/pendragon-andyh/WebAudio-PulseOscillator

This code is basically a TypeScript adaptation of Andy Harman's JavaScript code.

This is the original license:

Copyright (c) 2014 Andy Harman and Pendragon Software Limited.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import { Settings } from "../../../../constants/settings";
import { BaseMelodicOscillator } from "../../source/oscillator/melodic/base-melodic-oscillator";
import type { BaseUnisonOscillator } from "../../source/oscillator/melodic/base-unison-oscillator";
import type { BasePulseOscillator } from "../../source/oscillator/melodic/base-pulse-oscillator";
import { ModulationManager } from "../../modulation/modulation-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class PulseOscillator extends BaseMelodicOscillator implements BaseUnisonOscillator, BasePulseOscillator
{
    // the saw oscillator is the main 'ingredient' in making a pulse oscillator
    private sawOscillatorNode: OscillatorNode;

    private constantCurve: Float32Array = new Float32Array(2);
    private constantWaveShaper: WaveShaperNode;

    private squareCurve: Float32Array = new Float32Array(256);
    private squareWaveShaper: WaveShaperNode;

    // this gain node is what makes the 'pulse width' adjustment possible;
    // the pulse width is also modulatable, thanks to this gain node;
    private pulseWidthGainNode: GainNode;

    // parameter manager nodes
    private freqParamManager: ModulationManager;
    private pulseWidthParamManager: ModulationManager;
    private unisonDetuneParamManager: ModulationManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "PulseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
                freqParamManager: ModulationManager,
                pulseWidthParamManager: ModulationManager,
                unisonDetuneParamManager: ModulationManager)
    {
        super(audioContext, initialGain);

        // instantiate the sawtooth oscillator and set parameters
        this.sawOscillatorNode = this.audioContext.createOscillator();
        this.sawOscillatorNode.type = "sawtooth";
        this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        // this.sawOscillatorNode.frequency.setValueAtTime(0, this.audioContext.currentTime);

        // define the curve for the constant wave shaper node
        this.constantCurve[0] = Settings.defaultOscPulseWidth;
        this.constantCurve[1] = Settings.defaultOscPulseWidth;

        // define the curve for the square wave shaper node
        this.squareCurve.fill(-1, 0, 128); // set all elements from 0...127 to value -1
        this.squareCurve.fill(1, 128, 256); // set all elements from 128...256 to value 1

        // instantiate the wave shaper nodes
        this.constantWaveShaper = new WaveShaperNode(this.audioContext, { curve: this.constantCurve });
        this.squareWaveShaper = new WaveShaperNode(this.audioContext, { curve: this.squareCurve });

        // instatiate the gain node
        this.pulseWidthGainNode = this.audioContext.createGain();
        // set the initial gain of the gain nodes
        this.pulseWidthGainNode.gain.setValueAtTime(Settings.defaultOscPulseWidth, this.audioContext.currentTime);

        // connect wave shapers (v1):
        this.sawOscillatorNode.connect(this.constantWaveShaper);
        this.constantWaveShaper.connect(this.pulseWidthGainNode);
        this.sawOscillatorNode.connect(this.pulseWidthGainNode); // extra, but necessary
        this.pulseWidthGainNode.connect(this.squareWaveShaper);

        // connect the gain nodes for the 3 oscillators to the same intermediate gain node, to combine them
        this.squareWaveShaper.connect(this.outputGainNode);

        // connect the output gain to the analyser node
        this.squareWaveShaper.connect(this.analyserGainNode);

        this.freqParamManager = freqParamManager;
        this.pulseWidthParamManager = pulseWidthParamManager;
        this.unisonDetuneParamManager = unisonDetuneParamManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqParamManager.outputNode().connect(this.sawOscillatorNode.frequency);
        this.pulseWidthParamManager.outputNode().connect(this.pulseWidthGainNode.gain);
        this.unisonDetuneParamManager.outputNode().connect(this.sawOscillatorNode.detune);

        // start the main sound oscillator
        this.sawOscillatorNode.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatOctavesOffset(beatOctavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatOctavesOffset(beatOctavesOffset);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setBeatOctavesOffset(${beatOctavesOffset})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setBeatOctavesOffset(${beatOctavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatSemitonesOffset(beatSemitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatSemitonesOffset(beatSemitonesOffset);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setBeatSemitonesOffset(${beatSemitonesOffset})`);

            // set the frequency
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            PulseOscillator.logger.warn(`setBeatSemitonesOffset(${beatSemitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    // method from 'BaseUnisonOscillator' interface
    public setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            PulseOscillator.logger.debug(`setDetune(${centsDetune})`);

            // set the detune
            this.sawOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed 
            this.unisonDetuneParamManager.setParameterCurrentValue(centsDetune);

            return true;
        }
        else
        {
            PulseOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }

    // method from 'BasePulseOscillator'
    public setPulseWidth(pulseWidth: number): boolean
    {
        if (Settings.minOscPulseWidth <= pulseWidth && pulseWidth <= Settings.maxOscPulseWidth)
        {
            PulseOscillator.logger.debug(`setPulseWidth(${pulseWidth})`);

            // this seems the correct one
            this.constantCurve[0] = pulseWidth;
            this.constantCurve[1] = pulseWidth;

            // set the pulse width
            this.pulseWidthGainNode.gain.setValueAtTime(pulseWidth, this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.pulseWidthParamManager.setParameterCurrentValue(pulseWidth);

            return true; // change was succesfull
        }
        else
        {
            PulseOscillator.logger.warn(`setPulseWidth(${pulseWidth}): parmeter is outside bounds`);

            return false; // change was not succesfull
        }
    }

    public getOscillatorNode(): OscillatorNode { return this.sawOscillatorNode; }

    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): ModulationManager { return this.freqParamManager; }
    public getPulseWidthParamManager(): ModulationManager { return this.pulseWidthParamManager; }
    public getUnisonDetuneParamManager(): ModulationManager { return this.unisonDetuneParamManager; }
}