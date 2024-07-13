/* Aknowledgements:
** The curve equation for the distortion effect is inspired/adapted from the following sources:
** https://alexanderleon.medium.com/web-audio-series-part-2-designing-distortion-using-javascript-and-the-web-audio-api-446301565541
** https://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
** https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createWaveShaper
** https://stackoverflow.com/questions/36146689/altering-the-curve-of-a-webaudio-waveshaper-node-while-playing
** https://stackoverflow.com/questions/7840347/web-audio-api-waveshapernode
**
** Great thanks to these people for making this information available! */


import { Settings } from "../../../constants/settings";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DistortionEffect extends SingleInputBaseAudioNode
{
    // the input node of this effect
    private inputNode: AudioNode | null = null;

    private isEffectEnabled = false;

    // atenuators for input and delay, these help obtain the on/off effect (they help turn the effect on/off)
    private inputOnOffGainNode: GainNode;
    private distortionOnOffGainNode: GainNode;

    // atenuators for input and delay, these help obtain the wet/dry effect
    private inputWetDryGainNode: GainNode;
    private distortionWetDryGainNode: GainNode;

    // the delay node itself and a feedback node
    private distortionNode: WaveShaperNode;
    private distortionAmount: number = Settings.defaultDistortionAmount;
    private distortionAngle: number = Settings.defaultDistortionCurveAngle;
    private distortionConstantValue: number = Settings.defaultDistortionCurveConstantValue;

    // the final output ot this effect
    private outputGainNode: GainNode;

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DistortionEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.inputOnOffGainNode = this.audioContext.createGain();
        this.inputOnOffGainNode.gain.setValueAtTime(Settings.maxEffectOnOffGain, this.audioContext.currentTime);
        this.distortionOnOffGainNode = this.audioContext.createGain();
        this.distortionOnOffGainNode.gain.setValueAtTime(Settings.minEffectWetDryGain, this.audioContext.currentTime);

        this.inputWetDryGainNode = this.audioContext.createGain();
        this.inputWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        this.distortionWetDryGainNode = this.audioContext.createGain();
        this.distortionWetDryGainNode.gain.setValueAtTime(Settings.defaultEffectWetDryGain, this.audioContext.currentTime);
        
        this.distortionNode = this.audioContext.createWaveShaper();
        this.distortionNode.curve = this.makeDistortionCurve5(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect effect on/off nodes
        this.distortionOnOffGainNode.connect(this.distortionNode);
        this.inputOnOffGainNode.connect(this.outputGainNode);

        // connect atenuators to final output gain node
        this.distortionNode.connect(this.distortionWetDryGainNode);
        this.distortionOnOffGainNode.connect(this.inputWetDryGainNode);

        this.distortionWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }

    public connectInput(inputNode: AudioNode): void
    {
        this.inputNode = inputNode;

        // connect the input node to the delay and also to the main output node
        this.inputNode.connect(this.distortionWetDryGainNode);
        this.inputNode.connect(this.inputWetDryGainNode);
    }

    public outputNode(): AudioNode { return this.outputGainNode; }

    private makeDistortionCurve1(amount: number): Float32Array
    {
        const curveSamples = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);

        let x = 0.0;
        for (let i = 0; i < curveSamples.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            curveSamples[i] = (3 + amount) * Math.atan(Math.sinh(0.25 * x) * 5) / (Math.PI + amount * Math.abs(x));
        }

        return curveSamples;
    }

    private makeDistortionCurve2(amount: number): Float32Array
    {
        const curveSamples = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);
        const angle = 20 * Math.PI/180; // 20 degrees

        let x = 0.0;
        for (let i = 0; i < curveSamples.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            curveSamples[i] = ( (3 + amount) * x * angle) / (Math.PI + amount * Math.abs(x));
        }

        return curveSamples;
    }

    private makeDistortionCurve3(amount: number): Float32Array
    {
        const curveSamples = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);

        let x = 0.0;
        for (let i = 0; i < curveSamples.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            curveSamples[i] = ( (Math.PI + amount) * x * (1 / 6.0) ) / (Math.PI + amount * Math.abs(x));
        }

        return curveSamples;
    }

    // good
    private makeDistortionCurve4(amount: number): Float32Array
    {
        const curveSamples = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);
        const angle = 20 * Math.PI/180; // 20 degrees

        let x = 0.0;
        for (let i = 0; i < curveSamples.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            curveSamples[i] = ( (Math.PI + amount) * x * angle) / (Math.PI + amount * Math.abs(x));
        }

        return curveSamples;
    }

    // best version
    private makeDistortionCurve5(amount: number, angle: number, constantValue: number): Float32Array
    {
        const curveSamples = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);
        const angleDeg = angle * Math.PI/180; // 20 degrees

        let x = 0.0;
        for (let i = 0; i < curveSamples.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            curveSamples[i] = ( (constantValue + amount) * x * angleDeg) / (constantValue + amount * Math.abs(x) );
        }

        return curveSamples;
    }

    // this method toggles the effect on/off (it enables or disables the effect)
    public toggleEffect(): void
    {
        this.isEffectEnabled = !this.isEffectEnabled;

        const currentTime = this.audioContext.currentTime;

        if (this.isEffectEnabled)
        {
            DistortionEffect.logger.debug(`toggleEffect(): on`);

            // set the input route (dry signal route) gain to min
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime);

            // set the effect route (wet signal route) gain to max
            this.distortionOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime);
        }
        else
        {
            DistortionEffect.logger.debug(`toggleEffect(): off`);

            // set the input route (dry signal route) gain to max
            this.inputOnOffGainNode.gain.linearRampToValueAtTime(Settings.maxEffectOnOffGain, currentTime);

            // set the effect route (wet signal route) gain to min
            this.distortionOnOffGainNode.gain.linearRampToValueAtTime(Settings.minEffectOnOffGain, currentTime);
        }
    }

    public setDistortionAmount(distortionAmount: number): boolean
    {
        if (Settings.minDistortionAmount <= distortionAmount && distortionAmount <= Settings.maxDistortionAmount)
        {
            DistortionEffect.logger.debug(`setDistortionAmount(${distortionAmount})`);

            this.distortionAmount = distortionAmount;

            this.distortionNode.curve = this.makeDistortionCurve5(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setDistortionAmount(${distortionAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }

    public setDistortionCurveAngle(distortionCurveAngle: number): boolean
    {
        if (Settings.minDistortionCurveAngle <= distortionCurveAngle && distortionCurveAngle <= Settings.maxDistortionCurveAngle)
        {
            DistortionEffect.logger.debug(`setDistortionCurveAngle(${distortionCurveAngle})`);

            this.distortionAngle= distortionCurveAngle;

            this.distortionNode.curve = this.makeDistortionCurve5(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setDistortionCurveAngle(${distortionCurveAngle}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }

    public setDistortionCurveConstantValue(distortionCurveConstantValue: number): boolean
    {
        if (Settings.minDistortionCurveConstantValue <= distortionCurveConstantValue && distortionCurveConstantValue <= Settings.maxDistortionCurveConstantValue)
        {
            DistortionEffect.logger.debug(`setDistortionCurveConstantValue(${distortionCurveConstantValue})`);

            this.distortionAngle= distortionCurveConstantValue;

            this.distortionNode.curve = this.makeDistortionCurve5(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setDistortionCurveConstantValue(${distortionCurveConstantValue}): parameter is outside bounds`);
            return false; // change was not succesfull
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
            DistortionEffect.logger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputWetDryGainNode.gain.linearRampToValueAtTime(Settings.maxEffectWetDryGain - effectAmount, currentTime);
            this.distortionWetDryGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}