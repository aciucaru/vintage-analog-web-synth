<script lang="ts">
    import { onMount } from "svelte";
    import { Settings } from "../constants/settings";
    
    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // props:
    // the title below the screen
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

    export let textColor: {hue: number; saturation: number; lightness: number} = {hue: 210, saturation: 45, lightness: 40};

    /* the event handler (callback) prop the knob will call when it's rotated
    ** this event receives the new value set by the knob */
    export let onValueChange: (newValue: number) => void;

    const logger: Logger<ILogObj> = new Logger({name: "Knob", minLevel: Settings.minLogLevel });

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

    // the width and height of the LCD screen
    const WIDTH = 50;
    const HEIGHT = 30;

    let numericControl: HTMLDivElement;

    function onMouseDown(event: Event): void
    {
        logger.debug(`onMouseDown()`);

        onMouseDownY = (event as MouseEvent).clientY;

        numericControl.addEventListener('mousemove', onMouseMove);
        numericControl.addEventListener('mouseup', onMouseUp);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(event: Event): void
    {
        // how many steps are between minValue and maxValue
        const STEP_COUNT = Math.floor((maxValue - minValue) / step) + 1;

        /* the height in pixels that the mouse must move to change the value by 100% (up or down);
        ** changing the value by 100% means changing the value by (maxValue - minValue);
        ** basically, when the mouse moves with MAX_MOUSE_MOVEMENT pixels, the value of the knob changes by
        ** the maximum amount (maxValue - minValue) and when the mouse does not move at all (0), the value
        ** of the knob does not change either;
        ** so, when mouse movement = 0, the value change = 0
        **     when mouse movement = MAX_MOUSE_MOVEMENT, the value change = (maxValue - minValue), maximum possible */
        const MAX_MOUSE_MOVEMENT = 4 * HEIGHT;

        // how many pixels the mouse must move up or down to change the value by 1 step
        const PIXELS_PER_STEP = MAX_MOUSE_MOVEMENT / STEP_COUNT;

        // the Y value when the mouse is moving; this is waht actually changes everytime the user moves the mouse
        const onMouseMoveY = (event as MouseEvent).clientY;

        // find out how mouch the mouse has moved (in pixels) relative to the mousedown event;
        // this is measured in "absolute mode" (e.g. pixels) and is always positive
        const mouseYMovement = Math.abs(onMouseDownY - onMouseMoveY);

        // find how many steps the mouse moved
        currentIncrementedSteps = Math.floor(mouseYMovement / PIXELS_PER_STEP);

        // then check the direction of the movement: up or down
        if (onMouseMoveY < onMouseDownY) // mouse was moved up
            // when the mouse moves up, the value should increase
            newAbsoluteValue = absoluteValue + currentIncrementedSteps * step;
        else // mouse was moved down
            // when the mouse moves down, the value should decrease
            newAbsoluteValue = absoluteValue - currentIncrementedSteps * step;

        // truncate knob value to it's bounds
        if (newAbsoluteValue < minValue)
            newAbsoluteValue = minValue;

        if (newAbsoluteValue > maxValue)
            newAbsoluteValue = maxValue;

        /* and recompute the string version of the absolute value
        ** the numeric value inside the string is multiplied witht the display factor, so it
        ** could be larger or smaller than the actual stored absolute value */
        absoluteValueString = `${ (displayFactor * newAbsoluteValue).toFixed(decimals) }`;

        logger.debug(`onMouseMove(): ${absoluteValueString}`);

        // // call the event handler (callback) and pass it the new value
        // onValueChange(newAbsoluteValue);
    }

    // this function should only remove event listeners 
    function onMouseUp(event: Event): void
    {
        // assign new value
        absoluteValue = newAbsoluteValue;

        // call the event handler (callback) and pass it the new value
        onValueChange(newAbsoluteValue);

        // reset the increment in steps
        currentIncrementedSteps = 0;

        numericControl.removeEventListener('mousemove', onMouseMove);
        numericControl.removeEventListener('mouseup', onMouseUp);

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
</script>

<div class="main-container unselectable" style={`--screenWidth: ${WIDTH}px; --screenTextColor: hsl(${textColor.hue}, ${textColor.saturation}%, ${textColor.lightness}%);`}>
    <slot name="screenBackground">
        <div class="lcd-screen">
            <div bind:this={numericControl} on:mousedown={onMouseDown} class="numeric-value unselectable">{absoluteValueString}</div>
        </div>
    </slot>

    {#if label.length > 0}
        <div class="label unselectable">{label}</div>
    {/if}
</div>

<style>
    .main-container
    {
        --screenTextHeight: 16px;
        --label-text-height: 12px;

        box-sizing: border-box;

        width: var(--screenWidth);
        height: calc(var(--textHeight) + 10px);

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 0px;
    }

    .label
    {
        box-sizing: border-box;

        width: var(--screenWidth);
        height: calc(var(--label-text-height) + 4px);

        margin: 5px;
        padding: 0px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: var(--label-text-height);
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
        box-sizing: border-box;

        width: var(--screenWidth);
        height: calc(var(--screenTextHeight) + 10px);

        margin: 0px;
        padding: 5px;

        /* background-color: hsl(200, 10%, 50%);
        border: solid 1px hsl(0, 0%, 10%); */

        color: var(--screenTextColor);
        font-family: LCD14, Tahoma, serif;
        font-size: var(--screenTextHeigh);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .lcd-screen
    {
        border-radius: 3px;
        border: solid 1px;
        border-top-color: hsla(228, 47%, 0%, 0.2);
        border-bottom-color: hsla(228, 47%, 40%, 0.2);
        border-left-color: hsla(228, 47%, 10%, 0.2);
        border-right-color: hsla(228, 47%, 80%, 0.2);

        background: linear-gradient(hsl(216, 5%, 10%) 0%, hsl(207, 5%, 5%) 50%);

        box-shadow: inset 1px 1px 4px 1px hsl(0, 0%, 0%);
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>