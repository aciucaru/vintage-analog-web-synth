import { Settings } from "../constants/settings";
import { NoiseType } from "../model/audio/oscillator/noise/multi-noise-oscillator";
import { voice } from "../model/audio/voice";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "OscillatorPanel", minLevel: Settings.minLogLevel });

// oscillator 1 callbacks *********************************************************************
export function onOsc1TriangleSelect(isToggled: boolean): void
{
    logger.debug("onTriangleSelect(): triangle shape selected");

    voice.getUnisonOscillator1().toggleGlobalTriangleShape();
}

export function onOsc1SawSelect(isToggled: boolean): void
{
    logger.debug("onSawSelect(): saw shape selected");

    voice.getUnisonOscillator1().toggleGlobalSawShape();
}

export function onOsc1PulseSelect(isToggled: boolean): void
{
    logger.debug("onPulseSelect(): square shape selected");

    voice.getUnisonOscillator1().toggleGlobalSquareShape();
}

export function onOsc1OctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onOctavesOffsetChange(): new value: ${octavesOffset}`);

    voice.getUnisonOscillator1().setOctavesOffset(octavesOffset);
}

export function onOsc1SemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    voice.getUnisonOscillator1().setSemitonesOffset(semitonesOffset);
}

export function onOsc1CentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onCentsOffsetChange(): new value: ${centsOffset}`);

    voice.getUnisonOscillator1().setCentsOffset(centsOffset);
}

export function onOsc1DetuneChange(unisonCentsDetune: number): void
{
    logger.debug(`onDetuneChange(): new value: ${unisonCentsDetune}`);

    voice.getUnisonOscillator1().setUnisonDetune(unisonCentsDetune);
}

export function onOsc1BlendChange(unisonBlend: number): void
{
    logger.debug(`onBlendChange(): new value: ${unisonBlend}`);

    voice.getUnisonOscillator1().setUnisonBlend(unisonBlend);
}

export function onOsc1PulseWidthChange(pulseWidth: number): void
{
    logger.debug(`onPulseWidthChange(): new value: ${pulseWidth}`);

    voice.getUnisonOscillator1().setPulseWidth(pulseWidth);
}


// oscillator 2 callbacks **************************************************************************
export function onOsc2TriangleSelect(isToggled: boolean): void
{
    logger.debug("onTriangleSelect(): triangle shape selected");

    voice.getUnisonOscillator2().toggleGlobalTriangleShape();
}

export function onOsc2SawSelect(isToggled: boolean): void
{
    logger.debug("onSawSelect(): saw shape selected");

    voice.getUnisonOscillator2().toggleGlobalSawShape();
}

export function onOsc2PulseSelect(isToggled: boolean): void
{
    logger.debug("onPulseSelect(): square shape selected");

    voice.getUnisonOscillator2().toggleGlobalSquareShape();
}


export function onOsc2OctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onOctavesOffsetChange(): new value: ${octavesOffset}`);

    voice.getUnisonOscillator2().setOctavesOffset(octavesOffset);
}

export function onOsc2SemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    voice.getUnisonOscillator2().setSemitonesOffset(semitonesOffset);
}

export function onOsc2CentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onCentsOffsetChange(): new value: ${centsOffset}`);

    voice.getUnisonOscillator2().setCentsOffset(centsOffset);
}

export function onOsc2DetuneChange(unisonCentsDetune: number): void
{
    logger.debug(`onDetuneChange(): new value: ${unisonCentsDetune}`);

    voice.getUnisonOscillator2().setUnisonDetune(unisonCentsDetune);
}

export function onOsc2BlendChange(unisonBlend: number): void
{
    logger.debug(`onBlendChange(): new value: ${unisonBlend}`);

    voice.getUnisonOscillator2().setUnisonBlend(unisonBlend);
}

export function onOsc2PulseWidthChange(pulseWidth: number): void
{
    logger.debug(`onPulseWidthChange(): new value: ${pulseWidth}`);

    voice.getUnisonOscillator2().setPulseWidth(pulseWidth);
}


// sub oscillator callbacks *********************************************************************
export function onSubOscOctavesOffsetChange(octavesOffset: number): void
{
    logger.debug(`onSubOscOctavesOffsetChange(): new value: ${octavesOffset}`);

    voice.getSubOscillator().setOctavesOffset(octavesOffset);
}

export function onSubOscSemitonesOffsetChange(semitonesOffset: number): void
{
    logger.debug(`onSubOscSemitonesOffsetChange(): new value: ${semitonesOffset}`);

    voice.getSubOscillator().setSemitonesOffset(semitonesOffset);
}

export function onSubOscCentsOffsetChange(centsOffset: number): void
{
    logger.debug(`onSubOscCentsOffsetChange(): new value: ${centsOffset}`);

    voice.getSubOscillator().setCentsOffset(centsOffset);
}


// noise oscillator callbacks and data ****************************************************************************************
export function onWhiteNoiseSelect(): void
{
    logger.debug("onWhiteNoiseSelect(): white noise selected");

    voice.getNoiseOscillator().setNoiseType(NoiseType.White);
}

export function onPinkNoiseSelect(): void
{
    logger.debug("onPinkNoiseSelect(): pink noise selected");

    voice.getNoiseOscillator().setNoiseType(NoiseType.Pink);
}

export function onBrownNoiseSelect(): void
{
    logger.debug("onBrownNoiseSelect(): brown noise selected");

    voice.getNoiseOscillator().setNoiseType(NoiseType.Brown);
}

export function onNoiseKeyTrack(keyTrackingLevel: number): void
{
    logger.debug(`onNoiseKeyTrack(): new value: ${keyTrackingLevel}`);

    voice.getNoiseOscillator().setKeyTrackingLevel(keyTrackingLevel);
}
