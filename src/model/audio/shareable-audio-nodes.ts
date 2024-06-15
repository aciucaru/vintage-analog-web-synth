import { Settings } from "../../constants/settings";
import { Lfo } from "./modulation/lfo";

export const audioContext = new AudioContext();

export const lfoArray: Array<Lfo> = new Array<Lfo>(Settings.lfoCount);

for (let i = 0; i < lfoArray.length; i++)
{
    lfoArray[i] = new Lfo(audioContext);
}