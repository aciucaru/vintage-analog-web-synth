import { Settings } from "../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* This class represent the base class of all sources.
** A source is a node that only has outputs but no inputs. Because it has only one output (ore more),
** it is considered a source.
**
** Even if such a class does not have inputs, it could have modulators, such as an LFO (which is also considered
** a source of signal).
**
** Classes that inherit this class are oscillators, LFOs, ADSR envelopes and other source of signal. */
export class BaseSource
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    protected audioContext: AudioContext;

    /* the gain node that should be used for drawing the sound (for AnalyserNode)
    ** this gain is always at max. level, so the drawing is full size */
    protected analyserGainNode: GainNode;

    // the final output of the oscillator; this is used to connect the oscillator to other nodes
    protected outputGainNode: GainNode;

    private static readonly baseOscLogger: Logger<ILogObj> = new Logger({name: "BaseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            BaseSource.baseOscLogger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            BaseSource.baseOscLogger.warn("constructor(): audioContext is null, separate audioContext was created");

        this.analyserGainNode = this.audioContext.createGain();
        this.analyserGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.defaultOscGain, this.audioContext.currentTime);
    }

    // returns the main gain node
    public outputNode(): GainNode { return this.outputGainNode; }

    // sets the gain of the oscillator
    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            BaseSource.baseOscLogger.debug(`setOutputGain(${gain})`);

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime);
            return true; // change was successfull
        }
        else
        {
            BaseSource.baseOscLogger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }

    public getAnalyserGainNode(): GainNode { return this.analyserGainNode; }
}