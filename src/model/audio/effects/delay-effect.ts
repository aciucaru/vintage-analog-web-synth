import { Settings } from "../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

export class DelayEffect extends SingleInputBaseAudioNode
{
    // the input and output audio nodes
    private inputNode: AudioNode | null = null;
    private outputGainNode: GainNode;

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

        this.delayNode.connect(this.delayFeedabackNode);
        this.delayFeedabackNode.connect(this.delayNode);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        this.delayNode.connect(this.outputGainNode);
    }

    public connectInput(inputNode: AudioNode): void
    {
        this.inputNode = inputNode;

        // connect the input node to the delay and also to the main output node
        this.inputNode.connect(this.delayNode);
        this.inputNode.connect(this.outputGainNode);
    }

    public outputNode(): AudioNode { return this.outputGainNode; }

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