import { Settings } from "../constants/settings";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "EffectsPanel", minLevel: Settings.minLogLevel });

// distortion effect callback *****************************************************************************
export function onDistortionEffectToggle(isToggled: boolean): void
{
    logger.debug("onDistortionEffectToggle()");

    monoSynth.getDistortionEffect().toggleEffect();
}

export function onDistortionEffectAmountChange(effectAmount: number): void
{
    logger.debug(`onDistortionEffectAmountChange(): new value: ${effectAmount}`);

    monoSynth.getDistortionEffect().setEffectAmount(effectAmount);
}

export function onDistortionAmountChange(amount: number): void
{
    logger.debug(`onDistortionAmountChange(): new value: ${amount}`);

    monoSynth.getDistortionEffect().setDistortionAmount(amount);
}

export function onDistortionCurveAngleChange(curveAngle: number): void
{
    logger.debug(`onDistortionAngleChange(): new value: ${curveAngle}`);

    monoSynth.getDistortionEffect().setDistortionCurveAngle(curveAngle);
}

export function onDistortionCurveConstantValueChange(curveConstantValue: number): void
{
    logger.debug(`onDistortionAngleChange(): new value: ${curveConstantValue}`);

    monoSynth.getDistortionEffect().setDistortionCurveConstantValue(curveConstantValue);
}


// delay effect callback *****************************************************************************
export function onDelayEffectToggle(isToggled: boolean): void
{
    logger.debug("onDelayEffectToggle()");

    monoSynth.getDelayEffect().toggleEffect();
}

export function onDelayEffectAmountChange(effectAmount: number): void
{
    logger.debug(`onDelayWetDryLevelChange(): new value: ${effectAmount}`);

    monoSynth.getDelayEffect().setEffectAmount(effectAmount);
}

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


// reverb effect callback *****************************************************************************
export function onReverbEffectToggle(isToggled: boolean): void
{
    logger.debug("onDelayEffectToggle()");

    monoSynth.getReverbEffect().toggleEffect();
}

export function onReverbEffectAmountChange(effectAmount: number): void
{
    logger.debug(`onDelayWetDryLevelChange(): new value: ${effectAmount}`);

    monoSynth.getReverbEffect().setEffectAmount(effectAmount);
}

export function onReverbDecayChange(decayRate: number): void
{
    logger.debug(`onDelayTimeChange(): new value: ${decayRate}`);

    monoSynth.getReverbEffect().setDecayRate(decayRate);
}


// compressor effect callback *****************************************************************************
export function onCompressorEffectToggle(isToggled: boolean): void
{
    logger.debug("onCompressorEffectToggle()");

    monoSynth.getCompressorEffect().toggleEffect();
}

export function onCompressorThresholdChange(threshold: number): void
{
    logger.debug(`onCompressorThresholdChange(): new value: ${threshold}`);

    monoSynth.getCompressorEffect().setThreshold(threshold);
}

export function onCompressorKneeChange(knee: number): void
{
    logger.debug(`onCompressorKneeChange(): new value: ${knee}`);

    monoSynth.getCompressorEffect().setKnee(knee);
}

export function onCompressorRatioChange(ratio: number): void
{
    logger.debug(`onCompressorRatioChange(): new value: ${ratio}`);

    monoSynth.getCompressorEffect().setRatio(ratio);
}

export function onCompressorAttackChange(attack: number): void
{
    logger.debug(`onCompressorAttackChange(): new value: ${attack}`);

    monoSynth.getCompressorEffect().setAttack(attack);
}

export function onCompressorReleaseChange(release: number): void
{
    logger.debug(`onCompressorRelease Change(): new value: ${release}`);

    monoSynth.getCompressorEffect().setRelease(release);
}