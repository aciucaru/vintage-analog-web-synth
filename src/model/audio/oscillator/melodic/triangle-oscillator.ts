import { Settings } from "../../../../constants/settings";
import { BaseMelodicOscillator } from "../../source/oscillator/melodic/base-melodic-oscillator";
import type { BaseUnisonOscillator } from "../../source/oscillator/melodic/base-unison-oscillator";

import { ModulationManager } from "../../modulation/modulation-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";




export class TriangleOscillator extends BaseMelodicOscillator implements BaseUnisonOscillator
{
    // main node
    private triangleOscillator: OscillatorNode;

    // parameter manager nodes
    private freqParamManager: ModulationManager;
    private unisonDetuneParamManager: ModulationManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "TriangleOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
        freqParamManager: ModulationManager,
        unisonDetuneParamManager: ModulationManager)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.triangleOscillator = this.audioContext.createOscillator();
        this.triangleOscillator.type = "triangle";

        // connect the sub oscillator to the main output node
        this.triangleOscillator.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.triangleOscillator.connect(this.analyserGainNode);

        this.freqParamManager = freqParamManager;
        this.unisonDetuneParamManager = unisonDetuneParamManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        // this.triangleOscillator.frequency.setValueAtTime(0, this.audioContext.currentTime);
        this.freqParamManager.outputNode().connect(this.triangleOscillator.frequency);
        this.unisonDetuneParamManager.outputNode().connect(this.triangleOscillator.detune);

        // start the sound oscillator
        this.triangleOscillator.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatOctavesOffset(beatOctavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatOctavesOffset(beatOctavesOffset);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setBeatOctavesOffset(${beatOctavesOffset})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setBeatOctavesOffset(${beatOctavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setBeatSemitonesOffset(beatSemitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setBeatSemitonesOffset(beatSemitonesOffset);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setBeatSemitonesOffset(${beatSemitonesOffset})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setBeatSemitonesOffset(${beatSemitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    // from 'BaseUnisonOscillator' interface
    public setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            TriangleOscillator.logger.debug(`setDetune(${centsDetune})`);

            // set the frequency
            this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
            
            return true;
        }
        else
        {
            TriangleOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }
    
    public getOscillatorNode(): OscillatorNode { return this.triangleOscillator; }

    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): ModulationManager { return this.freqParamManager; }
    public getUnisonDetuneParamManager(): ModulationManager { return this.unisonDetuneParamManager; }
}