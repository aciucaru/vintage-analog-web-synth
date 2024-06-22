<script lang="ts">
    import { onMount } from "svelte";
    import { ToggleButtonData } from "../../model/gui/toggle-button-data";

    // props:
    // export let toggleData: ToggleButtonData

    // callback prop, that is called when the button is toggled
    export let onToggleChange: (isToggled: boolean) => void;

    // an optional label prop
    export let label: string = "";

    // prop that tells if the toggle button starts in On (true) or Off (false) mode
    export let isToggled: boolean = false;

    /* props that gives the images paths and dimensions for the background of the button;
    ** the background description is made out of 2 images (for On and for Off) and the dimensions; */
    export let imageData: ToggleButtonData | null = null;

    // the two div elements of the button, as objects
    let buttonBackground: HTMLDivElement;
    let buttonForeground: HTMLDivElement;

    let backgroundClass = "background-main background-off-image";
    let foregroundClass = "foreground-main foreground-off-image";

    // $: buttonClass = isToggled ? "foreground-main foreground-on-image" : "foreground-main foreground-off-image";
    // $: backgroundClass = isToggled ? "background-main button-background-on-image" : "background-main background-off-image";

    // the event handler for the 'click' event, this methods gets called when the button is clicked
    function handleToggleClick(): void
    {
        // switch toggled state
        isToggled = !(isToggled);

        // call the supplied callback
        onToggleChange(isToggled);
    }

    function computeBackgroundClass(): string
    {
        let backgroundClass = "background-main background-off-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
        {
            if (isToggled)
                backgroundClass = "background-main background-on-default-image";
            else
                backgroundClass = "background-main background-off-default-image";
        }
        else // if custom images paths have been provided
        {
            const customBackgroundClass = document.createElement("style");

            if (isToggled)
                backgroundClass = "background-main background-on-custom-image";
            else
                backgroundClass = "background-main background-off-custom-image";
        }
        
        return backgroundClass;
    }

    function computeForegroundClass(): string
    {
        let foregroundClass = "foreground-main foreground-off-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
        {
            if (isToggled)
                foregroundClass = "foreground-main foreground-on-default-image";
            else
                foregroundClass = "foreground-main foreground-off-default-image";
        }
        else // if custom images paths have been provided
        {
            if (isToggled)
                foregroundClass = "foreground-main foreground-on-custom-image";
            else
                foregroundClass = "foreground-main foreground-off-custom-image";
        }
        
        return foregroundClass;
    }

    function computeBackgroundOnClass(): string
    {
        let backgroundClass = "background-main background-on-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
            backgroundClass = "background-main background-on-default-image";
        else // if custom images paths have been provided
            backgroundClass = "background-main background-on-custom-image";
        
        return backgroundClass;
    }

    function computeBackgroundOffClass(): string
    {
        let backgroundClass = "background-main background-off-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
            backgroundClass = "background-main background-off-default-image";
        else // if custom images paths have been provided
            backgroundClass = "background-main background-off-custom-image";
        
        return backgroundClass;
    }

    function computeForegroundOnClass(): string
    {
        let foregroundClass = "foreground-main foreground-on-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
            foregroundClass = "foreground-main foreground-on-default-image";
        else // if custom images paths have been provided
            foregroundClass = "foreground-main foreground-on-custom-image";
        
        return foregroundClass;
    }

    function computeForegroundOffClass(): string
    {
        let foregroundClass = "foreground-main foreground-off-default-image";
        
        // if no custom images have been provided
        if (imageData == null) // '==' checks for both 'null' and 'undefined'
            foregroundClass = "foreground-main foreground-off-default-image";
        else // if custom images paths have been provided
            foregroundClass = "foreground-main foreground-off-custom-image";
        
        return foregroundClass;
    }

    $: backgroundClass = isToggled ? computeBackgroundOnClass() : computeBackgroundOffClass();
    $: foregroundClass = isToggled ? computeForegroundOnClass() : computeForegroundOffClass();
</script>

<div class="main-container">
    <!-- the toggle button -->
    <div class="button-container">
        <div bind:this={buttonBackground} class={backgroundClass}></div>
        <div bind:this={buttonForeground} class={foregroundClass} on:click={handleToggleClick}></div>
    </div>

    <!-- only draw the label if the necessary prop was supplied -->
    {#if label.length > 0}
        <div class="label unselectable" on:click={handleToggleClick}>{label}</div>
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

    .background-main
    {
        /* width and height are necessary in order to display the background image */
        width: var(--button-width);
        height: var(--button-height);

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
    }

    .background-on-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-bg-on-opt.svg");
    }

    .background-off-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-bg-off-opt.svg");
    }

    .foreground-main
    {
        /* width and height are necessary in order to display the background image */
        width: var(--button-width);
        height: var(--button-height);

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
    }

    .foreground-main:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(80%);
    }

    .foreground-on-default-image:hover:active
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(60%);
    }

    .foreground-off-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-switch-off-opt.svg");
        
        /* aditional effect */
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .foreground-off-default-image:hover
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(120%);
    }

    .foreground-off-default-image:hover:active
    {
        filter: saturate(400%) hue-rotate(-100deg) brightness(160%);
    }

    .foreground-on-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-switch-on-opt.svg");

        /* aditional effect */
        filter: saturate(400%) hue-rotate(-100deg);
    }

    .label
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