/* Aknowledgements:
** The algorithm for the reverb effect is inspired/adapted from the following sources:
** https://github.com/adelespinasse/reverbGen/tree/master

** Great thanks to these people for making this information available! */

import { Settings } from "../../../constants/settings";
import { BaseEffect } from "./base-effect";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class CompressorEffect extends BaseEffect
{
    // the delay node itself and a feedback node
    private compressorNode: DynamicsCompressorNode;

    // the parameters of the distorion effect
    private decayRate: number = Settings.defaultReverbDecayRate;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "CompressorEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.compressorNode = this.audioContext.createDynamicsCompressor();

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.compressorNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.compressorNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }
}