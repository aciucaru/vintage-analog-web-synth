/* Aknowledgements:
** the noise code is inspired from the following web pages:
**
** https://noisehack.com/generate-noise-web-audio-api/
** https://github.com/meenie/band.js/blob/master/src/instrument-packs/noises.js */

import { Settings } from "../../../../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

// base class for all custom noise oscillators
export abstract class BaseNoiseOscillator
{
    protected audioContext: AudioContext = new AudioContext();

    private noiseOsc: AudioBufferSourceNode;
    protected noiseBuffer: AudioBuffer;
    protected output: Float32Array;

    private outputGainNode: GainNode;

    private static readonly NOISE_DURATION = 2; // the duration of the noise, in seconds

    private static readonly logger: Logger<ILogObj> = new Logger({name: "NoiseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        if (audioContext !== undefined)
            this.audioContext = audioContext;
        else
        {
            BaseNoiseOscillator.logger.warn("constructor(): audioContext is null, separate audioContext was created");
            this.audioContext = new AudioContext();
        }

        if (audioContext === null)
            BaseNoiseOscillator.logger.warn("constructor(): audioContext is null, separate audioContext was created");

        const bufferSize = BaseNoiseOscillator.NOISE_DURATION * this.audioContext.sampleRate;
        this.noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        this.output = this.noiseBuffer.getChannelData(0);

        this.outputGainNode = this.audioContext.createGain();
        
        this.noiseOsc = this.audioContext.createBufferSource();

        this.outputGainNode = this.audioContext.createGain();
        // set the main output gain node's value
        if (Settings.minOscGain <= initialGain && initialGain <= Settings.maxOscGain)
            this.outputGainNode.gain.setValueAtTime(initialGain, this.audioContext.currentTime);
        else
        {
            BaseNoiseOscillator.logger.warn(`constructor(): initial gain of value ${initialGain} is outside bounds`);

            if (initialGain < Settings.minOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.minOscGain, this.audioContext.currentTime);
            
            if (initialGain > Settings.maxOscGain)
                this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);
        }

        this.noiseOsc.connect(this.outputGainNode);
    }

    public setOutputGain(gain: number): boolean
    {
        if (Settings.minOscGain <= gain && gain <= Settings.maxOscGain)
        {
            BaseNoiseOscillator.logger.debug(`setOutputGain(${gain})`);

            // set the new value
            this.outputGainNode.gain.linearRampToValueAtTime(gain, this.audioContext.currentTime);

            return true; // change was successfull
        }
        else
        {
            BaseNoiseOscillator.logger.warn(`setOutputGain(${gain}): value outside bounds`);

            return false; // change was not successfull
        }
    }

    public outputNode(): GainNode { return this.outputGainNode; }

    /* this method is supposed to fill the buffer with a specific noise (white, pink or brown);
    ** this method should be overriden by the extending class that implements a specific type of noise;
    ** this method is called inside the 'start()' method, which should be called by the user in order to
    ** fill the noise buffer with custom noise and also start the noise oscillator */
    protected abstract fillNoiseBuffer(): void;

    /* this method makes shure that the noise buffer has am amplitude of 1.0, it basicaly scales values up or down
    ** so that the noise buffer overall has an amplitude of 1.0;
    ** it's useful to make shure that any type of noise has the same gain level; */
    private normalizeNoiseBuffer(): void
    {
        const min = Math.min(...this.output);
        const max = Math.max(...this.output);

        // the real maximum is the maximum between the absolute values of 'min' and 'max'
        const absoluteMax = Math.max(Math.abs(min), Math.abs(max));

        // the scale factor is in such a way that it turns the maximum value into 1.0 (or -1.0)
        const scaleFactor = 1.0 / absoluteMax - Number.EPSILON;

        BaseNoiseOscillator.logger.warn(`normalizeNoiseBuffer(): absoluteMax=${absoluteMax}, scaleFactor=${scaleFactor}`);

        // apply normalization to all values of the noise buffer
        for (let i = 0; i < this.noiseBuffer.length; i++)
        {
            this.output[i] *= scaleFactor;
        }
    }

    public start(): void
    {
        BaseNoiseOscillator.logger.debug("start()");

        this.fillNoiseBuffer();
        this.normalizeNoiseBuffer();

        this.noiseOsc.buffer = this.noiseBuffer;
        this.noiseOsc.loop = true;
        this.noiseOsc.start();
    }
}