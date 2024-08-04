import { Settings } from "../../../../constants/settings";
import { PulseOscillator } from "./pulse-oscillator";
import { BasePulseOscillator } from "./base-pulse-oscillator";
import { TriangleOscillator } from "./triangle-oscillator";
import { SawOscillator } from "./saw-oscillator";

import type { UnipolarLfo } from "../../modulation/unipolar-lfo";
import { ModulationManager } from "../../modulation/modulation-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class MultiShapeOscillator extends BasePulseOscillator
{
    private triangleOscillatorNode: TriangleOscillator;
    private sawOscillatorNode: SawOscillator;
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

    // modulator nodes:
    private freqLfoManager: ModulationManager;
    private ampLfoManager: ModulationManager;
    private pulseWidthLfoManager: ModulationManager;
    private unisonDetuneLfoManager: ModulationManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "MultiShapeOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number, lfoArray: Array<UnipolarLfo>)
    {
        super(audioContext, initialGain);

        // this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        this.freqLfoManager = new ModulationManager(this.audioContext, lfoArray,
                                                Settings.minOscFreqModulation, Settings.maxOscFreqModulation, Settings.defaultOscFreqModulation);
        this.ampLfoManager = new ModulationManager(this.audioContext, lfoArray,
                                                Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);
        this.pulseWidthLfoManager = new ModulationManager(this.audioContext, lfoArray,
                                                    Settings.minOscPulseWidth, Settings.maxOscPulseWidth, Settings.defaultOscPulseWidth);
        this.unisonDetuneLfoManager = new ModulationManager(this.audioContext, lfoArray,
                                                        Settings.minOscUnisonCentsDetune, Settings.maxOscUnisonCentsDetune, Settings.defaultOscUnisonCentsDetune);

        // instantiate all sound oscillators
        this.triangleOscillatorNode = new TriangleOscillator(this.audioContext, Settings.maxOscGain,
                                                                this.freqLfoManager,
                                                                this.unisonDetuneLfoManager);
        this.sawOscillatorNode = new SawOscillator(this.audioContext, Settings.maxOscGain,
                                                    this.freqLfoManager,
                                                    this.unisonDetuneLfoManager);
        this.pulseOscillatorNode = new PulseOscillator(this.audioContext, Settings.maxOscGain,
                                                        this.freqLfoManager,
                                                        this.pulseWidthLfoManager,
                                                        this.unisonDetuneLfoManager);
        
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
        this.triangleOscillatorNode.outputNode().connect(this.triangleOscillatorGainNode);
        this.sawOscillatorNode.outputNode().connect(this.sawOscillatorGainNode);
        this.pulseOscillatorNode.outputNode().connect(this.pulseOscillatorGainNode);

        // connect the gain nodes for the 3 oscillators to the same intermediate gain node, to combine them
        this.triangleOscillatorGainNode.connect(this.outputGainNode);
        this.sawOscillatorGainNode.connect(this.outputGainNode);
        this.pulseOscillatorGainNode.connect(this.outputGainNode);

        // connect the output gain to the gain node for the analyser
        this.triangleOscillatorGainNode.connect(this.analyserGainNode);
        this.sawOscillatorGainNode.connect(this.analyserGainNode);
        this.pulseOscillatorGainNode.connect(this.analyserGainNode);

        // for the amplitude LFO manager, we only connect to one node, the output gain node
        this.ampLfoManager.outputNode().connect(this.analyserGainNode.gain);
        this.ampLfoManager.outputNode().connect(this.outputGainNode.gain);
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            this.triangleOscillatorNode.setNote(octaves, semitones);
            this.sawOscillatorNode.setNote(octaves, semitones);
            this.pulseOscillatorNode.setNote(octaves, semitones);
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

            this.triangleOscillatorNode.setOctavesOffset(octavesOffset);
            this.sawOscillatorNode.setOctavesOffset(octavesOffset);
            this.pulseOscillatorNode.setOctavesOffset(octavesOffset);
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

            this.triangleOscillatorNode.setSemitonesOffset(semitonesOffset);
            this.sawOscillatorNode.setSemitonesOffset(semitonesOffset);
            this.pulseOscillatorNode.setSemitonesOffset(semitonesOffset);
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

            this.triangleOscillatorNode.setCentsOffset(centsOffset);
            this.sawOscillatorNode.setCentsOffset(centsOffset);
            this.pulseOscillatorNode.setCentsOffset(centsOffset);
        }
        else
            MultiShapeOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatOctavesOffset(beatOctavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatOctavesOffset(beatOctavesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setBeatOctavesOffset(${beatOctavesOffset})`);

            this.triangleOscillatorNode.setBeatOctavesOffset(beatOctavesOffset);
            this.sawOscillatorNode.setBeatOctavesOffset(beatOctavesOffset);
            this.pulseOscillatorNode.setBeatOctavesOffset(beatOctavesOffset);
        }
        else
            MultiShapeOscillator.logger.warn(`setBeatOctavesOffset(${beatOctavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatSemitonesOffset(beatSemitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatSemitonesOffset(beatSemitonesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setBeatSemitonesOffset(${beatSemitonesOffset})`);

            this.triangleOscillatorNode.setBeatSemitonesOffset(beatSemitonesOffset);
            this.sawOscillatorNode.setBeatSemitonesOffset(beatSemitonesOffset);
            this.pulseOscillatorNode.setBeatSemitonesOffset(beatSemitonesOffset);
        }
        else
            MultiShapeOscillator.logger.warn(`setBeatSemitonesOffset(${beatSemitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            MultiShapeOscillator.logger.debug(`setDetune(${centsDetune})`);

            this.triangleOscillatorNode.setUnisonDetune(centsDetune);
            this.sawOscillatorNode.setUnisonDetune(centsDetune);
            this.pulseOscillatorNode.setUnisonDetune(centsDetune);

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

            this.pulseOscillatorNode.setPulseWidth(pulseWidth);

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

    // public setOutputGain(gain: number): boolean
    // {
    //     if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
    //     {
    //         MultiShapeOscillator.logger.debug(`setOutputGain(${gain})`);

    //         // set the new value
    //         this.outputGainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime);

    //         // notify the modulation manager that the main values has changed
    //         this.ampLfoManager.setParameterCurrentValue(gain);

    //         return true; // change was successfull
    //     }
    //     else
    //     {
    //         MultiShapeOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);

    //         return false; // change was not successfull
    //     }
    // }

    // private setGainValues(): void
    // {
    //     const currentTime = this.audioContext.currentTime;

    //     // set the gain values for all oscillators (using their associated gain values)
    //     this.triangleOscillatorGainNode.gain.setValueAtTime(this.triangleOscillatorGainValue, currentTime);
    //     this.sawOscillatorGainNode.gain.setValueAtTime(this.sawOscillatorGainValue, currentTime);
    //     this.pulseOscillatorGainNode.gain.setValueAtTime(this.pulseOscillatorGainValue, currentTime);
    // }

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
    }

    public getFreqParamManager(): ModulationManager { return this.freqLfoManager; }
    public getAmpParamManager(): ModulationManager { return this.ampLfoManager; }
    public getPulseWidthParamManager(): ModulationManager { return this.pulseWidthLfoManager; }
    public getUnisonDetuneParamManager(): ModulationManager { return this.unisonDetuneLfoManager; }
}