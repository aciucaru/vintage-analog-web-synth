import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";
import { UnipolarLfo } from "./unipolar-lfo";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* This class is similar to the UnipolarLfo class and it contains an UnipolarLfo instance, but there is a difference between
** them: the UnipolarLfo just oscillates continously and cannot be disabled or re-enabled at will.
** This class passes the UnipolarLfo through an aditional GainNode, who's 'gain' parameter can be set to 0 to give the illusion
** that the UnipolarLfo has been disabled, or who's 'gain' parameter can be set to a positive value to give the illusion that the
** LFO has been re-enabled.
**
** The internal UnipolarLfo already oscillates in unipolar mode, between 0 and 1.
**
** The ShareableUnipolarLfo oscillates between 0 and 1 (when enabled) and between 0 and 0 (no perceivable effect, when disabled).
**
** This class is called 'shareable' because, by being able to turn an LFO on/off, we can modulate multiple parameters with the same LFO
** In this way, we can reuse the same LFO for multiple synth parameters, if we want to, but we are not obligated to use that LFO for all
** synth parameters because the 'shareable' LFO cand be enabled/disabled for each synth paramter separately. */
export class ShareableUnipolarLfo extends BaseAudioNode
{
    // the unipolar LFO that oscillates continously once started, it never stops
    private lfo: UnipolarLfo;

    // the on/off GainNode, which gives the illusion that the LFO is being disabled or enabled (muted or unmuted)
    private toggleGainNode: GainNode;

    // keeps track if the LFO is enabled or disabled
    private isLfoEnabled: boolean = false;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ShareableUnipolarLfo", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, unipolarLfo: UnipolarLfo)
    {
        super(audioContext);

        this.lfo = unipolarLfo;

        this.toggleGainNode = this.audioContext.createGain();
        this.toggleGainNode.gain.setValueAtTime(Settings.minLfoGain, this.audioContext.currentTime);

        // connect oscillator and constant source to the gain
        this.lfo.mainNode().connect(this.toggleGainNode);

        // disable the LFO
        this.toggleGainNode.gain.setValueAtTime(Settings.shareableLfoDisabledGain, this.audioContext.currentTime);
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.toggleGainNode; }

    public isEnabled(): boolean { return this.isLfoEnabled; }

    public enable(): void
    {
        ShareableUnipolarLfo.logger.debug(`markAsEnabled()`);

        this.isLfoEnabled = true;

        // set the new value
        this.toggleGainNode.gain.linearRampToValueAtTime(Settings.shareableLfoEnabledGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }

    public disable(): void
    {
        ShareableUnipolarLfo.logger.debug(`markAsDisabled()`);

        this.isLfoEnabled = false;

        // set the new value
        this.toggleGainNode.gain.linearRampToValueAtTime(Settings.shareableLfoDisabledGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }
}