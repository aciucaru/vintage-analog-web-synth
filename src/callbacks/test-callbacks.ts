import { Settings } from "../constants/settings";
import { NoiseType } from "../model/audio/oscillator/noise/multi-noise-oscillator";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "OscillatorPanel", minLevel: Settings.minLogLevel });

// oscillator 1 callbacks *********************************************************************
export function onTestOscTriangleSelect(isToggled: boolean): void
{
    logger.debug("onTriangleSelect(): triangle shape selected");

    monoSynth.getTestVoice().getMultiShapeOscillator().toggleTriangleShape();
}

export function onTestOscSawSelect(isToggled: boolean): void
{
    logger.debug("onSawSelect(): saw shape selected");

    monoSynth.getTestVoice().getMultiShapeOscillator().toggleSawShape();
}

export function onTestOscPulseSelect(isToggled: boolean): void
{
    logger.debug("onPulseSelect(): square shape selected");

    monoSynth.getTestVoice().getMultiShapeOscillator().togglePulseShape();
}

export function onTestOscOctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onOctavesOffsetChange(): new value: ${octavesOffset}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setOctavesOffset(octavesOffset);
}

export function onTestOscSemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setSemitonesOffset(semitonesOffset);
}

export function onTestOscCentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onCentsOffsetChange(): new value: ${centsOffset}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setCentsOffset(centsOffset);
}

export function onTestOscDetuneChange(unisonCentsDetune: number): void
{
    logger.debug(`onDetuneChange(): new value: ${unisonCentsDetune}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setUnisonDetune(unisonCentsDetune);
}

export function onTestOscPulseWidthChange(pulseWidth: number): void
{
    logger.debug(`onPulseWidthChange(): new value: ${pulseWidth}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setPulseWidth(pulseWidth);
}

export function onTestOscLevelChange(oscGain: number): void
{
    logger.debug(`onOsc1LevelChange(): new value: ${oscGain}`);

    monoSynth.getTestVoice().getMultiShapeOscillator().setOutputGain(oscGain);
}


// filter callbacks *********************************************************************************
export function onTestCutoffFreqChange(cutoffFreq: number): void
{
    logger.debug(`onCutoffFreqChange(): new value: ${cutoffFreq}`);

    monoSynth.getTestVoice().getFilter().setCutoffFrequency(cutoffFreq);
}

export function onTestResonanceChange(resonance: number): void
{
    logger.debug(`onResonanceChange(): new value: ${resonance}`);
    monoSynth.getTestVoice().getFilter().setResonance(resonance);
}
