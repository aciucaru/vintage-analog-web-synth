import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

// export enum FrequencyType
// {
//     AbsoluteFrequency = "AbsoluteFrequency",
//     BarDivisions4by4 = "BarDivisions4by4"
// }

export enum LfoShape
{
    Triangle = "Triangle",
    Sawtooth = "Sawtooth",
    Square = "Square"
}

/* Low frequency oscillator implementation, this LFO is always unipolar and positive (it oscillates between 0 and 1).
** This class is basically an oscilator that goes on no matter if it is modulating one or more parameters.
** The class that represents an LFO that is actually connected to a synth parameter is called ShareableUnipolarOscillator,
** which can be turned on or off through the LfoManager class, which manages multiple LFOs that can modulate the same
** parameter (these LFOs can be enabled or disabled/muted at any time). */
export class UnipolarLfo extends BaseAudioNode
{
    // the LFO oscillator (oscillates between -1 and 1)
    private lfoOscillator: OscillatorNode;

    /* A constant node of gain 1, which will turn the previous oscillator into a positive unipolar oscillator,
    ** that will oscillate between 0 and 2. IMPORTANT: the value (offset) of this node should always be 1, so it always
    ** send the value 1! */
    private constantOscillator: ConstantSourceNode;

    /* this node adds (merges) the 'lfoOscillator' and 'constantOscillator' togheter in order to obtain an oscillator
    ** that will oscillate between 0 and 2. In order to obtain the expected oscillation between 0 and 1, the gain of this
    ** oscillator SHOULD ALWAYS BE 0.5, so the end result oscillates between 0.5*0 and 0.5*2 (e.g. between 0 and 1). */
    private mergerGainNode: GainNode;

    // the absolute frequency of the LFO, in Hz
    private absoluteFrequency: number = Settings.defaultLfoAbsoluteFrequency;

    private static readonly CONSTANT_OSCILLATOR_OFFSET = 1;
    private static readonly MERGER_GAIN_NODE_GAIN = 0.5;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "UnipolarLfo", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.lfoOscillator = this.audioContext.createOscillator();
        this.lfoOscillator.type = "triangle"; // acceptable values are: triangle, saw, square (no sine)
        this.lfoOscillator.frequency.setValueAtTime(this.absoluteFrequency, this.audioContext.currentTime);

        this.constantOscillator = this.audioContext.createConstantSource();
        this.constantOscillator.offset.setValueAtTime(UnipolarLfo.CONSTANT_OSCILLATOR_OFFSET, this.audioContext.currentTime);

        this.mergerGainNode = this.audioContext.createGain();
        this.mergerGainNode.gain.setValueAtTime(UnipolarLfo.MERGER_GAIN_NODE_GAIN, this.audioContext.currentTime);

        // connect oscillator and constant source to the gain
        this.lfoOscillator.connect(this.mergerGainNode);
        this.constantOscillator.connect(this.mergerGainNode);

        // start the nodes
        this.lfoOscillator.start();
        this.constantOscillator.start();
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.mergerGainNode; }

    public setShape(shape: LfoShape): void
    {
        UnipolarLfo.logger.debug(`setShape(${shape})`);

        switch(shape)
        {
            case LfoShape.Triangle: this.lfoOscillator.type = "triangle"; break;

            case LfoShape.Sawtooth: this.lfoOscillator.type = "sawtooth"; break;

            case LfoShape.Square: this.lfoOscillator.type = "square"; break;

            default: break;
        }
    }

    // sets the absolute frequency of the LFO, in Hz
    public setFrequency(freq: number): boolean
    {
        if (Settings.minLfoAbsoluteFrequency <= freq && freq <= Settings.maxLfoAbsoluteFrequency)
        {
            UnipolarLfo.logger.debug(`setFrequency(${freq})`);

            this.absoluteFrequency = freq;  // set the new value

            // assign the newly recomputed frequency to the LFO oscillator
            this.lfoOscillator.frequency.linearRampToValueAtTime(freq, this.audioContext.currentTime);

            return true; // change was succesfull
        }
        else
        {
            UnipolarLfo.logger.warn(`setFrequency(${freq}): value is outside bounds`);
            return false; // change was not succesfull
        }
    }
}