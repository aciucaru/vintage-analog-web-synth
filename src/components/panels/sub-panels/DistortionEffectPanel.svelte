<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as effectsCallbacks from "../../../callbacks/effects-callbacks";
    
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import Knob from "../../Knob.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 3 / 6; grid-row: 1 / 2;">Distortion</div>

    <div style="grid-column: 1 / 4; grid-row: 3 / 4;">
        <ToggleButton onToggleChange={effectsCallbacks.onDistortionEffectToggle}></ToggleButton>
        <div>On/Off</div>
    </div>

    <div style="grid-column: 1 / 4; grid-row: 5 / 6;">
        <Knob label={"Amount"} minValue={Settings.minDistortionAmount} maxValue={Settings.maxDistortionAmount}
            initialValue={Settings.defaultDistortionAmount}
            step={0.01} decimals={2} onValueChange={effectsCallbacks.onDistortionAmountChange}></Knob>
    </div>

    <div style="grid-column: 5 / 8; grid-row: 5 / 6;">
        <Knob label={"Angle"} minValue={Settings.minDistortionCurveAngle} maxValue={Settings.maxDistortionCurveAngle}
            initialValue={Settings.defaultDistortionCurveAngle}
            step={1} decimals={0} onValueChange={effectsCallbacks.onDistortionCurveAngleChange}></Knob>
    </div>

    <div style="grid-column: 1 / 4; grid-row: 7 / 8;">
        <Knob label={"Const"} minValue={Settings.minDistortionCurveConstantValue} maxValue={Settings.maxDistortionCurveConstantValue}
            initialValue={Settings.defaultDistortionCurveConstantValue}
            step={0.01} decimals={2} onValueChange={effectsCallbacks.onDistortionCurveConstantValueChange}></Knob>
    </div>

    <div style="grid-column: 5 / 8; grid-row: 7 / 8;">
        <Knob label={"Wet/Dry"} minValue={Settings.minEffectWetDryGain} maxValue={Settings.maxEffectWetDryGain} initialValue={Settings.defaultEffectWetDryGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onDistortionEffectAmountChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 350px;

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