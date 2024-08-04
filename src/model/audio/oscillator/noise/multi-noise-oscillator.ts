/* Aknowledgements:
** the noise code is inspired from the following web pages:
**
** https://noisehack.com/generate-noise-web-audio-api/
** https://github.com/meenie/band.js/blob/master/src/instrument-packs/noises.js */

import { Settings } from "../../../../constants/settings";
import { Note } from "../../note";
import { BaseOscillator } from "../../source/oscillator/base-oscillator";
import { WhiteNoiseOscillator } from "./white-noise";
import { PinkNoiseOscillator } from "./pink-noise";
import { BrownNoiseOscillator } from "./brown-noise";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export enum NoiseType
{
    White = "White",
    Pink = "Pink",
    Brown = "Brown",
}

export class MultiNoiseOscillator extends BaseOscillator
{
    // private audioContext: AudioContext;

    // the note corresponding to key tracking
    private note: Note;

    private whiteNoiseOscNode: WhiteNoiseOscillator;
    private pinkNoiseOscNode: PinkNoiseOscillator;
    private brownNoiseOscNode: BrownNoiseOscillator;
    /* the oscillator corresponding to key tracking, it generates the key tracking effect
    ** by multiplying it with the noise */
    // private keyTrackOscillator: OscillatorNode;

    private whiteNoiseGainValue: number = 0.0;
    private pinkNoiseGainValue: number = 0.0;
    private brownNoiseGainValue: number = 0.0;

    // gain nodes for noise oscillators
    private whiteNoiseGainNode: GainNode;
    private pinkNoiseGainNode: GainNode;
    private brownNoiseGainNode: GainNode;

    // gain nodes for obtaining the 'key tracking' effect:
    // gain node that dampens the sine oscillator, it bassically sets the key tracking level
    // private keyTrackOscGainNode: GainNode;
    /* to obtain noise key tracking, we multiply the noise with a sine osc that oscillates
    ** at the frequency of the played note, so we use a gain node for multiplication */
    // private multiplierGainNode: GainNode;

    private noiseMergerGainNode: GainNode;
    // private analyserGainNode: GainNode;
    // private outputGainNode: GainNode;

    private whiteAnalyserNode: AnalyserNode;
    private pinkAnalyserNode: AnalyserNode;
    private brownAnalyserNode: AnalyserNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "MultiNoiseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext);

        this.note = new Note(Settings.noteDefaultOctaves, Settings.noteDefaultSemitones);
        // this.note.setOctavesOffset(-1);
        this.note.setSemitonesOffset(-12);

        // instantiate individual noise oscillator nodes
        this.whiteNoiseOscNode = new WhiteNoiseOscillator(this.audioContext, Settings.maxOscGain);
        this.pinkNoiseOscNode = new PinkNoiseOscillator(this.audioContext, Settings.maxOscGain);
        this.brownNoiseOscNode = new BrownNoiseOscillator(this.audioContext, Settings.maxOscGain);

        // start noise oscillators
        this.whiteNoiseOscNode.start();
        this.pinkNoiseOscNode.start();
        this.brownNoiseOscNode.start();

        // instantiate gain nodes
        this.whiteNoiseGainNode = this.audioContext.createGain();
        this.pinkNoiseGainNode = this.audioContext.createGain();
        this.brownNoiseGainNode = this.audioContext.createGain();

        this.outputGainNode = this.audioContext.createGain();
        if (Settings.minOscGain <= initialGain && initialGain <= Settings.maxOscGain)
            this.outputGainNode.gain.setValueAtTime(initialGain, this.audioContext.currentTime);
        else
        {
            MultiNoiseOscillator.logger.warn(`constructor(): 'initialGain' of value ${initialGain} is outside bounds and will be ignored`);

            if (initialGain < Settings.minOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.minOscGain, this.audioContext.currentTime);
            
            if (initialGain > Settings.maxOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);
        }

        // connect sound nodes
        this.whiteNoiseOscNode.outputNode().connect(this.whiteNoiseGainNode);
        this.pinkNoiseOscNode.outputNode().connect(this.pinkNoiseGainNode);
        this.brownNoiseOscNode.outputNode().connect(this.brownNoiseGainNode);

        this.noiseMergerGainNode = this.audioContext.createGain();
        this.analyserGainNode = this.audioContext.createGain();
        this.outputGainNode = this.audioContext.createGain();

        this.whiteNoiseGainNode.connect(this.noiseMergerGainNode);
        this.pinkNoiseGainNode.connect(this.noiseMergerGainNode);
        this.brownNoiseGainNode.connect(this.noiseMergerGainNode);

        // connect main nodes to output and analyser gain nodes
        this.noiseMergerGainNode.connect(this.outputGainNode);
        this.noiseMergerGainNode.connect(this.analyserGainNode);

        // set correct gain level for individual noise oscillators
        this.setNoiseType(NoiseType.White);

        this.whiteAnalyserNode = this.audioContext.createAnalyser();
        this.whiteAnalyserNode.fftSize = 2048;
        this.pinkAnalyserNode = this.audioContext.createAnalyser();
        this.pinkAnalyserNode.fftSize = 2048;
        this.brownAnalyserNode = this.audioContext.createAnalyser();
        this.brownAnalyserNode.fftSize = 2048;

        this.whiteNoiseGainNode.connect(this.whiteAnalyserNode);
        this.pinkNoiseGainNode.connect(this.pinkAnalyserNode);
        this.brownNoiseGainNode.connect(this.brownAnalyserNode);
    }

    public setNoiseType(noiseType: NoiseType): void
    {
        MultiNoiseOscillator.logger.debug(`setNoiseType(${noiseType})`);

        switch (noiseType)
        {
            case NoiseType.White:
                this.whiteNoiseGainValue = Settings.maxOscGain;
                this.pinkNoiseGainValue = Settings.minOscGain;
                this.brownNoiseGainValue = Settings.minOscGain;
                break;

            case NoiseType.Brown:
                this.whiteNoiseGainValue = Settings.minOscGain;
                this.pinkNoiseGainValue = Settings.minOscGain;
                this.brownNoiseGainValue = Settings.maxOscGain;
                break;

            case NoiseType.Pink:
                this.whiteNoiseGainValue = Settings.minOscGain;
                this.pinkNoiseGainValue = Settings.maxOscGain;
                this.brownNoiseGainValue = Settings.minOscGain;
                break;
            
            default:
                MultiNoiseOscillator.logger.warn(`setNoiseType(${noiseType}): 'noiseType' value is outside enum values`);
                break;
        }

        const currentTime = this.audioContext.currentTime;
        this.whiteNoiseGainNode.gain.setValueAtTime(this.whiteNoiseGainValue, currentTime);
        this.pinkNoiseGainNode.gain.setValueAtTime(this.pinkNoiseGainValue, currentTime);
        this.brownNoiseGainNode.gain.setValueAtTime(this.brownNoiseGainValue, currentTime);
    }

    public getWhiteAnalyserNode(): AnalyserNode { return this.whiteAnalyserNode; }
    public getPinkAnalyserNode(): AnalyserNode { return this.pinkAnalyserNode; }
    public getBrownAnalyserNode(): AnalyserNode { return this.brownAnalyserNode; }

    public outputNode(): GainNode { return this.outputGainNode; }

    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            MultiNoiseOscillator.logger.debug(`setOutputGain(${gain})`);

            this.outputGainNode.gain.setValueAtTime(gain, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            MultiNoiseOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    public getAnalyserGainNode(): GainNode { return this.analyserGainNode; }
}