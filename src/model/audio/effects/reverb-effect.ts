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

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ReverbEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.reverbNode = this.audioContext.createConvolver();
        this.reverbNode.buffer = this.createImpulseResponse(1, 1);

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.reverbNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.reverbNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }

    private createImpulseResponse(secondsDuration: number, decayRate: number): AudioBuffer
    {
        // decay = 0... >1
        const length = this.audioContext.sampleRate * secondsDuration;
        const impulse: AudioBuffer = this.audioContext.createBuffer(1, length, this.audioContext.sampleRate);
        const impulseResponse = impulse.getChannelData(0);

        for (let i = 0; i < length; i++)
        {
            impulseResponse[i] = (2 * Math.random() - 1) * Math.pow(1 - i/length, decayRate);
        }

        return impulse;
    }
}