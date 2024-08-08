import { Settings } from "../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* This class represent the base class of all sources/emitters of signal.
** An emitter is a node that only has outputs but no inputs. Because it has only one output (ore more),
** it is considered an emitter of signal, but never a receiver.
**
** Even if such a class does not have inputs, it could have modulators, such as an LFO (which is also considered
** an emitter of signal).
**
** Classes that inherit this class are oscillators, LFOs, ADSR envelopes and other emitters of signal. */
export class BaseEmitterNode
{
    /* the audio context used to create and connect nodes;
    ** must be supplied from outside the class */
    protected audioContext: AudioContext;

    // the final output of the oscillator; this is used to connect the oscillator to other nodes
    protected outputGainNode: GainNode;

    private static readonly baseEmitterLogger: Logger<ILogObj> = new Logger({name: "BaseEmitterNode", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        this.audioContext = audioContext;

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.baseSourceDefaultGain, this.audioContext.currentTime);
    }

    // returns the main gain node
    public outputNode(): GainNode { return this.outputGainNode; }

    // sets the gain of the oscillator
    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            BaseEmitterNode.baseEmitterLogger.debug(`setOutputGain(${gain})`);

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime);
            return true; // change was successfull
        }
        else
        {
            BaseEmitterNode.baseEmitterLogger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }
}