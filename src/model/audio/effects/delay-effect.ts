import { Settings } from "../../../constants/settings";
import { BaseEffect } from "./base-effect";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DelayEffect extends BaseEffect
{
    // the delay node itself and a feedback node
    private delayNode: DelayNode;
    private delayFeedabackNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DelayEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.setValueAtTime(Settings.minDelayTime, this.audioContext.currentTime);

        this.delayFeedabackNode = this.audioContext.createGain();
        this.delayFeedabackNode.gain.setValueAtTime(Settings.minDelayFeedback, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect effect on/off nodes
        this.effectOnOffGainNode.connect(this.delayNode);
        this.inputOnOffGainNode.connect(this.outputGainNode);

        // connect effect nodes togheter
        this.delayNode.connect(this.delayFeedabackNode);
        this.delayFeedabackNode.connect(this.delayNode);
        this.delayNode.connect(this.effectWetDryGainNode);
        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);

        // connect atenuators to final output gain node
        this.inputWetDryGainNode.connect(this.outputGainNode);
        this.effectWetDryGainNode.connect(this.outputGainNode);
    }

    public setDelayTime(delayTime: number): boolean
    {
        if (Settings.minDelayTime <= delayTime && delayTime <= Settings.maxDelayTime)
        {
            DelayEffect.logger.debug(`setDelayTime(${delayTime})`);

            // this.delayNode.delayTime.linearRampToValueAtTime(delayTime, this.audioContext.currentTime + 0.02);
            this.delayNode.delayTime.setValueAtTime(delayTime, this.audioContext.currentTime + 0.02);

            return true; // change was succesfull
        }
        else
        {
            DelayEffect.logger.warn(`setDelayTime(${delayTime}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }

    public setFeedbackLevel(feedback: number): boolean
    {
        if (Settings.minDelayFeedback <= feedback && feedback <= Settings.maxDelayFeedback)
        {
            DelayEffect.logger.debug(`setFeedbackLevel(${feedback})`);

            this.delayFeedabackNode.gain.setValueAtTime(feedback, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            DelayEffect.logger.warn(`setFeedbackLevel(${feedback}): parameter is outside bounds`);
            return false; // change was succesfull
        }
    }
}