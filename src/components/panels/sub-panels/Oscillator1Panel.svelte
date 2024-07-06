<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 3 / 8; grid-row: 1 / 2;">OSC</div>

    <!-- oscillator 1 oscilloscope -->
    <div style="grid-column: 1 / 10; grid-row: 3 / 4;">
        <AudioOscilloscope
            audioNode={voice.getMultiShapeOscillator1().getAnalyserGainNode()}
            audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <!-- oscillator 1 frequency controls -->
    <div style="grid-column: 1 / 4; grid-row: 5 / 6;">
        <Knob label={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 5 / 6;">
        <Knob label={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1SemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 7 / 10; grid-row: 5 / 6;">
        <Knob label={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1CentsOffsetChange}></Knob>
    </div>

    <!-- oscillator 1 shape, pulse width and volume controls -->
    <div class="toggle-buttons-group" style="grid-column: 1 / 4; grid-row: 7 / 8;">
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

    <div style="grid-column: 5 / 6; grid-row: 7 / 8;">
        <Knob label={"PW"} minValue={Settings.minOscPulseWidth} maxValue={Settings.maxOscPulseWidth} initialValue={Settings.defaultOscPulseWidth}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc1PulseWidthChange}></Knob>
    </div>

    <div style="grid-column: 7 / 10; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onOsc1LevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 300px;

        display: grid;
        grid-template-columns: 16px
                                5px
                                auto 5px auto 5px auto
                                5px
                                16px;
        grid-template-rows: 16px
                            5px auto 5px auto 5px auto
                            5px
                            16px;

        justify-items: stretch;
        align-items: start;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 2px;
        background: linear-gradient(hsla(216, 20%, 20%, 0.3) 0%, hsla(207, 20%, 5%, 0.3) 50%),
                    url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .title
    {
        pointer-events: none;

        margin: 0px;
        padding: 0px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 25%, 0.6), hsla(220, 20%, 20%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 30%, 0.6), hsla(220, 20%, 25%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(45, 25%, 25%), hsl(45, 25%, 20%)); ok for orange */
        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
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