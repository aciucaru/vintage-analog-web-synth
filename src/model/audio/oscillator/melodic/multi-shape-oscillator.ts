import { Settings } from "../../../../constants/settings";
import { PulseOscillator } from "./pulse-oscillator";
import { BasePulseOscillator } from "./base-pulse-oscillator";

import type { UnipolarLfo } from "../../modulation/unipolar-lfo";
import { LfoManager } from "../../modulation/lfo-manager";
import { ParameterManager } from "../../modulation/parameter-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class MultiShapeOscillator extends BasePulseOscillator
{
    private triangleOscillatorNode: OscillatorNode;
    private sawOscillatorNode: OscillatorNode;
    private pulseOscillatorNode: PulseOscillator;

    private triangleOscillatorEnabled: boolean = true;
    private sawOscillatorEnabled: boolean = false;
    private pulseOscillatorEnabled: boolean = false;

    private triangleOscillatorGainValue: number = 1.0;
    private sawOscillatorGainValue: number = 0.0;
    private pulseOscillatorGainValue: number = 0.0;

    private triangleOscillatorGainNode: GainNode;
    private sawOscillatorGainNode: GainNode;
    private pulseOscillatorGainNode: GainNode;

    /* parameter value node (constant node):
    ** This is like a 'constant oscillators' that always emits the same value, and here it is used as the value of
    ** the amplitude (gain) parameter.
    **
    ** The purpose of this constant nodes is to be able to add the current value of the parameter with the value
    ** of an LFO and/or an ADSR envelope. It bassicaly allows modulation. */
    private ampValueNode: ConstantSourceNode;

    // modulator nodes:
    // private freqLfoManager: LfoManager;
    // private ampLfoManager: LfoManager;
    // private pulseWidthLfoManager: LfoManager;
    // private unisonDetuneLfoManager: LfoManager;

    private freqLfoManager: ParameterManager;
    private ampLfoManager: ParameterManager;
    private pulseWidthLfoManager: ParameterManager;
    private unisonDetuneLfoManager: ParameterManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "MultiShapeOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number, lfoArray: Array<UnipolarLfo>)
    {
        super(audioContext, initialGain);

        // instantiate the LFO managers for the modulatable parameters of this oscillator
        // this.freqLfoManager = new LfoManager(this.audioContext, lfoArray,
        //                                         -400, 400, 0);
        // this.ampLfoManager = new LfoManager(this.audioContext, lfoArray,
        //                                         Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);
        // this.pulseWidthLfoManager = new LfoManager(this.audioContext, lfoArray,
        //                                             Settings.minOscPulseWidth, Settings.maxOscPulseWidth, Settings.defaultOscPulseWidth);
        // this.unisonDetuneLfoManager = new LfoManager(this.audioContext, lfoArray,
        //                                                 Settings.minOscUnisonCentsDetune, Settings.maxOscUnisonCentsDetune, Settings.defaultOscUnisonCentsDetune);

        this.freqLfoManager = new ParameterManager(this.audioContext, lfoArray,
                                                -400, 400, 0);
        this.ampLfoManager = new ParameterManager(this.audioContext, lfoArray,
                                                Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);
        this.pulseWidthLfoManager = new ParameterManager(this.audioContext, lfoArray,
                                                    Settings.minOscPulseWidth, Settings.maxOscPulseWidth, Settings.defaultOscPulseWidth);
        this.unisonDetuneLfoManager = new ParameterManager(this.audioContext, lfoArray,
                                                        Settings.minOscUnisonCentsDetune, Settings.maxOscUnisonCentsDetune, Settings.defaultOscUnisonCentsDetune);

        // instantiate all sound oscillators
        this.triangleOscillatorNode = this.audioContext.createOscillator();
        this.sawOscillatorNode = this.audioContext.createOscillator();
        this.pulseOscillatorNode = new PulseOscillator(this.audioContext, Settings.maxOscGain,
                                                        this.freqLfoManager,
                                                        this.pulseWidthLfoManager,
                                                        this.unisonDetuneLfoManager);
        
        // set the shape of the sound oscillators (never changes)
        this.triangleOscillatorNode.type = "triangle";
        this.sawOscillatorNode.type = "sawtooth";

        // set the initial frequency of the sound oscillators
        this.triangleOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        this.pulseOscillatorNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

        // instatiate the gain nodes of the sound oscillators
        this.triangleOscillatorGainNode = this.audioContext.createGain();
        this.sawOscillatorGainNode = this.audioContext.createGain();
        this.pulseOscillatorGainNode = this.audioContext.createGain();

        // set the initial gain of the gain nodes
        this.triangleOscillatorGainNode.gain.setValueAtTime(this.triangleOscillatorGainValue, this.audioContext.currentTime);
        this.sawOscillatorGainNode.gain.setValueAtTime(this.sawOscillatorGainValue, this.audioContext.currentTime);
        this.pulseOscillatorGainNode.gain.setValueAtTime(this.pulseOscillatorGainValue, this.audioContext.currentTime);

        // connect the nodes betwen them:
        // connect the 3 oscillators to their coresponding gain node
        this.triangleOscillatorNode.connect(this.triangleOscillatorGainNode);
        this.sawOscillatorNode.connect(this.sawOscillatorGainNode);
        this.pulseOscillatorNode.outputNode().connect(this.pulseOscillatorGainNode);

        // connect the gain nodes for the 3 oscillators to the same intermediate gain node, to combine them
        this.triangleOscillatorGainNode.connect(this.outputGainNode);
        this.sawOscillatorGainNode.connect(this.outputGainNode);
        this.pulseOscillatorGainNode.connect(this.outputGainNode);

        // connect the output gain to the gain node for the analyser
        this.triangleOscillatorGainNode.connect(this.analyserGainNode);
        this.sawOscillatorGainNode.connect(this.analyserGainNode);
        this.pulseOscillatorGainNode.connect(this.analyserGainNode);

        // start the sound oscillators
        this.triangleOscillatorNode.start();
        this.sawOscillatorNode.start();
        // this.pulseOscNode was already started in it's constructor, no need to start it manually

        // instantiate and set the constant nodes that will represent the current value of a parameter of this osc
        this.ampValueNode = this.audioContext.createConstantSource();
        this.ampValueNode.offset.setValueAtTime(Settings.defaultOscGain, this.audioContext.currentTime);

        // connect the frequency LFO manager to the oscillators
        this.freqLfoManager.mainNode().connect(this.triangleOscillatorNode.frequency);
        this.freqLfoManager.mainNode().connect(this.sawOscillatorNode.frequency);
        // the 'freqLfoManager' was already connected to 'pulseOscNode' in the constructor of 'pulseOscNode'

        // for the amplitude LFO manager, we only connect to one node, the output gain node
        this.ampValueNode.connect(this.analyserGainNode.gain);
        this.ampLfoManager.mainNode().connect(this.analyserGainNode.gain);

        this.ampValueNode.connect(this.outputGainNode.gain);
        this.ampLfoManager.mainNode().connect(this.outputGainNode.gain);

        /* for the pulse width modulation, there is no need to connect anything, the pulse width LfoManager
        ** was already connected in the constructor of 'pulseOscNode' */

        // connect the unison detune LFO manager to the oscillators
        this.unisonDetuneLfoManager.mainNode().connect(this.sawOscillatorNode.detune);
        this.unisonDetuneLfoManager.mainNode().connect(this.triangleOscillatorNode.detune);
        // the 'unisonDetuneLfoManager' was already connected to 'pulseOscNode' in the constructor of 'pulseOscNode'
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            this.triangleOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscillatorNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            this.triangleOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscillatorNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // this.mainOsc.frequency.value = this.note.freq;
            this.triangleOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscillatorNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // this.mainOsc.frequency.value = this.note.freq;
            this.triangleOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscillatorNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscillatorNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            MultiShapeOscillator.logger.debug(`setDetune(${centsDetune})`);

            this.triangleOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.sawOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.pulseOscillatorNode.getOscillatorNode().detune.setValueAtTime(centsDetune, this.audioContext.currentTime);

            return true;
        }
        else
        {
            MultiShapeOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }

    public override setPulseWidth(pulseWidth: number): boolean
    {
        const isChangeSuccsefull = this.pulseOscillatorNode.setPulseWidth(pulseWidth);

        if (isChangeSuccsefull)
        {
            MultiShapeOscillator.logger.debug(`setPulseWidth(${pulseWidth})`);
            return true; // change was successfull
        }
        else
        {
            MultiShapeOscillator.logger.warn(`setPulseWidth(${pulseWidth}): value is outside bounds`);
            return false; // change was not successfull
        }
    }

    private computeGainValues(): void
    {
        let enabledOscillatorsCount = 0;

        if (this.triangleOscillatorEnabled)
            enabledOscillatorsCount += 1;

        if (this.sawOscillatorEnabled)
            enabledOscillatorsCount += 1;

        if (this.pulseOscillatorEnabled)
            enabledOscillatorsCount += 1;

        // compute the gain that each audible oscillator should have
        if (enabledOscillatorsCount > 0)
        {
            /* we subtract Number.EPSILON (the smallest positive number possible) to make sure
            ** the 3 oscillators don't exceed a combined amplitude of 1.0 (to avoid clicks and pops) */
            const audibleOscGain = (1.0 / enabledOscillatorsCount) - Number.EPSILON;

            if (this.triangleOscillatorEnabled)
                this.triangleOscillatorGainValue = audibleOscGain;
            else
                this.triangleOscillatorGainValue = 0;
    
            if (this.sawOscillatorEnabled)
                this.sawOscillatorGainValue = audibleOscGain;
            else
                this.sawOscillatorGainValue = 0;
    
            if (this.pulseOscillatorEnabled)
                this.pulseOscillatorGainValue = audibleOscGain;
            else
                this.pulseOscillatorGainValue = 0;
        }
        else
        {
            this.triangleOscillatorGainValue = 0;
            this.sawOscillatorGainValue = 0;
            this.pulseOscillatorGainValue = 0;
        }

        const currentTime = this.audioContext.currentTime;

        // set the gain values for all oscillators (using their associated gain values)
        this.triangleOscillatorGainNode.gain.setValueAtTime(this.triangleOscillatorGainValue, currentTime);
        this.sawOscillatorGainNode.gain.setValueAtTime(this.sawOscillatorGainValue, currentTime);
        this.pulseOscillatorGainNode.gain.setValueAtTime(this.pulseOscillatorGainValue, currentTime);
    }

    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            MultiShapeOscillator.logger.debug(`setOutputGain(${gain})`);

            // set the new value
            this.ampValueNode.offset.linearRampToValueAtTime(gain, this.audioContext.currentTime);
            this.ampLfoManager.setParameterCurrentValue(gain);

            return true; // change was successfull
        }
        else
        {
            MultiShapeOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }

    private setGainValues(): void
    {
        const currentTime = this.audioContext.currentTime;

        // set the gain values for all oscillators (using their associated gain values)
        this.triangleOscillatorGainNode.gain.setValueAtTime(this.triangleOscillatorGainValue, currentTime);
        this.sawOscillatorGainNode.gain.setValueAtTime(this.sawOscillatorGainValue, currentTime);
        this.pulseOscillatorGainNode.gain.setValueAtTime(this.pulseOscillatorGainValue, currentTime);
    }

    public toggleTriangleShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.triangleOscillatorEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleTriangleShape(): disable triangle");

            // then disable it
            this.triangleOscillatorEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleTriangleShape(): enable triangle");

            // then enable it
            this.triangleOscillatorEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        // this.setGainValues();
    }

    public toggleSawShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.sawOscillatorEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleSawShape(): disable saw");

            // then disable it
            this.sawOscillatorEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleSawShape(): enable saw");

            // then enable it
            this.sawOscillatorEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        // this.setGainValues();
    }

    public togglePulseShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.pulseOscillatorEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleSquareShape(): disable square");

            // then disable it
            this.pulseOscillatorEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleSquareShape(): enable square");

            // then enable it
            this.pulseOscillatorEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        // this.setGainValues();
    }

    // getters for the LFO managers of this oscillator
    // public getFreqLfoManager(): LfoManager { return this.freqLfoManager; }
    // public getAmpLfoManager(): LfoManager { return this.ampLfoManager; }
    // public getPulseWidthLfoManager(): LfoManager { return this.pulseWidthLfoManager; }
    // public getUnisonDetuneLfoManager(): LfoManager { return this.unisonDetuneLfoManager; }

    public getFreqParamManager(): ParameterManager { return this.freqLfoManager; }
    public getAmpParamManager(): ParameterManager { return this.ampLfoManager; }
    public getPulseWidthParamManager(): ParameterManager { return this.pulseWidthLfoManager; }
    public getUnisonDetuneParamManager(): ParameterManager { return this.unisonDetuneLfoManager; }
}