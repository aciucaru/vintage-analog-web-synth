import { Settings } from "../../../../constants/settings";
import { BaseSource } from "../base-source";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";



export class BaseOscillator extends BaseSource
{
    /* the gain node that should be used for drawing the sound (for AnalyserNode)
    ** this gain is always at max. level, so the drawing is full size */
    protected analyserGainNode: GainNode;

    private static readonly baseOscLogger: Logger<ILogObj> = new Logger({name: "BaseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext)
    {
        super(audioContext);
        
        this.analyserGainNode = this.audioContext.createGain();
        this.analyserGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);
    }

    public getAnalyserGainNode(): GainNode { return this.analyserGainNode; }
}