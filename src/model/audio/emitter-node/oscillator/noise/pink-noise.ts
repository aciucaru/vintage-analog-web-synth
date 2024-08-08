/* Aknowledgements:
** the noise code is inspired from the following web pages:
**
** https://noisehack.com/generate-noise-web-audio-api/
** https://github.com/meenie/band.js/blob/master/src/instrument-packs/noises.js */

import { Settings } from "../../../../../constants/settings";
import { BaseNoiseOscillator } from "./base-noise-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class PinkNoiseOscillator extends BaseNoiseOscillator
{
    private static readonly noiseLogger: Logger<ILogObj> = new Logger({name: "PinkNoiseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);
    }

    public fillNoiseBuffer(): void
    {
        PinkNoiseOscillator.noiseLogger.debug("fillNoiseBuffer()");

        let b0 = 0.0;
        let b1 = 0.0;
        let b2 = 0.0;
        let b3 = 0.0;
        let b4 = 0.0;
        let b5 = 0.0;
        let b6 = 0.0;

        for (let i = 0; i < this.noiseBuffer.length; i++)
        {
            let white = Math.random() * 2 - 1;

            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;

            const gainCompens = 0.11; // (roughly) compensate for gain
            this.output[i] = gainCompens * (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362);

            b6 = white * 0.115926; // update b6
        }
    }
}