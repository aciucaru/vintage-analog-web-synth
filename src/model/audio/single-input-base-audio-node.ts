import { Settings } from "../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* Represents a class that has a complex graph of nodes (more than one node) in order to work properly.
** Because it's hard to know to wich nodes you should connect to when using such a class, this base class
** has two methods: 'inputNode()' and 'outputNode()' that always return the nodes used to connect to this
** class, no matter how complex the graph is between these input and output nodes. */
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
    // public abstract connectInput(inputNode: AudioNode): void;

    /* These are the methods that return the input and output node.
    ** These methods should be overriden by any extending class and they must return a node that extends 'AudioNode',
    ** such as 'GainNode' or 'BiquadFilterNode'; */
    public abstract inputnode(): AudioNode;
    public abstract outputNode(): AudioNode;
}