<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as effectsCallbacks from "../../../callbacks/effects-callbacks";
    
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import Knob from "../../Knob.svelte";
</script>

<div class="main-container">
    <div class="border" style="grid-column: 1 / 6; grid-row: 1 / 4;"></div>

    <!-- title -->
    <div class="title-background stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 1 / 2;">&nbsp;</div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 5; grid-row: 1 / 2;">DELAY</div>

    <div style="grid-column: 5 / 6; grid-row: 1 / 2;">
        <ToggleButton onToggleChange={effectsCallbacks.onDelayEffectToggle}></ToggleButton>
    </div>

    <div style="grid-column: 1 / 2; grid-row: 3 / 4;">
        <Knob label={"Time"} minValue={Settings.minDelayTime} maxValue={Settings.maxDelayTime} initialValue={Settings.defaultDelayTime}
            step={0.01} decimals={0} displayFactor={1000} onValueChange={effectsCallbacks.onDelayTimeChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 3 / 4;">
        <Knob label={"Feedback"} minValue={Settings.minDelayFeedback} maxValue={Settings.maxDelayFeedback} initialValue={Settings.defaultDelayFeedback}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onDelayFeedbackLevelChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 3 / 4;">
        <Knob label={"Wet/Dry"} minValue={Settings.minEffectWetDryGain} maxValue={Settings.maxEffectWetDryGain} initialValue={Settings.defaultEffectWetDryGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onDelayEffectAmountChange}></Knob>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: auto 5px auto 5px auto;
        grid-template-rows: auto 5px auto;

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 10px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 2px;
    }

    .border
    {
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
        align-self: center;
    }

    .title-background
    {
        margin: 0px;
        padding: 0px;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        font-size: 12px;
    }

    .title
    {
        margin: 0px;
        padding: 0px;

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