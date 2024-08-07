import { Settings } from "../constants/settings";
import { NoiseType } from "../model/audio/source-node/oscillator/noise/multi-noise-oscillator";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "OscillatorPanel", minLevel: Settings.minLogLevel });

// oscillator 1 callbacks *********************************************************************
export function onOsc1TriangleSelect(isToggled: boolean): void
{
    logger.debug("onTriangleSelect(): triangle shape selected");

    monoSynth.getVoice().getMultiShapeOscillator1().toggleTriangleShape();
}

export function onOsc1SawSelect(isToggled: boolean): void
{
    logger.debug("onSawSelect(): saw shape selected");

    monoSynth.getVoice().getMultiShapeOscillator1().toggleSawShape();
}

export function onOsc1PulseSelect(isToggled: boolean): void
{
    logger.debug("onPulseSelect(): square shape selected");

    monoSynth.getVoice().getMultiShapeOscillator1().togglePulseShape();
}

export function onOsc1OctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onOctavesOffsetChange(): new value: ${octavesOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator1().setOctavesOffset(octavesOffset);
}

export function onOsc1SemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator1().setSemitonesOffset(semitonesOffset);
}

export function onOsc1CentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onCentsOffsetChange(): new value: ${centsOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator1().setCentsOffset(centsOffset);
}

export function onOsc1DetuneChange(unisonCentsDetune: number): void
{
    logger.debug(`onDetuneChange(): new value: ${unisonCentsDetune}`);

    monoSynth.getVoice().getMultiShapeOscillator1().setUnisonDetune(unisonCentsDetune);
}

export function onOsc1PulseWidthChange(pulseWidth: number): void
{
    logger.debug(`onPulseWidthChange(): new value: ${pulseWidth}`);

    monoSynth.getVoice().getMultiShapeOscillator1().setPulseWidth(pulseWidth);
}


// oscillator 2 callbacks **************************************************************************
export function onOsc2TriangleSelect(isToggled: boolean): void
{
    logger.debug("onTriangleSelect(): triangle shape selected");

    monoSynth.getVoice().getMultiShapeOscillator2().toggleTriangleShape();
}

export function onOsc2SawSelect(isToggled: boolean): void
{
    logger.debug("onSawSelect(): saw shape selected");

    monoSynth.getVoice().getMultiShapeOscillator2().toggleSawShape();
}

export function onOsc2PulseSelect(isToggled: boolean): void
{
    logger.debug("onPulseSelect(): square shape selected");

    monoSynth.getVoice().getMultiShapeOscillator2().togglePulseShape();
}


export function onOsc2OctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onOctavesOffsetChange(): new value: ${octavesOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator2().setOctavesOffset(octavesOffset);
}

export function onOsc2SemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator2().setSemitonesOffset(semitonesOffset);
}

export function onOsc2CentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onCentsOffsetChange(): new value: ${centsOffset}`);

    monoSynth.getVoice().getMultiShapeOscillator2().setCentsOffset(centsOffset);
}

export function onOsc2DetuneChange(unisonCentsDetune: number): void
{
    logger.debug(`onDetuneChange(): new value: ${unisonCentsDetune}`);

    monoSynth.getVoice().getMultiShapeOscillator2().setUnisonDetune(unisonCentsDetune);
}

export function onOsc2PulseWidthChange(pulseWidth: number): void
{
    logger.debug(`onPulseWidthChange(): new value: ${pulseWidth}`);

    monoSynth.getVoice().getMultiShapeOscillator2().setPulseWidth(pulseWidth);
}


// sub oscillator callbacks *********************************************************************
export function onSubOscOctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onSubOscOctavesOffsetChange(): new value: ${octavesOffset}`);

    monoSynth.getVoice().getSubOscillator().setOctavesOffset(octavesOffset);
}

export function onSubOscSemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSubOscSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    monoSynth.getVoice().getSubOscillator().setSemitonesOffset(semitonesOffset);
}

export function onSubOscCentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onSubOscCentsOffsetChange(): new value: ${centsOffset}`);

    monoSynth.getVoice().getSubOscillator().setCentsOffset(centsOffset);
}


// noise oscillator callbacks and data ****************************************************************************************
export function onWhiteNoiseSelect(): void
{
    logger.debug("onWhiteNoiseSelect(): white noise selected");

    monoSynth.getVoice().getNoiseOscillator().setNoiseType(NoiseType.White);
}

export function onPinkNoiseSelect(): void
{
    logger.debug("onPinkNoiseSelect(): pink noise selected");

    monoSynth.getVoice().getNoiseOscillator().setNoiseType(NoiseType.Pink);
}

export function onBrownNoiseSelect(): void
{
    logger.debug("onBrownNoiseSelect(): brown noise selected");

    monoSynth.getVoice().getNoiseOscillator().setNoiseType(NoiseType.Brown);
}
