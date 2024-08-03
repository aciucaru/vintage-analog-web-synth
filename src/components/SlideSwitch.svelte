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
    export let onToggleChange: (selectedOptionIndex: number) => void;

    const logger: Logger<ILogObj> = new Logger({name: "SlideSwitch", minLevel: Settings.minLogLevel });

    // the index of the selected option (starts at zero)
    let selectionIndex = 0;

    // the CSS grid columns for the main container
    let mainContainerGridTemplateColumns = "";

    // the last column coordinate of the (the first is always 2)
    let labelLastColumn = 1;

    // compute the grid columns of the main container
    if (optionsArray.length >= 2)
    {
        mainContainerGridTemplateColumns = "5px";

        let labelLastColumn = 1;

        for (let option of optionsArray)
        {
            mainContainerGridTemplateColumns = mainContainerGridTemplateColumns.concat(" 20px");

            labelLastColumn++;
        }

        mainContainerGridTemplateColumns = mainContainerGridTemplateColumns.concat("5px");
    }
    else
        mainContainerGridTemplateColumns = "5px 20px 20px 5px";
    
    // the event handler for the 'click' event, this methods gets called when the toggle button is clicked
    function handleToggleClick(optionIndex: number): void
    {
        // switch toggled state
        logger.debug(`handleToggleClick(${optionIndex})`);

        selectionIndex = optionIndex;

        // call the supplied callback
        onToggleChange(optionIndex);
    }

</script>

<div class="main-container">
    <div class="slide-container" style="grid-template-columns: {mainContainerGridTemplateColumns}">
        <!-- general cas, when the number of options is at least 2 -->
        {#if optionsArray.length >= 2}
            <!-- background -->
            {#each optionsArray as option, index}
                {#if index === 0}
                    <div class="slide-switch-bg left-bg unselectable" on:click={ (event) => handleToggleClick(index) }  style="grid-column: {index + 1} / {index + 3}; grid-row: 1 / 2;"></div>
                {:else if index === (optionsArray.length - 1)}
                    <div class="slide-switch-bg right-bg unselectable" on:click={ (event) => handleToggleClick(index) } style="grid-column: {index + 2} / {index + 4}; grid-row: 1 / 2;"></div>
                {:else}
                    <div class="slide-switch-bg center-bg unselectable" on:click={ (event) => handleToggleClick(index) } style="grid-column: {index + 2} / {index + 3}; grid-row: 1 / 2;"></div>
                {/if}
            {/each}
    
            <!-- the slide switch -->
            <div class="slide-switch unselectable" style="grid-column: {selectionIndex + 2} / {selectionIndex + 3}; grid-row: 1 / 2;"></div>
    
        <!-- fallback case: when the number of options is smaller than 2 (0 or 1) -->
        <!-- in this case there is nothing to select and the switch is not visible (only the background is visible) -->
        {:else}
            <div class="slide-switch-bg left-bg unselectable" style="grid-column: 1 / 3; grid-row: 1 / 2;"></div>
            <div class="slide-switch-bg right-bg unselectable" style="grid-column: 3 / 5; grid-row: 1 / 2;"></div>
        {/if}
    </div>

    <!-- label for selected option -->
    {#if 0 <= selectionIndex && selectionIndex < optionsArray.length}
        <div class="label unselectable">{optionsArray[selectionIndex]}</div>
    {/if}
</div>


<style>
    .main-container
    {
        --switchHeight: 26px;
        --textHeight: 12px;

        box-sizing: border-box;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center; /* set alignment on main axis */
        align-items: center; /* set alingment on cross-axis */
        align-content: center; /* set space between flex lines */

        margin: 0px;
        padding: 0px;
    }

    .slide-container
    {
        box-sizing: border-box;

        display: grid;
        /* grid-template-columns is not necessary, because it's defined algoritmically as inline stlye */
        grid-template-rows: 26px;

        justify-items: center;
        align-items: center;
        justify-content: center;
        align-content: center;
        gap: 0px;

        margin: 0px;
        padding: 0px;
    }

    .label
    {
        box-sizing: border-box;

        width: var(--containerWidth);
        height: calc(var(--textHeight) + 4px);

        margin: 0px;
        padding: 0px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: var(--textHeight);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .slide-switch-bg
    {
        box-sizing: border-box;

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
        width: 25px;
        height: var(--switchHeight);
        /* background-size: 100% auto; */

        content: url("../assets/slide-switch/slide-switch-left-bg-opt.svg");
    }

    .center-bg
    {
        width: 20px;
        height: var(--switchHeight);
        /* background-size: 100% auto; */

        content: url("../assets/slide-switch/slide-switch-center-bg-opt.svg");
    }

    .right-bg
    {
        width: 25px;
        height: var(--switchHeight);
        /* background-size: 100% auto; */
        
        content: url("../assets/slide-switch/slide-switch-right-bg-opt.svg");
    }

    .slide-switch
    {
        box-sizing: border-box;

        width: 20px;
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