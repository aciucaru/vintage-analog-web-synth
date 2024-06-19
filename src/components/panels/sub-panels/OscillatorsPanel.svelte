<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import * as oscCallbacks from "../../../callbacks/oscillators-callbacks";
    import * as mixerCallbacks from "../../../callbacks/mixer-callbacks";

    import { ButtonIcon, ToggleButtonData } from "../../../model/gui/toggle-button-data";
    import { RadioButtonData } from "../../../model/gui/radio-button-data";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";
    import RadioGroup from "../../radio-button/RadioGroup.svelte";

    // oscillator 1 callbacks *********************************************************************
    const osc1TriangleToggleData = new ToggleButtonData("TRI", oscCallbacks.onOsc1TriangleSelect, true);
    const osc1SawToggleData = new ToggleButtonData("SAW", oscCallbacks.onOsc1SawSelect);
    const osc1PulseToggleData = new ToggleButtonData("PULSE", oscCallbacks.onOsc1PulseSelect);

    // oscillator 2 callbacks **************************************************************************
    const osc2TriangleToggleData = new ToggleButtonData("TRI", oscCallbacks.onOsc2TriangleSelect, true);
    const osc2SawToggleData = new ToggleButtonData("SAW", oscCallbacks.onOsc2SawSelect);
    const osc2PulseToggleData = new ToggleButtonData("PULSE", oscCallbacks.onOsc2PulseSelect);

    // noise oscillator callbacks and data ****************************************************************************************
    /* the radio group must receive an array of button data and will create as many radio
    ** buttons as there are elements in the array;
    ** the data for a single radio button consists of a label and the callback */
    const radioDataArray: Array<RadioButtonData> = new Array<RadioButtonData>(3);
    radioDataArray[0] = new RadioButtonData(0, "White", oscCallbacks.onWhiteNoiseSelect, true);
    radioDataArray[1] = new RadioButtonData(1, "Pink", oscCallbacks.onPinkNoiseSelect);
    radioDataArray[2] = new RadioButtonData(2, "Brown", oscCallbacks.onBrownNoiseSelect);
</script>

