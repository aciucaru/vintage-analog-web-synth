import { Settings } from "../../../constants/settings";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DelayEffect extends SingleInputBaseAudioNode
{
    // the input node of this effect
    private inputNode: AudioNode | null = null;

    private isEffectEnabled = false;

    // atenuators for input and delay, these help obtain the on/off effect (they help turn the effect on/off)
    private inputOnOffGainNode: GainNode;
    private effectOnOffGainNode: GainNode;

    // atenuators for input and delay, these help obtain the wet/dry effect
    private inputWetDryGainNode: GainNode;
    private effectWetDryGainNode: GainNode;

    // the delay node itself and a feedback node
    private delayNode: DelayNode;
    private delayFeedabackNode: GainNode;

    // the final output ot this effect
    private outputGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DelayEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.inputOnOffGainNode = this.audioContext.createGain();
        this.inputOnOffGainNode.gain.setValueAtTime(Settings.maxEffectOnOffGain, this.audioContext.currentTime);
        this.effectOnOffGainNode = this.audioContext.createGain();
        this.effectOnOffGainNode.gain.setValueAtTime(Settings.minEffectWetDryGain, this.audioContext.currentTime);

        this.inputWetDryGainNode = this.audioContext.createGain();
        this.inputWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        this.effectWetDryGainNode = this.audioContext.createGain();
        this.effectWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        
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

    public connectInput(inputNode: AudioNode): void
    {
        this.inputNode = inputNode;

        // connect the input node to the delay and also to the main output node
        this.inputNode.connect(this.effectOnOffGainNode);
        this.inputNode.connect(this.inputOnOffGainNode);
    }

    public outputNode(): AudioNode { return this.outputGainNode; }

    // this method toggles the effect on/off (it enables or disables the effect)
    public toggleEffect(): void
    {
        this.isEffectEnabled = !this.isEffectEnabled;

        const currentTime = this.audioContext.currentTime;

        if (this.isEffectEnabled)
        {
            DelayEffect.logger.debug(`toggleEffect(): on`);

            // set the input route (dry signal route) gain to min
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime);

            // set the effect route (wet signal route) gain to max
            this.effectOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime);
        }
        else
        {
            DelayEffect.logger.debug(`toggleEffect(): off`);

            // set the input route (dry signal route) gain to max
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime);

            // set the effect route (wet signal route) gain to min
            this.effectOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime);
        }
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
        if (Settings.minEffectWetDryGain <= effectAmount && effectAmount <= Settings.maxEffectWetDryGain)
        {
            DelayEffect.logger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputWetDryGainNode.gain.linearRampToValueAtTime(Settings.maxEffectWetDryGain - effectAmount, currentTime);
            this.effectWetDryGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            DelayEffect.logger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}