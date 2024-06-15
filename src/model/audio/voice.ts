import { Settings } from "../../constants/settings";
import { audioContext, lfoArray } from "./shareable-audio-nodes";
import { UnisonOscillator } from "./oscillator/melodic/unison-oscillator";
import { SubOscillator } from "./oscillator/melodic/sub-oscillator";
import { MultiNoiseOscillator } from "./oscillator/noise/multi-noise-oscillator";
import { OscMixer } from "./mixer";
import { OscFilter } from "./lowpass-filter";
import { AdsrEnvelope } from "./modulation/adsr-envelope";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class Voice
{
    private audioContext: AudioContext;

    // the oscillators:
    private unisonOscillator1: UnisonOscillator;
    private unisonOscillator2: UnisonOscillator;
    private subOscillator: SubOscillator;
    private noiseOscillator: MultiNoiseOscillator;

    // the mixer (the mixer only sets gain levels, it does not combine oscillators togheter)
    private oscillatorMixer: OscMixer;

    // a gain node that merges all oscillators that pas trough the cutoff filter
    private filteredOscillatorsGainNode: GainNode;

    // the filter and envelope:
    private filterNode: OscFilter;
    private voiceAdsrEnvelope: AdsrEnvelope;

    private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "Voice", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            Voice.logger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            Voice.logger.warn("constructor(): audioContext is null, separate audioContext was created");

        // instantiate the nodes:
        this.unisonOscillator1 = new UnisonOscillator(this.audioContext, Settings.maxOscGain);
        this.unisonOscillator2 = new UnisonOscillator(this.audioContext, Settings.minOscGain);
        this.subOscillator = new SubOscillator(this.audioContext, Settings.minOscGain, lfoArray);
        this.noiseOscillator = new MultiNoiseOscillator(this.audioContext, Settings.minOscGain);

        // instantiate the mixer, filter and ADSR envelope
        this.oscillatorMixer = new OscMixer(this.audioContext, this.unisonOscillator1, this.unisonOscillator2, this.subOscillator, this.noiseOscillator);
        this.filterNode = new OscFilter(this.audioContext);
        this.voiceAdsrEnvelope = new AdsrEnvelope(this.audioContext);

        // instantiate and connect the gain node that combines all oscillators that should pass through the cutoff filter
        this.filteredOscillatorsGainNode = this.audioContext.createGain();

        // instantiate and set the gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        // connect mixer with the filter (the mixer is already connected with the oscillators)
        this.unisonOscillator1.outputNode().connect(this.filteredOscillatorsGainNode);
        this.unisonOscillator2.outputNode().connect(this.filteredOscillatorsGainNode);
        this.noiseOscillator.outputNode().connect(this.filteredOscillatorsGainNode);

        // connect the merged result of the oscillators that should be filtered, to the filter itself
        this.filteredOscillatorsGainNode.connect(this.filterNode.mainNode());

        // connect the sub oscillator and the filter result with the ADSR volume envelope
        this.subOscillator.outputNode().connect(this.voiceAdsrEnvelope.mainNode());
        this.filterNode.mainNode().connect(this.voiceAdsrEnvelope.mainNode());
        
        // connect ADSR envelope with main output node
        this.voiceAdsrEnvelope.mainNode().connect(this.outputGainNode);

        // connect the main output gain to the audio context destination
        this.outputGainNode.connect(this.audioContext.destination);
    }

    public playNote(octaves: number, semitones: number, duration: number): void
    {
        Voice.logger.debug(`playNote(): playing: octaves: ${octaves} semitones: ${semitones}`);

        // first, set the internal note (as octaves and semitones) for all oscillators
        this.unisonOscillator1.setNote(octaves, semitones);
        this.unisonOscillator2.setNote(octaves, semitones);
        this.subOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.voiceAdsrEnvelope.startAndStop(duration);
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().startAndStop(duration);
    }

    public noteOn(octaves: number, semitones: number): void
    {
        Voice.logger.debug(`noteOn(octaves = ${octaves}, semitones = ${semitones})`);

        // first, set the internal note (as octaves and semitones) for all oscillators
        this.unisonOscillator1.setNote(octaves, semitones);
        this.unisonOscillator2.setNote(octaves, semitones);
        this.subOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.voiceAdsrEnvelope.start();
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().start();
    }

    public noteOff(): void
    {
        Voice.logger.debug(`noteOff()`);

        // stop the ADSR envelope for the voice
        this.voiceAdsrEnvelope.stop();
        // stop the ADSR envelope for rhe filter as well
        this.filterNode.getAdsrEnvelope().stop();
    }

    public setMainGain(gain: number): void
    {
        if (Settings.minVoiceGain <= gain && gain <= Settings.maxVoiceGain)
        {
            Voice.logger.debug(`setGain(${gain})`);

            const currentTime = this.audioContext.currentTime;

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain / 2.0, currentTime + 0.1);
        }
        else
            Voice.logger.warn(`setGain(${gain}): value outside bounds`);
    }

    public outputNode(): GainNode { return this.outputGainNode; }

    public getUnisonOscillator1(): UnisonOscillator { return this.unisonOscillator1; }

    public getUnisonOscillator2(): UnisonOscillator { return this.unisonOscillator2; }

    public getSubOscillator(): SubOscillator { return this.subOscillator; }

    public getNoiseOscillator(): MultiNoiseOscillator { return this.noiseOscillator; }

    // public getAnalyserNode(): AnalyserNode { return this.analyserNode; }

    public getMixer(): OscMixer { return this.oscillatorMixer; }

    public getFilter(): OscFilter { return this.filterNode; }

    public getAdsrEnvelope(): AdsrEnvelope { return this.voiceAdsrEnvelope; }

    public getAudioContext(): AudioContext { return this.audioContext; }

    // required for having permission to play the sound in the browser, after a user interaction
    public resume(): void
    {
        this.audioContext.resume();
    }
}

export const voice = new Voice(audioContext);