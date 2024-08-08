<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { LfoFreqRange, LfoShape } from "../../../model/audio/emitter-node/modulators/unipolar-lfo";
    import { lfoArray } from "../../../constants/shareable-audio-nodes";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import RadioButton from "../../radio-button/RadioButton.svelte";
    import Knob from "../../Knob.svelte";
    import SlideSwitch from "../../SlideSwitch.svelte";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";


    // all the LFOs are inside an array and this is the index of the LFO this component should control
    // this index is a Svelte prop, so it must be passed to this component
    export let lfoIndex: number;

    const logger: Logger<ILogObj> = new Logger({name: "RadioGroup", minLevel: Settings.minLogLevel });

    /* Variable that stores the frequency range of the singel LFO.
    ** This variable is used bothe be the callback and Svelte UI, so it must have this high scope */
    let frequencyRange: LfoFreqRange = LfoFreqRange.Low;

    // LFO callbacks and data ****************************************************************************************
    function onLfoTriangleShapeSelect(): void
    {
        logger.debug("onLfo1TriangleShapeSelect()");

        if (lfoArray.length > lfoIndex)
            lfoArray[lfoIndex].setShape(LfoShape.Triangle);
    }

    function onLfoSawtoothShapeSelect(): void
    {
        logger.debug("onLfo1SawtoothShapeSelect()");

        if (lfoArray.length > lfoIndex)
            lfoArray[lfoIndex].setShape(LfoShape.Sawtooth);
    }

    function onLfoSquareShapeSelect(): void
    {
        logger.debug("onLfo1SquareShapeSelect()");

        if (lfoArray.length > lfoIndex)
            lfoArray[lfoIndex].setShape(LfoShape.Square);
    }

    function onLfoSineShapeSelect(): void
    {
        logger.debug("onLfo1SineShapeSelect()");

        if (lfoArray.length > lfoIndex)
            lfoArray[lfoIndex].setShape(LfoShape.Sine);
    }

    function onLfoFreqChange(lfoFreq: number): void
    {
        logger.debug(`onLfo1FreqChange(${lfoFreq})`);

        if (lfoArray.length > lfoIndex)
            lfoArray[lfoIndex].setFrequency(lfoFreq);
    }

    function onFrequencyRangeChange(selectedOptionIndex: number)
    {
        switch (selectedOptionIndex)
        {
            case 0: frequencyRange = LfoFreqRange.Low; break;

            case 1: frequencyRange = LfoFreqRange.Mid; break;

            case 2: frequencyRange = LfoFreqRange.High; break;
        }

        lfoArray[lfoIndex].setFrequencyRange(frequencyRange);
    }

    // the data for a single radio button consists of an index, a label and the callback
    const lfoRadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfoRadioDataArray[0] = new RadioButtonData(0, "", onLfoTriangleShapeSelect, true);
    lfoRadioDataArray[1] = new RadioButtonData(1, "", onLfoSawtoothShapeSelect);
    lfoRadioDataArray[2] = new RadioButtonData(2, "", onLfoSquareShapeSelect);
    lfoRadioDataArray[3] = new RadioButtonData(3, "", onLfoSineShapeSelect);

    function lfoRadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
    {
        logger.debug(`containerCallback(${radioButtonIndex}, ${isToggled})`);

        // if the radio button is being turned 'on'
        if (isToggled)
        {
            // first, reset visually all radio buttons (so they look in 'off' state)
            for (let i = 0; i <lfoRadioDataArray.length; i++)
            {
                lfoRadioDataArray[i].isToggled = false;
            }

            // then set the toggled button in 'on' state
            lfoRadioDataArray[radioButtonIndex].isToggled = true;
        }
        // else, do nothing
    }
</script>

