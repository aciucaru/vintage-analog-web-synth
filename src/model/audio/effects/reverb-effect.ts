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
    private reverbNode: WaveShaperNode;

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ReverbEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.reverbNode = this.audioContext.createWaveShaper();

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.reverbNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.reverbNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }
}