<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { monoSynth } from "../../../model/audio/synth";

    import * as voiceCallbacks from "../../../callbacks/voice-callbacks";

    import Knob from "../../Knob.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="border" style="grid-column: 1 / 6; grid-row: 1 / 8;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 1 / 2;">VOICE</div>

    <div class="oscilloscope" style="grid-column: 1 / 4; grid-row: 3 / 4;">
        <AudioOscilloscope height={60}
        audioNode={monoSynth.getVoice().outputNode()} audioContext={monoSynth.getVoice().getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 3 / 4;">
        <Knob label={"Gain"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onVolumeChange}></Knob>
    </div>

    <!-- <div style="grid-column: 7 / 8; grid-row: 3 / 4;">
        <Knob label={"Tremolo"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onTremoloChange}></Knob>
    </div> -->

    <div class="title stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 5 / 6;">VOICE &nbsp; ENEVELOPE</div>
    <div class="adsr-container" style="grid-column: 1 / 6; grid-row: 7 / 8;">
        <!-- amplitude ADSR envelope -->
        <div>
            <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
            initialValue={Settings.defaultAdsrVoiceAttackDuration} decimals={1}
            onValueChange={voiceCallbacks.onAttackChange}></VerticalFader>
        </div>
        
        <div>
            <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
            initialValue={Settings.defaultAdsrVoiceDecayDuration} decimals={1}
            onValueChange={voiceCallbacks.onDecayChange}></VerticalFader>
        </div>

        <div>
            <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
            initialValue={Settings.defaultAdsrVoiceSustainLevel} displayFactor={100} step={0.01} decimals={0}
            onValueChange={voiceCallbacks.onSustainChange}></VerticalFader>
        </div>
        
        <div>
            <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
            initialValue={Settings.defaultAdsrVoiceReleaseDuration} decimals={1}
            onValueChange={voiceCallbacks.onReleaseChange}></VerticalFader>
        </div>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 350px; */

        display: grid;
        grid-template-columns: auto 10px auto 10px auto;
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

    .adsr-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        /* set alignment on main axis */
        justify-content: flex-start;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;
        gap: 5px;

        margin: 0px;
        padding: 0px;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>