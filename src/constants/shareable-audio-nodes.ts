import { Settings } from "./settings";
import { UnipolarLfo } from "../model/audio/emitter-node/modulators/unipolar-lfo";

export const audioContext = new AudioContext();

const lfoArray: Array<UnipolarLfo> = new Array<UnipolarLfo>(Settings.lfoCount);

for (let i = 0; i < lfoArray.length; i++)
{
    lfoArray[i] = new UnipolarLfo(audioContext);
    lfoArray[i].setFrequency(Settings.defaultLfoLowAbsoluteFrequency);
}