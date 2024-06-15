import { Settings } from "../../constants/settings";
import { AdsrEnvelope } from "./modulation/adsr-envelope";
import { BaseAudioNode } from "./base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

export class OscFilter extends BaseAudioNode
{
    // the main node: the biquad filter
    protected filterNode: BiquadFilterNode;

    protected cutoffFreq: number;
    protected resonance: number;
    protected keyTrackingAmount: number;
    protected envelopeAmount: number;

    // the ADSR envelope for the cutoff frequency
    private cutoffAdsrEnvelope: AdsrEnvelope;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "LowpassFilter", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.filterNode = this.audioContext.createBiquadFilter();
        this.filterNode.type = "lowpass";

        this.cutoffFreq = Settings.defaultFilterCutoffFreq;
        this.resonance = Settings.defaultFilterResonance;
        this.envelopeAmount = Settings.defaultFilterEnvelopeAmount;
        this.keyTrackingAmount = Settings.defaultFilterKeyTrackingAmount;

        this.cutoffAdsrEnvelope = new AdsrEnvelope(this.audioContext);

        // set the cuttof frequency to a default
        this.filterNode.frequency.setValueAtTime(Settings.defaultFilterCutoffFreq, this.audioContext.currentTime);

        // connect ADSR envelope with filter frequency cutoff
        this.cutoffAdsrEnvelope.mainNode().connect(this.filterNode.frequency);
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.filterNode; }

    // sets the cutoff frequency of the filter, in Hz
    public setCutoffFrequency(freq: number): boolean
    {
        if (Settings.minFilterCutoffFreq <= freq && freq <= Settings.maxFilterCutoffFreq)
        {
            OscFilter.logger.debug(`setCutoffFrequency(${freq})`);

            this.filterNode.frequency.setValueAtTime(freq, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.warn(`setCutoffFrequency(${freq}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    public setResonance(resonance: number): boolean
    {
        if (Settings.minFilterResonance <= resonance && resonance <= Settings.maxFilterResonance)
        {
            OscFilter.logger.debug(`setResonance(${resonance})`);

            this.setQFactor(resonance);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.debug(`setResonance(${resonance}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    public setKeyTrackingLevel(keyTrackingLevel: number): boolean
    {
        return false;
    }

    // sets the frequency detune of the filter, in cents
    private setDetune(centsDetune: number): boolean
    {
        if (Settings.minFilterDetune <= centsDetune && centsDetune <= Settings.maxFilterDetune)
        {
            OscFilter.logger.debug(`setDetune(${centsDetune})`);

            this.filterNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.debug(`setDetune(${centsDetune}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the Q Factor (quality factor), no units
    private setQFactor(qFactor: number): boolean
    {
        if (Settings.minFilterQFactor <= qFactor && qFactor <= Settings.maxFilterQFactor)
        {
            OscFilter.logger.debug(`setQFactor(${qFactor})`);

            this.filterNode.Q.setValueAtTime(qFactor, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.warn(`setQFactor(${qFactor}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    // sets the filter gain
    private setGain(gain: number): boolean
    {
        if (Settings.minFilterGain <= gain && gain <= Settings.maxFilterGain)
        {
            OscFilter.logger.debug(`setGain(${gain})`);

            this.filterNode.gain.setValueAtTime(gain, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.warn(`setGain(${gain}): value outside bounds`);
            return false; // change was not succesfull
        }
    }

    public getAdsrEnvelope(): AdsrEnvelope { return this.cutoffAdsrEnvelope; }
}