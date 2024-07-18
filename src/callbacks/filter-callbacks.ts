import { Settings } from "../constants/settings";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "FilterPanel", minLevel: Settings.minLogLevel });

// filter panel callbacks:
export function onCutoffFreqChange(cutoffFreq: number): void
{
    logger.debug(`onCutoffFreqChange(): new value: ${cutoffFreq}`);

    monoSynth.getVoice().getFilter().setCutoffFrequency(cutoffFreq);
}

export function onResonanceChange(resonance: number): void
{
    logger.debug(`onResonanceChange(): new value: ${resonance}`);
    monoSynth.getVoice().getFilter().setResonance(resonance);
}

export function onKeyTrackingChange(keyTracking: number): void
{
    logger.debug(`onKeyTrackingChange(): new value: ${keyTracking}`);
}

// filter envelope callbacks
export function onAttackChange(attack: number): void
{
    logger.debug(`onAttackChange(): new value: ${attack}`);

    monoSynth.getVoice().getFilter().getAdsrEnvelope().setAttackTime(attack);
}

export function onDecayChange(decay: number): void
{
    logger.debug(`onDecayChange(): new value: ${decay}`);

    monoSynth.getVoice().getFilter().getAdsrEnvelope().setDecayTime(decay);
}

export function onSustainChange(sustain: number): void
{
    logger.debug(`onSustainChange(): new value: ${sustain}`);

    monoSynth.getVoice().getFilter().getAdsrEnvelope().setSustainLevel(sustain);
}

export function onReleaseChange(release: number): void
{
    logger.debug(`onReleaseChange(): new value: ${release}`);

    monoSynth.getVoice().getFilter().getAdsrEnvelope().setReleaseTime(release);
}

export function onEnvelopeAmountChange(envelopeAmount: number): void
{
    logger.debug(`onEnvelopeAmountChange(): new value: ${envelopeAmount}`);
    
    monoSynth.getVoice().getFilter().setEnvelopeAmount(envelopeAmount);
}