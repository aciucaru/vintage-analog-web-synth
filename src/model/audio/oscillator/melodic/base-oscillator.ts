import { Settings } from "../../../../constants/settings";
import type { UnipolarLfo } from "../../modulation/unipolar-lfo";
import { LfoManager } from "../../modulation/lfo-manager";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export abstract class BaseOscillator
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    protected audioContext: AudioContext;

    /* the gain node that should be used for drawing the sound (for AnalyserNode)
    ** this gain is always at max. level, so the drawing is full size */
    protected analyserGainNode: GainNode;

    // the final output of the oscillator; this is used to connect he oscillator to other nodes
    protected outputGainNode: GainNode;

    private static readonly baseOscLogger: Logger<ILogObj> = new Logger({name: "BaseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            BaseOscillator.baseOscLogger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            BaseOscillator.baseOscLogger.warn("constructor(): audioContext is null, separate audioContext was created");

        this.analyserGainNode = this.audioContext.createGain();
        this.analyserGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        if (Settings.minOscGain <= initialGain && initialGain <= Settings.maxOscGain)
            this.outputGainNode.gain.setValueAtTime(initialGain, this.audioContext.currentTime);
        else
        {
            BaseOscillator.baseOscLogger.warn(`constructor(): 'initialGain' of value ${initialGain} is outside bounds and will be ignored`);

            if (initialGain < Settings.minOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.minOscGain, this.audioContext.currentTime);
            
            if (initialGain > Settings.maxOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);
        }
    }

    // sets the value of the main gain node
    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            BaseOscillator.baseOscLogger.debug(`setOutputGain(${gain})`);

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime);

            return true; // change was successfull
        }
        else
        {
            BaseOscillator.baseOscLogger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }

    // returns the main gain node
    public outputNode(): GainNode { return this.outputGainNode; }

    // public getGainLfoManager(): LfoManager { return this.gainLfoManager; }

    public getAnalyserGainNode(): GainNode { return this.analyserGainNode; }
}