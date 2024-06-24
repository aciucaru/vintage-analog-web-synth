import { Settings } from "./settings";
import { UnipolarLfo } from "../model/audio/modulation/unipolar-lfo";

export const audioContext = new AudioContext();

export const lfoArray: Array<UnipolarLfo> = new Array<UnipolarLfo>(Settings.lfoCount);

for (let i = 0; i < lfoArray.length; i++)
{
    lfoArray[i] = new UnipolarLfo(audioContext);
    lfoArray[i].setFrequency(20);
}