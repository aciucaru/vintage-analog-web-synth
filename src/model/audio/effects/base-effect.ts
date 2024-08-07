import { Settings } from "../../../constants/settings";
import { IntermediateBaseNode } from "../intermediate-node/intermediate-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* This is the base class for all effect and it contains nodes and methods that are reaused in every effect:
** - 'inputOnOffGainNode' and 'effectOnOffGainNode', used to turn the effect on/off
** - 'inputWetDryGainNode' and 'effectWetDryGainNode', used to set the wet/dry effect amount
** - 'toggleEffect()', used to turn the effect on/off
** - 'setEffectAmount()', sets the wet/dry effect amount */
export class BaseEffect extends IntermediateBaseNode
{
    // the input node of this effect
    protected inputGainNode: GainNode;

    protected isEffectEnabled = false;

    // atenuators for input and delay, these help obtain the on/off effect (they help turn the effect on/off)
    protected inputOnOffGainNode: GainNode;
    protected effectOnOffGainNode: GainNode;

    // atenuators for input and delay, these help obtain the wet/dry effect
    protected inputWetDryGainNode: GainNode;
    protected effectWetDryGainNode: GainNode;

    // the final output ot this effect
    protected outputGainNode: GainNode;

    private static readonly baseEffectLogger: Logger<ILogObj> = new Logger({name: "BaseEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.inputGainNode = this.audioContext.createGain();
        this.inputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        this.inputOnOffGainNode = this.audioContext.createGain();
        this.inputOnOffGainNode.gain.setValueAtTime(Settings.maxEffectOnOffGain, this.audioContext.currentTime);
        this.effectOnOffGainNode = this.audioContext.createGain();
        this.effectOnOffGainNode.gain.setValueAtTime(Settings.minEffectWetDryGain, this.audioContext.currentTime);

        this.inputWetDryGainNode = this.audioContext.createGain();
        this.inputWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        this.effectWetDryGainNode = this.audioContext.createGain();
        this.effectWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect the input node to the delay and also to the main output node
        this.inputGainNode.connect(this.effectOnOffGainNode);
        this.inputGainNode.connect(this.inputOnOffGainNode);

        // the audio nodes are supposed to be connect in the extending classes, so here they won't be connected
    }

    // public override inputNode(): AudioNode { return this.inputGainNode; }

    // public override outputNode(): AudioNode { return this.outputGainNode; }

    // this method toggles the effect on/off (it enables or disables the effect)
    public toggleEffect(): void
    {
        this.isEffectEnabled = !this.isEffectEnabled;

        const currentTime = this.audioContext.currentTime;

        if (this.isEffectEnabled)
        {
            BaseEffect.baseEffectLogger.debug(`toggleEffect(): on`);

            // set the input route (dry signal route) gain to min
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime + 0.05);

            // set the effect route (wet signal route) gain to max
            this.effectOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime + 0.05);
        }
        else
        {
            BaseEffect.baseEffectLogger.debug(`toggleEffect(): off`);

            // set the input route (dry signal route) gain to max
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime + 0.05);

            // set the effect route (wet signal route) gain to min
            this.effectOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime + 0.05);
        }
    }

    /* This method sets the wet/dry level of the distortion effect. It basically sets how much of the signal
    ** coming from the effect is supposed to be heard along the original signal.
    ** The original signal is called 'dry' (no effects) and the signal comming out of the effect
    ** is called 'wet' (because it has effects).
    **
    ** In order to obtain the wet/dry capability, the dry audio input is passed through a gain node and the
    ** wet signal comming out of the effect is also passed through a gain node and these two gain nodes
    ** are then combined. Each gain node has it's own gain value, so it has it's own weight, which gives the illusion
    ** that we can teak the amount of effect (the wet/dry level).
    **
    ** The 'effectAmount' argument represents the weight of the signal comming out of the delay effect, while
    ** the weight of the original ('dry') signal is 100% minus the weight of the 'wet' signal. */
    public setEffectAmount(effectAmount: number): boolean
    {
        if (Settings.minEffectWetDryGain <= effectAmount && effectAmount <= Settings.maxEffectWetDryGain)
        {
            BaseEffect.baseEffectLogger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputWetDryGainNode.gain.linearRampToValueAtTime(Settings.maxEffectWetDryGain - effectAmount, currentTime);
            this.effectWetDryGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            BaseEffect.baseEffectLogger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}