<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";

    import * as voiceCallbacks from "../../../callbacks/voice-callbacks";

    import Knob from "../../Knob.svelte";
    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <div class="background" style="grid-column: 1 / 8; grid-row: 1 / 9;"></div>

    <!-- voice parameters ***************************************************************************************************************** -->
    <div class="title unselectable" style="grid-column: 2 / 7; grid-row: 2 / 3;">VOICE</div>

    <div style="grid-column: 2 / 3; grid-row: 4 / 6;">
        <Knob label={"Gain"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onVolumeChange}></Knob>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 4 / 6;">
        <Knob label={"Tremolo"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onTremoloChange}></Knob>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 4 / 6;">
        <Knob label={"Vibrato"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onVibratoChange}></Knob>
    </div>
    
    <div class="faders-container" style="grid-column: 2 / 7; grid-row: 7 / 8;">
        <!-- <div style="grid-column: 12 / 15; grid-row: 12 / 13;"> -->
            <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
            initialValue={Settings.defaultAdsrVoiceAttackDuration} decimals={1} onValueChange={voiceCallbacks.onAttackChange}></VerticalFader>
        <!-- </div> -->
    
        <!-- <div style="grid-column: 16 / 17; grid-row: 12 / 13;"> -->
            <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
            initialValue={Settings.defaultAdsrVoiceDecayDuration} decimals={1} onValueChange={voiceCallbacks.onDecayChange}></VerticalFader>
        <!-- </div> -->
    
        <!-- <div style="grid-column: 18 / 19; grid-row: 12 / 13;"> -->
            <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
            initialValue={Settings.defaultAdsrVoiceSustainLevel} displayFactor={100} step={0.01} decimals={0}
            onValueChange={voiceCallbacks.onSustainChange}></VerticalFader>
        <!-- </div> -->
        
        <!-- <div style="grid-column: 20 / 21; grid-row: 12 / 13;"> -->
            <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
            initialValue={Settings.defaultAdsrVoiceReleaseDuration} decimals={1} onValueChange={voiceCallbacks.onReleaseChange}></VerticalFader>
        <!-- </div> -->
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 5px auto 5px auto 5px auto 5px;
        grid-template-rows: 5px
                            auto 5px
                            auto auto 5px
                            auto 5px;
        
        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        margin-left: 10px;
        padding: 0px;
        /* padding: 0px; */

        /* border: solid 1px hsla(0, 0%, 100%, 0.25); */
        border-radius: 5px;
        border-bottom-left-radius: 0px;

        /* background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%)); */
    }

    .background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .faders-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        justify-content: space-between;
        /* justify-content: start; */
        align-content: stretch;

        margin: 0px;
        padding: 0px;
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

    .knob-group
    {
        /* box-sizing: border-box; */

        padding: 0px;
        padding-left: 5px;
        padding-right: 5px;
        margin: 0px;

        border-radius: 4px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>