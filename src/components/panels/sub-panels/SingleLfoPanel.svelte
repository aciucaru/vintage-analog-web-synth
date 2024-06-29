<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { LfoShape } from "../../../model/audio/modulation/unipolar-lfo";
    import { lfoArray } from "../../../constants/shareable-audio-nodes";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import RadioButton from "../../radio-button/RadioButton.svelte";
    import Knob from "../../Knob.svelte";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // all the LFOs are inside an array and this is the index of the LFO this component should control
    // this index is a Svelte prop, so it must be passed to this component
    export let lfoIndex: number;

    const logger: Logger<ILogObj> = new Logger({name: "RadioGroup", minLevel: Settings.minLogLevel });

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

    // the data for a single radio button consists of an index, a label and the callback
    const lfoRadioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(4);
    lfoRadioDataArray[0] = new RadioButtonData(0, "", onLfoTriangleShapeSelect, true);
    lfoRadioDataArray[1] = new RadioButtonData(1, "", onLfoSawtoothShapeSelect);
    lfoRadioDataArray[2] = new RadioButtonData(2, "", onLfoSquareShapeSelect);
    lfoRadioDataArray[3] = new RadioButtonData(3, "", onLfoSineShapeSelect);

    function lfo1RadioContainerCallback(radioButtonIndex: number, isToggled: boolean)
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
        <div class="title unselectable" style="grid-column: 1 / 6; grid-row: 3 / 4;">LFO {lfoIndex + 1}</div>

        <div style="grid-column: 1 / 3; grid-row: 5 / 6;">
            <RadioButton radioData={lfoRadioDataArray[0]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
        </div>
        <div class="waveform-icon triangle-icon" style="grid-column: 4 / 6; grid-row: 5 / 6;"></div>

        <div style="grid-column: 1 / 3; grid-row: 7 / 8;">
            <RadioButton radioData={lfoRadioDataArray[1]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
        </div>
        <div class="waveform-icon saw-icon" style="grid-column: 4 / 6; grid-row: 7 / 8;"></div>

        <div style="grid-column: 1 / 3; grid-row: 9 / 10;">
            <RadioButton radioData={lfoRadioDataArray[2]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
        </div>
        <div class="waveform-icon square-icon" style="grid-column: 4 / 6; grid-row: 9 / 10;"></div>

        <div style="grid-column: 1 / 3; grid-row: 11 / 12;">
            <RadioButton radioData={lfoRadioDataArray[3]} containerCallback={lfo1RadioContainerCallback}></RadioButton>
        </div>
        <div class="waveform-icon sine-icon" style="grid-column: 4 / 6; grid-row: 11 / 12;"></div>

        <div style="grid-column: 1 / 6; grid-row: 13 / 14;">
            <Knob label={"Rate"} minValue={Settings.minLfoAbsoluteFrequency} maxValue={Settings.maxLfoAbsoluteFrequency} initialValue={Settings.defaultLfoAbsoluteFrequency}
                step={1} decimals={0} onValueChange={onLfoFreqChange}></Knob>
        </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px auto 5px auto 16px;
        grid-template-rows: 16px
                            5px auto
                            5px auto 5px auto 5px auto 5px auto
                            5px auto 5px
                            16px;

        justify-items: stretch;
        align-items: start;
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
        padding: 0px;

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