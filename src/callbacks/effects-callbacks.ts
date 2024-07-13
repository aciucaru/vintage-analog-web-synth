import { Settings } from "../constants/settings";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "EffectsPanel", minLevel: Settings.minLogLevel });

export function onDelayTimeChange(delayTime: number): void
{
    logger.debug(`onDelayTimeChange(): new value: ${delayTime}`);

    monoSynth.getDelayEffect().setDelayTime(delayTime);
}

export function onDelayFeedbackLevelChange(feedbackLevel: number): void
{
    logger.debug(`onDelayFeedbackLevelChange(): new value: ${feedbackLevel}`);

    monoSynth.getDelayEffect().setFeedbackLevel(feedbackLevel);
}

export function onDelayEffectAmountChange(effectAmount: number): void
{
    logger.debug(`onDelayWetDryLevelChange(): new value: ${effectAmount}`);

    monoSynth.getDelayEffect().setEffectAmount(effectAmount);
}