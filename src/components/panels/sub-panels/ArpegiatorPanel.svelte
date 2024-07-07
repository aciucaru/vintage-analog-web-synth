<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as arpegiatorCallbacks from "../../../callbacks/arpegiator-callbacks";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import NumericScreen from "../../NumericScreen.svelte";
    import RadioGroup from "../../radio-button/RadioGroup.svelte";
    import { ToggleButtonData } from "../../../model/gui/toggle-button-data";
    import ToggleButton from "../../toggle/ToggleButton.svelte";

    // const onToggleOnOff = new ToggleButtonData("On/Off", arpegiatorCallbacks.onToggleOnOff, false);
    // const onToggleRetrigger = new ToggleButtonData("Retrigger", arpegiatorCallbacks.onToggleRetrigger, false);
    
    // noise oscillator callbacks and data ****************************************************************************************
    /* the radio group must receive an array of button data and will create as many radio
    ** buttons as there are elements in the array;
    ** the data for a single radio button consists of a label and the callback */
    const radioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(3);
    radioDataArray[0] = new RadioButtonData(0, "Up", arpegiatorCallbacks.onUpDownModeSelect, true);
    radioDataArray[1] = new RadioButtonData(1, "Down", arpegiatorCallbacks.onDownModeSelect);
    radioDataArray[2] = new RadioButtonData(2, "UpDown", arpegiatorCallbacks.onUpDownModeSelect);
</script>

<div class="main-container">
    <!-- main title -->
    <div class="title" style="grid-column: 1 / 5; grid-row: 1 / 2;">SEQUENCER</div>

    <!-- mixer knobs -->
    <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
        <!-- <ToggleButton toggleData={onToggleOnOff}></ToggleButton> -->
    </div>

    <div style="grid-column: 2 / 3; grid-row: 2 / 3;">
        <!-- <ToggleButton toggleData={onToggleRetrigger}></ToggleButton> -->
    </div>

    <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
        <NumericScreen label={"Min keys"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={arpegiatorCallbacks.onMinKeysChange}></NumericScreen>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 2 / 3;">
        <NumericScreen label={"Tempo"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={arpegiatorCallbacks.onMinKeysChange}></NumericScreen>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 2 / 3;">
        <NumericScreen label={"Clock"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={arpegiatorCallbacks.onMinKeysChange}></NumericScreen>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 2 / 3;">
        <NumericScreen label={"Octaves"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={arpegiatorCallbacks.onMinKeysChange}></NumericScreen>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 2 / 3;">
        <RadioGroup radioDataArray={radioDataArray}></RadioGroup>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: repeat(4, auto);
        grid-template-rows: repeat(3, auto);

        justify-items: stretch;
        align-items: center;
        justify-content: center;
        gap: 5px;

        margin: 0px;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px;
        /* padding: 0px; */

        /* border: solid 1px hsla(0, 0%, 100%, 0.25); */
        border-radius: 5px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(230, 20%, 20%), hsl(230, 20%, 10%)); also ok */
        background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%));
        /* background: url("../../assets/texture-01.png"), linear-gradient(160deg, hsla(230, 10%, 15%, 0.8), hsla(230, 10%, 10%, 0.8)); */

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .title
    {
        pointer-events: none;

        justify-self: stretch;
        align-self: stretch;

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

    .param-title
    {
        pointer-events: none;

        margin: 0px;
        padding: 0px;

        writing-mode: sideways-lr;
        text-orientation: mixed;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .knob-group
    {
        box-sizing: border-box;

        justify-self: stretch;
        align-self: stretch;

        padding: 0px;
        margin: 0px;

        border-radius: 4px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(217, 14%, 25%), hsl(217, 14%, 20%)); */
        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(217, 14%, 22%), hsl(217, 14%, 17%)); */
        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;
    }
</style>