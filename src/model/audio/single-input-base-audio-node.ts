import { Settings } from "../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* Represents a class that has a main node (ADSR gain, Biquad filter, etc.) that is both
** an input and an output in the audio graph;
** This class contains a method that returs that main node, the 'mainNode()' method; */
export abstract class SingleInputBaseAudioNode
{
    protected audioContext: AudioContext;

    private static readonly singleInputAudioNodelogger: Logger<ILogObj> = new Logger({name: "SingleInputBaseAudioNode", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            SingleInputBaseAudioNode.singleInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            SingleInputBaseAudioNode.singleInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");
    }

    // this method connect the input audio node to this audio node
    public abstract connectInput(inputNode: AudioNode): void; 

    /* this is the method that returns the output node;
    ** this method should be overriden by any extending class and it must return a node that extends 'AudioNode',
    ** such as 'GainNode' or 'BiquadFilterNode'; */
    public abstract outputNode(): AudioNode;
}