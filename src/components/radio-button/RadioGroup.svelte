<script lang="ts">
    import { Settings } from "../../constants/settings";
    import type { RadioButtonData } from "../../model/gui/radio-button-data";
    import RadioButton from "./RadioButton.svelte";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // the array of radia buttton description prop
    export let radioDataArray: Array<RadioButtonData>;

    // the optional label prop
    export let label: string = "";

    const logger: Logger<ILogObj> = new Logger({name: "RadioGroup", minLevel: Settings.minLogLevel });

    function containerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <radioDataArray.length; i++)
            {
                radioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            radioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }

</script>

<div class="main-container">
    {#if label.length > 0}
        <div class="label">{label}</div>
    {/if}

    {#each radioDataArray as radioData, i}
        <RadioButton radioData={radioData} containerCallback={containerCallback}></RadioButton>
    {/each}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        align-content: center;

        padding: 0px;
        margin: 0px;
    }

    .label
    {
        box-sizing: border-box;
        pointer-events: none;

        margin: 0px;
        padding: 3px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }
</style>