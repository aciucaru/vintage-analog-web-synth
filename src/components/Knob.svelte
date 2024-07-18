<script lang="ts">
    import { onMount } from "svelte";
    import { Settings } from "../constants/settings";
    
    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // props:
    // the title below the knob
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

    // the width and height of the knob (and the canvas)
    export let knobWidth: number = 50;

    /* the event handler (callback) prop the knob will call when it's rotated
    ** this event receives the new value set by the knob */
    export let onValueChange: (newValue: number) => void;

    const logger: Logger<ILogObj> = new Logger({name: "Knob", minLevel: Settings.minLogLevel });

    // if the numeric value should be displayed or not; default is true
    let showValue: boolean = false;

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

    // the width and height of the canvas
    const WIDTH = knobWidth;
    const HEIGHT = knobWidth;

    // the canvas and related graphic context
    let canvas: HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D | null;

    onMount( async () =>
        {
            context2D = canvas.getContext("2d");
            drawCanvas();
        }
    );

    function onMouseDown(event: Event): void
    {
        onMouseDownY = (event as MouseEvent).clientY;

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);

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
        const MAX_MOUSE_MOVEMENT = 2 * HEIGHT;

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

        // // call the event handler (callback) and pass it the new value
        onValueChange(newAbsoluteValue);

        // redraw the knob pointer
        drawCanvas();  
    }

    // this function should only remove event listeners 
    function onMouseUp(event: Event): void
    {
        showValue = false;

        // assign new value
        absoluteValue = newAbsoluteValue;

        // call the event handler (callback) and pass it the new value
        // onValueChange(newAbsoluteValue);

        // reset the increment in steps
        currentIncrementedSteps = 0;

        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    function drawCanvas(): void
    {
        if (context2D)
        {
            // the width and height of the knob black rectangular pointer
            const POINTER_INNER_DIAM = 0.1 * WIDTH;
            const POINTER_OUTER_DIAM = 0.6 * WIDTH;
            const POINTER_WIDTH = POINTER_OUTER_DIAM / 2.0 - POINTER_INNER_DIAM / 2.0;
            const POINTER_HEIGHT = 0.06 * WIDTH;

            // the radius of the circle on which the knob pointer orbits, should always be smaller than half the canvas width;
            // basically, it's the radius of the orbit of the knob pointer
            const POINTER_CENTER_RADIUS = (POINTER_INNER_DIAM + POINTER_OUTER_DIAM) / 4.0;

            // the width and height of the knob white rectangular mark
            const MARK_INNER_DIAM = 1.15 * POINTER_INNER_DIAM;
            const MARK_OUTER_DIAM = 0.85 * POINTER_OUTER_DIAM;
            const MARK_WIDTH = MARK_OUTER_DIAM / 2.0 - MARK_INNER_DIAM / 2.0;
            const MARK_HEIGHT = 0.4 * POINTER_HEIGHT;

            // the angles correponding to min and max position (in radians)
            const startAngle = 120 * Math.PI / 180.0;
            const endAngle = 420 * Math.PI / 180.0;

            // the 'normalized' value of the knob (e.g. the value between 0.0 and 1.0)
            const normalizedValue = (newAbsoluteValue - minValue) / (maxValue - minValue);

            const pointerAngle = startAngle * (1.0 - normalizedValue) + endAngle * normalizedValue;
            const pointerCenterX = WIDTH / 2.0 + Math.cos(pointerAngle) * POINTER_CENTER_RADIUS;
            const pointerCenterY = HEIGHT / 2.0 + Math.sin(pointerAngle) * POINTER_CENTER_RADIUS;

            // before every drawing, clear the previous drawing
            context2D.clearRect(0, 0, WIDTH, HEIGHT);

            // apply translation and rotation
            context2D.translate(pointerCenterX, pointerCenterY);
            context2D.rotate(pointerAngle);

            // draw main black rectangle
            context2D.fillStyle = `hsla(0, 0%, 10%, 0.8)`;
            context2D.fillRect(-POINTER_WIDTH / 2.0, -POINTER_HEIGHT / 2.0, POINTER_WIDTH, POINTER_HEIGHT);

            // draw white mark
            context2D.fillStyle = `hsl(0, 0%, 80%)`;
            context2D.fillRect(-MARK_WIDTH / 2.0, -MARK_HEIGHT / 2.0, MARK_WIDTH, MARK_HEIGHT);

            // reset transformation matrix to the identity matrix
            context2D.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
</script>

<div class="main-container">
    <canvas bind:this={canvas} width="{WIDTH}" height="{HEIGHT}" on:mousedown={onMouseDown} class="knob-canvas unselectable"></canvas>

    <!-- if the user has supplied a label -->
    {#if label.length > 0}
        <!-- if the numeric value should be displayed -->
        {#if showValue}
            <div class="numeric-value unselectable">{absoluteValueString}</div>
        <!-- if the label should be displayed -->
        {:else}
            <div class="label unselectable">{label}</div>
        {/if}
    {/if}
</div>

<style>
    .main-container
    {
        --knob-width: 50px;
        --knob-height: 50px;
        --text-height: 12px;

        box-sizing: border-box;

        width: var(--knob-width);

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: flex-start;
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

        width: var(--knob-width);
        height: calc(var(--text-height) + 4px);

        margin: 0px;
        padding: 0px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: var(--text-height);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .knob-canvas
    {
        background-image: url("../assets/knob/knob-opt.svg");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-attachment: scroll;
        filter: brightness(0.95);
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

        width: var(--knob-width);
        height: calc(var(--text-height) + 4px);

        margin: 0px;
        padding: 0px;

        color: hsl(210, 30%, 60%);
        font-family: monospace, monospace; /* we use 'monospace' twice for browser compatibility */
        font-size: var(--text-height);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>