<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { LfoShape } from "../../../model/audio/modulation/unipolar-lfo";
    import { lfoArray } from "../../../constants/shareable-audio-nodes";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import RadioButton from "../../radio-button/RadioButton.svelte";
    import Knob from "../../Knob.svelte";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    const logger: Logger<ILogObj> = new Logger({name: "RadioGroup", minLevel: Settings.minLogLevel });

    let selectedLfoIndex = 0;

    // LFO 1 callbacks and data ****************************************************************************************
    function onLfo1TriangleShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Triangle);
    }

    function onLfo1SawtoothShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Sawtooth);
    }

    function onLfo1SquareShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Square);
    }

    function onLfo1SineShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Sine);
    }

    function onLfo1FreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo1FreqChange(${lfoFreq})`);

        if (lfoArray.length > 0)
            lfoArray[0].setFrequency(lfoFreq);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfo1RadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfo1RadioDataArray[0] = new RadioButtonData(0, "Tri", onLfo1TriangleShapeSelect, true);
    lfo1RadioDataArray[1] = new RadioButtonData(1, "Saw", onLfo1SawtoothShapeSelect);
    lfo1RadioDataArray[2] = new RadioButtonData(2, "Square", onLfo1SquareShapeSelect);
    lfo1RadioDataArray[3] = new RadioButtonData(3, "Sine", onLfo1SineShapeSelect);

    function lfo1RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfo1RadioDataArray.length; i++)
            {
                lfo1RadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfo1RadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }



    // LFO 2 callbacks and data ****************************************************************************************
    function onLfo2TriangleShapeSelect(): void
    {
        logger.debug("onLfo2TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 1)
            lfoArray[1].setShape(LfoShape.Triangle);
    }

    function onLfo2SawtoothShapeSelect(): void
    {
        logger.debug("onLfo2TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 1)
            lfoArray[1].setShape(LfoShape.Sawtooth);
    }

    function onLfo2SquareShapeSelect(): void
    {
        logger.debug("onLfo2TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 1)
            lfoArray[1].setShape(LfoShape.Square);
    }

    function onLfo2SineShapeSelect(): void
    {
        logger.debug("onLfo2TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 1)
            lfoArray[1].setShape(LfoShape.Sine);
    }

    function onLfo2FreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo2FreqChange(${lfoFreq})`);

        if (lfoArray.length > 1)
            lfoArray[1].setFrequency(lfoFreq);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfo2RadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfo2RadioDataArray[0] = new RadioButtonData(0, "Tri", onLfo2TriangleShapeSelect, true);
    lfo2RadioDataArray[1] = new RadioButtonData(1, "Saw", onLfo2SawtoothShapeSelect);
    lfo2RadioDataArray[2] = new RadioButtonData(2, "Square", onLfo2SquareShapeSelect);
    lfo2RadioDataArray[3] = new RadioButtonData(3, "Sine", onLfo2SineShapeSelect);

    function lfo2RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfo2RadioDataArray.length; i++)
            {
                lfo2RadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfo2RadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }

    // LFO 3 callbacks and data ****************************************************************************************
    function onLfo3TriangleShapeSelect(): void
    {
        logger.debug("onLfo3TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 2)
            lfoArray[2].setShape(LfoShape.Triangle);
    }

    function onLfo3SawtoothShapeSelect(): void
    {
        logger.debug("onLfo3TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 2)
            lfoArray[2].setShape(LfoShape.Sawtooth);
    }

    function onLfo3SquareShapeSelect(): void
    {
        logger.debug("onLfo3TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 2)
            lfoArray[2].setShape(LfoShape.Square);
    }

    function onLfo3SineShapeSelect(): void
    {
        logger.debug("onLfo3TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 2)
            lfoArray[2].setShape(LfoShape.Sine);
    }

    function onLfo3FreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo3FreqChange(${lfoFreq})`);

        if (lfoArray.length > 2)
            lfoArray[2].setFrequency(lfoFreq);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfo3RadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfo3RadioDataArray[0] = new RadioButtonData(0, "Tri", onLfo3TriangleShapeSelect, true);
    lfo3RadioDataArray[1] = new RadioButtonData(1, "Saw", onLfo3SawtoothShapeSelect);
    lfo3RadioDataArray[2] = new RadioButtonData(2, "Square", onLfo3SquareShapeSelect);
    lfo3RadioDataArray[3] = new RadioButtonData(3, "Sine", onLfo3SineShapeSelect);

    function lfo3RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfo3RadioDataArray.length; i++)
            {
                lfo3RadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfo3RadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }


    // LFO 4 callbacks and data ****************************************************************************************
    function onLfo4TriangleShapeSelect(): void
    {
        logger.debug("onLfo4TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 3)
            lfoArray[3].setShape(LfoShape.Triangle);
    }

    function onLfo4SawtoothShapeSelect(): void
    {
        logger.debug("onLfo4TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 3)
            lfoArray[3].setShape(LfoShape.Sawtooth);
    }

    function onLfo4SquareShapeSelect(): void
    {
        logger.debug("onLfo4TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 3)
            lfoArray[3].setShape(LfoShape.Square);
    }

    function onLfo4SineShapeSelect(): void
    {
        logger.debug("onLfo4TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 3)
            lfoArray[3].setShape(LfoShape.Sine);
    }

    function onLfo4FreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo4FreqChange(${lfoFreq})`);

        if (lfoArray.length > 3)
            lfoArray[3].setFrequency(lfoFreq);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfo4RadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfo4RadioDataArray[0] = new RadioButtonData(0, "Tri", onLfo4TriangleShapeSelect, true);
    lfo4RadioDataArray[1] = new RadioButtonData(1, "Saw", onLfo4SawtoothShapeSelect);
    lfo4RadioDataArray[2] = new RadioButtonData(2, "Square", onLfo4SquareShapeSelect);
    lfo4RadioDataArray[3] = new RadioButtonData(3, "Sine", onLfo4SineShapeSelect);

    function lfo4RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfo4RadioDataArray.length; i++)
            {
                lfo4RadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfo4RadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }


    // LFO 5 callbacks and data ****************************************************************************************
    function onLfo5TriangleShapeSelect(): void
    {
        logger.debug("onLfo5TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 4)
            lfoArray[4].setShape(LfoShape.Triangle);
    }

    function onLfo5SawtoothShapeSelect(): void
    {
        logger.debug("onLfo5TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 4)
            lfoArray[4].setShape(LfoShape.Sawtooth);
    }

    function onLfo5SquareShapeSelect(): void
    {
        logger.debug("onLfo5TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 4)
            lfoArray[4].setShape(LfoShape.Square);
    }

    function onLfo5SineShapeSelect(): void
    {
        logger.debug("onLfo4TriangleShapeSelect(): triangle shape selected");

        if (lfoArray.length > 3)
            lfoArray[3].setShape(LfoShape.Sine);
    }

        function onLfo5FreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo4FreqChange(${lfoFreq})`);

        if (lfoArray.length > 4)
            lfoArray[4].setFrequency(lfoFreq);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfo5RadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfo5RadioDataArray[0] = new RadioButtonData(0, "Tri", onLfo5TriangleShapeSelect, true);
    lfo5RadioDataArray[1] = new RadioButtonData(1, "Saw", onLfo5SawtoothShapeSelect);
    lfo5RadioDataArray[2] = new RadioButtonData(2, "Square", onLfo5SquareShapeSelect);
    lfo5RadioDataArray[3] = new RadioButtonData(3, "Sine", onLfo5SineShapeSelect);

    function lfo5RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfo5RadioDataArray.length; i++)
            {
                lfo5RadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfo5RadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }
</script>

<div class="main-container">
    <!-- oscillator 1 *********************************************************************************************** -->
    <div class="tab-buttons-container">
        <div class="tab-button">LFO 1</div>
        <div class="tab-button">LFO 2</div>
        <div class="tab-button">LFO 3</div>
        <div class="tab-button">LFO 4</div>
        <div class="tab-button">LFO 5</div>
    </div>

    {#if selectedLfoIndex === 0}
        <div class="tab-content">
            <div class="waveshape-buttons-container">
                <RadioButton radioData={lfo1RadioDataArray[0]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo1RadioDataArray[1]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo1RadioDataArray[2]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo1RadioDataArray[3]} containerCallback={containerCallback}></RadioButton>
            </div>

            <!-- oscillator 1 frequency controls -->
            <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 1}
        <div class="tab-content">
            <div class="waveshape-buttons-container">
                <RadioButton radioData={lfo2RadioDataArray[0]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo2RadioDataArray[1]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo2RadioDataArray[2]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo2RadioDataArray[3]} containerCallback={containerCallback}></RadioButton>
            </div>

            <!-- oscillator 1 frequency controls -->
            <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 2}
        <div class="tab-content">
            <div class="waveshape-buttons-container">
                <RadioButton radioData={lfo3RadioDataArray[0]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo3RadioDataArray[1]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo3RadioDataArray[2]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo3RadioDataArray[3]} containerCallback={containerCallback}></RadioButton>
            </div>

            <!-- oscillator 1 frequency controls -->
            <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 3}
        <div class="tab-content">
            <div class="waveshape-buttons-container">
                <RadioButton radioData={lfo4RadioDataArray[0]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo4RadioDataArray[1]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo4RadioDataArray[2]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo4RadioDataArray[3]} containerCallback={containerCallback}></RadioButton>
            </div>

            <!-- oscillator 1 frequency controls -->
            <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 4}
        <div class="tab-content">
            <div class="waveshape-buttons-container">
                <RadioButton radioData={lfo5RadioDataArray[0]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo5RadioDataArray[1]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo5RadioDataArray[2]} containerCallback={containerCallback}></RadioButton>
                <RadioButton radioData={lfo5RadioDataArray[3]} containerCallback={containerCallback}></RadioButton>
            </div>

            <!-- oscillator 1 frequency controls -->
            <div style="grid-column: 2 / 3; grid-row: 4 / 5;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
            </div>
        </div>
    {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 5px auto 5px auto 15px auto 5px
                                5px
                                5px auto 5px auto 15px auto 5px
                                5px
                                5px auto 5px auto 5px
                                5px
                                5px auto 5px;

        grid-template-rows: 5px
                            auto
                            5px auto 5px auto 5px;

        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        padding: 0px;

        border-radius: 5px;
    }

    .osc1-section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .osc2-section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .sub-osc-top-section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat bottom left;
    }

    .sub-osc-bottom-section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;
        border-top-left-radius: 0px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .noise-osc-section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .title
    {
        pointer-events: none;

        margin: 0px;
        padding: 0px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 25%, 0.6), hsla(220, 20%, 20%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsla(220, 20%, 30%, 0.6), hsla(220, 20%, 25%, 0.6)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(45, 25%, 25%), hsl(45, 25%, 20%)); ok for orange */
        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .toggle-buttons-group
    {
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: space-between;
        /* set alingment on cross-axis */
        align-items: flex-start;
        /* set space between flex lines */
        align-content: center;

        padding: 0px;
        margin: 0px;
    }

    .knob-group
    {
        /* box-sizing: border-box; */

        padding: 0px;
        margin: 0px;

        border-radius: 4px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(217, 14%, 25%), hsl(217, 14%, 20%)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(217, 14%, 22%), hsl(217, 14%, 17%)); */
        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;
    }

    .waveform-button-icon-group
    {
        box-sizing: border-box;

        width: auto;
        height: auto;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        align-content: center;

        padding: 0px;
        margin: 0px;
    }

    .waveform-icon
    {
        padding: 0px;
        margin: 0px;
        margin-left: 2px;

        border: none;

        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        background-size: contain;
        background-attachment: scroll;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .triangle-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-triangle-single-opt.svg");
    }

    .saw-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-saw-single-opt.svg");
    }

    .pulse-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-pulse-single-opt.svg");
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>