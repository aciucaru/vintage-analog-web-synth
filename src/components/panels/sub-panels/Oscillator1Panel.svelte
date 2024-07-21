<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="border" style="grid-column: 1 / 6; grid-row: 1 / 8;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 1 / 2;">OSC 1</div>

    <!-- oscillator 1 oscilloscope -->
    <div class="oscilloscope" style="grid-column: 1 / 6; grid-row: 3 / 4;">
        <AudioOscilloscope height={60}
            audioNode={monoSynth.getVoice().getMultiShapeOscillator1().getAnalyserGainNode()}
            audioContext={monoSynth.getVoice().getAudioContext()}></AudioOscilloscope>
    </div>

    <!-- oscillator 1 frequency controls -->
    <div style="grid-column: 1 / 2; grid-row: 5 / 6;">
        <Knob label={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 5 / 6;">
        <Knob label={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1SemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 5 / 6;">
        <Knob label={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1CentsOffsetChange}></Knob>
    </div>

    <!-- oscillator 1 shape, pulse width and volume controls -->
    <div class="toggle-buttons-group" style="grid-column: 1 / 2; grid-row: 7 / 8;">
        <div class="waveform-button-icon-group">
            <ToggleButton onToggleChange={oscCallbacks.onOsc1TriangleSelect} isToggled={true}></ToggleButton>
            <div class="waveform-icon triangle-icon"></div>
        </div>

        <div class="waveform-button-icon-group">
            <ToggleButton onToggleChange={oscCallbacks.onOsc1SawSelect}></ToggleButton>
            <div class="waveform-icon saw-icon"></div>
        </div>

        <div class="waveform-button-icon-group">
            <ToggleButton onToggleChange={oscCallbacks.onOsc1PulseSelect}></ToggleButton>
            <div class="waveform-icon pulse-icon"></div>
        </div>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 7 / 8;">
        <Knob label={"PW"} minValue={Settings.minOscPulseWidth} maxValue={Settings.maxOscPulseWidth} initialValue={Settings.defaultOscPulseWidth}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc1PulseWidthChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onOsc1LevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 350px; */

        display: grid;
        grid-template-columns: auto 10px auto 10px auto;
        grid-template-rows: auto 10px auto 10px auto 10px auto;

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 5px;

        border-radius: 2px;
    }

    .border
    {
        margin: 0px;
        padding: 0px;

        justify-self: stretch;
        align-self: stretch;

        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        border: solid 1px hsl(224, 10%, 30%);
        border-top: none;
    }

    .stretched-item
    {
        justify-self: stretch;
    }

    .title
    {
        margin: 0px;
        padding: 0px;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .oscilloscope
    {
        border-radius: 3px;
        border: solid 1px;
        border-top-color: hsla(228, 47%, 0%, 0.2);
        border-bottom-color: hsla(228, 27%, 40%, 0.2);
        border-left-color: hsla(228, 47%, 10%, 0.2);
        border-right-color: hsla(228, 47%, 80%, 0.2);

        background: linear-gradient(hsl(216, 5%, 10%) 0%, hsl(207, 5%, 5%) 50%);

        box-shadow: inset 1px 1px 4px 1px hsl(0, 0%, 0%);
    }

    .toggle-buttons-group
    {
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: space-between;
        /* set alingment on cross-axis */
        align-items: flex-start;
        /* set space between flex lines */
        align-content: center;

        padding: 0px;
        margin: 0px;
    }

    .waveform-button-icon-group
    {
        box-sizing: border-box;

        width: auto;
        height: auto;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        align-content: center;

        padding: 0px;
        margin: 0px;
    }

    .waveform-icon
    {
        padding: 0px;
        margin: 0px;
        margin-left: 2px;

        border: none;

        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .triangle-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-triangle-single-opt.svg");
    }

    .saw-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-saw-single-opt.svg");
    }

    .pulse-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-pulse-single-opt.svg");
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>