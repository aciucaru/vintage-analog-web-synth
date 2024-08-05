import { Settings } from "../../../../constants/settings";
import { UnipolarLfo } from "./unipolar-lfo";
import { LfoManager } from "./lfo-manager";
import { BaseSource } from "../base-source";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


/* This class is modulator that can merge modulation from different sources, such as LFOs, ADSR envelopes and other
** sources.
** This class basically manages all the modulators of a parameter. Currently only LFO modulators are supported. */
export class ModulationManager extends BaseSource
{
    // modulator node
    private lfoManager: LfoManager;

    /* The limits of the modulated parameter, in absolute value (not in percentages).
    ** These are the limits between which the modulated parameter may vary, there are not the limits of the modulator.
    ** The modulator (ModulationManager) needs to know these limits, in order to not exceed the limits of the modulated parameter. */
    private parameterLowerLimit: number;
    private parameterUpperLimit: number;
    // the current value of the modulated parameter
    private parameterCurrentValue: number;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ParameterManager", minLevel: Settings.minLogLevel});

    private static readonly FINAL_NODE_GAIN = 1.0;

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
            ModulationManager.logger.warn(`constructor(): lower limit of modulated parameter is not smaller than upper limit, values will be switched`);

            this.parameterLowerLimit = parameterUpperLimit;
            this.parameterUpperLimit = parameterLowerLimit;
        }

        // initialize the current value of the modulated parameter
        // if the current value is inside limits
        if (parameterLowerLimit <= parameterCurrentValue && parameterCurrentValue <= parameterUpperLimit)
            this.parameterCurrentValue = parameterCurrentValue;
        else // if current value is outside limits
        {
            ModulationManager.logger.warn(`constructor(): current value of modulated parameter is not inside supplied limits, current value will be in the middle`);

            // aproximate the current value as being in the middle of the lower and upper limit
            this.parameterCurrentValue = (this.parameterUpperLimit - this.parameterLowerLimit) / 2.0;
        }

        this.lfoManager = new LfoManager(this.audioContext, lfoArray, parameterLowerLimit, parameterUpperLimit, parameterCurrentValue,
                                            useFixedModulationRanges, lowerModulationFixedRange, upperModulationFixedRange);

        // the final node is 'outputGainNode', inherited from BaseSource class
        this.outputGainNode.gain.setValueAtTime(ModulationManager.FINAL_NODE_GAIN, this.audioContext.currentTime);

        this.lfoManager.outputNode().connect(this.outputGainNode);
    }

    public setLfosModulationAmount(normalizedModulationAmount: number): boolean
    {
        if (Settings.minLfoManagerModulationAmount <= normalizedModulationAmount && normalizedModulationAmount <= Settings.maxLfoManagerModulationAmount)
        {
            ModulationManager.logger.debug(`setNormalizedModulationAmount(${normalizedModulationAmount})`);

            this.lfoManager.setNormalizedModulationAmount(normalizedModulationAmount);

            return true; // change was succesfull
        }
        else
        {
            ModulationManager.logger.warn(`setNormalizedModulationAmount(${normalizedModulationAmount}): parameter is outside bounds`);

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

            this.lfoManager.setParameterCurrentValue(parameterCurrentValue);

            ModulationManager.logger.debug(`setParameterCurrentValue(${parameterCurrentValue}): value=${this.parameterCurrentValue} lfo=${this.lfoManager.getParameterCurrentValue()}`);

            return true; // change was succesfull
        }
        else
        {
            ModulationManager.logger.warn(`setParameterCurrentValue(${parameterCurrentValue}): parameter is outside bounds`);

            return true; // change was not succesfull
        }
    }

    public getLfoManager(): LfoManager { return this.lfoManager; }
}