<div class="main-container">
        <!-- title -->
        <div class="title unselectable" style="grid-column: 1 / 8; grid-row: 1 / 2;">LFO {lfoIndex + 1}</div>

        <div style="grid-column: 1 / 2; grid-row: 3 / 4;">
            <RadioButton radioData={lfoRadioDataArray[0]} containerCallback={lfoRadioContainerCallback} buttonWidth={18}></RadioButton>
        </div>
        <div class="waveform-icon triangle-icon" style="grid-column: 1 / 2; grid-row: 5 / 6;"></div>

        <div style="grid-column: 3 / 4; grid-row: 3 / 4;">
            <RadioButton radioData={lfoRadioDataArray[1]} containerCallback={lfoRadioContainerCallback} buttonWidth={18}></RadioButton>
        </div>
        <div class="waveform-icon saw-icon" style="grid-column: 3 / 4; grid-row: 5 / 6;"></div>

        <div style="grid-column: 5 / 6; grid-row: 3 / 4;">
            <RadioButton radioData={lfoRadioDataArray[2]} containerCallback={lfoRadioContainerCallback} buttonWidth={18}></RadioButton>
        </div>
        <div class="waveform-icon square-icon" style="grid-column: 5 / 6; grid-row: 5 / 6;"></div>

        <div style="grid-column: 7 / 8; grid-row: 3 / 4;">
            <RadioButton radioData={lfoRadioDataArray[3]} containerCallback={lfoRadioContainerCallback} buttonWidth={18}></RadioButton>
        </div>
        <div class="waveform-icon sine-icon" style="grid-column: 7 / 8; grid-row: 5 / 6;"></div>

        <div style="grid-column: 1 / 8; grid-row: 7 / 8;">
            <SlideSwitch optionsArray={["0 - 5 Hz", "5 - 50 Hz", "50 - 2k Hz"]} onToggleChange={onFrequencyRangeChange}></SlideSwitch>
        </div>
    
        <!-- the knob for frequency change is different depending on the frequency range of the LFO (the min. and max. limits vary)-->
        {#if frequencyRange === LfoFreqRange.Low}
            <div style="grid-column: 3 / 6; grid-row: 9 / 10;">
                <Knob label={"Rate"} minValue={Settings.minLfoLowAbsoluteFrequency} maxValue={Settings.maxLfoLowAbsoluteFrequency} initialValue={Settings.defaultLfoLowAbsoluteFrequency}
                    step={0.01} decimals={2} onValueChange={onLfoFreqChange}></Knob>
            </div>
        {:else if frequencyRange === LfoFreqRange.Mid}
            <div style="grid-column: 3 / 6; grid-row: 9 / 10;">
                <Knob label={"Rate"} minValue={Settings.minLfoMidAbsoluteFrequency} maxValue={Settings.maxLfoMidAbsoluteFrequency} initialValue={Settings.defaultLfoMidAbsoluteFrequency}
                    step={1} decimals={1} onValueChange={onLfoFreqChange}></Knob>
            </div>
        {:else if frequencyRange === LfoFreqRange.High}
            <div style="grid-column: 3 / 6; grid-row: 9 / 10;">
                <Knob label={"Rate"} minValue={Settings.minLfoHighAbsoluteFrequency} maxValue={Settings.maxLfoHighAbsoluteFrequency} initialValue={Settings.defaultLfoHighAbsoluteFrequency}
                    step={1} decimals={0} onValueChange={onLfoFreqChange}></Knob>
            </div>
        {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 250px; */

        display: grid;
        grid-template-columns: auto 2px /* toggle button */
                                auto 5px /* icon */
                                auto 2px /* toggle button */
                                auto; /* icon */
        grid-template-rows: auto 5px /* label */
                            auto 5px /* toggle buttons */
                            auto 15px /* toggle buttons */
                            auto 5px /* frequency range selector */
                            auto; /* frequency knob */

        justify-items: stretch;
        align-items: center;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 0px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 0px;
    }

    .title
    {
        margin: 0px;
        padding: 5px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .waveform-icon
    {
        width: 12px;
        height: 12px;

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
        background-image: url("../../../assets/icons/wave-triangle-single-opt.svg");
    }

    .saw-icon
    {
        background-image: url("../../../assets/icons/wave-saw-single-opt.svg");
    }

    .square-icon
    {
        background-image: url("../../../assets/icons/wave-pulse-single-opt.svg");
    }

    .sine-icon
    {
        background-image: url("../../../assets/icons/wave-sine-single-opt.svg");
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>