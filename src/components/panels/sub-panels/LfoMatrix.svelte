<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";

    function onLfoToggle(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }

    // Oscillator 1 callbacks ****************************************************************************
    // callbacks for Oscillator 1 frequency **************************************************************
    function onOscillator1FreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1FreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1FreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1FreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1FreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator1().getFreqParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1FreqLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator1().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 amplitude **************************************************************
    function onOscillator1AmpLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1AmpLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1AmpLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1AmpLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1AmpLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator1().getAmpParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1AmpLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator1().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 pulse width **************************************************************
    function onOscillator1PulseWidthLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1PulseWidthLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1PulseWidthLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1PulseWidthLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1PulseWidthLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator1().getPulseWidthParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1PulseWidthLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 1 unison **************************************************************
    function onOscillator1UnisonDetuneLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator1UnisonDetuneLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator1UnisonDetuneLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator1UnisonDetuneLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator1UnisonDetuneLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator1().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator1UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator1().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // Oscillator 2 callbacks ****************************************************************************
    // callbacks for Oscillator 2 frequency **************************************************************
    function onOscillator2FreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2FreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2FreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2FreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2FreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator2().getFreqParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2FreqLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator2().getFreqParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 amplitude **************************************************************
    function onOscillator2AmpLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2AmpLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2AmpLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2AmpLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2AmpLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator2().getAmpParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2AmpLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator2().getAmpParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 pulse width **************************************************************
    function onOscillator2PulseWidthLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2PulseWidthLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2PulseWidthLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2PulseWidthLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2PulseWidthLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator2().getPulseWidthParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2PulseWidthLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // callbacks for Oscillator 2 unison **************************************************************
    function onOscillator2UnisonDetuneLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(0);
        else
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(0);
    }

    function onOscillator2UnisonDetuneLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(1);
        else
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(1);
    }

    function onOscillator2UnisonDetuneLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(2);
        else
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(2);
    }

    function onOscillator2UnisonDetuneLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(3);
        else
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(3);
    }

    function onOscillator2UnisonDetuneLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().enableLfo(4);
        else
            voice.getMultiShapeOscillator2().getUnisonDetuneParamManager().getLfoManager().disableLfo(4);
    }

    function onOscillator2UnisonDetuneLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getMultiShapeOscillator2().getPulseWidthParamManager().setLfosModulationAmount(normalizedAmount);
    }


    // Filter callbacks ****************************************************************************
    // *********************************************************************************************
    // callbacks for Filter cutoff frequency **************************************************************
    function onLowPassFilterCutoffFreqLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(0);
        else
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(0);
    }

    function onLowPassFilterCutoffFreqLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(1);
        else
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(1);
    }

    function onLowPassFilterCutoffFreqLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(2);
        else
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(2);
    }

    function onLowPassFilterCutoffFreqLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(3);
        else
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(3);
    }

    function onLowPassFilterCutoffFreqLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().enableLfo(4);
        else
            voice.getFilter().getCutoffFreqModulationManager().getLfoManager().disableLfo(4);
    }

    function onFilterCutoffFreqLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getFilter().getCutoffFreqModulationManager().setLfosModulationAmount(normalizedAmount);
    }

    // callbacks for Filter resonance **************************************************************
    function onLowPassFilterResonanceLfo1Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getResonanceModulationManager().getLfoManager().enableLfo(0);
        else
            voice.getFilter().getResonanceModulationManager().getLfoManager().disableLfo(0);
    }

    function onLowPassFilterResonanceLfo2Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getResonanceModulationManager().getLfoManager().enableLfo(1);
        else
            voice.getFilter().getResonanceModulationManager().getLfoManager().disableLfo(1);
    }

    function onLowPassFilterResonanceLfo3Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getResonanceModulationManager().getLfoManager().enableLfo(2);
        else
            voice.getFilter().getResonanceModulationManager().getLfoManager().disableLfo(2);
    }

    function onLowPassFilterResonanceLfo4Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getResonanceModulationManager().getLfoManager().enableLfo(3);
        else
            voice.getFilter().getResonanceModulationManager().getLfoManager().disableLfo(3);
    }

    function onLowPassFilterResonanceLfo5Toggle(isToggled: boolean): void
    {
        if (isToggled)
            voice.getFilter().getResonanceModulationManager().getLfoManager().enableLfo(4);
        else
            voice.getFilter().getResonanceModulationManager().getLfoManager().disableLfo(4);
    }

    function onFilterResonanceLfoModAmountChange(normalizedAmount: number): void
    {
        voice.getFilter().getResonanceModulationManager().setLfosModulationAmount(normalizedAmount);
    }
</script>

