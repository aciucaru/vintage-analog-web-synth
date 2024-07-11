import { Settings } from "../constants/settings";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "ArpegiatorPanel", minLevel: Settings.minLogLevel });

// callbacks for mixer knobs
export function onToggleOnOff(isToggled: boolean): void
{
    logger.debug("onToggleOnOff():");
}

// callbacks for mixer knobs
export function onToggleRetrigger(isToggled: boolean): void
{
    logger.debug("onToggleRetrigger():");
}

export function onTempoChange(tempo: number): void
{
    logger.debug(`onTempoChange(): new value: ${tempo}`);
}

export function onClockChange(clock: number): void
{
    logger.debug(`onClockChange(): new value: ${clock}`);
}

export function onMinKeysChange(minKeys: number): void
{
    logger.debug(`onMinKeysChange(): new value: ${minKeys}`);
}

export function onOctavesChange(octaves: number): void
{
    logger.debug(`onOctavesChange(): new value: ${octaves}`);
}

export function onUpModeSelect(): void
{
    logger.debug("onUpModeSelect(): up mode selected");
}

export function onDownModeSelect(): void
{
    logger.debug("onDownModeSelect(): down mode selected");
}

export function onUpDownModeSelect(): void
{
    logger.debug("onUpDownModeSelect(): up and down mode selected");
}
