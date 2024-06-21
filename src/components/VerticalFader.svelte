<script lang="ts">
    import { onMount } from "svelte";
    import { Settings } from "../constants/settings";
    
    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // props:
    // the title above the knob
    export let label: string = "";

    // the min. and max. absolute values the knob is supossed to set
    export let minValue: number = 0.0;
    export let maxValue: number = 1.0;
    // the initial value the knob is set to
    export let initialValue: number = 0.5;

    // a factor by which the stored value is multiplied; for display only
    export let displayFactor: number = 1.0;

    // the steps with which the knob value increments/decrements
    export let step: number = 0.1;
    export let fineStep: number = 0.01;

    // how many decimals should the displayed value have
    export let decimals: number = 2;

    /* if the slider track is in one direction only (from min. to max.) or if it's
    ** bidirectional (symmetrical) */
    export let bidirectionalTrack: boolean = false;

    /* the event handler (callback) prop the knob will call when it's rotated
    ** this event receives the new value set by the knob */
    export let onValueChange: (newValue: number) => void;

    // if the numeric value should be displayed or not; default is true
    let showValue: boolean = false;

    const logger: Logger<ILogObj> = new Logger({name: "VerticalFader", minLevel: Settings.minLogLevel });

    /* the number of steps that were set while turning the knob (can be positive or negative);
    ** it gets multiplied by the step value and added to the initial value after releasing
    ** the mouse (mouseup event);
    ** it is used in multiple functions, this is why it has a higher scope */
    let currentIncrementedSteps: number = 0;

    // the actual numerical value set through the knob, in absolute form (from minValue to maxValue)
    let absoluteValue = initialValue;

    // the string representation of the absolute value (used to display the value below the knob)
    let absoluteValueString = `${ (displayFactor * absoluteValue).toFixed(decimals)}`;

    // the new absolute value, which is only set when the mouse releases (mouseup event)
    let newAbsoluteValue = initialValue;

    /* the Y value of the mouse in the moment it was pressed (but not released);
    ** it has a higer scope because it's set in 'onMouseDown()' but read in 'onMouseMove()' event handler */
    let onMouseDownY = 0.0;

    // check if the initial value is inside bounds and truncate, if neccessary
    if (initialValue < minValue)
        initialValue = minValue;

    if (initialValue > maxValue)
        initialValue = maxValue;

    absoluteValue = initialValue;
    newAbsoluteValue = initialValue;

    // the fader thumb element which the user uses to slide and change the value
    let faderThumb: HTMLDivElement;

    /* the div prefill, which comes before the thumb, which has a variable height and give
    ** the ilussion that the thumb (which comes after the prefill) is moving;
    ** in reality, the thumb is never changing, but the div before it is changing it's height; */
    let faderThumbPrefill: HTMLDivElement;

    // the width and height of the canvas
    const WIDTH = 40;
    const HEIGHT = 150;
    const THUMB_HEIGHT = 25;
    const PREFILL_MAX_HEIGHT = HEIGHT - THUMB_HEIGHT;
    const initialNormalizedValue = (initialValue - minValue) / (maxValue - minValue);

    let prefillHeight = PREFILL_MAX_HEIGHT * (1.0 - initialNormalizedValue);
    let newPrefillHeight = PREFILL_MAX_HEIGHT * (1.0 - initialNormalizedValue);

    // set the correct theme for the track
    const faderTrackClass = bidirectionalTrack ? "fader-track fader-track-bidirectional" : "fader-track fader-track-unidirectional";

    // set the height of the thumb prefill so it corresponds with the initial value of the fader
    onMount( async () =>
        {
            faderThumbPrefill.style.height = newPrefillHeight + "px";
        }
    );

    function onMouseDown(event: Event): void
    {
        onMouseDownY = (event as MouseEvent).clientY;

        faderThumb.addEventListener('mousemove', onMouseMove);
        faderThumb.addEventListener('mouseup', onMouseUp);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(event: Event): void
    {
        showValue = true;

        // how many steps are between minValue and maxValue
        const STEP_COUNT = Math.floor((maxValue - minValue) / step) + 1;

        /* the height in pixels that the mouse must move to change the value by 100% (up or down);
        ** changing the value by 100% means changing the value by (maxValue - minValue);
        ** basically, when the mouse moves with MAX_MOUSE_MOVEMENT pixels, the value of the knob changes by
        ** the maximum amount (maxValue - minValue) and when the mouse does not move at all (0), the value
        ** of the knob does not change either;
        ** so, when mouse movement = 0, the value change = 0
        **     when mouse movement = MAX_MOUSE_MOVEMENT, the value change = (maxValue - minValue), maximum possible */
        // const MAX_MOUSE_MOVEMENT = PREFIL_MAX_HEIGHT;

        // how many pixels the mouse must move up or down to change the value by 1 step
        const PIXELS_PER_STEP = PREFILL_MAX_HEIGHT / STEP_COUNT;

        // the Y value when the mouse is moving; this is waht actually changes everytime the user moves the mouse
        const onMouseMoveY = (event as MouseEvent).clientY;

        // find out how mouch the mouse has moved (in pixels) relative to the mousedown event;
        // this is measured in "absolute mode" (e.g. pixels) and is always positive
        const mouseYMovement = Math.abs(onMouseDownY - onMouseMoveY);

        // find how many steps the mouse moved
        currentIncrementedSteps = Math.floor(mouseYMovement / PIXELS_PER_STEP);

        // then check the direction of the movement: up or down
        if (onMouseMoveY < onMouseDownY) // if mouse was moved up
        {
            // when the mouse moves up, the value should increase
            newAbsoluteValue = absoluteValue + currentIncrementedSteps * step;

            newPrefillHeight = prefillHeight - mouseYMovement;

            // logger.debug(`increase: new = ${newPrefillHeight}`);

            // truncate the prefill height if it's too small
            if (newPrefillHeight < 0)
            {
                // logger.debug(`increase: TRUNCATED current = ${newPrefillHeight}`);
                newPrefillHeight = 0;
            }
        }
        else // mouse was moved down
        {
            // when the mouse moves down, the value should decrease
            newAbsoluteValue = absoluteValue - currentIncrementedSteps * step;

            newPrefillHeight = prefillHeight + mouseYMovement;

            // logger.debug(`decrease: new = ${newPrefillHeight}`);

            // truncate the prefill height if it's too small
            if (newPrefillHeight > PREFILL_MAX_HEIGHT)
            {
                // logger.debug(`decrease: TRUNCATED current = ${newPrefillHeight}`);
                newPrefillHeight = PREFILL_MAX_HEIGHT;
            }
        }

        // truncate the knob value to it's bounds
        if (newAbsoluteValue < minValue)
            newAbsoluteValue = minValue;

        if (newAbsoluteValue > maxValue)
            newAbsoluteValue = maxValue;

        /* and recompute the string version of the absolute value
        ** the numeric value inside the string is multiplied witht the display factor, so it
        ** could be larger or smaller than the actual stored absolute value */
        absoluteValueString = `${ (displayFactor * newAbsoluteValue).toFixed(decimals) }`;

        // // call the event handler (callback) and pass it the new value
        // onValueChange(newAbsoluteValue);

        // change the thumb preffil height to give the ilussion that the thumb is moving
        faderThumbPrefill.style.height = newPrefillHeight + "px";
    }

    // this function should only remove event listeners 
    function onMouseUp(event: Event): void
    {
        showValue = false;

        // assign new value
        absoluteValue = newAbsoluteValue;

        // call the event handler (callback) and pass it the new value
        onValueChange(newAbsoluteValue);

        // keep the thumb prefill latest height
        prefillHeight = newPrefillHeight;
        faderThumbPrefill.style.height = newPrefillHeight + "px";

        // reset the increment in steps
        currentIncrementedSteps = 0;

        faderThumb.removeEventListener('mousemove', onMouseMove);
        faderThumb.removeEventListener('mouseup', onMouseUp);

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
</script>

<div class="main-container">
    <div class="fader-container">
        <div class={faderTrackClass}></div>
        <div class="thumb-container">
            <div bind:this={faderThumbPrefill} class="thumb-prefill"></div>
            <div bind:this={faderThumb} on:mousedown={onMouseDown} class="thumb"></div>
        </div>
    </div>

    {#if showValue}
        <div class="numeric-value">{absoluteValueString}</div>
    {:else if label.length > 0}
        <div class="label">{label}</div>
    {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: flex-start;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;
        gap: 5px;

        margin: 0px;
        padding: 0px;
    }

    .label
    {
        box-sizing: border-box;

        width: 40px;
        height: 14px;

        margin: 0px;
        padding: 0px;

        color: hsl(0, 0%, 85%);
        pointer-events: none;
        box-sizing: border-box;

        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    /* custom local font definition; this defines a font named "LCD14" */
    @font-face
    {
        font-family: LCD14;
        src: url("../assets-external/LCD14.otf");
        font-weight: normal;
        font-style: italic;
    }

    .numeric-value
    {
        pointer-events: none;
        
        box-sizing: border-box;

        width: 40px;
        height: 14px;

        margin: 0px;
        padding: 0px;

        color: hsl(210, 30%, 60%);
        font-family: LCD14, Tahoma, serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .fader-container
    {
        box-sizing: border-box;

        width: 40px;
        height: 150px;

        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;

        justify-items: center;
        align-items: start;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        margin-left: 5px;
        margin-right: 5px;
        padding: 0px;
    }

    .fader-track
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        width: 40px;
        height: 100%;

        margin: 0px;
        padding: 0px;

        /* necessary settings, otherwise the SVG backgorund won't display properly: */
        background-size: 100% auto;
        background-size: contain;
        /* background-size: cover; */
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .fader-track-unidirectional
    {
        background-image: url("../assets/fader/fader-vertical-track-opt.svg");
    }

    .fader-track-bidirectional
    {
        background-image: url("../assets/fader/fader-vertical-track-bidirectional-opt.svg");
    }

    .thumb-container
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        width: 100%;
        height: auto;

        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: center;

        margin: 0px;
        padding: 0px;

        /* border: solid 1px grey; */
    }

    .thumb-prefill
    {
        box-sizing: border-box;

        width: 100%;

        margin: 0px;
        padding: 0px;

        /* border: solid 1px hsl(113, 60%, 60%); */
    }

    .thumb
    {
        box-sizing: border-box;

        width: 100%;
        height: 25px;

        margin: 0px;
        padding: 0px;

        /* border: solid 1px hsl(231, 60%, 60%); */

        content: url("../assets/fader/fader-vertical-thumb-grey.svg");
        /* content: url("../assets/fader/fader-vertical-thumb.png"); */
        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        background-attachment: scroll;
    }
</style>