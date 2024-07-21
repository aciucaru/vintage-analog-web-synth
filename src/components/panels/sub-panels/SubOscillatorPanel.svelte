<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import Knob from "../../Knob.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="border" style="grid-column: 1 / 4; grid-row: 1 / 8;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 4; grid-row: 1 / 2;">SUB OSC</div>

    <!-- sub oscillator oscilloscope -->
    <div class="oscilloscope" style="grid-column: 1 / 4; grid-row: 3 / 4;">
        <AudioOscilloscope height={60}
            audioNode={monoSynth.getVoice().getSubOscillator().getAnalyserGainNode()}
            audioContext={monoSynth.getVoice().getAudioContext()}></AudioOscilloscope>
    </div>    

    <div style="grid-column: 1 / 2; grid-row: 5 / 6;">
        <Knob label={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscOctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 5 / 6;">
        <Knob label={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscSemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 1 / 2; grid-row: 7 / 8;">
        <Knob label={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscCentsOffsetChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onSubOscLevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 350px; */

        display: grid;
        grid-template-columns: auto 5px auto;
        grid-template-rows: auto 5px auto 5px auto 5px auto;

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

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>