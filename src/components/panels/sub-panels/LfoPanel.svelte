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

    // tab selection index
    let selectedLfoIndex = 0;

    // tab styles
    let tab1ButtonStyle = "tab-button tab-button-selected unselectable";
    let tab2ButtonStyle = "tab-button tab-button-unselected unselectable";
    let tab3ButtonStyle = "tab-button tab-button-unselected unselectable";
    let tab4ButtonStyle = "tab-button tab-button-unselected unselectable";
    let tab5ButtonStyle = "tab-button tab-button-unselected unselectable";

    // tab selection callbacks:
    function onTab1Select(): void
    {
        logger.debug("onTab1Select(): tab index 0");
        selectedLfoIndex = 0;
    }

    function onTab2Select(event: Event): void
    {
        logger.debug("onTab2Select(): tab index 1");
        selectedLfoIndex = 1;
    }

    function onTab3Select(event: Event): void
    {
        logger.debug("onTab3Select(): tab index 2");
        selectedLfoIndex = 2;
    }

    function onTab4Select(event: Event): void
    {
        logger.debug("onTab4Select(): tab index 3");
        selectedLfoIndex = 3;
    }

    function onTab5Select(event: Event): void
    {
        logger.debug("onTab5Select(): tab index 4");
        selectedLfoIndex = 4;
    }

    // LFO 1 callbacks and data ****************************************************************************************
    function onLfo1TriangleShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect()");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Triangle);
    }

    function onLfo1SawtoothShapeSelect(): void
    {
        logger.debug("onLfo1SawtoothShapeSelect()");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Sawtooth);
    }

    function onLfo1SquareShapeSelect(): void
    {
        logger.debug("onLfo1SquareShapeSelect()");

        if (lfoArray.length > 0)
            lfoArray[0].setShape(LfoShape.Square);
    }

    function onLfo1SineShapeSelect(): void
    {
        logger.debug("onLfo1SineShapeSelect()");

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
    lfo1RadioDataArray[0] = new RadioButtonData(0, "", onLfo1TriangleShapeSelect, true);
    lfo1RadioDataArray[1] = new RadioButtonData(1, "", onLfo1SawtoothShapeSelect);
    lfo1RadioDataArray[2] = new RadioButtonData(2, "", onLfo1SquareShapeSelect);
    lfo1RadioDataArray[3] = new RadioButtonData(3, "", onLfo1SineShapeSelect);

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
    lfo2RadioDataArray[0] = new RadioButtonData(0, "", onLfo2TriangleShapeSelect, true);
    lfo2RadioDataArray[1] = new RadioButtonData(1, "", onLfo2SawtoothShapeSelect);
    lfo2RadioDataArray[2] = new RadioButtonData(2, "", onLfo2SquareShapeSelect);
    lfo2RadioDataArray[3] = new RadioButtonData(3, "", onLfo2SineShapeSelect);

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
    lfo3RadioDataArray[0] = new RadioButtonData(0, "", onLfo3TriangleShapeSelect, true);
    lfo3RadioDataArray[1] = new RadioButtonData(1, "", onLfo3SawtoothShapeSelect);
    lfo3RadioDataArray[2] = new RadioButtonData(2, "", onLfo3SquareShapeSelect);
    lfo3RadioDataArray[3] = new RadioButtonData(3, "", onLfo3SineShapeSelect);

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
    lfo4RadioDataArray[0] = new RadioButtonData(0, "", onLfo4TriangleShapeSelect, true);
    lfo4RadioDataArray[1] = new RadioButtonData(1, "", onLfo4SawtoothShapeSelect);
    lfo4RadioDataArray[2] = new RadioButtonData(2, "", onLfo4SquareShapeSelect);
    lfo4RadioDataArray[3] = new RadioButtonData(3, "", onLfo4SineShapeSelect);

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
    lfo5RadioDataArray[0] = new RadioButtonData(0, "", onLfo5TriangleShapeSelect, true);
    lfo5RadioDataArray[1] = new RadioButtonData(1, "", onLfo5SawtoothShapeSelect);
    lfo5RadioDataArray[2] = new RadioButtonData(2, "", onLfo5SquareShapeSelect);
    lfo5RadioDataArray[3] = new RadioButtonData(3, "", onLfo5SineShapeSelect);

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

    // recompute the tab button styles for each button, using Svelte reactive statement ($:)
    $: tab1ButtonStyle = selectedLfoIndex === 0 ? "tab-button tab-button-selected unselectable" : "tab-button tab-button-unselected unselectable";
    $: tab2ButtonStyle = selectedLfoIndex === 1 ? "tab-button tab-button-selected unselectable" : "tab-button tab-button-unselected unselectable";
    $: tab3ButtonStyle = selectedLfoIndex === 2 ? "tab-button tab-button-selected unselectable" : "tab-button tab-button-unselected unselectable";
    $: tab4ButtonStyle = selectedLfoIndex === 3 ? "tab-button tab-button-selected unselectable" : "tab-button tab-button-unselected unselectable";
    $: tab5ButtonStyle = selectedLfoIndex === 4 ? "tab-button tab-button-selected unselectable" : "tab-button tab-button-unselected unselectable";
</script>

<div class="main-container">
    <!-- oscillator 1 *********************************************************************************************** -->
    <div class="tab-buttons-container">
        <div class={tab1ButtonStyle} on:click={onTab1Select}>LFO 1</div>
        <div class={tab2ButtonStyle} on:click={onTab2Select}>LFO 2</div>
        <div class={tab3ButtonStyle} on:click={onTab3Select}>LFO 3</div>
        <div class={tab4ButtonStyle} on:click={onTab4Select}>LFO 4</div>
        <div class={tab5ButtonStyle} on:click={onTab5Select}>LFO 5</div>
    </div>

    {#if selectedLfoIndex === 0}
        <div class="lfo-editor">
            <div style="grid-column: 1 / 2; grid-row: 1 / 2;">
                <RadioButton radioData={lfo1RadioDataArray[0]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon triangle-icon" style="grid-column: 2 / 3; grid-row: 1 / 2;"></div>

            <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
                <RadioButton radioData={lfo1RadioDataArray[1]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon saw-icon" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>

            <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
                <RadioButton radioData={lfo1RadioDataArray[2]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon square-icon" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>

            <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
                <RadioButton radioData={lfo1RadioDataArray[3]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon sine-icon" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>

            <div style="grid-column: 5 / 6; grid-row: 1 / 3;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfo1FreqChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 1}
        <div class="lfo-editor">
            <div style="grid-column: 1 / 2; grid-row: 1 / 2;">
                <RadioButton radioData={lfo2RadioDataArray[0]} containerCallback={lfo2RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon triangle-icon" style="grid-column: 2 / 3; grid-row: 1 / 2;"></div>

            <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
                <RadioButton radioData={lfo2RadioDataArray[1]} containerCallback={lfo2RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon saw-icon" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>

            <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
                <RadioButton radioData={lfo2RadioDataArray[2]} containerCallback={lfo2RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon square-icon" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>

            <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
                <RadioButton radioData={lfo2RadioDataArray[3]} containerCallback={lfo2RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon sine-icon" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>

            <div style="grid-column: 5 / 6; grid-row: 1 / 3;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfo2FreqChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 2}
        <div class="lfo-editor">
            <div style="grid-column: 1 / 2; grid-row: 1 / 2;">
                <RadioButton radioData={lfo3RadioDataArray[0]} containerCallback={lfo3RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon triangle-icon" style="grid-column: 2 / 3; grid-row: 1 / 2;"></div>

            <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
                <RadioButton radioData={lfo3RadioDataArray[1]} containerCallback={lfo3RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon saw-icon" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>

            <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
                <RadioButton radioData={lfo3RadioDataArray[2]} containerCallback={lfo3RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon square-icon" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>

            <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
                <RadioButton radioData={lfo3RadioDataArray[3]} containerCallback={lfo3RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon sine-icon" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>

            <div style="grid-column: 5 / 6; grid-row: 1 / 3;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfo3FreqChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 3}
        <div class="lfo-editor">
            <div style="grid-column: 1 / 2; grid-row: 1 / 2;">
                <RadioButton radioData={lfo4RadioDataArray[0]} containerCallback={lfo4RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon triangle-icon" style="grid-column: 2 / 3; grid-row: 1 / 2;"></div>

            <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
                <RadioButton radioData={lfo4RadioDataArray[1]} containerCallback={lfo4RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon saw-icon" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>

            <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
                <RadioButton radioData={lfo4RadioDataArray[2]} containerCallback={lfo4RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon square-icon" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>
            
            <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
                <RadioButton radioData={lfo4RadioDataArray[3]} containerCallback={lfo4RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon sine-icon" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>
            
            <div style="grid-column: 5 / 6; grid-row: 1 / 3;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfo4FreqChange}></Knob>
            </div>
        </div>
    {/if}

    {#if selectedLfoIndex === 4}
        <div class="lfo-editor">
            <div style="grid-column: 1 / 2; grid-row: 1 / 2;">
                <RadioButton radioData={lfo5RadioDataArray[0]} containerCallback={lfo5RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon triangle-icon" style="grid-column: 2 / 3; grid-row: 1 / 2;"></div>

            <div style="grid-column: 3 / 4; grid-row: 1 / 2;">
                <RadioButton radioData={lfo5RadioDataArray[1]} containerCallback={lfo5RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon saw-icon" style="grid-column: 4 / 5; grid-row: 1 / 2;"></div>

            <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
                <RadioButton radioData={lfo5RadioDataArray[2]} containerCallback={lfo5RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon square-icon" style="grid-column: 2 / 3; grid-row: 2 / 3;"></div>

            <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
                <RadioButton radioData={lfo5RadioDataArray[3]} containerCallback={lfo5RadioContainerCallback}></RadioButton>
            </div>
            <div class="waveform-icon sine-icon" style="grid-column: 4 / 5; grid-row: 2 / 3;"></div>

            <div style="grid-column: 5 / 6; grid-row: 1 / 3;">
                <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfo5FreqChange}></Knob>
            </div>
        </div>
    {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: center;

        padding: 5px;
        margin: 0px;

        margin: 0px;
        padding: 0px;

        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .tab-buttons-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: center;

        margin: 5px;
        padding: 0px;
    }

    .tab-button
    {
        margin: 0px;
        margin-left: 2px;
        padding: 5px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .tab-button-selected
    {
        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;
    }

    .tab-button-unselected
    {
        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;
    }


    .lfo-editor
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: repeat(5, auto);

        grid-template-rows: auto auto;

        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 5px;

        margin: 5px;
        padding: 0px;
    }

    .label
    {
        margin: 0px;
        padding: 0px;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
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

    .square-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-pulse-single-opt.svg");
    }

    .sine-icon
    {
        width: 16px;
        height: 16px;

        background-image: url("../../../assets/icons/wave-sine-single-opt.svg");
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>