/* Aknowledgements:
**
** Great thanks to these people for making this information available! */


import { Settings } from "../../../constants/settings";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class ReverbEffect extends SingleInputBaseAudioNode
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
    private reverbNode: WaveShaperNode;

    // the final output ot this effect
    private outputGainNode: GainNode;

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "ReverbEffect", minLevel: Settings.minLogLevel });

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
        
        this.reverbNode = this.audioContext.createWaveShaper();

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.reverbNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.reverbNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
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
            ReverbEffect.logger.debug(`toggleEffect(): on`);

            // set the input route (dry signal route) gain to min
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime + 0.05);

            // set the effect route (wet signal route) gain to max
            this.effectOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime + 0.05);
        }
        else
        {
            ReverbEffect.logger.debug(`toggleEffect(): off`);

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
            ReverbEffect.logger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputWetDryGainNode.gain.linearRampToValueAtTime(Settings.maxEffectWetDryGain - effectAmount, currentTime);
            this.effectWetDryGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            ReverbEffect.logger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}