<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as effectsCallbacks from "../../../callbacks/effects-callbacks";
    
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import Knob from "../../Knob.svelte";
</script>

<div class="main-container">
    <div class="border" style="grid-column: 1 / 6; grid-row: 2 / 6;"></div>
    <div class="title-background" style="grid-column: 1 / 6; grid-row: 1 / 3;">&nbsp;</div>

    <!-- title -->
    <div class="title stretched-item unselectable" style="grid-column: 1 / 4; grid-row: 1 / 3;">REVERB</div>

    <div style="grid-column: 4 / 5; grid-row: 1 / 3;">
        <ToggleButton onToggleChange={effectsCallbacks.onReverbEffectToggle}></ToggleButton>
    </div>

    <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
        <Knob label={"Decay"} minValue={Settings.minReverbDecayRate} maxValue={Settings.maxReverbDecayRate}
            initialValue={Settings.defaultReverbDecayRate}
            step={0.01} decimals={2}  onValueChange={effectsCallbacks.onReverbDecayChange}></Knob>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 4 / 5;">
        <Knob label={"Wet/Dry"} minValue={Settings.minEffectWetDryGain} maxValue={Settings.maxEffectWetDryGain} initialValue={Settings.defaultEffectWetDryGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onReverbEffectAmountChange}></Knob>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 10px auto 5px auto 10px;
        grid-template-rows: 10px auto 5px auto 5px;

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 10px;
        padding: 0px;
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
        margin: 0px;
        padding: 0px;

        justify-self: stretch;
        align-self: center;
    }

    .title-background
    {
        margin: 0px;
        padding: 4px;

        justify-self: stretch;
        align-self: center;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;

        font-size: 12px;
    }

    .title
    {
        margin: 0px;
        padding: 0px;

        border-top-left-radius: 2px;

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