<script lang="ts">
    import { Settings } from "../../../constants/settings";

    import * as voiceCallbacks from "../../../callbacks/voice-callbacks";

    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">  
    <!-- title -->
    <div class="title unselectable" style="grid-column: 1 / 10; grid-row: 3 / 4;">ADSR</div>

    <div style="grid-column: 1 / 3; grid-row: 5 / 6;">
        <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
        initialValue={Settings.defaultAdsrVoiceAttackDuration} decimals={1} onValueChange={voiceCallbacks.onAttackChange}></VerticalFader>
    </div>
    
    <div style="grid-column: 4 / 5; grid-row: 5 / 6;">
        <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
        initialValue={Settings.defaultAdsrVoiceDecayDuration} decimals={1} onValueChange={voiceCallbacks.onDecayChange}></VerticalFader>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 5 / 6;">
        <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
        initialValue={Settings.defaultAdsrVoiceSustainLevel} displayFactor={100} step={0.01} decimals={0}
        onValueChange={voiceCallbacks.onSustainChange}></VerticalFader>
    </div>
    
    <div style="grid-column: 8 / 10; grid-row: 5 / 6;">
        <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
        initialValue={Settings.defaultAdsrVoiceReleaseDuration} decimals={1} onValueChange={voiceCallbacks.onReleaseChange}></VerticalFader>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px auto 5px auto 5px auto 5px auto 16px;
        grid-template-rows: 16px
                            5px auto
                            5px auto 5px
                            16px;
        
        justify-items: stretch;
        align-items: start;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 0px;
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