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

    let backgroundClass = "button-main background-off-image";
    let foregroundClass = "button-main foreground-off-image foreground-off-filter";

    let backgroundOnImageUrl = "";
    let backgroundOffImageUrl = "";

    let foregroundOnImageUrl = "";
    let foregroundOffImageUrl = "";

    let buttonWidth = 0;
    let buttonHeight = 0;

    // if the use has not supplied custom images (and their dimensions)
    if (imageData == null) // the '==' operator will check for both 'null' and 'undefined'
    {
        buttonWidth = 45;
        buttonHeight = 30;

        backgroundOnImageUrl = "$lib/rocker-bg-on-opt.svg";
        backgroundOffImageUrl = "$lib/rocker-bg-off-opt.svg";

        foregroundOnImageUrl = "$lib/rocker-switch-on-opt.svg";
        foregroundOffImageUrl = "$lib/rocker-switch-off-opt.svg";

        // backgroundOnImageUrl = "../../assets/toggle-button/rocker-bg-on-opt.svg";
        // backgroundOffImageUrl = "../../assets/toggle-button/rocker-bg-off-opt.svg";

        // foregroundOnImageUrl = "../../assets/toggle-button/rocker-fg-on-opt.svg";
        // foregroundOffImageUrl = "../../assets/toggle-button/rocker-fg-on-opt.svg";
    }
    // if the user has supplied custom images (and their dimensions)
    else
    {
        buttonWidth = imageData.imageWidth;
        buttonHeight = imageData.imageHeight;

        backgroundOnImageUrl = imageData.bgImageOnPath;
        backgroundOffImageUrl = imageData.bgImageOffPath;

        foregroundOnImageUrl = imageData.fgImageOnPath;
        foregroundOffImageUrl = imageData.fgImageOffPath;
    }

    function setButtonImages(): void
    {

        // if the user did not provide custom images
        if (imageData == null) // '!==' check for both 'null' and 'undefined'
        {
            buttonBackground.style.backgroundImage = isToggled ?
                                                        "url($lib/rocker-bg-on-opt.svg);" : "url($lib/rocker-bg-off-opt.svg);";

            buttonForeground.style.backgroundImage = isToggled ?
                                                        "url($lib/rocker-switch-on-opt.svg);" : "url($lib/rocker-switch-off-opt.svg);";
        }
        else // if the user has provided custom images
        {
            // then
            buttonBackground.style.width = `${imageData.imageWidth}`;
            buttonBackground.style.height = `${imageData.imageHeight}`;
            buttonBackground.style.backgroundImage = isToggled ? `url(${imageData.bgImageOnPath});` : `url(${imageData.bgImageOffPath});`;

            buttonForeground.style.width = `${imageData.imageWidth}`;
            buttonForeground.style.height = `${imageData.imageHeight}`;
            buttonForeground.style.backgroundImage = isToggled ? `url(${imageData.fgImageOnPath});` : `url(${imageData.fgImageOffPath});`;
        }
    }

    // the event handler for the 'click' event, this methods gets called when the button is clicked
    function handleToggleClick(): void
    {
        // switch toggled state
        isToggled = !(isToggled);

        // call the supplied callback
        onToggleChange(isToggled);

        setButtonImages();
    }

    onMount(() =>
        {
            // if the use has not supplied custom images (and their dimensions)
            if (imageData == null) // the '==' operator will check for both 'null' and 'undefined'
            {
                buttonWidth = 45;
                buttonHeight = 30;

                backgroundOnImageUrl = "$lib/rocker-bg-on-opt.svg";
                backgroundOffImageUrl = "$lib/rocker-bg-off-opt.svg";

                foregroundOnImageUrl = "$lib/rocker-switch-on-opt.svg";
                foregroundOffImageUrl = "$lib/rocker-switch-off-opt.svg";
            }
            // if the user has supplied custom images (and their dimensions)
            else
            {
                buttonWidth = imageData.imageWidth;
                buttonHeight = imageData.imageHeight;

                backgroundOnImageUrl = imageData.bgImageOnPath;
                backgroundOffImageUrl = imageData.bgImageOffPath;

                foregroundOnImageUrl = imageData.fgImageOnPath;
                foregroundOffImageUrl = imageData.fgImageOffPath;
            }

            setButtonImages();
        }
    );

    $: backgroundClass = isToggled ? "button-main background-on-image" : "button-main background-off-image";
    $: foregroundClass = isToggled ? "button-main foreground-on-image foreground-on-filter" : "button-main foreground-off-image foreground-off-filter";
</script>

<div style={`--button-width: ${buttonWidth}px; button-height: ${buttonHeight}px;`} class="main-container">
    <!-- the toggle button -->
    <div class="button-container">
        {#if imageData == null}
            {#if isToggled}
                <div bind:this={buttonBackground} style={`background-image: url("$lib/rocker-bg-on-opt.svg")`} class={backgroundClass}></div>
                <div bind:this={buttonForeground} style={`background-image: url("$lib/rocker-fg-on-opt.svg")`} class={foregroundClass} on:click={handleToggleClick}></div>
            {:else}
                <div bind:this={buttonBackground} style={`background-image: url("$lib/rocker-bg-off-opt.svg")`} class={backgroundClass}></div>
                <div bind:this={buttonForeground} style={`background-image: url("$lib/rocker-fg-off-opt.svg")`} class={foregroundClass} on:click={handleToggleClick}></div>
            {/if}
        {:else}
            {#if isToggled}
                <div bind:this={buttonBackground} style={`background-image: url("${imageData.bgImageOnPath}")`} class={backgroundClass}></div>
                <div bind:this={buttonForeground} style={`background-image: url("${imageData.fgImageOnPath}")`} class={foregroundClass} on:click={handleToggleClick}></div>
            {:else}
                <div bind:this={buttonBackground} style={`background-image: url("${imageData.bgImageOffPath}")`} class={backgroundClass}></div>
                <div bind:this={buttonForeground} style={`background-image: url("${imageData.fgImageOffPath}")`} class={foregroundClass} on:click={handleToggleClick}></div>
            {/if}
        {/if}
    </div>

    <!-- only draw the label if the necessary prop was supplied -->
    {#if label.length > 0}
        <div class="label unselectable" on:click={handleToggleClick}>{label}</div>
    {/if}
</div>

<!-- Remember: Svelte styles are per component definition, not per each component instance!
    If we need custom images/styles per instance, we should use inline styles (directly in the HTML) instead. -->
<style>
    .main-container
    {
        /* --button-width: 45px;
        --button-height: 30px; */
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

    .button-main
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

    /* classes for default button images */
    /* .background-on-image
    {
        background-image: url("$lib/rocker-bg-on-opt.svg");
        background-image: url("../../assets/toggle-button/rocker-bg-off-opt.svg");
    }

    .background-off-image
    {
        background-image: url("$lib/rocker-bg-off-opt.svg");
    }

    .foreground-on-image
    {
        background-image: url("$lib/rocker-fg-on-opt.svg");
    }

    .foreground-off-image
    {
        background-image: url("$lib/rocker-fg-off-opt.svg");
    } */

    /* classes for filters */
    .foreground-on-filter
    {
        filter: brightness(100%);
    }

    .foreground-on-filter:hover
    {
        filter: brightness(80%);
    }

    .foreground-on-filter:hover:active
    {
        filter: brightness(60%);
    }

    .foreground-off-filter
    {
        filter: brightness(100%);
    }

    .foreground-off-filter:hover
    {
        filter: brightness(120%);
    }

    .foreground-off-filter:hover:active
    {
        filter: brightness(160%);
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