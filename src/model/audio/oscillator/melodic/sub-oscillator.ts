import { Settings } from "../../../../constants/settings";
import { NoteSettings } from "../../../../constants/note-settings";
import type { UnipolarLfo } from "../../modulation/unipolar-lfo";
import { LfoManager } from "../../modulation/lfo-manager";
import { BaseMelodicOscillator } from "./base-melodic-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class SubOscillator extends BaseMelodicOscillator
{
    // main node
    private subOsc: OscillatorNode;

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
    private ampValueNode: ConstantSourceNode;

    // modulator nodes:
    private freqLfoManager: LfoManager;
    private ampLfoManager: LfoManager;

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

        // instantiate and set the constant nodes that will represent the current value of a parameter of this osc
        this.freqValueNode = this.audioContext.createConstantSource();
        this.freqValueNode.offset.setValueAtTime(NoteSettings.defaultFrequency, this.audioContext.currentTime);

        this.ampValueNode = this.audioContext.createConstantSource();
        this.ampValueNode.offset.setValueAtTime(Settings.defaultOscGain, this.audioContext.currentTime);

        // instantiate the LFO managers for the modulatable parameters of this oscillator
        // this.freqLfoManager = new LfoManager(this.audioContext, lfoArray,
        //                                         NoteSettings.minFrequency, NoteSettings.maxFrequency, NoteSettings.defaultFrequency);
        this.freqLfoManager = new LfoManager(this.audioContext, lfoArray,
                                                -1000, 1000, 0);
        this.ampLfoManager = new LfoManager(this.audioContext, lfoArray,
                                                Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);


        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqValueNode.connect(this.subOsc.frequency);
        this.freqLfoManager.mainNode().connect(this.subOsc.frequency);

        // for the amplitude LFO manager, we only connect to one node, the output gain node
        this.ampValueNode.connect(this.outputGainNode.gain);
        this.ampLfoManager.mainNode().connect(this.outputGainNode.gain);

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
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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
            this.ampValueNode.offset.linearRampToValueAtTime(gain, this.audioContext.currentTime);
            this.ampLfoManager.setParameterCurrentValue(gain);

            return true; // change was successfull
        }
        else
        {
            SubOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }
    
    // getters for the LFO managers of this oscillator
    public getFreqParamManager(): LfoManager { return this.freqLfoManager; }
    public getAmpParamManager(): LfoManager { return this.ampLfoManager; }
}