<div class="main-container">
    <div class="title unselectable" style="grid-column: 2 / 15; grid-row: 2 / 3;">MODULATION MATRIX</div>

    <div class="mod-source-header unselectable" style="grid-column: 2 / 3; grid-row: 4 / 5;">DEST</div>
    <div class="mod-source-header unselectable" style="grid-column: 4 / 5; grid-row: 4 / 5;">LFO1</div>
    <div class="mod-source-header unselectable" style="grid-column: 6 / 7; grid-row: 4 / 5;">LFO2</div>
    <div class="mod-source-header unselectable" style="grid-column: 8 / 9; grid-row: 4 / 5;">LFO3</div>
    <div class="mod-source-header unselectable" style="grid-column: 10 / 11; grid-row: 4 / 5;">LFO4</div>
    <div class="mod-source-header unselectable" style="grid-column: 12 / 13; grid-row: 4 / 5;">LFO5</div>
    <div class="mod-source-header unselectable" style="grid-column: 14 / 15; grid-row: 4 / 5;">Amnt</div>

    <!-- Oscillator 1 modulators *********************************************************************************************************************** -->
    <!-- Oscillator 1 frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 6 / 7;">OSC1 Freq</div>

    <div style="grid-column: 4 / 5; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 6 / 7;">
        <ToggleButton onToggleChange={onOscillator1FreqLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 6 / 7;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 8 / 9;">OSC1 Amp</div>

    <div style="grid-column: 4 / 5; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 8 / 9;">
        <ToggleButton onToggleChange={onOscillator1AmpLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 8 / 9;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 10 / 11;">OSC1 PW</div>

    <div style="grid-column: 4 / 5; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 10 / 11;">
        <ToggleButton onToggleChange={onOscillator1PulseWidthLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 10 / 11;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 12 / 13;">OSC1 Detune</div>

    <div style="grid-column: 4 / 5; grid-row: 12 / 13;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 12 / 13;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 12 / 13;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 12 / 13;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 12 / 13;">
        <ToggleButton onToggleChange={onOscillator1UnisonDetuneLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 12 / 13;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator1UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Oscillator 2 modulators *********************************************************************************************************************** -->
    <!-- Oscillator 2 frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 14 / 15;">OSC2 Freq</div>

    <div style="grid-column: 4 / 5; grid-row: 14 / 15;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 14 / 15;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 14 / 15;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 14 / 15;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 14 / 15;">
        <ToggleButton onToggleChange={onOscillator2FreqLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 14 / 15;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 16 / 17;">OSC2 Amp</div>

    <div style="grid-column: 4 / 5; grid-row: 16 / 17;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 16 / 17;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 16 / 17;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 16 / 17;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 16 / 17;">
        <ToggleButton onToggleChange={onOscillator2AmpLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 16 / 17;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 18 / 19;">OSC2 PW</div>

    <div style="grid-column: 4 / 5; grid-row: 18 / 19;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 18 / 19;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 18 / 19;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 18 / 19;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 18 / 19;">
        <ToggleButton onToggleChange={onOscillator2PulseWidthLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 18 / 19;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 20 / 21;">OSC2 Detune</div>

    <div style="grid-column: 4 / 5; grid-row: 20 / 21;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 20 / 21;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 20 / 21;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 20 / 21;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 20 / 21;">
        <ToggleButton onToggleChange={onOscillator2UnisonDetuneLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 20 / 21;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onOscillator2UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator modulators *********************************************************************************************************************** -->
    <!-- Sub Oscillator frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 22 / 23;">SUB Freq</div>

    <div style="grid-column: 4 / 5; grid-row: 22 / 23;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 22 / 23;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 22 / 23;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 22 / 23;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 22 / 23;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 22 / 23;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 24 / 25;">SUB Amp</div>

    <div style="grid-column: 4 / 5; grid-row: 24 / 25;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 24 / 25;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 24 / 25;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 24 / 25;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 24 / 25;">
        <ToggleButton onToggleChange={onLfoToggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 24 / 25;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>


    <!-- Filter modulators *********************************************************************************************************************** -->
    <!-- Filter cutoff frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 26 / 27;">FILTER Cutoff</div>

    <div style="grid-column: 4 / 5; grid-row: 26 / 27;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 26 / 27;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 26 / 27;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 26 / 27;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 26 / 27;">
        <ToggleButton onToggleChange={onLowPassFilterCutoffFreqLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 26 / 27;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onFilterCutoffFreqLfoModAmountChange}></Knob>
    </div>

    <!-- Filter resonance modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 28 / 29;">FILTER Res</div>

    <div style="grid-column: 4 / 5; grid-row: 28 / 29;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo1Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 28 / 29;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo2Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 28 / 29;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo3Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 28 / 29;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo4Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 28 / 29;">
        <ToggleButton onToggleChange={onLowPassFilterResonanceLfo5Toggle}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 28 / 29;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onFilterResonanceLfoModAmountChange}></Knob>
    </div>

    <!-- Filter drive modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 2 / 3; grid-row: 30 / 31;">FILTER Drive</div>

    <div style="grid-column: 4 / 5; grid-row: 30 / 31;">
        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 30 / 31;">
        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 30 / 31;">
        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 30 / 31;">
        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 30 / 31;">
        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 30 / 31;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={onModAmountChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 5px repeat(7, auto 5px);
        grid-template-rows: 5px repeat(15, auto 5px);

        justify-items: stretch;
        align-items: stretch;
        justify-content: start;
        align-content: start;
        gap: 0px;

        margin: 0px;
        padding: 0px;

        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
        /* background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%)); */
    }

    .horizontal-container
    {
        box-sizing: border-box;

        /* width: min-content; */
        height: min-content;

        display: flex;
        flex-flow: row nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 0px;

        border-radius: 5px;
    }

    .mod-destination-title
    {
        /* pointer-events: none; */

        margin: 0px;
        padding: 0px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 25%, 0.6), hsla(220, 20%, 20%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 30%, 0.6), hsla(220, 20%, 25%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(45, 25%, 25%), hsl(45, 25%, 20%)); ok for orange */
        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .mod-source-header
    {
        /* pointer-events: none; */

        margin: 0px;
        padding: 0px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 25%, 0.6), hsla(220, 20%, 20%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 30%, 0.6), hsla(220, 20%, 25%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(45, 25%, 25%), hsl(45, 25%, 20%)); ok for orange */
        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

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
        height: 20px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 30%);
    }

    .lfo-button-bg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 20px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 10%);
    }

    .lfo-button-fg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 20px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(210, 40%, 70%) 0%, hsl(210, 40%, 50%) 90%);
    }

    .lfo-button-fg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 20px;

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