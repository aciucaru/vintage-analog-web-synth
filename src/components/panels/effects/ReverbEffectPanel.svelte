<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as effectsCallbacks from "../../../callbacks/effects-callbacks";
    
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import Knob from "../../Knob.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title stretched-item unselectable" style="grid-column: 1 / 3; grid-row: 1 / 2;">REVERB</div>

    <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
        <ToggleButton onToggleChange={effectsCallbacks.onReverbEffectToggle}></ToggleButton>
    </div>

    <div style="grid-column: 1 / 2; grid-row: 3 / 4;">
        <Knob label={"Decay"} minValue={Settings.minReverbDecayRate} maxValue={Settings.maxReverbDecayRate}
            initialValue={Settings.defaultReverbDecayRate}
            step={0.01} decimals={2}  onValueChange={effectsCallbacks.onReverbDecayChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 3 / 4;">
        <Knob label={"Wet/Dry"} minValue={Settings.minEffectWetDryGain} maxValue={Settings.maxEffectWetDryGain} initialValue={Settings.defaultEffectWetDryGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onReverbEffectAmountChange}></Knob>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: auto 5px auto;
        grid-template-rows: auto 5px auto;

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 2px;
    }

    .stretched-item
    {
        justify-self: stretch;
        align-self: center;
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
        border-bottom-color: hsla(228, 47%, 40%, 0.2);
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