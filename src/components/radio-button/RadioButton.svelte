<script lang="ts">
    import { Settings } from "../../constants/settings";
    import { RadioButtonData } from "../../model/gui/radio-button-data";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // props:
    export let radioData: RadioButtonData;
    export let buttonWidth: number = 20; // default is 20px

    /* callback prop, received from the parent (the group of radio buttons), in order to tell the container
    ** which is the active button, through the 'radioButtonOrder' and 'isToggled' arguments, which
    ** are passed to the container callback */
    export let containerCallback: (radioButtonOrder: number, isToggled: boolean) => void;

    const logger: Logger<ILogObj> = new Logger({name: "RadioGroup", minLevel: Settings.minLogLevel });

    let ligthPartClass = "button-part button-part-off unselectable";

    $: ligthPartClass = radioData.isToggled ? "button-part button-part-on unselectable" : "button-part button-part-off unselectable";

    function handleToogleClick(): void
    {
        logger.debug("handleToggleClick()");

        /* a radio button can only be turned 'on' by the user, while the radio group container
        ** is responsible for turning the other radio buttons off (the user never turns a radio button of),
        ** so we first check if the radio button is turned off, otherwise it doesn't make sense to switch it's state */
        if (radioData.isToggled === false)
        {
            radioData.isToggled = true; // switch toggled state

            // then call supplied callback
            radioData.onToggleChange();

            /* and finally call the callback of container (group parent), to notify the container
            ** what button was pressed (and in what state: on/off) so that the container can
            ** dezactivate all the other radio buttons, so there is always one selected radio button */
            containerCallback(radioData.index, radioData.isToggled);
        }
    }
</script>

<div class="main-container" style={`--buttonWidth: ${buttonWidth}px;`}>
    <!-- the button -->
    <div class={ligthPartClass} on:click={handleToogleClick}></div>

    <!-- the label is optional; the label is drawn only if the necessary prop was supplied -->
    {#if radioData.label.length > 0}
        <div class="label unselectable" on:click={handleToogleClick}>{radioData.label}</div>
    {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        width: auto;
        height: auto;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        align-content: center;

        padding: 0px;
        margin: 2px;
    }

    .button-part
    {
        /* width and height are necessary in order to display the background image */
        width: var(--buttonWidth);
        height: var(--buttonWidth);

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        padding: 0px;
        margin: 0px;

        border: none;

        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;

        filter: saturate(14%) hue-rotate(250deg);
    }

    .button-part-off
    {
        background-image: url("../../assets/radio-button/radio-button-off-opt.svg");
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .button-part-off:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(120%);
    }

    .button-part-on
    {
        background-image: url("../../assets/radio-button/radio-button-on-opt.svg");
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .button-part-on:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(80%);
    }

    .label
    {
        pointer-events: none;
        box-sizing: border-box;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;

        margin: 3px;
        margin-left: 10px;
        padding: 0px;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>