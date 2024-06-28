<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import RadioGroup from "../../radio-button/RadioGroup.svelte";
    

</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 1 / 6; grid-row: 3 / 4;">SUB</div>

    <div style="grid-column: 1 / 3; grid-row: 5 / 6;">
        <Knob label={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscOctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 4 / 6; grid-row: 5 / 6;">
        <Knob label={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscSemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 1 / 3; grid-row: 7 / 8;">
        <Knob label={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscCentsOffsetChange}></Knob>
    </div>

    <div style="grid-column: 4 / 6; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onSubOscLevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px auto 5px auto 16px;

        grid-template-rows: 16px
                            5px
                            auto 5px
                            auto 5px auto 5px
                            16px;

        justify-items: stretch;
        align-items: stretch;
        justify-content: start;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 0px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 5px;
        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
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

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>