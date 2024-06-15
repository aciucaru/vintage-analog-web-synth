import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

export enum FrequencyType
{
    AbsoluteFrequency = "AbsoluteFrequency",
    BarDivisions4by4 = "BarDivisions4by4"
}

export enum LfoShape
{
    Triangle = "Triangle",
    Sawtooth = "Sawtooth",
    Square = "Square"
}

/* Low frequency oscillator implementation, this LFO is always unipolar and positive (between 0 and 1) */
export class Lfo extends BaseAudioNode
{
    private lfoOscillator: OscillatorNode;
    private constantOscillator: ConstantSourceNode;
    private lfoGainNode: GainNode;

    private frequencyType: FrequencyType = FrequencyType.AbsoluteFrequency;

    // the absolute frequency of the LFO, in Hz
    private absoluteFrequency: number = Settings.defaultLfoAbsoluteFrequency;

    private tempo: number = Settings.defaultLfoTempo; // in BPM

    /* the relative frequency of the LFO, as a note duration, where a bar has 4 notes (and lasts 4 beats).
    ** For example a note duration of 2^(-2) = 1/4 bar, means that there are 4 notes in a bar, so
    ** the LFO will oscillate with exactly the frequency of the tempo */
    private noteDurationExponent = Settings.defaultLfoNoteDurationExponent;

    public static readonly SAFETY_DURATION = 0.02; // 20 milisec

    private static readonly logger: Logger<ILogObj> = new Logger({name: "Lfo", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.lfoOscillator = this.audioContext.createOscillator();
        this.lfoOscillator.type = "triangle"; // acceptable values are: triangle, saw, square (no sine)
        this.lfoOscillator.frequency.setValueAtTime(this.absoluteFrequency, this.audioContext.currentTime);

        this.constantOscillator = this.audioContext.createConstantSource();
        this.constantOscillator.offset.setValueAtTime(1.0, this.audioContext.currentTime);

        this.lfoGainNode = this.audioContext.createGain();
        this.lfoGainNode.gain.setValueAtTime(Settings.minLfoGain, this.audioContext.currentTime);

        // connect oscillator and constant source to the gain
        this.lfoOscillator.connect(this.lfoGainNode);
        this.constantOscillator.connect(this.lfoGainNode);

        // start the nodes
        this.lfoOscillator.start();
        this.constantOscillator.start();
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.lfoGainNode; }

    public setShape(shape: LfoShape): void
    {
        Lfo.logger.debug(`setShape(${shape})`);

        switch(shape)
        {
            case LfoShape.Triangle: this.lfoOscillator.type = "triangle"; break;

            case LfoShape.Sawtooth: this.lfoOscillator.type = "sawtooth"; break;

            case LfoShape.Square: this.lfoOscillator.type = "square"; break;

            default: break;
        }
    }

    public setFrequencyType(freqType: FrequencyType): void
    {
        Lfo.logger.debug(`setFrequencyType(${freqType})`);

        this.frequencyType = freqType;
    }

    // sets the absolute frequency of the LFO, in Hz
    public setFrequency(freq: number): boolean
    {
        if (Settings.minLfoAbsoluteFrequency <= freq && freq <= Settings.maxLfoAbsoluteFrequency)
        {
            Lfo.logger.debug(`setFrequency(${freq})`);

            this.absoluteFrequency = freq;  // set the new value

            // assign the newly recomputed frequency to the LFO oscillator
            this.lfoOscillator.frequency.linearRampToValueAtTime(freq, this.audioContext.currentTime);

            this.computeTempo(); // recompute tempo, so it matches the new frequency

            return true; // change was succesfull
        }
        else
        {
            Lfo.logger.warn(`setFrequency(${freq}): value is outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the tempo of the LFO, in BPM
    public setTempo(tempo: number): boolean
    {
        if (Settings.minLfoTempo <= tempo && tempo <= Settings.maxLfoTempo)
        {
            Lfo.logger.debug(`setTempo(${tempo})`);

            this.tempo = tempo; // set the new value

            this.computeFrequency(); // recompute frequency

            // assign the newly recomputed frequency to the LFO oscillator
            this.lfoOscillator.frequency.linearRampToValueAtTime(this.absoluteFrequency, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            Lfo.logger.warn(`setTempo(${tempo}): value is outside bounds`);
            return false;  // change was not succesfull
        }
    }

    /* sets the duration of a note, for the case where the LFO frequency
    ** is specified in terms of tempo and note duration */
    public setNoteDurationExponent(noteDurationExponent: number): boolean
    {
        if (Settings.minLfoNoteDurationExponent <= noteDurationExponent
            && noteDurationExponent <= Settings.maxLfoNoteDurationExponent)
        {
            Lfo.logger.debug(`setNoteDurationExponent(${noteDurationExponent})`);

            this.noteDurationExponent = noteDurationExponent;

            this.computeFrequency(); // recompute LFO frequency
            this.computeTempo(); // recompute LFO tempo, so it matches the frequency

            // assign the newly recomputed frequency to the LFO oscillator
            this.lfoOscillator.frequency.linearRampToValueAtTime(this.absoluteFrequency, this.audioContext.currentTime);

            return true; // change was succesful
        }
        else
        {
            Lfo.logger.warn(`setNoteDurationExponent(${noteDurationExponent}): value outside bounds"`);
            return false; // change was not succesful
        }
    }

    /* This is a utilitary method that (re)computes the frequency of the LFO, on demand.
    ** The method uses the tempo and note duration in order to compute the corresponding frequency.
    ** The tempo is in BPM (beats pe minute) and the note duration is in fractions of a bar, where a
    ** bar has 4 beats.
    ** In this way we can determine how many notes there are in a beat, which eventually gives the
    ** frequency of the LFO. */
    private computeFrequency(): void
    {
        Lfo.logger.debug(`computeFrequency()`);

        this.absoluteFrequency = this.tempo / (60.0 * 2**(this.noteDurationExponent + 2));
    }

    private computeTempo(): void
    {
        Lfo.logger.debug(`computeFrequency()`);

        this.tempo = Math.round(this.absoluteFrequency * 60.0 * 2**(this.noteDurationExponent + 2));
    }
}