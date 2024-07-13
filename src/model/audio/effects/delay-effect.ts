import { Settings } from "../../../constants/settings";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DelayEffect extends SingleInputBaseAudioNode
{
    // the input node of this effect
    private inputNode: AudioNode | null = null;

    // atenuators for input and delay, these help obtain the wet/dry effect
    private inputAtenuatorGainNode: GainNode;
    private delayAtenuatorGainNode: GainNode;

    // the delay node itself and a feedback node
    private delayNode: DelayNode;
    private delayFeedabackNode: GainNode;

    // the final output ot this effect
    private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DelayEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.inputAtenuatorGainNode = this.audioContext.createGain();
        this.inputAtenuatorGainNode.gain.setValueAtTime(Settings.defaultEffectAtenuatorGain, this.audioContext.currentTime);
        this.delayAtenuatorGainNode = this.audioContext.createGain();
        this.delayAtenuatorGainNode.gain.setValueAtTime(Settings.defaultEffectAtenuatorGain, this.audioContext.currentTime);
        
        this.delayNode = this.audioContext.createDelay();
        this.delayNode.delayTime.setValueAtTime(Settings.minDelayTime, this.audioContext.currentTime);

        this.delayFeedabackNode = this.audioContext.createGain();
        this.delayFeedabackNode.gain.setValueAtTime(Settings.minDelayFeedback, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect delay nodes togheter
        this.delayNode.connect(this.delayFeedabackNode);
        this.delayFeedabackNode.connect(this.delayNode);
        this.delayNode.connect(this.delayAtenuatorGainNode);

        // connect atenuators to final output gain node
        this.inputAtenuatorGainNode.connect(this.outputGainNode);
        this.delayAtenuatorGainNode.connect(this.outputGainNode);
    }

    public connectInput(inputNode: AudioNode): void
    {
        this.inputNode = inputNode;

        // connect the input node to the delay and also to the main output node
        this.inputNode.connect(this.delayNode);
        this.inputNode.connect(this.inputAtenuatorGainNode);
    }

    public outputNode(): AudioNode { return this.outputGainNode; }

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

    /* This method sets the wet/dry level of the delay effect. It basically sets how much of the signal
    ** coming from the delay effect is supposed to be heard along the original signal.
    ** The original signal is called 'dry' (no effects) and the signal comming out of the delay effect
    ** is called 'wet' (because it has effects).
    **
    ** In order to obtain the wet/dry capability, the dry audio input is passed through a gain node and the
    ** wet signal comming out of the delay effect is also passed through a gain node and these two gain nodes
    ** are then combined. Each gain node has it's own gain value, so it has it's own weight, which gives the illusion
    ** that we can teak the amount of effect (the wet/dry level).
    **
    ** The 'effectAmount' argument represents the weight of the signal comming out of the delay effect, while
    ** the weight of the original ('dry') signal is 100% minus the weight of the 'wet' signal. */
    public setEffectAmount(effectAmount: number): boolean
    {
        if (Settings.minEffectAtenuatorGain <= effectAmount && effectAmount <= Settings.maxEffectAtenuatorGain)
        {
            DelayEffect.logger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputAtenuatorGainNode.gain.linearRampToValueAtTime(Settings.maxEffectAtenuatorGain - effectAmount, currentTime);
            this.delayAtenuatorGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            DelayEffect.logger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}