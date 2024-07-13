<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";
    import * as effectsCallbacks from "../../../callbacks/effects-callbacks";
    
    import Knob from "../../Knob.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 3 / 6; grid-row: 1 / 2;">Delay</div>

    <div style="grid-column: 1 / 4; grid-row: 5 / 6;">
        <Knob label={"Time"} minValue={Settings.minDelayTime} maxValue={Settings.maxDelayTime} initialValue={Settings.defaultDelayTime}
            step={0.01} decimals={0} displayFactor={1000} onValueChange={effectsCallbacks.onDelayTimeChange}></Knob>
    </div>

    <div style="grid-column: 5 / 8; grid-row: 5 / 6;">
        <Knob label={"Feedback"} minValue={Settings.minDelayFeedback} maxValue={Settings.maxDelayFeedback} initialValue={Settings.defaultDelayFeedback}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onDelayFeedbackLevelChange}></Knob>
    </div>

    <div style="grid-column: 1 / 4; grid-row: 7 / 8;">
        <Knob label={"Wet/Dry"} minValue={Settings.minEffectAtenuatorGain} maxValue={Settings.maxEffectAtenuatorGain} initialValue={Settings.defaultEffectAtenuatorGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={effectsCallbacks.onDelayEffectAmountChange}></Knob>
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