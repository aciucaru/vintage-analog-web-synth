<script lang="ts">
    import { voice } from "../../../model/audio/voice";

    import AudioOscilloscope from "../../AudioOscilloscope.svelte";
</script>

<div class="main-container">
    <div class="frame-textured-background"></div>
    <div class="frame-gradient-background"></div>

    <div class="lcd-display-textured-background"></div>
    <div class="lcd-display-color-background"></div>

    <div style="grid-column: 3 / 4; grid-row: 3 / 4;">
        <AudioOscilloscope label={"OSC 1"}
            audioNode={voice.getUnisonOscillator1().getAnalyserGainNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 3 / 4;">
        <AudioOscilloscope label={"OSC 2"}
        audioNode={voice.getUnisonOscillator2().getAnalyserGainNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 7 / 8; grid-row: 3 / 4;">
        <AudioOscilloscope label={"SUB"}
        audioNode={voice.getSubOscillator().getAnalyserGainNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 9 / 10; grid-row: 3 / 4;">
        <AudioOscilloscope label={"NOISE"}
        audioNode={voice.getNoiseOscillator().getAnalyserGainNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 5 / 6;">
        <AudioOscilloscope label={"VOICE"}
        audioNode={voice.outputNode()} audioContext={voice.getAudioContext()}></AudioOscilloscope>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: min-content; */
        /* width: max-content; */
        width: auto;
        height: auto;

        display: grid;
        /* grid-template-columns: 10px auto 10px auto 10px auto 10px auto 10px;
        grid-template-rows: 10px auto 10px auto 10px; */

        grid-template-columns: 10px 10px
                                auto 10px auto 10px auto 10px auto
                                10px 10px;

        /* grid-template-columns: 10px 10px
                                min-content 10px min-content 10px min-content
                                10px 10px; */
        grid-template-rows: 10px 10px
                            auto 10px auto
                            10px 10px;

        /* justify-items: start;
        align-items: start;
        justify-content: center; */
        justify-items: stretch;
        align-items: stretch;
        justify-content: stretch;
        gap: 0px;

        margin: 0px;
        /* margin-left: 20px;
        margin-right: 20px; */
        padding: 0px;

        text-align: center;
        /* border: solid 1px blue; */
    }

    .frame-textured-background
    {
        grid-column: 1 / 12;
        grid-row: 1 / 8;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        margin: 0px;
        padding: 0px;

        border-radius: 4px;

        /* border: solid 1px yellow; */
        background: url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat left top;
    }

    .frame-gradient-background
    {
        grid-column: 1 / 12;
        grid-row: 1 / 8;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        border-radius: 4px;

        /* border: solid 1px yellow; */
        background-image: linear-gradient(160deg, hsla(216, 10%, 10%, 0.8) 0%, hsla(207, 10%, 0%, 0.8) 50%);
    }

    .lcd-display-textured-background
    {
        grid-column: 2 / 11;
        grid-row: 2 / 7;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        margin: 0px;
        padding: 0px;

        border-radius: 4px;

        /* border: solid 1px yellow; */
        background: url("../../../assets/texture/lcd-screen-color-seamless.png") repeat left top;
    }

    .lcd-display-color-background
    {
        grid-column: 2 / 11;
        grid-row: 2 / 7;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        border-radius: 4px;

        /* border: solid 1px yellow; */
        /* background-image: linear-gradient(160deg, hsla(216, 10%, 10%, 0.8) 0%, hsla(207, 10%, 0%, 0.8) 50%); */
        background-color:  hsla(180, 50%, 20%, 0.4);
    }
</style>