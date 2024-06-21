<script lang="ts">
    import { ButtonIcon } from "../../model/gui/toggle-button-data";
    import { ToggleButtonData } from "../../model/gui/toggle-button-data";

    // props:
    export let toggleData: ToggleButtonData

    // an optional title prop wich represents the option to be toggled
    // export let title: string = "";

    // export let isToggled: boolean = false;

    /* the name of an optional image file that this component will use as icon;
    ** the component assumes that the file is found in a certain path (see below) and does not look elsewhere */
    // export let iconType: ButtonIcon | null = null;

    // callback prop, that is called when the button is toggled
    // export let onToggleChange: () => void;

    let buttonClass = "button-part button-part-off";
    let backgroundClass = "button-background button-background-off";

    $: buttonClass = toggleData.isToggled ? "button-part button-part-on" : "button-part button-part-off";
    $: backgroundClass = toggleData.isToggled ? "button-background button-background-on" : "button-background button-background-off";

    function handleToogleClick(): void
    {
        // switch toggled state
        toggleData.isToggled = !(toggleData.isToggled);

        // the call supplied callback
        toggleData.onToggleChange(toggleData.isToggled);
    }

    function getIconClassName(iconType: ButtonIcon | null): string
    {
        let iconName: string = "icon";

        if (iconType != null )
        {
            switch(iconType)
            {
                case ButtonIcon.WAVE_SINE:
                    iconName = "icon icon-sine-wave-bg";
                    break;

                case ButtonIcon.WAVE_PULSE:
                    iconName = "icon icon-pulse-wave-bg";
                    break;

                case ButtonIcon.WAVE_SAW:
                    iconName = "icon icon-saw-wave-bg";
                    break;

                case ButtonIcon.WAVE_TRIANGLE:
                    iconName = "icon icon-triangle-wave-bg";
                    break;

                default:
                    iconName = "icon";
                    break;
            }
        }

        return iconName;
    }
</script>

<div class="main-container">
    <!-- the toggle button -->
    <div class="button-container">
        <div class={backgroundClass}></div>
        <div on:click={handleToogleClick} class={buttonClass}></div>
    </div>

    <!-- only draw the title or icon if the necessary prop was supplied -->
    {#if toggleData.label.length > 0}
        <div class="title unselectable" on:click={handleToogleClick}>{toggleData.label}</div>
    <!-- {:else if toggleData.iconType !== null}
        <div class={getIconClassName(toggleData.iconType)} on:click={handleToogleClick}></div> -->
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

    .button-container
    {
        /* width and height are necessary in order to display the background image */
        width: 45px;
        height: 30px;

        width: auto;
        height: auto;

        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;

        justify-items: center;
        align-items: center;
        justify-content: center;
        gap: 0px;

        padding: 0px;
        margin: 0px;
    }

    .button-background
    {
        /* width and height are necessary in order to display the background image */
        width: 45px;
        height: 30px;

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        padding: 0px;
        margin: 0px;

        border: none;

        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .button-background-off
    {
        background-image: url("../../assets/toggle-button/rocker-bg-off-opt.svg");
    }

    .button-background-on
    {
        background-image: url("../../assets/toggle-button/rocker-bg-on-opt.svg");
    }

    .button-part
    {
        /* width and height are necessary in order to display the background image */
        width: 45px;
        height: 30px;

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        padding: 0px;
        margin: 0px;

        border: none;
    }

    .button-part-off
    {
        background-image: url("../../assets/toggle-button/rocker-switch-off-opt.svg");
        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .button-part-off:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(120%);
    }

    .button-part-off:hover:active
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(160%);
    }

    .button-part-on
    {
        background-color: none;
        /* "background: none" is bad, because it eliminates backgrounds, but here it seems necessary */
        background: none;
        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;

        background-image: url("../../assets/toggle-button/rocker-switch-on-opt.svg");
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .button-part-on:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(80%);
    }

    .button-part-on:hover:active
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(60%);
    }

    .title
    {
        /* pointer-events: none; */
        box-sizing: border-box;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;

        margin: 0px;
        margin-left: 10px;
    }

    .icon
    {
        /* width and height are necessary in order to display the background image */
        width: 24px;
        height: 12px;

        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
        filter: brightness(1.5);

        margin: 0px;
        margin-left: 10px;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }

    .icon-sine-wave-bg { background-image: url("../../assets/toggle-button/wave-sine-opt.svg"); }
    .icon-pulse-wave-bg { background-image: url("../../assets/toggle-button/wave-pulse-opt.svg"); }
    .icon-saw-wave-bg { background-image: url("../../assets/toggle-button/wave-saw-opt.svg"); }
    .icon-triangle-wave-bg { background-image: url("../../assets/toggle-button/wave-triangle-opt.svg"); }
</style>