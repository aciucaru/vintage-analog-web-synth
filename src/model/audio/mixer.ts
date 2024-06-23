import { Settings } from "../../constants/settings";
import type { SubOscillator } from "./oscillator/melodic/sub-oscillator";
import type { MultiShapeOscillator } from "./oscillator/melodic/multi-shape-oscillator";
import type { MultiNoiseOscillator } from "./oscillator/noise/multi-noise-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class OscMixer
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    private audioContext: AudioContext = new AudioContext();

    /* references to the oscillators the mixer will mix togheter
    ** these oscillators do not need separate gain nodes for mixing, because they already contain a gain node each*/
    private oscillator1: MultiShapeOscillator;
    private oscillator2: MultiShapeOscillator;
    private subOscillator: SubOscillator;
    private noiseOscillator: MultiNoiseOscillator;

    // the gain weigths associated with each oscillator
    private oscillator1GainWeight: number = Settings.maxMixerOscGain;
    private oscillator2GainWeight: number = Settings.minMixerOscGain;
    private subOscillatorGainWeight: number = Settings.minMixerOscGain;
    private noiseOscillatorGainWeight: number = Settings.minMixerOscGain;

    // the final output of the oscillator; this is used to connect he oscillator to other nodes
    private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "OscMixer", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, osc1: MultiShapeOscillator, osc2: MultiShapeOscillator, subOsc: SubOscillator, noiseOsc: MultiNoiseOscillator)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            OscMixer.logger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            OscMixer.logger.warn("constructor(): audioContext is null, separate audioContext was created");

        this.oscillator1 = osc1;
        this.oscillator2 = osc2;
        this.subOscillator = subOsc;
        this.noiseOscillator = noiseOsc;

        // instantiate and set main output node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.maxVoiceGain, this.audioContext.currentTime);

        // connect nodes with main output node
        this.oscillator1.outputNode().connect(this.outputGainNode);
        this.oscillator2.outputNode().connect(this.outputGainNode);
        this.subOscillator.outputNode().connect(this.outputGainNode);
        this.noiseOscillator.outputNode().connect(this.outputGainNode);

        // set the gain for the 4 main nodes to 25% each
        this.computeAndSetGainValues();
    }

    // sets the gain value for oscillator 1 
    public setOscillator1Level(level: number): boolean
    {
        if (Settings.minMixerOscGain <= level && level <= Settings.maxMixerOscGain)
        {
            OscMixer.logger.debug(`setOscillator1Gain(${level}): started`);

            this.oscillator1GainWeight = level;
            this.computeAndSetGainValues();

            return true; // change was succesfull
        }
        else
        {
            OscMixer.logger.warn(`setOscillator1Gain(${level}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the gain value for oscillator 2
    public setOscillator2Level(level: number): boolean
    {
        if (Settings.minMixerOscGain <= level && level <= Settings.maxMixerOscGain)
        {
            OscMixer.logger.debug(`setOscillator2Gain(${level}): started`);

            this.oscillator2GainWeight = level;
            this.computeAndSetGainValues();

            return true; // change was succesfull
        }
        else
        {
            OscMixer.logger.warn(`setOscillator2Gain(${level}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the gain value for the sub oscillator
    public setSubOscillatorLevel(level: number): boolean
    {
        if (Settings.minMixerOscGain <= level && level <= Settings.maxMixerOscGain)
        {
            OscMixer.logger.debug(`setSubOscillatorGain(${level}): started`);

            this.subOscillatorGainWeight = level;
            this.computeAndSetGainValues();

            return true; // change was succesfull
        }
        else
        {
            OscMixer.logger.warn(`setSubOscillatorGain(${level}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the gain value for the noise oscillator
    public setNoiseOscillatorLevel(level: number): boolean
    {
        if (Settings.minMixerOscGain <= level && level <= Settings.maxMixerOscGain)
        {
            OscMixer.logger.debug(`setNoiseOscillatorGain(${level})`);

            this.noiseOscillatorGainWeight = level;
            this.computeAndSetGainValues();

            return true; // change was succesfull
        }
        else
        {
            OscMixer.logger.warn(`setNoiseOscillatorGain(${level}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    public computeAndSetGainValues(): void
    {
        OscMixer.logger.debug(`computeGainValues()`);

        // compute the actual gain levels for each oscillator
        const osc1Gain = this.oscillator1GainWeight / 4.0;
        const osc2Gain = this.oscillator2GainWeight / 4.0;
        const subOscGain = this.subOscillatorGainWeight / 4.0;
        const noiseOscGain = this.noiseOscillatorGainWeight / 4.0;

        // set the computed gain levels for each oscillator
        this.oscillator1.setOutputGain(osc1Gain);
        this.oscillator2.setOutputGain(osc2Gain);
        this.subOscillator.setOutputGain(subOscGain);
        this.noiseOscillator.setOutputGain(noiseOscGain);
    }
}