import { Settings } from "../constants/settings";
import { monoSynth } from "../model/audio/synth";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger({name: "LfoMatrixPanel", minLevel: Settings.minLogLevel });

// Oscillator 1 callbacks ****************************************************************************
// callbacks for Oscillator 1 frequency **************************************************************
export function onOscillator1FreqLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator1FreqLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator1FreqLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator1FreqLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator1FreqLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator1FreqLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 1 amplitude **************************************************************
export function onOscillator1AmpLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator1AmpLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator1AmpLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator1AmpLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator1AmpLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator1AmpLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 1 pulse width **************************************************************
export function onOscillator1PulseWidthLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator1PulseWidthLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator1PulseWidthLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator1PulseWidthLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator1PulseWidthLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator1PulseWidthLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 1 unison **************************************************************
export function onOscillator1UnisonDetuneLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator1UnisonDetuneLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator1UnisonDetuneLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator1UnisonDetuneLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator1UnisonDetuneLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator1UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
}


// Oscillator 2 callbacks ****************************************************************************
// callbacks for Oscillator 2 frequency **************************************************************
export function onOscillator2FreqLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator2FreqLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator2FreqLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator2FreqLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator2FreqLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator2FreqLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 2 amplitude **************************************************************
export function onOscillator2AmpLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator2AmpLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator2AmpLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator2AmpLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator2AmpLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator2AmpLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 2 pulse width **************************************************************
export function onOscillator2PulseWidthLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator2PulseWidthLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator2PulseWidthLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator2PulseWidthLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator2PulseWidthLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator2PulseWidthLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Oscillator 2 unison **************************************************************
export function onOscillator2UnisonDetuneLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
}

export function onOscillator2UnisonDetuneLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
}

export function onOscillator2UnisonDetuneLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
}

export function onOscillator2UnisonDetuneLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
}

export function onOscillator2UnisonDetuneLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
}

export function onOscillator2UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
}


// Sub Oscillator callbacks ****************************************************************************
// callbacks for Sub oscillator frequency **************************************************************
export function onSubOscillatorFreqLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(0);
}

export function onSubOscillatorFreqLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(1);
}

export function onSubOscillatorFreqLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(2);
}

export function onSubOscillatorFreqLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(3);
}

export function onSubOscillatorFreqLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(4);
}

export function onSubOscillatorFreqLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getSubOscillator().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
}


// callbacks for Sub oscillator amplitude **************************************************************
export function onSubOscillatorAmpLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(0);
}

export function onSubOscillatorAmpLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(1);
}

export function onSubOscillatorAmpLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(2);
}

export function onSubOscillatorAmpLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(3);
}

export function onSubOscillatorAmpLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(4);
}

export function onSubOscillatorAmpLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getSubOscillator().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
}



// Filter callbacks ****************************************************************************
// *********************************************************************************************
// callbacks for Filter cutoff frequency **************************************************************
export function onLowPassFilterCutoffFreqLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(0);
}

export function onLowPassFilterCutoffFreqLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(1);
}

export function onLowPassFilterCutoffFreqLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(2);
}

export function onLowPassFilterCutoffFreqLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(3);
}

export function onLowPassFilterCutoffFreqLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(4);
}

export function onFilterCutoffFreqLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().setLfosModulationAmount(normalizedAmount);
}

// callbacks for Filter resonance **************************************************************
export function onLowPassFilterResonanceLfo1Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(0);
    else
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(0);
}

export function onLowPassFilterResonanceLfo2Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(1);
    else
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(1);
}

export function onLowPassFilterResonanceLfo3Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(2);
    else
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(2);
}

export function onLowPassFilterResonanceLfo4Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(3);
    else
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(3);
}

export function onLowPassFilterResonanceLfo5Toggle(isToggled: boolean): void
{
    if (isToggled)
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(4);
    else
        monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(4);
}

export function onFilterResonanceLfoModAmountChange(normalizedAmount: number): void
{
    monoSynth.getVoice().getFilter().getResonanceModulationManager().setLfosModulationAmount(normalizedAmount);
}