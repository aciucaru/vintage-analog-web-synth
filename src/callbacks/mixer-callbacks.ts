import { Settings } from "../constants/settings";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "MixerPanel", minLevel: Settings.minLogLevel });

// callbacks for mixer knobs
export function onOsc1LevelChange(mixLevel: number): void
{
    logger.debug(`onOsc1LevelChange(): new value: ${mixLevel}`);

    // monoSynth.getVoice().getMixer().setOscillator1Level(mixLevel);
    monoSynth.getVoice().getMixer().setOscillatorLevel(Settings.mixerOsc1Index, mixLevel);
}

export function onOsc2LevelChange(mixLevel: number): void
{
    logger.debug(`onOsc2LevelChange(): new value: ${mixLevel}`);

    // monoSynth.getVoice().getMixer().setOscillator2Level(mixLevel);
    monoSynth.getVoice().getMixer().setOscillatorLevel(Settings.mixerOsc2Index, mixLevel);
}

export function onSubOscLevelChange(mixLevel: number): void
{
    logger.debug(`onSubOscLevelChange(): new value: ${mixLevel}`);

    // monoSynth.getVoice().getMixer().setSubOscillatorLevel(mixLevel);
    monoSynth.getVoice().getMixer().setOscillatorLevel(Settings.mixerSubOscIndex, mixLevel);
}

export function onNoiseOscLevelChange(mixLevel: number): void
{
    logger.debug(`onNoiseOscLevelChange(): new value: ${mixLevel}`);

    // monoSynth.getVoice().getMixer().setNoiseOscillatorLevel(mixLevel);
    monoSynth.getVoice().getMixer().setOscillatorLevel(Settings.mixerNoiseOscIndex, mixLevel);
}