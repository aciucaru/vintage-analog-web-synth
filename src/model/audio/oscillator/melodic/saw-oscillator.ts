import { Settings } from "../../../../constants/settings";
import { NoteSettings } from "../../../../constants/note-settings";
import { BaseUnisonOscillator } from "./base-unison-oscillator";
import { LfoManager } from "../../modulation/lfo-manager";
import type { ParameterManager } from "../../modulation/parameter-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class SawOscillator extends BaseUnisonOscillator
{
    // main node
    private sawOscillator: OscillatorNode;

    // parameter manager nodes
    private freqParamManager: ParameterManager;
    private unisonDetuneParamManager: ParameterManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "SawOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
                freqParamManager: ParameterManager,
                unisonDetuneParamManager: ParameterManager)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.sawOscillator = this.audioContext.createOscillator();
        this.sawOscillator.type = "sawtooth";
        this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

        // connect the sub oscillator to the main output node
        this.sawOscillator.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.sawOscillator.connect(this.analyserGainNode);

        this.freqParamManager = freqParamManager;
        this.unisonDetuneParamManager = unisonDetuneParamManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqParamManager.mainNode().connect(this.sawOscillator.frequency);
        this.unisonDetuneParamManager.mainNode().connect(this.sawOscillator.detune);

        // start the sound oscillator
        this.sawOscillator.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            SawOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.sawOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SawOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            SawOscillator.logger.debug(`setDetune(${centsDetune})`);

            // this.sawOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.unisonDetuneParamManager.setParameterCurrentValue(centsDetune);

            return true;
        }
        else
        {
            SawOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }
    
    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): ParameterManager { return this.freqParamManager; }
    public getUnisonDetuneParamManager(): ParameterManager { return this.unisonDetuneParamManager; }
}