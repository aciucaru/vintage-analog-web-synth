<script lang="ts">
    import { onMount } from "svelte";
    import { Settings } from "../constants/settings";
    
    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // props:
    // the title above the knob
    export let optionsArray: Array<string> = new Array<string>(0);

    /* the event handler (callback) prop the knob will call when it's rotated
    ** this event receives the new value set by the knob */
    // export let onValueChange: (selectedOption: string) => void;

    const logger: Logger<ILogObj> = new Logger({name: "SlideSwitch", minLevel: Settings.minLogLevel });
</script>

<div class="main-container">
    <div class="slide-switch-bg left-bg unselectable"></div>
    <div class="slide-switch-bg right-bg unselectable"></div>
    {#each optionsArray as option, index}
        <div class="slide-switch-bg center-bg unselectable"></div>
    {/each}

    <div class="slide-switch unselectable"></div>
</div>

<style>
    .main-container
    {
        --switchHeight: 20px;
        --textHeight: 12px;

        box-sizing: border-box;

        display: grid;
        grid-template-columns: 22px 20px 22px;
        grid-template-rows: 20px 5px var(--textHeight);

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 0px;
    }

    .slide-switch-bg
    {
        box-sizing: border-box;

        width: 100%;
        height: var(--switchHeight);

        margin: 0px;
        padding: 0px;

        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        background-attachment: scroll;
    }

    .left-bg
    {
        content: url("../assets/slide-switch/slide-switch-left-bg-opt.svg");
    }

    .center-bg
    {
        content: url("../assets/slide-switch/slide-switch-center-bg-opt.svg");
    }

    .right-bg
    {
        content: url("../assets/slide-switch/slide-switch-right-bg-opt.svg");
    }

    .slide-switch
    {
        box-sizing: border-box;

        width: 100%;
        height: var(--switchHeight);

        margin: 0px;
        padding: 0px;

        content: url("../assets/slide-switch/slide-switch-opt.svg");
        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        background-attachment: scroll;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>