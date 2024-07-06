<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import Knob from "../../Knob.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 3 / 6; grid-row: 1 / 2;">SUB OSC</div>

    <!-- sub oscillator oscilloscope -->
    <div style="grid-column: 1 / 8; grid-row: 3 / 4;">
        <AudioOscilloscope
            audioNode={voice.getSubOscillator().getAnalyserGainNode()}
            audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>    

    <div style="grid-column: 1 / 4; grid-row: 5 / 6;">
        <Knob label={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscOctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 5 / 8; grid-row: 5 / 6;">
        <Knob label={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscSemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 1 / 4; grid-row: 7 / 8;">
        <Knob label={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscCentsOffsetChange}></Knob>
    </div>

    <div style="grid-column: 5 / 8; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onSubOscLevelChange}></Knob>
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
                                auto 5px auto
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

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>