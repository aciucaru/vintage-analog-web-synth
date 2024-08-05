import { Settings } from "../../../../constants/settings";
import { BaseSource } from "../base-source";
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
** In this way, we can reuse the same LFO for multiple synth parameters, if we want to, but we are not obligated to use the same LFO for
** all synth parameters because the 'shareable' LFO cand be enabled/disabled for each synth paramter separately. */
export class ShareableUnipolarLfo extends BaseSource
{
    // the unipolar LFO that oscillates continously once started, it never stops
    private lfo: UnipolarLfo;

    // keeps track if the LFO is enabled or disabled
    private isLfoEnabled: boolean = false;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ShareableUnipolarLfo", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, unipolarLfo: UnipolarLfo)
    {
        super(audioContext);

        this.lfo = unipolarLfo;

        // the on/off gain node is the 'outputGainNode' inherited from 'BaseSource' class
        this.outputGainNode.gain.setValueAtTime(Settings.minLfoGain, this.audioContext.currentTime);

        // connect oscillator and constant source to the gain
        this.lfo.outputNode().connect(this.outputGainNode);

        // give the illusion that the LFO is disabled
        this.outputGainNode.gain.setValueAtTime(Settings.shareableLfoDisabledGain, this.audioContext.currentTime);
    }

    public isEnabled(): boolean { return this.isLfoEnabled; }

    public enable(): void
    {
        ShareableUnipolarLfo.logger.debug(`markAsEnabled()`);

        this.isLfoEnabled = true;

        // set the new value
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.shareableLfoEnabledGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }

    public disable(): void
    {
        ShareableUnipolarLfo.logger.debug(`markAsDisabled()`);

        this.isLfoEnabled = false;

        // set the new value
        this.outputGainNode.gain.linearRampToValueAtTime(Settings.shareableLfoDisabledGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }
}