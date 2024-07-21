import { Settings } from "../../constants/settings";

import { SubOscillator } from "../audio/oscillator/melodic/sub-oscillator";
import { MultiShapeOscillator } from "../audio/oscillator/melodic/multi-shape-oscillator";
import { MultiNoiseOscillator } from "../audio/oscillator/noise/multi-noise-oscillator";

import { OscMixer } from "../audio/mixer";
import { OscFilter } from "../audio/lowpass-filter";

import { AdsrEnvelope } from "../audio/modulation/adsr-envelope";
import { UnipolarLfo } from "../audio/modulation/unipolar-lfo";
import { lfoArray } from "../../constants/shareable-audio-nodes";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";
import { ModulationManager } from "../audio/modulation/modulation-manager";


export class TestVoice
{
    private audioContext: AudioContext;

    // the oscillators:
    private multiShapeOscillator: MultiShapeOscillator;

    // the filter and envelope:
    private filterNode: OscFilter;

    private outputGainNode: GainNode;

    // LFO modulators
    private sharedLfoArray: Array<UnipolarLfo>;
    // modulator nodes:
    private filterCutoffFreqModulationManager: ModulationManager;
    private filterResonanceModulationManager: ModulationManager;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "TestVoice", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            TestVoice.logger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            TestVoice.logger.warn("constructor(): audioContext is null, separate audioContext was created");

        // instantiate and fill the array of shared LFOs
        this.sharedLfoArray = new Array<UnipolarLfo>(Settings.lfoCount);
        for (let i = 0; i < this.sharedLfoArray.length; i++)
        {
            this.sharedLfoArray[i] = new UnipolarLfo(this.audioContext);
        }
        
        this.filterCutoffFreqModulationManager = new ModulationManager(this.audioContext, lfoArray,
                                                                        Settings.minFilterEnvelopeAmount, Settings.maxFilterEnvelopeAmount, Settings.defaultFilterEnvelopeAmount);
        this.filterResonanceModulationManager = new ModulationManager(this.audioContext, lfoArray,
                                                                        Settings.minFilterResonance, Settings.maxFilterResonance, Settings.defaultFilterResonance);

        // instantiate the nodes:
        this.multiShapeOscillator = new MultiShapeOscillator(this.audioContext, Settings.maxOscGain, lfoArray);

        this.filterNode = new OscFilter(this.audioContext, lfoArray);

        // instantiate and set the gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.minOscGain, this.audioContext.currentTime);

        this.multiShapeOscillator.outputNode().connect(this.filterNode.mainNode());
        this.filterNode.mainNode().connect(this.outputGainNode);
    }

    public playNote(octaves: number, semitones: number, duration: number): void
    {
        TestVoice.logger.debug(`playNote(): playing: octaves: ${octaves} semitones: ${semitones}`);

        // first, set the internal note (as octaves and semitones) for all oscillators
        this.multiShapeOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.maxVoiceGain, this.audioContext.currentTime + 0.1);
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().startBeat(duration);
    }

    public playSequencerStep(beatOctavesOffset: number, beatSemitonesOffset: number, stepDuration: number): void
    {
        TestVoice.logger.debug(`playNoteWithOffset(octaves: ${beatOctavesOffset}, semitones: ${beatSemitonesOffset})`);

        // first, set the internal note offsets (as octaves and semitones) for all oscillators
        this.multiShapeOscillator.setBeatOctavesOffset(beatOctavesOffset);
        this.multiShapeOscillator.setBeatSemitonesOffset(beatSemitonesOffset);

        // then trigger the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.maxVoiceGain, this.audioContext.currentTime + 0.1);
        // and then trigger the ADSR envelopr for the filter as well
        this.filterNode.getAdsrEnvelope().startBeat(stepDuration);
    }

    public noteOn(octaves: number, semitones: number): void
    {
        TestVoice.logger.debug(`noteOn(octaves = ${octaves}, semitones = ${semitones})`);

        // first, set the internal note (as octaves and semitones) for all melodic oscillators
        this.multiShapeOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.maxVoiceGain, this.audioContext.currentTime + 0.1);
        this.filterNode.noteOn();
        // this.outputGainNode.gain.linearRampToValueAtTime(Settings.minVoiceGain, this.audioContext.currentTime + 2.1);
        // and then trigger the ADSR envelopr for the filter as well
        // this.filterNode.getAdsrEnvelope().start();
    }

    public noteOff(): void
    {
        TestVoice.logger.debug(`noteOff()`);

        // stop the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.minVoiceGain, this.audioContext.currentTime + 0.1);
        this.filterNode.noteOff();
        // stop the ADSR envelope for rhe filter as well
        // this.filterNode.getAdsrEnvelope().stop();
    }

    public setMainGain(gain: number): void
    {
        if (Settings.minVoiceGain <= gain && gain <= Settings.maxVoiceGain)
        {
            TestVoice.logger.debug(`setGain(${gain})`);

            const currentTime = this.audioContext.currentTime;

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, currentTime + 0.1);
        }
        else
            TestVoice.logger.warn(`setGain(${gain}): value outside bounds`);
    }

    public outputNode(): GainNode { return this.outputGainNode; }

    public getMultiShapeOscillator(): MultiShapeOscillator { return this.multiShapeOscillator; }

    // public getAnalyserNode(): AnalyserNode { return this.analyserNode; }


    public getFilter(): OscFilter { return this.filterNode; }

    public getAudioContext(): AudioContext { return this.audioContext; }

    // required for having permission to play the sound in the browser, after a user interaction
    public resume(): void
    {
        this.audioContext.resume();
    }
}

// export const voice = new TestVoice(audioContext);