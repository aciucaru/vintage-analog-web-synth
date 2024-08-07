import { Settings } from "../../../constants/settings";

import { SubOscillator } from "../emitter-node/oscillator/melodic/sub-oscillator";
import { MultiShapeOscillator } from "../emitter-node/oscillator/melodic/multi-shape-oscillator";
import { MultiNoiseOscillator } from "../emitter-node/oscillator/noise/multi-noise-oscillator";

import { OscillatorMixer } from "./oscillator-mixer";
import { OscFilter } from "./lowpass-filter";

import { AdsrEnvelope } from "../emitter-node/modulators/adsr-envelope";
// import { lfoArray } from "../../../constants/shareable-audio-nodes";
import { UnipolarLfo } from "../emitter-node/modulators/unipolar-lfo";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class Voice
{
    private audioContext: AudioContext;

    // the per-voice LFOs, as an array
    // these LFOs will modulate al modulatable parameters except frequency
    private lfoArray: Array<UnipolarLfo>;

    // the per-voice FM and ring modulation LFOs, as an array
    // these LFOs will modulate frequency and will also assure ring modulation
    private fmRingLfoArray: Array<UnipolarLfo>;

    // the oscillators:
    private multiShapeOscillator1: MultiShapeOscillator;
    private multiShapeOscillator2: MultiShapeOscillator;
    private subOscillator: SubOscillator;
    private noiseOscillator: MultiNoiseOscillator;

    // the oscillator mixer
    private oscillatorMixer: OscillatorMixer;

    // the filter and envelope:
    private filterNode: OscFilter;

    private voiceAdsrEnvelope: AdsrEnvelope;
    private voiceAdsrGainNode: GainNode;

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

        // instantiate the array of general purpose LFOs (and the LFOs themselves)
        this.lfoArray = new Array<UnipolarLfo>(Settings.generalUseLfoPerVoiceCount);
        for (let i = 0; i < this.lfoArray.length; i++)
        {
            this.lfoArray[i] = new UnipolarLfo(audioContext);
            this.lfoArray[i].setFrequency(Settings.defaultLfoLowAbsoluteFrequency);
        }

        // instantiate the array of LFOs dedicated to FM and ring modulation (and the LFOs themselves)
        this.fmRingLfoArray = new Array<UnipolarLfo>(Settings.generalUseLfoPerVoiceCount);
        for (let i = 0; i < this.lfoArray.length; i++)
        {
            this.fmRingLfoArray[i] = new UnipolarLfo(audioContext);
            this.fmRingLfoArray[i].setFrequency(Settings.defaultLfoLowAbsoluteFrequency);
        }

        // instantiate the nodes:
        this.multiShapeOscillator1 = new MultiShapeOscillator(this.audioContext, Settings.maxOscGain, this.lfoArray);
        this.multiShapeOscillator2 = new MultiShapeOscillator(this.audioContext, Settings.minOscGain, this.lfoArray);
        this.subOscillator = new SubOscillator(this.audioContext, Settings.minOscGain, this.lfoArray);
        this.noiseOscillator = new MultiNoiseOscillator(this.audioContext, Settings.minOscGain);

        // instantiate and set the mixer
        this.oscillatorMixer = new OscillatorMixer(this.audioContext);

        // add the oscillators to the mixer, in the exact order below
        this.oscillatorMixer.addFilteredOscillator(this.multiShapeOscillator1); // must be at index 0
        this.oscillatorMixer.addFilteredOscillator(this.multiShapeOscillator2); // must be at index 1
        this.oscillatorMixer.addNonFilteredOscillator(this.subOscillator); // must be at index 2
        this.oscillatorMixer.addFilteredOscillator(this.noiseOscillator); // must be at index 3

        // instantiate the filter
        this.filterNode = new OscFilter(this.audioContext, this.lfoArray);

        // instantite and set the ADSR envelope
        this.voiceAdsrEnvelope = new AdsrEnvelope(this.audioContext);
        this.voiceAdsrGainNode = this.audioContext.createGain();
        this.voiceAdsrGainNode.gain.setValueAtTime(Settings.adsrOffLevel, this.audioContext.currentTime);

        // instantiate and set the final gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);



        // connect the merged result of the oscillators that should be filtered, to the filter itself
        this.oscillatorMixer.filteredOutput().connect(this.filterNode.inputNode());

        /* Connect the filtered and non filtered signals with the ADSR gain envelope.
        ** These are not connected to the ADSR envelope itself, because the ADSR envelope is an emitter,
        ** not a destination, these are connected to a GainNode who's .gain property is modulated by the ADSR. */
        // the non filtered oscillators are taken from the mixer
        this.oscillatorMixer.nonFilteredOutput().connect(this.voiceAdsrGainNode);
        // the filtered oscillators are taken from the filter output
        this.filterNode.outputNode().connect(this.voiceAdsrGainNode);
        
        /* Connect ADSR envelope with GainNode dedicated to ADSR envelope modulation.
        ** Important! this ADSR modulation gets ADDED to the current value of .gain parameter, it does not overwrite it!
        ** This is why the .gain parameter's value should be zero. */
        this.voiceAdsrEnvelope.outputNode().connect(this.voiceAdsrGainNode.gain);

        // finally, connect the output from the GainNode modulated by ADSR to the final output GainNode
        this.voiceAdsrGainNode.connect(this.outputGainNode);
    }

    public playNote(octaves: number, semitones: number, duration: number): void
    {
        Voice.logger.debug(`playNote(): playing: octaves: ${octaves} semitones: ${semitones}`);

        // first, set the internal note (as octaves and semitones) for all oscillators
        this.multiShapeOscillator1.setNote(octaves, semitones);
        this.multiShapeOscillator2.setNote(octaves, semitones);
        this.subOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.voiceAdsrEnvelope.startBeat(duration);
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().startBeat(duration);
    }

    public playSequencerStep(beatOctavesOffset: number, beatSemitonesOffset: number, stepDuration: number): void
    {
        Voice.logger.debug(`playNoteWithOffset(octaves: ${beatOctavesOffset}, semitones: ${beatSemitonesOffset})`);

        // first, set the internal note offsets (as octaves and semitones) for all oscillators
        this.multiShapeOscillator1.setBeatOctavesOffset(beatOctavesOffset);
        this.multiShapeOscillator1.setBeatSemitonesOffset(beatSemitonesOffset);

        this.multiShapeOscillator2.setBeatOctavesOffset(beatOctavesOffset);
        this.multiShapeOscillator2.setBeatSemitonesOffset(beatSemitonesOffset);

        this.subOscillator.setBeatOctavesOffset(beatOctavesOffset);
        this.subOscillator.setBeatSemitonesOffset(beatSemitonesOffset);

        // then trigger the ADSR envelope for the voice
        this.voiceAdsrEnvelope.startBeat(stepDuration);
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().startBeat(stepDuration);
    }

    public noteOn(octaves: number, semitones: number): void
    {
        Voice.logger.debug(`noteOn(octaves = ${octaves}, semitones = ${semitones})`);

        // first, set the internal note (as octaves and semitones) for all melodic oscillators
        this.multiShapeOscillator1.setNote(octaves, semitones);
        this.multiShapeOscillator2.setNote(octaves, semitones);
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

    public resetBeatOffsets(): void
    {
        Voice.logger.debug(`resetBeatOffsets()`);

        this.multiShapeOscillator1.setBeatOctavesOffset(0);
        this.multiShapeOscillator1.setBeatSemitonesOffset(0);

        this.multiShapeOscillator2.setBeatOctavesOffset(0);
        this.multiShapeOscillator2.setBeatSemitonesOffset(0);

        this.subOscillator.setBeatOctavesOffset(0);
        this.subOscillator.setBeatSemitonesOffset(0);
    }

    public setMainGain(gain: number): void
    {
        if (Settings.minVoiceGain <= gain && gain <= Settings.maxVoiceGain)
        {
            Voice.logger.debug(`setGain(${gain})`);

            const currentTime = this.audioContext.currentTime;

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, currentTime + 0.1);
        }
        else
            Voice.logger.warn(`setGain(${gain}): value outside bounds`);
    }

    public outputNode(): GainNode { return this.outputGainNode; }

    public getMultiShapeOscillator1(): MultiShapeOscillator { return this.multiShapeOscillator1; }

    public getMultiShapeOscillator2(): MultiShapeOscillator { return this.multiShapeOscillator2; }

    public getSubOscillator(): SubOscillator { return this.subOscillator; }

    public getNoiseOscillator(): MultiNoiseOscillator { return this.noiseOscillator; }

    public getLfoArray(): Array<UnipolarLfo> { return this.lfoArray; } 

    public getFmLfoArray(): Array<UnipolarLfo> { return this.fmRingLfoArray; }

    // public getAnalyserNode(): AnalyserNode { return this.analyserNode; }

    public getMixer(): OscillatorMixer { return this.oscillatorMixer; }

    public getFilter(): OscFilter { return this.filterNode; }

    public getAdsrEnvelope(): AdsrEnvelope { return this.voiceAdsrEnvelope; }

    public getAudioContext(): AudioContext { return this.audioContext; }

    // required for having permission to play the sound in the browser, after a user interaction
    public resume(): void
    {
        this.audioContext.resume();
    }
}