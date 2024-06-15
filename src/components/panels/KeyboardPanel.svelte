<script lang="ts">
    // import Keyboard5 from "./Keyboard5.svelte";
    import Keyboard5v2 from "../Keyboard5v2.svelte";
    import ArpegiatorPanel from "./sub-panels/ArpegiatorPanel.svelte";
</script>

<div class="main-container">
    <div class="keyboard-textured-background"></div>
    <div class="keyboard-gradient-background"></div>

    <div class="arpegiator">
        <ArpegiatorPanel></ArpegiatorPanel>
    </div>

    <div class="keyboard">
        <Keyboard5v2 startOctave={2}></Keyboard5v2>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: min-content; */
        /* width: max-content; */
        width: 100%;
        height: auto;

        display: grid;
        grid-template-columns: 10px auto auto 10px;
        grid-template-rows: 10px auto 10px;

        /* justify-items: start;
        align-items: start;
        justify-content: center; */
        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        padding: 0px;

        text-align: center;
        /* border: solid 1px blue; */
    }

    .keyboard-textured-background
    {
        grid-column: 1 / 5;
        grid-row: 1 / 4;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        margin: 0px;
        padding: 0px;

        /* border: solid 1px yellow; */
        background: url("../../assets/texture/texture-large-02-filt-seamless.jpg") repeat left top;
    }

    .keyboard-gradient-background
    {
        grid-column: 1 / 5;
        grid-row: 1 / 4;

        width: 100%;
        height: auto;

        justify-self: stretch;
        align-self: stretch;

        /* border: solid 1px yellow; */
        background-image: linear-gradient(160deg, hsla(216, 10%, 10%, 0.8) 0%, hsla(207, 10%, 0%, 0.8) 50%);
    }

    .arpegiator
    {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        justify-self: stretch;
        align-self: stretch;

        /* border: solid 1px yellow; */
    }

    .keyboard
    {
        grid-column: 3 / 4;
        grid-row: 2 / 3;

        justify-self: stretch;
        align-self: stretch;

        /* border: solid 1px yellow; */
    }
</style>