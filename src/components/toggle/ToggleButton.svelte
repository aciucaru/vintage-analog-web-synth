<script lang="ts">
    import { ButtonIcon } from "../../model/gui/toggle-button-data";

    // props:
    // export let toggleData: ToggleButtonData

    // callback prop, that is called when the button is toggled
    export let onToggleChange: (isToggled: boolean) => void;

    // an optional label prop
    export let label: string = "";

    // prop that tells if the toggle button starts in On (true) or Off (false) mode
    export let isToggled: boolean = false;

    /* props that gives the images paths and dimensions for the background of the button;
    ** the background description is made out of 2 images (for On and for Off) and the same dimensions; */
    export let bgImageOnPath: string = "";
    export let bgImageOffPath: string = "";
    export let bgImageWidth: number = 0;
    export let bgImageHeight: number = 0;

    /* props that gives the images paths and dimensions for the foreground of the button (the actual button images);
    ** the background description is made out of 2 images (for On and for Off) and the same dimensions; */
    export let fgImageOnPath: string = "";
    export let fgImageOffPath: string = "";
    export let fgImageWidth: number = 0;
    export let fgImageHeight: number = 0;

    let buttonClass = "button-part button-part-off";
    let backgroundClass = "button-background button-background-off";

    $: buttonClass = isToggled ? "button-part button-part-on" : "button-part button-part-off";
    $: backgroundClass = isToggled ? "button-background button-background-on" : "button-background button-background-off";

    function handleToggleClick(): void
    {
        // switch toggled state
        isToggled = !(isToggled);

        // call the supplied callback
        onToggleChange(isToggled);
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
        <div class={buttonClass} on:click={handleToggleClick} ></div>
    </div>

    <!-- only draw the title if the necessary prop was supplied -->
    {#if label.length > 0}
        <div class="title unselectable" on:click={handleToggleClick}>{label}</div>
    {/if}
</div>

<style>
    .main-container
    {
        --button-width: 45px;
        --button-height: 30px;
        --text-height: 12px;

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
        width: var(--button-width);
        height: var(--button-height);

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
        width: var(--button-width);
        height: var(--button-height);

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
        width: var(--button-width);
        height: var(--button-height);

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
        /* background-color: none;
        background: none; */
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
        box-sizing: border-box;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: var(--text-height);
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
</style>