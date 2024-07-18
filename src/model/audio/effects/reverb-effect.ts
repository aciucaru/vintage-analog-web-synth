/* Aknowledgements:
** The algorithm for the reverb effect is inspired/adapted from the following sources:
** https://github.com/adelespinasse/reverbGen/tree/master

** Great thanks to these people for making this information available! */

import { Settings } from "../../../constants/settings";
import { BaseEffect } from "./base-effect";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class ReverbEffect extends BaseEffect
{
    // the delay node itself and a feedback node
    private reverbNode: ConvolverNode;

    // the parameters of the distorion effect
    private reverbAudioBuffer: AudioBuffer;
    private decayRate: number = Settings.defaultReverbDecayRate;

    private static readonly DECAY_TIME = 1; // 1 second
    private static readonly FADE_IN_TIME = 0.5; // 500 milisec
    private static readonly TOTAL_TIME = ReverbEffect.DECAY_TIME * 1.5;
    private decaySampleFrames = 0;
    private fadeInSampleFrames = 0;
    private totalSampleFrames = 0;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ReverbEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.decaySampleFrames = Math.round(ReverbEffect.DECAY_TIME * this.audioContext.sampleRate);
        this.fadeInSampleFrames = Math.round(ReverbEffect.FADE_IN_TIME * this.audioContext.sampleRate);
        this.totalSampleFrames = Math.round(ReverbEffect.TOTAL_TIME * this.audioContext.sampleRate);

        this.reverbNode = this.audioContext.createConvolver();

        this.reverbAudioBuffer = this.audioContext.createBuffer(1, this.totalSampleFrames, this.audioContext.sampleRate);
        this.computeImpulseResponse(Settings.maxReverbDecayRate);
        this.reverbNode.buffer = this.reverbAudioBuffer;

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.reverbNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.reverbNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }

    // private createImpulseResponse(secondsDuration: number, decayRate: number): AudioBuffer
    // {
    //     // decay = 0... >1
    //     const length = this.audioContext.sampleRate * secondsDuration;
    //     const impulse: AudioBuffer = this.audioContext.createBuffer(1, length, this.audioContext.sampleRate);
    //     const impulseResponse = impulse.getChannelData(0);

    //     for (let i = 0; i < length; i++)
    //     {
    //         impulseResponse[i] = (2 * Math.random() - 1) * Math.pow(1 - i/length, decayRate);
    //     }

    //     return impulse;
    // }

    private computeImpulseResponse(decayRate: number): void
    {
        // decay = 0... >1
        const impulseResponse = this.reverbAudioBuffer.getChannelData(0);


        // 60dB is a factor of 1 million in power, or 1000 in amplitude.
        const decayBase = Math.pow(1.0 / 1000.0, 1.0 / this.decaySampleFrames);

        let noiseSample = 0.0;
        for (let i = 0; i < this.totalSampleFrames; i++)
        {
            noiseSample = 2 * Math.random() - 1; // white noise

            impulseResponse[i] = noiseSample * Math.pow(decayBase, i);
        }

        for (let i = 0; i < this.fadeInSampleFrames; i++)
        {
            noiseSample = 2 * Math.random() - 1; // white noise

            impulseResponse[i] *= (i / this.fadeInSampleFrames)**decayRate;
        }

        // let b0 = 0.0;
        // let b1 = 0.0;
        // let b2 = 0.0;
        // let b3 = 0.0;
        // let b4 = 0.0;
        // let b5 = 0.0;
        // let b6 = 0.0;
        // for (let i = 0; i < length; i++)
        // {
        //     // pink noise
        //     let white = Math.random() * 2 - 1;

        //     b0 = 0.99886 * b0 + white * 0.0555179;
        //     b1 = 0.99332 * b1 + white * 0.0750759;
        //     b2 = 0.96900 * b2 + white * 0.1538520;
        //     b3 = 0.86650 * b3 + white * 0.3104856;
        //     b4 = 0.55000 * b4 + white * 0.5329522;
        //     b5 = -0.7616 * b5 - white * 0.0168980;

        //     const gainCompens = 0.11; // (roughly) compensate for gain
        //     impulseResponse[i] = gainCompens * (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362);

        //     b6 = white * 0.115926; // update b6
        // }

        // let lastOut = 0.0;
        // for (let i = 0; i < length; i++)
        // {
        //     // brown
        //     const white = Math.random() * 2 - 1;

        //     impulseResponse[i] = (lastOut + 0.02 * white) / 1.02;

        //     lastOut = impulseResponse[i];
            
        //     impulseResponse[i] *= 3.5;
        // }
    }

    public setDecayRate(decayRate: number): boolean
    {
        if (Settings.minReverbDecayRate <= decayRate && decayRate <= Settings.maxReverbDecayRate)
        {
            ReverbEffect.logger.debug(`setDecayRate(${decayRate})`);

            this.decayRate = decayRate;

            this.computeImpulseResponse(this.decayRate);
            this.reverbNode.buffer = this.reverbAudioBuffer;

            return true; // change was succesfull
        }
        else
        {
            ReverbEffect.logger.warn(`setDecayRate(${decayRate}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}