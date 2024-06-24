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
import { NoteSettings } from "../../../../constants/note-settings";
import { BasePulseOscillator } from "./base-pulse-oscillator";

import { LfoManager } from "../../modulation/lfo-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class PulseOscillator extends BasePulseOscillator
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

    /* parameter value nodes (constant nodes):
    ** These are 'constant oscillators' that always emit the same value, and here they are used as the value of
    ** some parameters of this oscillator (frequency, pulse width, unison detune).
    **
    ** The purpose of these constant nodes is to be able to add the current value of the parameter with the value
    ** of an LFO and/or an ADSR envelope. They bassicaly allow modulation.
    **
    ** The constant node is basically the value of the modulatable parameter (regardless if the parameter is being modulated or not).
    **
    ** The final value of the oscillator's parameter is the sum of the ConstantSourceNode, the LfoManager and the ADSR envelope.
    ** The sum is made by connecting al previous 3 nodes (constant, LFO and ADSR) to the same parameter. */
    private freqValueNode: ConstantSourceNode;
    private pulseWidthValueNode: ConstantSourceNode;
    private unisonDetuneValueNode: ConstantSourceNode;

    // modulator nodes:
    private freqLfoManager: LfoManager;
    private pulseWidthLfoManager: LfoManager;
    private unisonDetuneLfoManager: LfoManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "PulseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
                freqLfoManager: LfoManager,
                pulseWidthLfoManager: LfoManager,
                unisonDetuneLfoManager: LfoManager)
    {
        super(audioContext, initialGain);

        // instantiate the sawtooth oscillator and set parameters
        this.sawOscillatorNode = this.audioContext.createOscillator();
        this.sawOscillatorNode.type = "sawtooth";
        this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

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

        // instantiate and set the constant nodes that will represent the current value of a parameter of this osc
        this.freqValueNode = this.audioContext.createConstantSource();
        this.freqValueNode.offset.setValueAtTime(NoteSettings.defaultFrequency, this.audioContext.currentTime);

        this.pulseWidthValueNode = this.audioContext.createConstantSource();
        this.pulseWidthValueNode.offset.setValueAtTime(Settings.defaultOscPulseWidth, this.audioContext.currentTime);

        this.unisonDetuneValueNode = this.audioContext.createConstantSource();
        this.unisonDetuneValueNode.offset.setValueAtTime(Settings.defaultOscUnisonCentsDetune, this.audioContext.currentTime);

        // set the LFO managers for the modulatable parameters of this oscillator
        this.freqLfoManager = freqLfoManager;
        this.pulseWidthLfoManager = pulseWidthLfoManager;
        this.unisonDetuneLfoManager = unisonDetuneLfoManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqValueNode.connect(this.sawOscillatorNode.frequency);
        this.freqLfoManager.mainNode().connect(this.sawOscillatorNode.frequency);

        this.pulseWidthValueNode.connect(this.pulseWidthGainNode.gain);
        this.pulseWidthLfoManager.mainNode().connect(this.pulseWidthGainNode.gain);

        this.unisonDetuneValueNode.connect(this.sawOscillatorNode.detune);
        this.unisonDetuneLfoManager.mainNode().connect(this.sawOscillatorNode.detune);

        // start the main sound oscillator
        this.sawOscillatorNode.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            PulseOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            PulseOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            PulseOscillator.logger.debug(`setDetune(${centsDetune})`);

            // this.sawOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.unisonDetuneValueNode.offset.setValueAtTime(centsDetune, this.audioContext.currentTime);

            return true;
        }
        else
        {
            PulseOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }

    public override setPulseWidth(pulseWidth: number): boolean
    {
        if (Settings.minOscPulseWidth <= pulseWidth && pulseWidth <= Settings.maxOscPulseWidth)
        {
            PulseOscillator.logger.debug(`setPulseWidth(${pulseWidth})`);

            // this seems the correct one
            this.constantCurve[0] = pulseWidth;
            this.constantCurve[1] = pulseWidth;

            // this.modulatableGainNode.gain.setValueAtTime(pulseWidth, this.audioContext.currentTime);
            this.pulseWidthValueNode.offset.setValueAtTime(pulseWidth, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            PulseOscillator.logger.warn(`setPulseWidth(${pulseWidth}): parmeter is outside bounds`);

            return false; // change was not succesfull
        }
    }

    /* LFO related methods.
    ** The modulation amount is always in normalized form (values between -1.0 and 1.0). The normalized values
    ** are basically like percentages between -100% and 100%. */

    // Sets the modulation amount for the frequency of this oscillator
    public setFreqLfoModAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoNormalizedModulationAmount <= normalizedModulationAmount
            && normalizedModulationAmount <= Settings.maxLfoNormalizedModulationAmount)
        {
            PulseOscillator.logger.debug(`setFreqLfoModAmount(${normalizedModulationAmount})`);

            this.freqLfoManager.setNormalizedModulationAmount(normalizedModulationAmount);

            return true; // change was succesfull
        }
        else
        {
            PulseOscillator.logger.warn(`setFreqLfoModAmount(${normalizedModulationAmount}): paramater is outside bounds`);

            return false; // change was not succesfull
        }
    }

    // Sets the modulation amount for the pulse width of this oscillator
    public setPulseWidthLfoModAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoNormalizedModulationAmount <= normalizedModulationAmount
            && normalizedModulationAmount <= Settings.maxLfoNormalizedModulationAmount)
        {
            PulseOscillator.logger.debug(`setPulseWidthLfoModAmount(${normalizedModulationAmount})`);

            this.pulseWidthLfoManager.setNormalizedModulationAmount(normalizedModulationAmount);

            return true; // change was succesfull
        }
        else
        {
            PulseOscillator.logger.warn(`setPulseWidthLfoModAmount(${normalizedModulationAmount}): paramater is outside bounds`);

            return false; // change was not succesfull
        }
    }

    // Sets the modulation amount for the pulse width of this oscillator
    public setUnisonDetuneLfoModAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoNormalizedModulationAmount <= normalizedModulationAmount
            && normalizedModulationAmount <= Settings.maxLfoNormalizedModulationAmount)
        {
            PulseOscillator.logger.debug(`setUnisonDetuneLfoModAmount(${normalizedModulationAmount})`);

            this.unisonDetuneLfoManager.setNormalizedModulationAmount(normalizedModulationAmount);

            return true; // change was succesfull
        }
        else
        {
            PulseOscillator.logger.warn(`setUnisonDetuneLfoModAmount(${normalizedModulationAmount}): paramater is outside bounds`);

            return false; // change was not succesfull
        }
    }

    public getOscillatorNode(): OscillatorNode { return this.sawOscillatorNode; }

    // getters for the LFO managers of this oscillator
    public getFreqLfoManager(): LfoManager { return this.freqLfoManager; }
    public getPulseWidthLfoManager(): LfoManager { return this.pulseWidthLfoManager; }
    public getUnisonDetuneLfoManager(): LfoManager { return this.unisonDetuneLfoManager; }
}