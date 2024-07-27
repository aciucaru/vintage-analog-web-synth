import { Settings } from "../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* Represents a class that has a main node (ADSR gain, Biquad filter, etc.) that is both
** an input and an output in the audio graph;
** This class contains a method that returs that main node, the 'mainNode()' method; */
export abstract class NoInputBaseAudioNode
{
    protected audioContext: AudioContext;

    private static readonly noInputAudioNodelogger: Logger<ILogObj> = new Logger({name: "NoInputBaseAudioNode", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            NoInputBaseAudioNode.noInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            NoInputBaseAudioNode.noInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");
    }

    /* this is the method that returns the main audio specific to the particular class (ADSR envelope, filter, etc.);
    ** this method should be overriden by any extending class and it must return a node that extends 'AudioNode',
    ** such as 'GainNode' or 'BiquadFilterNode'; */
    public abstract mainNode(): AudioNode;
}