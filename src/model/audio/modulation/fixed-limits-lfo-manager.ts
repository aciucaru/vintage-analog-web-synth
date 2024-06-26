import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";
import { ShareableUnipolarLfo } from "./shareable-unipolar-lfo";
import { UnipolarLfo } from "./unipolar-lfo";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class FixedLimitsLfoManager extends BaseAudioNode
{
    /* The array of managed shareable LFOs.
    ** A shareable LFO is an LFO that can modulate multiple parameters at the same time,
    ** meaning that the shreable LFO is shared between modulation destinations. */
    private shareableLfoArray: Array<ShareableUnipolarLfo>;

    /* The gain node that merges (adds) all above LFOs togheter.
    ** This gain node serves both as a merger node (it merges all LFOs from the 'lfoArray' into a
    ** single node/signal) and also as the modulation amount (it's gain is the modulation amount, 
    ** basically a multiplier that multiplies the merged LFOs signal).
    **
    ** The gain of this node is computed as below:
    ** mergerGainNode.gain = (1.0 / numberOfEnabledLfos) * modulationAmount */
    private mergerGainNode: GainNode;

    // how many LFOs are enabled
    private numberOfEnabledLfos = 0;

    // the modulation amount, in normalized form (between -1.0 and 1.0, where 0.0 means no modulation)
    private normalizedModulationAmount = 0.0; // 0% (no modulation)

    // the final (absolute) modulation amount
    private absoluteModulationAmount = 0;

    /* The limits of the modulated parameter, in absolute value (not in percentages).
    ** These are the limits between which the modulated parameter varies, there are not the limits of the modulator.
    ** The modulator (FixedLimitsLfoManager) needs to know these limits, in order to not exceed the limits of the modulated parameter. */
    private parameterLowerLimit: number;
    private parameterUpperLimit: number;
    // the current value of the modulated parameter
    private parameterCurrentValue: number;

    /* Fixed modulation amounts, these are both positive.
    ** The 'above current value modulation' is always positive and refers to the maximum absolute (not in percentages) modulation amount
    ** that can be set when the normalized modulation amount is positive (is above the current value of the modulated parameter).
    **
    ** The 'below current value modulation' is always positive and refers to the maximum absolute (not in percentages) modulation amount
    ** that can be set when the normalized modulation amount is negative (is below the current value of the modulated parameter). */
    private aboveCurrentValueModulationMaxAmount: number;
    private belowCurrentValueModulationMaxAmount: number;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "FixedLimitsLfoManager", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, lfoArray: Array<UnipolarLfo>,
                parameterLowerLimit: number, parameterUpperLimit: number, parameterCurrentValue: number,
                modulationLowerLimit: number, modulationUpperLimit: number)
    {
        super(audioContext);

        // initialize limits of the modulated parameter
        if (parameterLowerLimit < parameterUpperLimit)
        {
            this.parameterLowerLimit = parameterLowerLimit;
            this.parameterUpperLimit = parameterUpperLimit;
        }
        else
        {
            FixedLimitsLfoManager.logger.warn(`constructor(): lower limit of modulated parameter is not smaller than upper limit, values will be switched`);

            this.parameterLowerLimit = parameterUpperLimit;
            this.parameterUpperLimit = parameterLowerLimit;
        }

        // initialize the current value of the modulated parameter
        // if the current value is inside limits
        if (parameterLowerLimit <= parameterCurrentValue && parameterCurrentValue <= parameterUpperLimit)
            this.parameterCurrentValue = parameterCurrentValue;
        else // if current value is outside limits
        {
            FixedLimitsLfoManager.logger.warn(`constructor(): current value of modulated parameter is not inside supplied limits, current value will be in the middle`);

            // aproximate the current value as being in the middle of the lower and upper limit
            this.parameterCurrentValue = (this.parameterUpperLimit - this.parameterLowerLimit) / 2.0;
        }

        this.aboveCurrentValueModulationMaxAmount = modulationLowerLimit;
        this.belowCurrentValueModulationMaxAmount = modulationUpperLimit;

        this.mergerGainNode = this.audioContext.createGain();

        // the initial gain of the node that merges all LFOs is 0 (no moudulation amount)
        this.mergerGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

        // instantiate the array of shareable LFOs, for this we use the length of the 'lfoArray' constructor argument
        this.shareableLfoArray = new Array<ShareableUnipolarLfo>(lfoArray.length);

        // instantiate and connect each shareable LFO to the final merger node and then mute each LFO
        for (let i = 0; i < this.shareableLfoArray.length; i++)
        {
            // instantiate each ShareableLfo
            this.shareableLfoArray[i] = new ShareableUnipolarLfo(this.audioContext, lfoArray[i]);

            // connect each LFO to the final merger node
            this.shareableLfoArray[i].mainNode().connect(this.mergerGainNode);

            // set the LFO gain to minimum (doesn't actually stop the LFO, it just mutes it)
            this.shareableLfoArray[i].disable();
        }
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.mergerGainNode; }

    // public getShareableLfos(): Array<ShareableUnipolarLfo> { return this.shareableLfoArray; }

    public enableLfo(lfoIndex: number): boolean
    {
        if (0 <= lfoIndex && lfoIndex <= this.shareableLfoArray.length)
        {
            FixedLimitsLfoManager.logger.debug(`enableLfo(${lfoIndex})`);

            // first, enable the LFO
            this.shareableLfoArray[lfoIndex].enable();

            // then, increase the count of enabled LFOs
            this.numberOfEnabledLfos += 1;

            // then recompute and also set the gains for 
            this.computeFinalGain();

            return true;
        }
        else
        {
            FixedLimitsLfoManager.logger.warn(`enableLfo(${lfoIndex}): parameter outside bounds`);

            return false;
        }
    }

    public disableLfo(lfoIndex: number): boolean
    {
        if (0 <= lfoIndex && lfoIndex <= this.shareableLfoArray.length)
        {
            FixedLimitsLfoManager.logger.debug(`disableLfo(${lfoIndex})`);

            // first, disable the LFO
            this.shareableLfoArray[lfoIndex].disable();

            // then, decrease the count of enabled LFOs
            this.numberOfEnabledLfos -= 1;

            this.computeFinalGain();

            return true;
        }
        else
        {
            FixedLimitsLfoManager.logger.warn(`disableLfo(${lfoIndex}): parameter outside bounds`);

            return false;
        }
    }

    public setNormalizedModulationAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoManagerModulationAmount <= normalizedModulationAmount && normalizedModulationAmount <= Settings.maxLfoManagerModulationAmount)
        {
            FixedLimitsLfoManager.logger.debug(`setNormalizedModulationAmount(${normalizedModulationAmount})`);

            this.normalizedModulationAmount = normalizedModulationAmount;

            // recompute and set the absolute modulation
            this.computeAbsoluteModulationAmount();

            // recompute and set the final gain
            this.computeFinalGain();

            return true; // change was succesfull
        }
        else
        {
            FixedLimitsLfoManager.logger.warn(`setNormalizedModulationAmount(${normalizedModulationAmount}): parameter is outside bounds`);

            return false; // change was not succesfull
        }
    }

    /* This method sets the current absolute value of the modulated parameter.
    ** This method should be called when the absolute value of the modulated parmaters changes, this
    ** should happen inside the class that contains the modulated parameter. */
    public setParameterCurrentValue(parameterCurrentValue: number): boolean
    {
        if (this.parameterLowerLimit <= parameterCurrentValue && parameterCurrentValue <= this.parameterUpperLimit)
        {
            FixedLimitsLfoManager.logger.debug(`setParameterCurrentValue(${parameterCurrentValue})`);

            this.parameterCurrentValue = parameterCurrentValue;

            // recompute and set the absolute modulation
            this.computeAbsoluteModulationAmount();

            // recompute and set the final gain
            this.computeFinalGain();

            return true; // change was succesfull
        }
        else
        {
            FixedLimitsLfoManager.logger.warn(`setParameterCurrentValue(${parameterCurrentValue}): parameter is outside bounds`);

            return true; // change was not succesfull
        }
    }

    /* This method computes the absolute modulation amount, and does this by multiplying the 'normalizedModulationAmount', which is
    ** a factor with the maximum possible modulation in the direction of the 'normalizedModulationAmount' (plus or minus).
    **
    ** If the 'normalizedModulationAmount' is positive, then the maximum modulation possible will be between the modulated parameter's
    ** current value and the modulated parameter's upper limit.
    **
    ** If the 'normalizedModulationAmount' is negative, then the maximum modulation possible will be  between the modulated parameter's
    ** current value and the modulated paramter's lower limit.
    **
    ** So the absolute modulation amount differs, depending if the normalized modulation amount is positive (0...1) or negative (-1...0) */
    private computeAbsoluteModulationAmount(): void
    {
        // if the normalized modulation amount is positive
        if (this.normalizedModulationAmount >= 0)
        {
            // this.absoluteModulationAmount = this.normalizedModulationAmount * (this.parameterUpperLimit - this.parameterCurrentValue);
            const modulationAmount = this.normalizedModulationAmount * this.aboveCurrentValueModulationMaxAmount;

            if (this.parameterCurrentValue + modulationAmount <= this.parameterUpperLimit)
                this.absoluteModulationAmount = modulationAmount;
            else
                this.absoluteModulationAmount = this.normalizedModulationAmount * (this.parameterUpperLimit - this.parameterCurrentValue);
        }
        // if the normalized modulation amount is negative
        else
        {
            // this.absoluteModulationAmount = this.normalizedModulationAmount * (this.parameterCurrentValue - this.parameterLowerLimit);
            const modulationAmount = this.normalizedModulationAmount * this.belowCurrentValueModulationMaxAmount;

            // remember, here modulationAmount is negative
            if (this.parameterCurrentValue + modulationAmount >= this.parameterLowerLimit)
                this.absoluteModulationAmount = modulationAmount;
            else
                this.absoluteModulationAmount = this.normalizedModulationAmount * (this.parameterCurrentValue - this.parameterLowerLimit);
        }

    }

    /* Utility method that recomputes and also sets the final gain of the FixedLimitsLfoManager node.
    ** This method should be called anytime an LFO is turned on/off or when the modulation amount changes. */
    private computeFinalGain(): void
    {
        let finalGain = 0.0;

        // if all LFOs are disabled
        if (this.numberOfEnabledLfos == 0)
            finalGain = 0.0; // if no LFOs are enabled, then the modulation is zero
        // if there is at least one enabled LFO
        else if (this.numberOfEnabledLfos > 0)
            finalGain = (1.0 / this.numberOfEnabledLfos) * this.absoluteModulationAmount;

        this.mergerGainNode.gain.linearRampToValueAtTime(finalGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }
}