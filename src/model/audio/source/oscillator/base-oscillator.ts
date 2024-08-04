import { Settings } from "../../../../constants/settings";
import type { AnalysableNode } from "../../base/base-analizable-node";
import { BaseSource } from "../base-source";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";



export class BaseOscillator extends BaseSource implements AnalysableNode
{
    /* the gain node that should be used for drawing the sound (for AnalyserNode);
    ** this property is inherided from 'AnalysableNode' interface */
    public analyserGainNode: GainNode;

    private static readonly baseOscLogger: Logger<ILogObj> = new Logger({name: "BaseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);
        
        this.analyserGainNode = this.audioContext.createGain();
        this.analyserGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);
    }

    /* return the gain node that should be used for drawing the sound (for AnalyserNode);
    ** this property is inherided from 'AnalysableNode' interface */
    public getAnalyserGainNode(): GainNode { return this.analyserGainNode; }
}