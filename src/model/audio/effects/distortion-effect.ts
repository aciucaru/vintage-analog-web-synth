/* Aknowledgements:
** The curve for the distortion effect is inspired/adapted from the following sources:
** Alexander Leon: https://alexanderleon.medium.com/web-audio-series-part-2-designing-distortion-using-javascript-and-the-web-audio-api-446301565541
** https://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
** https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createWaveShaper
** https://stackoverflow.com/questions/36146689/altering-the-curve-of-a-webaudio-waveshaper-node-while-playing
** Great thanks to these people for making this information available! */


import { Settings } from "../../../constants/settings";
import { SingleInputBaseAudioNode } from "../single-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DistortionEffect extends SingleInputBaseAudioNode
{
    // the input node of this effect
    private inputNode: AudioNode | null = null;

    // atenuators for input and delay, these help obtain the wet/dry effect
    private inputAtenuatorGainNode: GainNode;
    private distortionAtenuatorGainNode: GainNode;

    // the delay node itself and a feedback node
    private distortionNode: WaveShaperNode;

    // the final output ot this effect
    private outputGainNode: GainNode;

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DistortionEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.inputAtenuatorGainNode = this.audioContext.createGain();
        this.inputAtenuatorGainNode.gain.setValueAtTime(Settings.defaultDelayAtenuatorGain, this.audioContext.currentTime);
        this.distortionAtenuatorGainNode = this.audioContext.createGain();
        this.distortionAtenuatorGainNode.gain.setValueAtTime(Settings.defaultDelayAtenuatorGain, this.audioContext.currentTime);
        
        this.distortionNode = this.audioContext.createWaveShaper();
        this.distortionNode.curve = this.makeDistortionCurve3(400);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

        // connect effect node
        this.distortionNode.connect(this.distortionAtenuatorGainNode);

        // connect atenuators to final output gain node
        this.inputAtenuatorGainNode.connect(this.outputGainNode);
        this.distortionAtenuatorGainNode.connect(this.outputGainNode);
    }

    public connectInput(inputNode: AudioNode): void
    {
        this.inputNode = inputNode;

        // connect the input node to the delay and also to the main output node
        this.inputNode.connect(this.distortionNode);
        this.inputNode.connect(this.inputAtenuatorGainNode);
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

    // best
    private makeDistortionCurve3(amount: number): Float32Array
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

    private makeDistortionCurve4(amount: number): Float32Array
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

    public setDistortionAmount(distortionAmount:number): void
    {

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
        if (Settings.minDelayAtenuatorGain <= effectAmount && effectAmount <= Settings.maxDelayAtenuatorGain)
        {
            DistortionEffect.logger.debug(`setEffectAmount(${effectAmount})`);

            const currentTime = this.audioContext.currentTime;

            this.inputAtenuatorGainNode.gain.linearRampToValueAtTime(Settings.maxDelayAtenuatorGain - effectAmount, currentTime);
            this.distortionAtenuatorGainNode.gain.linearRampToValueAtTime(effectAmount, currentTime);

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setEffectAmount(${effectAmount}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}