<div class="main-container">
    <!-- oscillator 1 *********************************************************************************************** -->
    <div class="osc1-section-background" style="grid-column: 1 / 8; grid-row: 1 / 15;"></div>

    <!-- oscillator 1 section title -->
    <div class="title" style="grid-column: 2 / 7; grid-row: 2 / 3;">OSC 1</div>

    <!-- <div class="knob-group" style="grid-column: 3 / 6; grid-row: 2 / 3;"></div>
    <div class="knob-group" style="grid-column: 2 / 3; grid-row: 3 / 4;"></div>
    <div class="knob-group" style="grid-column: 3 / 6; grid-row: 3 / 4;"></div> -->

    <!-- oscillator 1 frequency controls -->
    <div style="grid-column: 2 / 3; grid-row: 4 / 6;">
        <Knob title={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1OctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 4 / 6;">
        <Knob title={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1SemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 4 / 6;">
        <Knob title={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1CentsOffsetChange}></Knob>
    </div>

    <!-- oscillator 1 unison controls -->
    <div style="grid-column: 2 / 3; grid-row: 7 / 9;">
        <Knob title={"Detune"} minValue={Settings.minOscUnisonCentsDetune} maxValue={Settings.maxOscUnisonCentsDetune} initialValue={Settings.defaultOscUnisonCentsDetune}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc1DetuneChange}></Knob>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 7 / 9;">
        <Knob title={"Blend"} minValue={Settings.minOscUnisonBlend} maxValue={Settings.maxOscUnisonBlend} initialValue={Settings.defaultOscUnisonBlend}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc1BlendChange}></Knob>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 7 / 9;">
        free
    </div>

    <!-- oscillator 1 shape, pulse width and volume controls -->
    <div class="toggle-buttons-group" style="grid-column: 2 / 3; grid-row: 12 / 14;">
        <ToggleButton toggleData={osc1TriangleToggleData}></ToggleButton>
        <ToggleButton toggleData={osc1SawToggleData}></ToggleButton>
        <ToggleButton toggleData={osc1PulseToggleData}></ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 12 / 14;">
        <Knob title={"Pulse width"} minValue={Settings.minOscPulseWidth} maxValue={Settings.maxOscPulseWidth} initialValue={Settings.defaultOscPulseWidth}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc1PulseWidthChange}></Knob>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 12 / 14;">
        <Knob title={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.defaultMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onOsc1LevelChange}></Knob>
    </div>


    <!-- oscillator 2 ******************************************************************************** -->
    <div class="osc2-section-background" style="grid-column: 9 / 16; grid-row: 1 / 15;"></div>

    <!-- title -->
    <div class="title" style="grid-column: 10 / 15; grid-row: 2 / 3;">OSC 2</div>

    <!-- oscillator 2 frequency controls -->
    <div style="grid-column: 10 / 11; grid-row: 4 / 6;">
        <Knob title={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc2OctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 4 / 6;">
        <Knob title={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc2SemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 4 / 6;">
        <Knob title={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc2CentsOffsetChange}></Knob>
    </div>

    <!-- oscillator 2 unison controls -->
    <div style="grid-column: 10 / 11; grid-row: 7 / 9;">
        <Knob title={"Detune"} minValue={Settings.minOscUnisonCentsDetune} maxValue={Settings.maxOscUnisonCentsDetune} initialValue={Settings.defaultOscUnisonCentsDetune}
            step={1} decimals={0} onValueChange={oscCallbacks.onOsc2DetuneChange}></Knob>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 7 / 9;">
        <Knob title={"Blend"} minValue={Settings.minOscUnisonBlend} maxValue={Settings.maxOscUnisonBlend} initialValue={Settings.defaultOscUnisonBlend}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc2BlendChange}></Knob>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 7 / 9;">
        free
    </div>

    <!-- oscillator 2 shape, pulse width and volume controls -->
    <div class="toggle-buttons-group" style="grid-column: 10 / 11; grid-row: 12 / 14;">
        <ToggleButton toggleData={osc2TriangleToggleData}></ToggleButton>
        <ToggleButton toggleData={osc2SawToggleData}></ToggleButton>
        <ToggleButton toggleData={osc2PulseToggleData}></ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 12 / 14;">
        <Knob title={"Pulse width"} minValue={Settings.minOscPulseWidth} maxValue={Settings.maxOscPulseWidth} initialValue={Settings.defaultOscPulseWidth}
            displayFactor={100} step={0.01} decimals={0} onValueChange={oscCallbacks.onOsc2PulseWidthChange}></Knob>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 12 / 14;">
        <Knob title={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onOsc2LevelChange}></Knob>
    </div>

    <!-- sub oscillator ******************************************************************************************************* -->
    <div class="sub-osc-top-section-background" style="grid-column: 17 / 20; grid-row: 1 / 11;"></div>
    <div class="sub-osc-bottom-section-background" style="grid-column: 17 / 24; grid-row: 11 / 15;"></div>

    <!-- section title -->
    <div class="title" style="grid-column: 18 / 19; grid-row: 2 / 3;">SUB OSC</div>

    <div style="grid-column: 18 / 19; grid-row: 4 / 6;">
        <Knob title={"Octave"} minValue={Settings.minOscOctavesOffset} maxValue={Settings.maxOscOctavesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscOctavesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 7 / 9;">
        <Knob title={"Semitones"} minValue={Settings.minOscSemitonesOffset} maxValue={Settings.maxOscSemitonesOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscSemitonesOffsetChange}></Knob>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 12 / 14;">
        <Knob title={"Cents"} minValue={Settings.minOscCentsOffset} maxValue={Settings.maxOscCentsOffset} initialValue={0}
            step={1} decimals={0} onValueChange={oscCallbacks.onSubOscCentsOffsetChange}></Knob>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 12 / 14;">
        <Knob title={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onSubOscLevelChange}></Knob>
    </div>


    <!-- noise oscillator ******************************************************************************************* -->
    <div class="noise-osc-section-background" style="grid-column: 21 / 24; grid-row: 1 / 10;"></div>

    <!-- section title -->
    <div class="title" style="grid-column: 22 / 23; grid-row: 2 / 3;">NOISE OSC</div>

    <div class="toggle-buttons-group" style="grid-column: 22 / 23; grid-row: 4 / 7;">
        <RadioGroup label={"Type"} radioDataArray={radioDataArray}></RadioGroup>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 7 / 9;">
        <Knob title={"Volume"} minValue={Settings.minMixerOscGain} maxValue={Settings.maxMixerOscGain} initialValue={Settings.minMixerOscGain}
            step={0.01} decimals={0} displayFactor={100} onValueChange={mixerCallbacks.onNoiseOscLevelChange}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* width: 100%; */

        display: grid;
        grid-template-columns: 5px auto 5px auto 15px auto 5px
                                5px
                                5px auto 5px auto 15px auto 5px
                                5px
                                5px auto 5px
                                5px
                                5px auto 5px;

        grid-template-rows: 5px
                            auto 5px auto auto 5px
                            auto auto 5px 10px
                            5px auto auto 5px;

        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        padding: 0px;

        /* border: solid 1px hsla(0, 0%, 100%, 0.25); */
        border-radius: 5px;

        /* background: hsl(0, 0%, 20%) linear-gradient(160deg, hsl(230, 20%, 20%), hsl(230, 20%, 10%)); also ok */
        /* background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%)); */
        /* background: url("../../assets/texture-01.png"), linear-gradient(160deg, hsla(230, 10%, 15%, 0.8), hsla(230, 10%, 10%, 0.8)); */

        /* background: url("../../../assets/texture/texture-01-dark-blue-filt-seamless.jpg") repeat top left; */
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
</style>