import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

export class DelayEffect
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    private audioContext: AudioContext;

    private inputNode: BaseAudioNode;

    private delayNode: DelayNode;
    private delayFeedabackNode: GainNode;
    private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DelayEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, inputNode: BaseAudioNode)
    {
        this.audioContext = audioContext;

        this.inputNode = inputNode;

        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.setValueAtTime(Settings.minDelayTime, this.audioContext.currentTime);

        this.delayFeedabackNode = this.audioContext.createGain();
        this.delayFeedabackNode.gain.setValueAtTime(Settings.minDelayFeedbackGain, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect the input node to the delay and also to the main output node
        this.inputNode.mainNode().connect(this.delayNode);
        this.inputNode.mainNode().connect(this.outputGainNode);
    }

    public outputNode(): GainNode { return this.outputGainNode; }

    public setDelayTime(delayTime: number): boolean
    {
        if (Settings.minDelayTime <= delayTime && delayTime <= Settings.maxDelayTime)
        {
            DelayEffect.logger.debug(`setDelayTime(${delayTime})`);

            this.delayNode.delayTime.setValueAtTime(delayTime, this.audioContext.currentTime);

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
        if (Settings.minDelayFeedbackGain <= feedback && feedback <= Settings.maxDelayFeedbackGain)
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