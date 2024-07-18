<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";

    function onLfoToggle(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }

    // Oscillator 1 callbacks ****************************************************************************
    // callbacks for Oscillator 1 frequency **************************************************************
    function onOscillator1FreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1FreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1FreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1FreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1FreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1FreqLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator1().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 amplitude **************************************************************
    function onOscillator1AmpLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1AmpLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1AmpLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1AmpLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1AmpLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1AmpLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator1().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 pulse width **************************************************************
    function onOscillator1PulseWidthLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1PulseWidthLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1PulseWidthLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1PulseWidthLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1PulseWidthLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1PulseWidthLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 unison **************************************************************
    function onOscillator1UnisonDetuneLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1UnisonDetuneLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1UnisonDetuneLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1UnisonDetuneLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1UnisonDetuneLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // Oscillator 2 callbacks ****************************************************************************
    // callbacks for Oscillator 2 frequency **************************************************************
    function onOscillator2FreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2FreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2FreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2FreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2FreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2FreqLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator2().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 amplitude **************************************************************
    function onOscillator2AmpLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2AmpLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2AmpLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2AmpLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2AmpLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2AmpLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator2().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 pulse width **************************************************************
    function onOscillator2PulseWidthLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2PulseWidthLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2PulseWidthLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2PulseWidthLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2PulseWidthLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2PulseWidthLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 unison **************************************************************
    function onOscillator2UnisonDetuneLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2UnisonDetuneLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2UnisonDetuneLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2UnisonDetuneLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2UnisonDetuneLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // Oscillator 2 callbacks ****************************************************************************
    // callbacks for Oscillator 2 frequency **************************************************************
    function onSubOscillatorFreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(0);
    }

    function onSubOscillatorFreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(1);
    }

    function onSubOscillatorFreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(2);
    }

    function onSubOscillatorFreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(3);
    }

    function onSubOscillatorFreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getSubOscillator().getFreqParamManager().getLfoManager().disableLfo(4);
    }

    function onSubOscillatorFreqLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getSubOscillator().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 amplitude **************************************************************
    function onSubOscillatorAmpLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(0);
    }

    function onSubOscillatorAmpLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(1);
    }

    function onSubOscillatorAmpLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(2);
    }

    function onSubOscillatorAmpLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(3);
    }

    function onSubOscillatorAmpLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getSubOscillator().getAmpParamManager().getLfoManager().disableLfo(4);
    }

    function onSubOscillatorAmpLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getSubOscillator().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // Filter callbacks ****************************************************************************
    // *********************************************************************************************
    // callbacks for Filter cutoff frequency **************************************************************
    function onLowPassFilterCutoffFreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(0);
    }

    function onLowPassFilterCutoffFreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(1);
    }

    function onLowPassFilterCutoffFreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(2);
    }

    function onLowPassFilterCutoffFreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(3);
    }

    function onLowPassFilterCutoffFreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(4);
    }

    function onFilterCutoffFreqLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getFilter().getCutoffFreqModulationManager().setLfosModulationAmount(normalizedAmount);
    }

    // callbacks for Filter resonance **************************************************************
    function onLowPassFilterResonanceLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(0);
        else
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(0);
    }

    function onLowPassFilterResonanceLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(1);
        else
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(1);
    }

    function onLowPassFilterResonanceLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(2);
        else
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(2);
    }

    function onLowPassFilterResonanceLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(3);
        else
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(3);
    }

    function onLowPassFilterResonanceLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().enableLfo(4);
        else
            monoSynth.getVoice().getFilter().getResonanceModulationManager().getLfoManager().disableLfo(4);
    }

    function onFilterResonanceLfoModAmountChange(normalizedAmount: number): void
    {
        monoSynth.getVoice().getFilter().getResonanceModulationManager().setLfosModulationAmount(normalizedAmount);
    }
</script>

