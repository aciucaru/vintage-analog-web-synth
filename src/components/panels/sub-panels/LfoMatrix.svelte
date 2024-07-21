<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as lfoMatrixCallbaks from "../../../callbacks/lfo-matrix-callbacks";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";
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
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1FreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1FreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1FreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1FreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1FreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator1FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 6 / 7; grid-row: 3 / 4;">OSC1<br>Amp</div>

    <div style="grid-column: 6 / 7; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1AmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1AmpLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1AmpLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1AmpLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1AmpLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator1AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 8 / 9; grid-row: 3 / 4;">OSC1<br>PW</div>

    <div style="grid-column: 8 / 9; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator1PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 1 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 10 / 11; grid-row: 3 / 4;">OSC1<br>Detune</div>

    <div style="grid-column: 10 / 11; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator1UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Oscillator 2 modulators *********************************************************************************************************************** -->
    <!-- Oscillator 2 frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 12 / 13; grid-row: 3 / 4;">OSC2<br>Freq</div>

    <div style="grid-column: 12 / 13; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2FreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2FreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2FreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2FreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2FreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32} onValueChange={lfoMatrixCallbaks.onOscillator2FreqLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 14 / 15; grid-row: 3 / 4;">OSC2<br>Amp</div>

    <div style="grid-column: 14 / 15; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2AmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2AmpLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2AmpLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2AmpLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2AmpLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator2AmpLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 pulse width modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 16 / 17; grid-row: 3 / 4;">OSC2<br>PW</div>

    <div style="grid-column: 16 / 17; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator2PulseWidthLfoModAmountChange}></Knob>
    </div>

    <!-- Oscillator 2 unison detune modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 18 / 19; grid-row: 3 / 4;">OSC2<br>Detune</div>

    <div style="grid-column: 18 / 19; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onOscillator2UnisonDetuneLfoModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator modulators *********************************************************************************************************************** -->
    <!-- Sub Oscillator frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 20 / 21; grid-row: 3 / 4;">SUB<br>Freq</div>

    <div style="grid-column: 20 / 21; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorFreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorFreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorFreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorFreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorFreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onSubOscillatorFreqLfoModAmountChange}></Knob>
    </div>


    <!-- Sub Oscillator amplitude modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 22 / 23; grid-row: 3 / 4;">SUB<br>Amp</div>

    <div style="grid-column: 22 / 23; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorAmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorAmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorAmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorAmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onSubOscillatorAmpLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onSubOscillatorAmpLfoModAmountChange}></Knob>
    </div>


    <!-- Filter modulators *********************************************************************************************************************** -->
    <!-- Filter cutoff frequency modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 24 / 25; grid-row: 3 / 4;">FILT<br>Cutoff</div>

    <div style="grid-column: 24 / 25; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterCutoffFreqLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterCutoffFreqLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterCutoffFreqLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterCutoffFreqLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterCutoffFreqLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onFilterCutoffFreqLfoModAmountChange}></Knob>
    </div>

    <!-- Filter resonance modulators ************************************************************************************************************* -->
    <div class="mod-destination-title unselectable" style="grid-column: 26 / 27; grid-row: 3 / 4;">FILT<br>Res</div>

    <div style="grid-column: 26 / 27; grid-row: 5 / 6;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterResonanceLfo1Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 7 / 8;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterResonanceLfo2Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 9 / 10;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterResonanceLfo3Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 11 / 12;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterResonanceLfo4Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 13 / 14;">
        <ToggleButton onToggleChange={lfoMatrixCallbaks.onLowPassFilterResonanceLfo5Toggle}></ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 15 / 16;">
        <Knob minValue={Settings.minLfoManagerModulationAmount} maxValue={Settings.maxLfoManagerModulationAmount} initialValue={Settings.defaultLfoManagerModulationAmount}
            step={0.01} decimals={0} displayFactor={100} knobWidth={32}
            onValueChange={lfoMatrixCallbaks.onFilterResonanceLfoModAmountChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 5px auto repeat(13, 1px auto) 5px;

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

        margin: 0px;
        padding: 5px;
        padding-left: 5px;
        padding-right: 5px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }


    .mod-destination-title
    {
        margin: 0px;
        padding: 5px;

        /* background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left; */

        /* color: hsl(0, 0%, 20%);
        font-family: sans-serif;
        font-size: 12px; */
        color: hsl(0, 0%, 85%);
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
        padding-left: 5px;
        padding-right: 5px;

        /* background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left; */

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>