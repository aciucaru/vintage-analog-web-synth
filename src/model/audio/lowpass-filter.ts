import { Settings } from "../../constants/settings";
import { AdsrEnvelope } from "./modulation/adsr-envelope";
import { NoInputBaseAudioNode } from "./no-input-base-audio-node";
import { ModulationManager } from "./modulation/modulation-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class OscFilter extends NoInputBaseAudioNode
{
    // the main node: the biquad filter
    protected filterNode: BiquadFilterNode;

    protected cutoffFreq: number;
    protected resonance: number;
    protected keyTrackingAmount: number;
    protected envelopeAmount: number;

    // parameter manager nodes
    private cutoffFreqModulationManager: ModulationManager;
    private resonanceModulationManager: ModulationManager;

    // the ADSR envelope for the cutoff frequency
    private cutoffAdsrEnvelope: AdsrEnvelope;
    // the gain node for the ADSR amount
    private envelopeAmountGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "LowpassFilter", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, freqCutoffModulationManager: ModulationManager, resonanceModulationManager: ModulationManager)
    {
        super(audioContext);

        this.filterNode = this.audioContext.createBiquadFilter();
        this.filterNode.type = "lowpass";

        this.cutoffFreq = Settings.defaultFilterCutoffFreq;
        this.resonance = Settings.defaultFilterResonance;
        this.envelopeAmount = Settings.defaultFilterEnvelopeAmount;
        this.keyTrackingAmount = Settings.defaultFilterKeyTrackingAmount;

        this.cutoffFreqModulationManager = freqCutoffModulationManager;
        this.resonanceModulationManager = resonanceModulationManager;

        this.cutoffAdsrEnvelope = new AdsrEnvelope(this.audioContext);
        this.envelopeAmountGainNode = this.audioContext.createGain();
        this.envelopeAmountGainNode.gain.setValueAtTime(Settings.defaultFilterEnvelopeAmount, this.audioContext.currentTime);

        // set the cuttof frequency to a default
        this.filterNode.frequency.setValueAtTime(Settings.defaultFilterCutoffFreq, this.audioContext.currentTime);

        // connect modulators with filter frequency cutoff
        // this.cutoffAdsrEnvelope.mainNode().connect(this.filterNode.frequency);
        this.cutoffAdsrEnvelope.mainNode().connect(this.envelopeAmountGainNode);
        this.envelopeAmountGainNode.connect(this.filterNode.frequency);
        this.cutoffFreqModulationManager.mainNode().connect(this.filterNode.frequency);

        // connect modulators with resonance (Q factor)
        this.resonanceModulationManager.mainNode().connect(this.filterNode.Q);
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

            // set the cutoff frequency
            this.filterNode.frequency.setValueAtTime(freq, this.audioContext.currentTime);

            // notify the modulation manager that the main value has changed
            this.cutoffFreqModulationManager.setParameterCurrentValue(freq);

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

            // set the resonance
            this.setQFactor(resonance);

            // notify the modulation manager that the main value has changed
            this.resonanceModulationManager.setParameterCurrentValue(resonance);

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

    public setEnvelopeAmount(amount: number): boolean
    {
        if (Settings.minFilterEnvelopeAmount <= amount && amount <= Settings.maxFilterEnvelopeAmount)
        {
            OscFilter.logger.debug(`setEnvelopeAmount(${amount})`);

            const changeTime = this.audioContext.currentTime + 0.01; // + 10ms
            this.envelopeAmountGainNode.gain.linearRampToValueAtTime(amount, changeTime);

            return true; // change was succesfull
        }
        else
        {
            OscFilter.logger.warn(`setEnvelopeAmount(${amount}): value outside bounds`);
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

    // modulators getters
    public getAdsrEnvelope(): AdsrEnvelope { return this.cutoffAdsrEnvelope; }
    public getCutoffFreqModulationManager(): ModulationManager { return this.cutoffFreqModulationManager; }
    public getResonanceModulationManager(): ModulationManager { return this.resonanceModulationManager; }
}