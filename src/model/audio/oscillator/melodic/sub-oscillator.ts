import { Settings } from "../../../../constants/settings";
import { NoteSettings } from "../../../../constants/note-settings";
import { BaseMelodicOscillator } from "./base-melodic-oscillator";

import { UnipolarLfo } from "../../modulation/unipolar-lfo";
import { ParameterManager } from "../../modulation/parameter-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";



export class SubOscillator extends BaseMelodicOscillator
{
    // main node
    private subOsc: OscillatorNode;

    // parameter manager nodes
    private freqParamManager: ParameterManager;
    private ampParamManager: ParameterManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "SubOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number, lfoArray: Array<UnipolarLfo>)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.subOsc = this.audioContext.createOscillator();
        this.subOsc.type = "sine"; // the sub oscillator is always a sine

        // connect the sub oscillator to the main output node
        this.subOsc.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.subOsc.connect(this.analyserGainNode);

        this.freqParamManager = new ParameterManager(this.audioContext, lfoArray,
                                                        22.5, 7040, NoteSettings.defaultFrequency);
        this.ampParamManager = new ParameterManager(this.audioContext, lfoArray,
                                                        Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqParamManager.mainNode().connect(this.subOsc.frequency);

        // for the amplitude LFO manager, we only connect to one node, the output gain node
        this.ampParamManager.mainNode().connect(this.outputGainNode.gain);

        // start the sound oscillator
        this.subOsc.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SubOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            // this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SubOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SubOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            SubOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            SubOscillator.logger.debug(`setOutputGain(${gain})`);

            // set the new value
            // this.ampValueNode.offset.linearRampToValueAtTime(gain, this.audioContext.currentTime);
            this.ampParamManager.setParameterCurrentValue(gain);

            return true; // change was successfull
        }
        else
        {
            SubOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }
    
    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): ParameterManager { return this.freqParamManager; }
    public getAmpParamManager(): ParameterManager { return this.ampParamManager; }
}