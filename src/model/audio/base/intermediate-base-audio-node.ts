import { Settings } from "../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* This represents a custom audio node that has one input node and one output node.
** This is a base class for custom audio nodes that can be connected with other nodes (including Web Audio API nodes).
** In order to avoid duplicate code, this class contains the input and output nodes (which are GainNodes) and
** also the methods to return them.
**
** Any node that wishes to connect to an instance of this class, must connect to this class instance's 'inputGainNode'.
** When we want to connect an instance of this class to other nodes, we use the 'outputGainNode' of this class to
** connect to external nodes.
**
** Classes that inherit from this base class usually have a complex graph of nodes (usually more than one node)
** in order to work properly. All those nodes are between 'unputGainNode' and 'outputGainNode'. */
export class IntermediateBaseAudioNode
{
    protected audioContext: AudioContext;

    // the node to wich inputs are connected with this filter
    protected inputGainNode: GainNode;

    // the output node, this is the sound resulting from this class
    protected outputGainNode: GainNode;

    private static readonly singleInputAudioNodelogger: Logger<ILogObj> = new Logger({name: "SingleInputBaseAudioNode", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            IntermediateBaseAudioNode.singleInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            IntermediateBaseAudioNode.singleInputAudioNodelogger.warn("constructor(): audioContext is null, separate audioContext was created");

        this.inputGainNode = this.audioContext.createGain();
        this.inputGainNode.gain.setValueAtTime(Settings.inputGain, this.audioContext.currentTime);

        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.outputGain, this.audioContext.currentTime);
    }

    // these are the methods that return the input and output node
    public inputNode(): GainNode { return this.inputGainNode; }
    public outputNode(): GainNode { return this.outputGainNode; }
}