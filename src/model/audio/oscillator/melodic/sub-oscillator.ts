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

    // modulator nodes:
    private freqLfoManager: LfoManager;
    private gainLfoManager: LfoManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "SubOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number, lfoArray: Array<UnipolarLfo>)
    {
        super(audioContext, initialGain);

        // instantiate the sub oscillator and set settings
        this.subOsc = this.audioContext.createOscillator();
        this.subOsc.type = "sine"; // the suboscillator is always a sine

        // connect the sub oscillator to the main output node
        this.subOsc.connect(this.outputGainNode);

        // also connect the sub oscillator to the analyser gain node, that is already connected to the analyser
        this.subOsc.connect(this.analyserGainNode);

        // start the sound oscillator
        this.subOsc.start();

        // instantiate and connect the LFO managers for the modulatable parameters of this oscillator
        this.freqLfoManager = new LfoManager(this.audioContext, lfoArray,
                                            NoteSettings.minFrequency, NoteSettings.maxFrequency, NoteSettings.defaultFrequency);
        this.gainLfoManager = new LfoManager(this.audioContext, lfoArray,
                                            Settings.minOscGain, Settings.maxOscGain, Settings.defaultOscGain);

        this.freqLfoManager.mainNode().connect(this.subOsc.frequency);
        this.gainLfoManager.mainNode().connect(this.outputGainNode.gain);
    }

    public setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            SubOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            SubOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            SubOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            SubOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            this.subOsc.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            SubOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }
    
    public getFreqLfoManager(): LfoManager { return this.freqLfoManager; }

    public getGainLfoManager(): LfoManager { return this.gainLfoManager; } 
}