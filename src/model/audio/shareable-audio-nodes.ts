import { Settings } from "../../constants/settings";
import { UnipolarLfo } from "./modulation/unipolar-lfo";

export const audioContext = new AudioContext();

export const lfoArray: Array<UnipolarLfo> = new Array<UnipolarLfo>(Settings.lfoCount);

for (let i = 0; i < lfoArray.length; i++)
{
    lfoArray[i] = new UnipolarLfo(audioContext);
}