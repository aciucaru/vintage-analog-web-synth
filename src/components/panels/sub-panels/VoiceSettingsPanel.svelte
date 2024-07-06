<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";

    import * as voiceCallbacks from "../../../callbacks/voice-callbacks";

    import Knob from "../../Knob.svelte";
    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 3 / 6; grid-row: 1 / 2;">VOICE</div>

    <div class="oscilloscope" style="grid-column: 1 / 8; grid-row: 3 / 4;">
        <AudioOscilloscope
        audioNode={voice.outputNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 1 / 4; grid-row: 5 / 6;">
        <Knob label={"Gain"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onVolumeChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 5 / 6;">
        <Knob label={"Tremolo"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={voiceCallbacks.onTremoloChange}></Knob>
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
                            5px
                            auto 5px auto 5px auto
                            5px
                            16px;

        justify-items: stretch;
        align-items: start;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 5px;

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

    .oscilloscope
    {
        border: solid 1px;
        border-top-color: hsla(0, 0%, 0%, 0.2);
        border-bottom-color: hsla(0, 0%, 40%, 0.2);
        border-left-color: hsla(0, 0%, 10%, 0.2);
        border-right-color: hsla(0, 0%, 80%, 0.2);

        background: linear-gradient(hsl(216, 5%, 5%) 0%, hsl(207, 5%, 0%) 50%);
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>