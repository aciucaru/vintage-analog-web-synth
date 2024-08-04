import { Settings } from "../../../../constants/settings";
import { BaseMelodicOscillator } from "../../source/oscillator/melodic/base-melodic-oscillator";
import type { BaseUnisonOscillator } from "../../source/oscillator/melodic/base-unison-oscillator";

import { ModulationManager } from "../../modulation/modulation-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class SawOscillator extends BaseMelodicOscillator implements BaseUnisonOscillator
{
    // main node
    private sawOscillator: OscillatorNode;

    // parameter manager nodes
    private freqParamManager: ModulationManager;
    private unisonDetuneParamManager: ModulationManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "SawOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
                freqParamManager: ModulationManager,
                unisonDetuneParamManager: ModulationManager)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.sawOscillator = this.audioContext.createOscillator();
        this.sawOscillator.type = "sawtooth";

        // connect the sub oscillator to the main output node
        this.sawOscillator.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.sawOscillator.connect(this.analyserGainNode);

        this.freqParamManager = freqParamManager;
        this.unisonDetuneParamManager = unisonDetuneParamManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        // this.sawOscillator.frequency.setValueAtTime(0, this.audioContext.currentTime);
        this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        this.freqParamManager.outputNode().connect(this.sawOscillator.frequency);
        this.unisonDetuneParamManager.outputNode().connect(this.sawOscillator.detune);

        // start the sound oscillator
        this.sawOscillator.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatOctavesOffset(beatOctavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatOctavesOffset(beatOctavesOffset);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setBeatOctavesOffset(${beatOctavesOffset})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setBeatOctavesOffset(${beatOctavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatSemitonesOffset(beatSemitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatSemitonesOffset(beatSemitonesOffset);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setBeatSemitonesOffset(${beatSemitonesOffset})`);

            // set the frequency
            this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setBeatSemitonesOffset${beatSemitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    // method from 'BaseUnisonOscillator' interface
    public  setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            SawOscillator.logger.debug(`setDetune(${centsDetune})`);

            // set the detune
            this.sawOscillator.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed 
            this.unisonDetuneParamManager.setParameterCurrentValue(centsDetune);

            return true;
        }
        else
        {
            SawOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }
    
    public getOscillatorNode(): OscillatorNode { return this.sawOscillator; }

    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): ModulationManager { return this.freqParamManager; }
    public getUnisonDetuneParamManager(): ModulationManager { return this.unisonDetuneParamManager; }
}