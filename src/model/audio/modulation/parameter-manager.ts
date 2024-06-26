import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";
import { UnipolarLfo } from "./unipolar-lfo";
import { LfoManager } from "./lfo-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class ParameterManager extends BaseAudioNode
{
    /* parameter value node (constant node):
    ** These are 'constant oscillators' that always emit the same value, and here they are used as the value of
    ** some parameters of this oscillator (frequency, pulse width, unison detune).
    **
    ** The purpose of these constant nodes is to be able to add the current value of the parameter with the value
    ** of an LFO and/or an ADSR envelope. They bassicaly allow modulation.
    **
    ** The constant node is basically the value of the modulatable parameter (regardless if the parameter is being modulated or not).
    **
    ** The final value of the oscillator's parameter is the sum of the ConstantSourceNode, the LfoManager and the ADSR envelope.
    ** The sum is made by connecting al previous 3 nodes (constant, LFO and ADSR) to the same parameter. */
    private parameterValueNode: ConstantSourceNode;

    // modulator node
    private lfoManager: LfoManager;

    // final node
    private mergerGainNode: GainNode;

    // the LFO modulation amount, in normalized form (between -1.0 and 1.0, where 0.0 means no modulation)
    private lfoModulationAmount = 0; // 0% (no modulation)

    /* The limits of the modulated parameter, in absolute value (not in percentages).
    ** These are the limits between which the modulated parameter varies, there are not the limits of the modulator.
    ** The modulator (ParameterManager) needs to know these limits, in order to not exceed the limits of the modulated parameter. */
    private parameterLowerLimit: number;
    private parameterUpperLimit: number;
    // the current value of the modulated parameter
    private parameterCurrentValue: number;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ParameterManager", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, lfoArray: Array<UnipolarLfo>,
                parameterLowerLimit: number, parameterUpperLimit: number, parameterCurrentValue: number,
                useFixedModulationRanges: boolean = false, lowerModulationFixedRange: number = 0, upperModulationFixedRange: number = 0)
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
            ParameterManager.logger.warn(`constructor(): lower limit of modulated parameter is not smaller than upper limit, values will be switched`);

            this.parameterLowerLimit = parameterUpperLimit;
            this.parameterUpperLimit = parameterLowerLimit;
        }

        // initialize the current value of the modulated parameter
        // if the current value is inside limits
        if (parameterLowerLimit <= parameterCurrentValue && parameterCurrentValue <= parameterUpperLimit)
            this.parameterCurrentValue = parameterCurrentValue;
        else // if current value is outside limits
        {
            ParameterManager.logger.warn(`constructor(): current value of modulated parameter is not inside supplied limits, current value will be in the middle`);

            // aproximate the current value as being in the middle of the lower and upper limit
            this.parameterCurrentValue = (this.parameterUpperLimit - this.parameterLowerLimit) / 2.0;
        }

        this.parameterValueNode = this.audioContext.createConstantSource();
        this.parameterValueNode.offset.setValueAtTime(this.parameterCurrentValue, this.audioContext.currentTime);

        this.lfoManager = new LfoManager(this.audioContext, lfoArray, parameterLowerLimit, parameterUpperLimit, parameterCurrentValue,
                                            useFixedModulationRanges, lowerModulationFixedRange, upperModulationFixedRange);

        this.mergerGainNode = this.audioContext.createGain();
        this.mergerGainNode.gain.setValueAtTime(1, this.audioContext.currentTime);

        this.parameterValueNode.connect(this.mergerGainNode);
        this.lfoManager.mainNode().connect(this.mergerGainNode);

        // start necessary nodes
        this.parameterValueNode.start();
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.mergerGainNode; }

    public setLfosModulationAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoManagerModulationAmount <= normalizedModulationAmount && normalizedModulationAmount <= Settings.maxLfoManagerModulationAmount)
        {
            ParameterManager.logger.debug(`setNormalizedModulationAmount(${normalizedModulationAmount})`);

            this.lfoModulationAmount = normalizedModulationAmount;

            this.lfoManager.setNormalizedModulationAmount(normalizedModulationAmount);

            return true; // change was succesfull
        }
        else
        {
            ParameterManager.logger.warn(`setNormalizedModulationAmount(${normalizedModulationAmount}): parameter is outside bounds`);

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
            this.parameterCurrentValue = parameterCurrentValue;

            this.parameterValueNode.offset.linearRampToValueAtTime(parameterCurrentValue, this.audioContext.currentTime);

            this.lfoManager.setParameterCurrentValue(parameterCurrentValue);

            ParameterManager.logger.debug(`setParameterCurrentValue(${parameterCurrentValue}): value=${this.parameterCurrentValue} lfo=${this.lfoManager.getParameterCurrentValue()}`);

            return true; // change was succesfull
        }
        else
        {
            ParameterManager.logger.warn(`setParameterCurrentValue(${parameterCurrentValue}): parameter is outside bounds`);

            return true; // change was not succesfull
        }
    }

    public getLfoManager(): LfoManager { return this.lfoManager; }
}