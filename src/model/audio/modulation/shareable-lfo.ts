import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";
import { Lfo } from "./lfo";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

export class ShareableLfo extends BaseAudioNode
{
    private lfo: Lfo;
    private lfoGainNode: GainNode;
    private isLfoEnabled: boolean = false;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ShareableLfo", minLevel: Settings.minLogLevel});


    constructor(audioContext: AudioContext, lfo: Lfo)
    {
        super(audioContext);

        this.lfo = lfo;

        this.lfoGainNode = this.audioContext.createGain();
        this.lfoGainNode.gain.setValueAtTime(Settings.defaultLfoGain, this.audioContext.currentTime);

        // connect oscillator and constant source to the gain
        this.lfo.mainNode().connect(this.lfoGainNode);
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.lfoGainNode; }

    public isEnabled(): boolean { return this.isLfoEnabled; }

    public enable(): void
    {
        ShareableLfo.logger.debug(`markAsEnabled()`);

        this.isLfoEnabled = true;

        // set the new value
        this.lfoGainNode.gain.linearRampToValueAtTime(Settings.maxLfoGain, this.audioContext.currentTime);
    }

    public disable(): void
    {
        ShareableLfo.logger.debug(`markAsDisabled()`);

        this.isLfoEnabled = false;

        // set the new value
        this.lfoGainNode.gain.linearRampToValueAtTime(Settings.minLfoGain, this.audioContext.currentTime);
    }
}