<div class="main-container">
    <div class="main-label unselectable" style="grid-column: 12 / 24; grid-row: 1 / 2;">LFO MATRIX</div>

    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 5 / 6;">LFO1</div>
    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 7 / 8;">LFO2</div>
    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 9 / 10;">LFO3</div>
    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 11 / 12;">LFO4</div>
    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 13 / 14;">LFO5</div>
    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 15 / 16;">Amount</div>

    <!-- Oscillator 1 modulators *********************************************************************************************************************** -->
    <!-- Oscillator 1 frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 4 / 5; grid-row: 3 / 4;">OSC1<br>Freq</div>

    <div style="grid-column: 4 / 5; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 6 / 7; grid-row: 3 / 4;">OSC1<br>Amp</div>

    <div style="grid-column: 6 / 7; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 8 / 9; grid-row: 3 / 4;">OSC1<br>PW</div>

    <div style="grid-column: 8 / 9; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 10 / 11; grid-row: 3 / 4;">OSC1<br>Detune</div>

    <div style="grid-column: 10 / 11; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Oscillator 2 modulators *********************************************************************************************************************** -->
    <!-- Oscillator 2 frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 12 / 13; grid-row: 3 / 4;">OSC2<br>Freq</div>

    <div style="grid-column: 12 / 13; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 14 / 15; grid-row: 3 / 4;">OSC2<br>Amp</div>

    <div style="grid-column: 14 / 15; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 16 / 17; grid-row: 3 / 4;">OSC2<br>PW</div>

    <div style="grid-column: 16 / 17; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 18 / 19; grid-row: 3 / 4;">OSC2<br>Detune</div>

    <div style="grid-column: 18 / 19; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator modulators *********************************************************************************************************************** -->
    <!-- Sub Oscillator frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 20 / 21; grid-row: 3 / 4;">SUB<br>Freq</div>

    <div style="grid-column: 20 / 21; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 22 / 23; grid-row: 3 / 4;">SUB<br>Amp</div>

    <div style="grid-column: 22 / 23; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>


    <!-- Filter modulators *********************************************************************************************************************** -->
    <!-- Filter cutoff frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 24 / 25; grid-row: 3 / 4;">FILT<br>Cutoff</div>

    <div style="grid-column: 24 / 25; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onFilterCutoffFreqLfoModAmountChange}></Knob>
    </div>

    <!-- Filter resonance modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 26 / 27; grid-row: 13 / 15;">FILT<br>Res</div>

    <div style="grid-column: 26 / 27; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 4 / 5;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 12 / 13;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onFilterResonanceLfoModAmountChange}></Knob>
    </div>

    <!-- Filter drive modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 28 / 29; grid-row: 13 / 15;">FILT<br>Drive</div>

    <div style="grid-column: 28 / 29; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 4 / 5;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onLfoToggle}></ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 12 / 13;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 5px auto repeat(14, 1px auto) 5px;

        grid-template-rows: auto 5px
                            auto 5px
                            repeat(5, auto 1px)
                            auto
                            auto;

        justify-items: center;
        align-items: center;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 5px;

        border-radius: 2px;
    }

    .main-label
    {
        box-sizing: border-box;

        /* writing-mode: vertical-rl;
        text-orientation: mixed; */

        margin: 0px;
        padding: 0px;

        color: hsl(210, 40%, 10%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }


    .mod-destination-title
    {
        margin: 0px;
        padding: 2px;

        background: linear-gradient(hsla(46, 100%, 88%, 0.5) 0%, hsla(46, 100%, 80%, 0.5) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 20%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: clip;
        white-space: normal;
        text-overflow: clip; */
    }

    .mod-source-header
    {
        margin: 0px;
        padding: 2px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .lfo-button-bg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 30%);
    }

    .lfo-button-bg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 10%);
    }

    .lfo-button-fg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(210, 40%, 70%) 0%, hsl(210, 40%, 50%) 90%);
    }

    .lfo-button-fg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(0, 0%, 50%) 0%, hsl(0, 0%, 30%) 90%);
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>