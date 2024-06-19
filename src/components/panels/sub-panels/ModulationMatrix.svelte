<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";

    import * as voiceCallbacks from "../../../callbacks/voice-callbacks";

    import Knob from "../../Knob.svelte";
    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <div class="background" style="grid-column: 1 / 8; grid-row: 1 / 4;"></div>

    <!-- voice parameters ***************************************************************************************************************** -->
    <div class="title" style="grid-column: 2 / 7; grid-row: 2 / 3;">VOICE</div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: repeat(auto, 7);
        grid-template-rows: repeat(auto, 13);
        
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
</style>