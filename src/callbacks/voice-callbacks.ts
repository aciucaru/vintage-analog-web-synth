import { Settings } from "../constants/settings";
import { voice } from "../model/audio/voice";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "VoicePanel", minLevel: Settings.minLogLevel });

export function onVolumeChange(volume: number): void
{
    logger.debug(`onVolumeChange(): new value: ${volume}`);

    voice.setMainGain(volume);
}

export function onTremoloChange(volume: number): void
{
    logger.debug(`onTremoloChange(): new value: ${volume}`);

    voice.setMainGain(volume);
}

export function onVibratoChange(volume: number): void
{
    logger.debug(`onVibratoChange(): new value: ${volume}`);

    voice.setMainGain(volume);
}

// callbacks for ADSR envelope:
export function onAttackChange(attack: number): void
{
    logger.debug(`onAttackChange(): new value: ${attack}`);

    voice.getAdsrEnvelope().setAttackTime(attack);
}

export function onDecayChange(decay: number): void
{
    logger.debug(`onDecayChange(): new value: ${decay}`);

    voice.getAdsrEnvelope().setDecayTime(decay);
}

export function onSustainChange(sustain: number): void
{
    logger.debug(`onSustainChange(): new value: ${sustain}`);

    voice.getAdsrEnvelope().setSustainLevel(sustain);
}

export function onReleaseChange(release: number): void
{
    logger.debug(`onReleaseChange(): new value: ${release}`);

    voice.getAdsrEnvelope().setReleaseTime(release);
}