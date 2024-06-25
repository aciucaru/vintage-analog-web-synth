import { Settings } from "../../../../constants/settings";
import { NoteSettings } from "../../../../constants/note-settings";
import { BaseUnisonOscillator } from "./base-unison-oscillator";
import { LfoManager } from "../../modulation/lfo-manager";


import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class TriangleOscillator extends BaseUnisonOscillator
{
    // main node
    private triangleOscillator: OscillatorNode;

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
    private unisonDetuneValueNode: ConstantSourceNode;

    // modulator nodes:
    private freqLfoManager: LfoManager;
    private unisonDetuneLfoManager: LfoManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "TriangleOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
                freqLfoManager: LfoManager,
                unisonDetuneLfoManager: LfoManager)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.triangleOscillator = this.audioContext.createOscillator();
        this.triangleOscillator.type = "triangle";

        // connect the sub oscillator to the main output node
        this.triangleOscillator.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.triangleOscillator.connect(this.analyserGainNode);

        // instantiate and set the constant nodes that will represent the current value of a parameter of this osc
        this.freqValueNode = this.audioContext.createConstantSource();
        this.freqValueNode.offset.setValueAtTime(NoteSettings.defaultFrequency, this.audioContext.currentTime);

        this.unisonDetuneValueNode = this.audioContext.createConstantSource();
        this.unisonDetuneValueNode.offset.setValueAtTime(Settings.defaultOscUnisonCentsDetune, this.audioContext.currentTime);

        // set the LFO managers for the modulatable parameters of this oscillator
        this.freqLfoManager = freqLfoManager;
        this.unisonDetuneLfoManager = unisonDetuneLfoManager;

        // for each modulatable parameter, connect the ConstantSourceNode and the LfoManager to the same parameter
        this.freqValueNode.connect(this.triangleOscillator.frequency)
        this.freqLfoManager.mainNode().connect(this.triangleOscillator.frequency);

        this.unisonDetuneValueNode.connect(this.triangleOscillator.detune);
        this.unisonDetuneLfoManager.mainNode().connect(this.triangleOscillator.detune);

        // start the sound oscillator
        this.triangleOscillator.start();
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            TriangleOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqValueNode.offset.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            // this.freqLfoManager.setParameterCurrentValue(this.note.getFreq());
        }
        else
            TriangleOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            TriangleOscillator.logger.debug(`setDetune(${centsDetune})`);

            // this.sawOscillatorNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.unisonDetuneValueNode.offset.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.unisonDetuneLfoManager.setParameterCurrentValue(centsDetune);
            
            return true;
        }
        else
        {
            TriangleOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }
    
    // getters for the LFO managers of this oscillator
    public getFreqLfoManager(): LfoManager { return this.freqLfoManager; }
    public getUnisonDetuneLfoManager(): LfoManager { return this.unisonDetuneLfoManager; }
}