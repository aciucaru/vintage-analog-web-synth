/* Aknowledgements:
** The algorithm for the reverb effect is inspired/adapted from the following sources:
** https://github.com/adelespinasse/reverbGen/tree/master

** Great thanks to these people for making this information available! */

import { Settings } from "../../../constants/settings";
import { BaseEffect } from "./base-effect";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class CompressorEffect extends BaseEffect
{
    // the delay node itself and a feedback node
    private compressorNode: DynamicsCompressorNode;

    // the parameters of the distorion effect
    private decayRate: number = Settings.defaultReverbDecayRate;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "CompressorEffect", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.compressorNode = this.audioContext.createDynamicsCompressor();
        this.compressorNode.threshold.setValueAtTime(Settings.defaultCompressorThreshold, this.audioContext.currentTime);
        this.compressorNode.knee.setValueAtTime(Settings.defaultCompressorKnee, this.audioContext.currentTime);
        this.compressorNode.ratio.setValueAtTime(Settings.defaultCompressorRatio, this.audioContext.currentTime);
        this.compressorNode.attack.setValueAtTime(Settings.defaultCompressorAttack, this.audioContext.currentTime);
        this.compressorNode.release.setValueAtTime(Settings.defaultCompressorRelease, this.audioContext.currentTime);

        // connect effect on/off nodes
        this.inputOnOffGainNode.connect(this.outputGainNode);
        this.effectOnOffGainNode.connect(this.compressorNode);

        this.effectOnOffGainNode.connect(this.inputWetDryGainNode);
        this.compressorNode.connect(this.effectWetDryGainNode);

        // connect atenuators to final output gain node
        this.effectWetDryGainNode.connect(this.outputGainNode);
        this.inputWetDryGainNode.connect(this.outputGainNode);
    }

    public setThreshold(threshold: number): boolean
    {
        if (Settings.minCompressorThreshold <= threshold && threshold <= Settings.maxCompressorThreshold)
        {
            CompressorEffect.logger.debug(`setThreshold(${threshold})`);

            this.compressorNode.threshold.setValueAtTime(threshold, this.audioContext.currentTime);

            return true; // change was succesfull;
        }
        else
        {
            CompressorEffect.logger.warn(`setThreshold(${threshold}): parameter outside bounds`);
            return true; // change was not succesfull;
        }
    }

    public setKnee(knee: number): boolean
    {
        if (Settings.minCompressorKnee <= knee && knee <= Settings.maxCompressorKnee)
        {
            CompressorEffect.logger.debug(`setKnee(${knee})`);

            this.compressorNode.knee.setValueAtTime(knee, this.audioContext.currentTime);

            return true; // change was succesfull;
        }
        else
        {
            CompressorEffect.logger.debug(`setKnee(${knee}): parameter outside bounds`);
            return true; // change was not succesfull;
        }
    }

    public setRatio(ratio: number): boolean
    {
        if (Settings.minCompressorRatio <= ratio && ratio <= Settings.maxCompressorRatio)
        {
            CompressorEffect.logger.debug(`setRatio(${ratio})`);

            this.compressorNode.ratio.setValueAtTime(ratio, this.audioContext.currentTime);

            return true; // change was succesfull;
        }
        else
        {
            CompressorEffect.logger.debug(`setRatio(${ratio}): parameter outside bounds`);
            return true; // change was not succesfull;
        }
    }

    public setAttack(attack: number): boolean
    {
        if (Settings.minCompressorAttack <= attack && attack <= Settings.maxCompressorAttack)
        {
            CompressorEffect.logger.debug(`setAttack(${attack})`);

            this.compressorNode.attack.setValueAtTime(attack, this.audioContext.currentTime);

            return true; // change was succesfull;
        }
        else
        {
            CompressorEffect.logger.debug(`setAttack(${attack}): parameter outside bounds`);
            return true; // change was not succesfull;
        }
    }

    public setRelease(release: number): boolean
    {
        if (Settings.minCompressorRelease <= release && release <= Settings.maxCompressorRelease)
        {
            CompressorEffect.logger.debug(`setRelease(${release})`);

            this.compressorNode.release.setValueAtTime(release, this.audioContext.currentTime);

            return true; // change was succesfull;
        }
        else
        {
            CompressorEffect.logger.debug(`setRelease(${release}): parameter outside bounds`);
            return true; // change was not succesfull;
        }
    }
}