/* Aknowledgements:
** the noise code is inspired from the following web pages:
**
** https://noisehack.com/generate-noise-web-audio-api/
** https://github.com/meenie/band.js/blob/master/src/instrument-packs/noises.js */

import { Settings } from "../../../../constants/settings";
import { BaseNoiseOscillator } from "../../source/oscillator/noise/base-noise-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class BrownNoiseOscillator extends BaseNoiseOscillator
{
    private static readonly noiseLogger: Logger<ILogObj> = new Logger({name: "BrownNoiseOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);
    }

    public fillNoiseBuffer(): void
    {
        BrownNoiseOscillator.noiseLogger.debug("fillNoiseBuffer()");

        let lastOut = 0.0;
        for (let i = 0; i < this.noiseBuffer.length; i++)
        {
            const white = Math.random() * 2 - 1;

            this.output[i] = (lastOut + 0.02 * white) / 1.02;

            lastOut = this.output[i];
            
            this.output[i] *= 3.5;
        }
    }
}