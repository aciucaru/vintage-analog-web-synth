<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import Knob from "../../Knob.svelte";
    import RadioGroup from "../../radio-button/RadioGroup.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
    

    // noise oscillator callbacks and data ****************************************************************************************
    /* the radio group must receive an array of button data and will create as many radio
    ** buttons as there are elements in the array;
    ** the data for a single radio button consists of a label and the callback */
    const radioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(3);
    radioDataArray[0] = new RadioButtonData(0, "White", oscCallbacks.onWhiteNoiseSelect, true);
    radioDataArray[1] = new RadioButtonData(1, "Pink", oscCallbacks.onPinkNoiseSelect);
    radioDataArray[2] = new RadioButtonData(2, "Brown", oscCallbacks.onBrownNoiseSelect);
</script>

<div class="main-container">
    <!-- title -->
    <div class="border" style="grid-column: 1 / 4; grid-row: 1 / 8;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 2; grid-row: 1 / 2;">NOISE</div>

    <!-- noise oscillator oscilloscope -->
    <div class="oscilloscope" style="grid-column: 1 / 2; grid-row: 3 / 4;">
        <AudioOscilloscope height={60}
            audioNode={monoSynth.getVoice().getNoiseOscillator().getAnalyserGainNode()}
            audioContext={monoSynth.getVoice().getAudioContext()}></AudioOscilloscope>
    </div>

    <div class="toggle-buttons-group" style="grid-column: 1 / 2; grid-row: 5 / 6;">
        <RadioGroup radioDataArray={radioDataArray}></RadioGroup>
    </div>

    <div style="grid-column: 1 / 2; grid-row: 7 / 8;">
        <Knob label={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onNoiseOscLevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 350px; */

        display: grid;
        grid-template-columns: auto;
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

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>