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
import { BaseEffect } from "./base-effect";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class DistortionEffect extends BaseEffect
{
    // the distortion node
    private distortionNode: WaveShaperNode;

    // the parameters of the distorion effect
    private distortionAmount: number = Settings.defaultDistortionAmount;
    private distortionAngle: number = Settings.defaultDistortionCurveAngle;
    private distortionConstantValue: number = Settings.defaultDistortionCurveConstantValue;

    // reusable buffer to hold distortion curve
    private distortionCurveBuffer: Float32Array;

    private static readonly CURVE_SAMPLES_COUNT = 200;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "DistortionEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.distortionCurveBuffer = new Float32Array(DistortionEffect.CURVE_SAMPLES_COUNT);
        
        this.distortionNode = this.audioContext.createWaveShaper();
        this.computeDistortionCurve(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);
        this.distortionNode.curve = this.distortionCurveBuffer;

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.distortionNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.distortionNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);

        // set special dry/wet gains for distortion effect, in oder to keep it completely dry (disabled)
        // by default. This must be done so the compressor effect does not accentuate the small distortion
        // that remains even when the distortion effect is disabled.
        this.inputWetDryGainNode.gain.setValueAtTime(Settings.defaultDistortionInputGain, this.audioContext.currentTime);
        this.effectWetDryGainNode.gain.setValueAtTime(Settings.defaultDistortionEffectGain, this.audioContext.currentTime);
    }

    private computeDistortionCurve(amount: number, angle: number, constantValue: number): void
    {
        const angleDeg = angle * Math.PI/180;

        let x = 0.0;
        for (let i = 0; i < this.distortionCurveBuffer.length; i++)
        {
            x = 2.0 * i / DistortionEffect.CURVE_SAMPLES_COUNT - 1;

            // this.distortionCurveBuffer[i] = (3 + amount) * Math.atan(Math.sinh(0.25 * x) * 5) / (Math.PI + amount * Math.abs(x)); // v1
            // this.distortionCurveBuffer[i] = ( (3 + amount) * x * angleDeg) / (Math.PI + amount * Math.abs(x)); // v2, pretty good
            // this.distortionCurveBuffer[i] = ( (Math.PI + amount) * x * (1.0 / 6.0) ) / (Math.PI + amount * Math.abs(x)); // v3
            // this.distortionCurveBuffer[i] = ( (Math.PI + amount) * x * angleDeg) / (Math.PI + amount * Math.abs(x)); // v4
            this.distortionCurveBuffer[i] = ( (constantValue + amount) * x * angleDeg) / (constantValue + amount * Math.abs(x) ); // v5, good, most general formula
        }
    }

    public setDistortionAmount(distortionAmount: number): boolean
    {
        if (Settings.minDistortionAmount <= distortionAmount && distortionAmount <= Settings.maxDistortionAmount)
        {
            DistortionEffect.logger.debug(`setDistortionAmount(${distortionAmount})`);

            this.distortionAmount = distortionAmount;

            this.computeDistortionCurve(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);
            this.distortionNode.curve = this.distortionCurveBuffer;

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

            this.distortionAngle = distortionCurveAngle;

            this.computeDistortionCurve(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);
            this.distortionNode.curve = this.distortionCurveBuffer;

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

            this.distortionConstantValue = distortionCurveConstantValue;

            this.computeDistortionCurve(this.distortionAmount, this.distortionAngle, this.distortionConstantValue);
            this.distortionNode.curve = this.distortionCurveBuffer;

            return true; // change was succesfull
        }
        else
        {
            DistortionEffect.logger.warn(`setDistortionCurveConstantValue(${distortionCurveConstantValue}): parameter is outside bounds`);
            return false; // change was not succesfull
        }
    }
}