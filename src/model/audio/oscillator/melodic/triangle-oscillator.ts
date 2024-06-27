import { Settings } from "../../../../constants/settings";
import { BaseUnisonOscillator } from "./base-unison-oscillator";
import { LfoManager } from "../../modulation/lfo-manager";
import type { ParameterManager } from "../../modulation/parameter-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";



export class TriangleOscillator extends BaseUnisonOscillator
{
    // main node
    private triangleOscillator: OscillatorNode;

    // parameter manager nodes
    private freqParamManager: ParameterManager;
    private unisonDetuneParamManager: ParameterManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "TriangleOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number,
        freqParamManager: ParameterManager,
        unisonDetuneParamManager: ParameterManager)
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
        this.freqParamManager.mainNode().connect(this.triangleOscillator.frequency);
        this.unisonDetuneParamManager.mainNode().connect(this.triangleOscillator.detune);

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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
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

            // this.triangleOscillator.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.freqParamManager.setParameterCurrentValue(this.note.getFreq());
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
            this.unisonDetuneParamManager.setParameterCurrentValue(centsDetune);
            
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
    public getFreqParamManager(): ParameterManager { return this.freqParamManager; }
    public getUnisonDetuneParamManager(): ParameterManager { return this.unisonDetuneParamManager; }
}