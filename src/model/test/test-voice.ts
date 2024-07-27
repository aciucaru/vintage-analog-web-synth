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
    private filterAdsrEnvelope: AdsrEnvelope;
    private filterAdsrAmount: GainNode;

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
        this.filterAdsrEnvelope = new AdsrEnvelope(this.audioContext);

        // this.filterAdsrEnvelope.mainNode().connect(filter.detune);

        this.filterAdsrAmount = this.audioContext.createGain();
        this.filterAdsrAmount.gain.setValueAtTime(-2400, this.audioContext.currentTime);

        this.filterAdsrEnvelope.outputNode().connect(this.filterAdsrAmount);
        const filter = this.filterNode.getLowPassFilter() as BiquadFilterNode;
        this.filterAdsrAmount.connect(filter.detune);

        // instantiate and set the gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.minOscGain, this.audioContext.currentTime);

        this.multiShapeOscillator.outputNode().connect(this.filterNode.inputNode());
        this.filterNode.outputNode().connect(this.outputGainNode);
    }

    public noteOn(octaves: number, semitones: number): void
    {
        TestVoice.logger.debug(`noteOn(octaves = ${octaves}, semitones = ${semitones})`);

        // first, set the internal note (as octaves and semitones) for all melodic oscillators
        this.multiShapeOscillator.setNote(octaves, semitones);

        // then trigger the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.maxVoiceGain, this.audioContext.currentTime + 0.1);

        const filter = this.filterNode.getLowPassFilter() as BiquadFilterNode;
        // filter.detune.linearRampToValueAtTime(-4800, this.audioContext.currentTime + 1.2);
        this.filterAdsrEnvelope.start();

        // this.outputGainNode.gain.linearRampToValueAtTime(Settings.minVoiceGain, this.audioContext.currentTime + 2.1);
        // and then trigger the ADSR envelopr for the filter as well
        // this.filterNode.getAdsrEnvelope().start();
    }

    public noteOff(): void
    {
        TestVoice.logger.debug(`noteOff()`);

        // stop the ADSR envelope for the voice
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.minVoiceGain, this.audioContext.currentTime + 0.1);

        const filter = this.filterNode.getLowPassFilter() as BiquadFilterNode;
        // filter.detune.linearRampToValueAtTime(4800, this.audioContext.currentTime + 1.2);

        // stop the ADSR envelope for rhe filter as well
        // this.filterNode.getAdsrEnvelope().stop();

        this.filterAdsrEnvelope.stop();
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