import { Settings } from "../../constants/settings";
import type { BaseOscillator } from "./oscillator/base/base-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


/* Interface that represent an oscillator and it's assiciated gain weight.
** The mixer uses the gain weight of each oscillator to apply it to that oscillator. */
interface OscillatorData
{
    oscillator: BaseOscillator;
    gainWeight: number;
}

/* This class manages the gain of the connected oscillators.
** the gain is managed through the 'setOutputGain()' method that each oscillators has.
**
** The reason for this class is to have a general purpose mixer, that can mix an arbitrary number of oscillators.
** This class only manages the gain levels of oscillators, but does not add the oscillators togheter. */
export class OscillatorMixer
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    private audioContext: AudioContext = new AudioContext();

    /* The array of oscillators and their gain weights */
    private oscillators: Array<OscillatorData> = new Array<OscillatorData>(0);

    // the final output of the oscillator; this is used to connect he oscillator to other nodes
    // private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "OscMixer", minLevel: Settings.minLogLevel });

    // constructor(audioContext: AudioContext, osc1: MultiShapeOscillator, osc2: MultiShapeOscillator, subOsc: SubOscillator, noiseOsc: MultiNoiseOscillator)
    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            OscillatorMixer.logger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            OscillatorMixer.logger.warn("constructor(): audioContext is null, separate audioContext was created");

        // set the gain for the all the oscillators
        this.computeAndSetGainValues();
    }

    public addOscillator(oscillator: BaseOscillator): void
    {
        /* If the oscillators array does not have any elements, this means that the currently
        ** added element is the first.
        ** The first oscillator receives a max gain by default, while the rest of the oscillators
        ** receive a min gain by default. */
        let gain = Settings.maxMixerOscGain;

        if (this.oscillators.length > 0)
            gain = Settings.minMixerOscGain;
        else
            OscillatorMixer.logger.warn(`addOscillator(): gain = ${gain}`);

        const oscData: OscillatorData = { oscillator: oscillator, gainWeight: gain };

        // add the new oscillator to the array of oscillators
        this.oscillators.push(oscData);

        // (re)compute the gain levels of all oscillators
        this.computeAndSetGainValues();

        // connect the new oscillator to the mixer output
        // oscillator.outputNode().connect(this.outputGainNode);
    }

    // sets the gain value for the oscillator at specified index
    public setOscillatorLevel(oscillatorIndex: number, level: number): boolean
    {
        const isIndexInRange: boolean = 0 <= oscillatorIndex && oscillatorIndex < this.oscillators.length;
        const isLevelInRange: boolean = Settings.minMixerOscGain <= level && level <= Settings.maxMixerOscGain;

        if (!isIndexInRange)
        {
            OscillatorMixer.logger.warn(`setOscillatorLevel(${oscillatorIndex}, ${level}): oscillator index outside bounds`);
            return false;
        }
        else if (!isLevelInRange)
        {
            OscillatorMixer.logger.warn(`setOscillatorLevel(${oscillatorIndex}, ${level}): level outside bounds`);
            return false;
        }
        else
        {
            OscillatorMixer.logger.debug(`setOscillatorLevel(${oscillatorIndex}, ${level}): started`);

            this.oscillators[oscillatorIndex].gainWeight = level;
            this.computeAndSetGainValues();

            return true; // change was succesfull
        }
    }

    private computeAndSetGainValues(): void
    {
        OscillatorMixer.logger.debug(`computeAndSetGainValues()`);

        const length = this.oscillators.length;

        // compute and set the actual gain levels for each oscillator:
        // if there is at least one oscillator, then compute the gain
        if (length > 0)
        {
            for (let oscillatorData of this.oscillators)
            {
                oscillatorData.oscillator.setOutputGain(oscillatorData.gainWeight / length);
            }
        }
    }
}