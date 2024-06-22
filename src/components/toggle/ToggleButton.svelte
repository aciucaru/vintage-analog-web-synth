<script lang="ts">
    // props:
    // callback prop, that is called when the button is toggled
    export let onToggleChange: (isToggled: boolean) => void;

    // an optional label prop
    export let label: string = "";

    // prop that tells if the toggle button starts in On (true) or Off (false) mode
    export let isToggled: boolean = false;

    // the classes for the background and foreground of the button
    let backgroundClass = "button-image background-off-default-image";
    let foregroundClass = "button-image foreground-off-default-image foreground-off-filter";

    let buttonWidth = 0;
    let buttonHeight = 0;


    // the event handler for the 'click' event, this methods gets called when the button is clicked
    function handleToggleClick(): void
    {
        // switch toggled state
        isToggled = !(isToggled);

        // call the supplied callback
        onToggleChange(isToggled);
    }

    $: backgroundClass = isToggled ? "button-image background-on-default-image" : "button-image background-off-default-image";
    $: foregroundClass = isToggled ? "button-image foreground-on-default-image foreground-on-filter" : "button-image foreground-off-default-image foreground-off-filter";
</script>

<!-- <div style={`--button-width: ${buttonWidth}px; button-height: ${buttonHeight}px;`} class="main-container"> -->
<div class="main-container">
    <!-- the toggle button -->
    <div class="button-container">
        <div class="button-main">
            <slot name="bgOnImage">
                <div class={backgroundClass}></div>
            </slot>
        </div>
    
        <div class="button-main" on:click={handleToggleClick}>
            <slot name="fgOnImage">
                <div class={foregroundClass}></div>
            </slot>
        </div>
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
    }

    .button-image
    {
        /* width and height are necessary in order to display the background image */
        width: var(--button-width);
        height: var(--button-height);

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
    .background-on-default-image
    {
        /* background-image: url("$lib/rocker-bg-on-opt.svg"); */
        background-image: url("../../assets/toggle-button/rocker-bg-on-opt.svg");
    }

    .background-off-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-bg-off-opt.svg");
    }

    .foreground-on-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-switch-on-opt.svg");
    }

    .foreground-off-default-image
    {
        background-image: url("../../assets/toggle-button/rocker-switch-off-opt.svg");
    }

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