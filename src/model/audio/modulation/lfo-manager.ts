import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";
import { ShareableUnipolarLfo } from "./shareable-unipolar-lfo";
import { UnipolarLfo } from "./unipolar-lfo";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class LfoManager extends BaseAudioNode
{
    /* The array of managed shareable LFOs.
    ** A shareable LFO is an LFO that can modulate multiple parameters at the same time,
    ** meaning that the shreable LFO is shared between modulation destinations. */
    private lfoArray: Array<ShareableUnipolarLfo>;

    /* The gain node that merges (adds) all above LFOs togheter.
    ** This gain node serves both as a merger node (it merges all LFOs from the 'lfoArray' into a
    ** single node/signal) and also as the modulation amount (it's gain is the modulation amount, 
    ** basically a multiplier that multiplies the merged LFOs signal).
    **
    ** The gain of this node is computed as below:
    ** mergerGainNode.gain = (1.0 / numberOfEnabledLfos) * modulationAmount */
    private mergerGainNode: GainNode;

    // how many LFOs are enabled
    private numberOfEnabledLfos = 0;

    // the modulation amount
    private modulationAmount = 0;

    // the modulation amount limits
    private minModulationAmount: number;
    private maxModulationAmount: number;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "Lfo", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, lfoArray: Array<UnipolarLfo>, minModulationAmount: number, maxModulationAmount: number)
    {
        super(audioContext);

        // instantiate the array of LFOs
        this.lfoArray = new Array<ShareableUnipolarLfo>(lfoArray.length);

        if (minModulationAmount < maxModulationAmount)
        {
            this.minModulationAmount = minModulationAmount;
            this.maxModulationAmount = maxModulationAmount;
        }
        else
        {
            LfoManager.logger.warn(`constructor(): minModulationAmount is not smaller than maxModulationAmount, values have been switched`);

            this.minModulationAmount = maxModulationAmount;
            this.maxModulationAmount = minModulationAmount;
        }

        this.mergerGainNode = this.audioContext.createGain();

        // the initial gain of the node that merges all LFOs is 0 (no moudulation amount)
        this.mergerGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

        // instantiate and connect each LFO to the final merger node and then mute each LFO
        for (let i = 0; i < this.lfoArray.length; i++)
        {
            // instantiate each ShareableLfo
            this.lfoArray[i] = new ShareableUnipolarLfo(this.audioContext, lfoArray[i]);

            // connect each LFO to the final merger node
            this.lfoArray[i].mainNode().connect(this.mergerGainNode);

            // set gain to minimum (doesn't actually stop the LFO, it just mutes it)
            this.lfoArray[i].disable();
        }
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.mergerGainNode; }

    public getShareableLfos(): Array<ShareableUnipolarLfo> { return this.lfoArray; }

    public enableShareableLfo(lfoIndex: number): boolean
    {
        if (0 <= lfoIndex && lfoIndex <= this.lfoArray.length)
        {
            LfoManager.logger.debug(`enableLfo(${lfoIndex})`);

            // first, disable the LFO
            this.lfoArray[lfoIndex].enable();

            // then recompute and also set the gains for 
            this.setLfosGains();

            return true;
        }
        else
        {
            LfoManager.logger.warn(`enableLfo(${lfoIndex}): parameter outside bounds`);

            return false;
        }
    }

    public disableLfo(lfoIndex: number): boolean
    {
        if (0 <= lfoIndex && lfoIndex <= this.lfoArray.length)
        {
            LfoManager.logger.debug(`disableLfo(${lfoIndex})`);

            // first, disable the LFO
            this.lfoArray[lfoIndex].disable();

            this.setLfosGains();

            return true;
        }
        else
        {
            LfoManager.logger.warn(`disableLfo(${lfoIndex}): parameter outside bounds`);

            return false;
        }
    }

    /* This utility method recomputes and sets the gains of each LFO from the LFO array.
    ** This method is for internal use and should be called whenever an LFO is
    ** enabled or disabled. */
    private setLfosGains(): void
    {
        // count how many enabled LFOs are in the LFO array
        let enabledLfosCount = 0;
        for (let i = 0; i < this.lfoArray.length; i++)
        {
            if (this.lfoArray[i].isEnabled())
                enabledLfosCount++;
        }

        /* then compute the corresponding gain in such a way that the sum of all
        ** enabled LFOs varies between 0 and 1 (e.g. the sum of all LFOs is maximum 1) */
        const newMergerGain = 1.0 / enabledLfosCount;
        this.mergerGainNode.gain.linearRampToValueAtTime(newMergerGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }

    /* Utility method that recomputes and also set the gain of this node.
    ** Thsi method should be called anytime an LFO is turned on/off or when the modulation amount changes. */
    private setFinalGain(): void
    {
        const finalGain = (1.0 / this.numberOfEnabledLfos) * this.modulationAmount;

        this.mergerGainNode.gain.linearRampToValueAtTime(finalGain, this.audioContext.currentTime + Settings.lfoGainChangeTimeOffset);
    }
}