/* Aknowledgements:
** the noise code is inspired from the following web pages:
**
** https://noisehack.com/generate-noise-web-audio-api/
** https://github.com/meenie/band.js/blob/master/src/instrument-packs/noises.js */

import { Settings } from "../../../../constants/settings";
import { BaseNoiseOscillator } from "../../source/oscillator/noise/base-noise-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class WhiteNoiseOscillator extends BaseNoiseOscillator
{
    private static readonly noiseLogger: Logger<ILogObj> = new Logger({name: "WhiteNoiseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);
    }

    public fillNoiseBuffer(): void
    {
        WhiteNoiseOscillator.noiseLogger.debug("fillNoiseBuffer()");

        for (let i = 0; i < this.noiseBuffer.length; i++)
        {
            this.output[i] = Math.random() * 2 - 1;
        }
    }
}