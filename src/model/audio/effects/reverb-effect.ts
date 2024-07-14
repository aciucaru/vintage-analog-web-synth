/* Aknowledgements:
**
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

    private static readonly BUFFER_DURATION_SECONDS = 1;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ReverbEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.reverbNode = this.audioContext.createConvolver();

        this.reverbAudioBuffer = this.audioContext.createBuffer(1, ReverbEffect.BUFFER_DURATION_SECONDS, this.audioContext.sampleRate);
        this.reverbNode.buffer = this.createImpulseResponse(ReverbEffect.BUFFER_DURATION_SECONDS, Settings.maxReverbDecayRate);

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

    private createImpulseResponse(secondsDuration: number, decayRate: number): AudioBuffer
    {
        // decay = 0... >1
        const length = this.audioContext.sampleRate * secondsDuration;
        const impulseResponse = this.reverbAudioBuffer.getChannelData(0);

        for (let i = 0; i < length; i++)
        {
            impulseResponse[i] = (2 * Math.random() - 1) * Math.pow(1 - i/length, decayRate);
        }

        return this.reverbAudioBuffer;
    }

    public setDecayRate(decayRate: number): boolean
    {
        if (Settings.minReverbDecayRate <= decayRate && decayRate <= Settings.maxReverbDecayRate)
        {
            ReverbEffect.logger.debug(`setDecayRate(${decayRate})`);

            this.decayRate = decayRate;
            
            const length = this.audioContext.sampleRate * 1;
            const impulseResponse = this.reverbAudioBuffer.getChannelData(0);
    
            for (let i = 0; i < length; i++)
            {
                impulseResponse[i] = (2 * Math.random() - 1) * Math.pow(1 - i/length, this.decayRate);
            }

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