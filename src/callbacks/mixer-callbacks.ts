import { Settings } from "../constants/settings";
import { voice } from "../model/audio/voice";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "MixerPanel", minLevel: Settings.minLogLevel });

// callbacks for mixer knobs
export function onOsc1LevelChange(mixLevel: number): void
{
    logger.debug(`onOsc1LevelChange(): new value: ${mixLevel}`);

    voice.getMixer().setOscillator1Level(mixLevel);
}

export function onOsc2LevelChange(mixLevel: number): void
{
    logger.debug(`onOsc2LevelChange(): new value: ${mixLevel}`);

    voice.getMixer().setOscillator2Level(mixLevel);
}

export function onSubOscLevelChange(mixLevel: number): void
{
    logger.debug(`onSubOscLevelChange(): new value: ${mixLevel}`);

    voice.getMixer().setSubOscillatorLevel(mixLevel);
}

export function onNoiseOscLevelChange(mixLevel: number): void
{
    logger.debug(`onNoiseOscLevelChange(): new value: ${mixLevel}`);

    voice.getMixer().setNoiseOscillatorLevel(mixLevel);
}