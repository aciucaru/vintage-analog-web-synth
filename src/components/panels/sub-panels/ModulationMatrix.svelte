<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { ToggleButtonData } from "../../../model/gui/toggle-button-data";

    import Knob from "../../Knob.svelte";
    import OnOffButton from "../../toggle/OnOffButton.svelte";

    function onLfoToggle(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }
</script>

<div class="main-container">
    <div class="title" style="grid-column: 2 / 7; grid-row: 2 / 3;">MODULATION MATRIX</div>

    <div class="horizontal-container">
        <div class="mod-source-header">SRC</div>
        <div class="mod-source-header">LFO1</div>
        <div class="mod-source-header">LFO2</div>
        <div class="mod-source-header">LFO3</div>
        <div class="mod-source-header">LFO4</div>
        <div class="mod-source-header">LFO5</div>
        <div class="mod-source-header">Amount</div>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC1 Freq</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC1 Amp</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC1 PW</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC1 Detune</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title">OSC2 Freq</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC2 Amp</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC2 PW</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">OSC3 Detune</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title">SUB Freq</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">SUB Amp</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title">FILTER Cutoff</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title">FILTER Res</div>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={true}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <OnOffButton onToggleChange={onLfoToggle} isToggled={false}></OnOffButton>
        <Knob onValueChange={onModAmountChange} showValue={false}></Knob>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* width: min-content; */
        height: min-content;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 10px;

        border-radius: 5px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
        /* background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%)); */
    }

    .horizontal-container
    {
        box-sizing: border-box;

        /* width: min-content; */
        height: min-content;

        display: flex;
        flex-flow: row nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 0px;

        border-radius: 5px;
    }

    .mod-destination-title
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
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .mod-source-header
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
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }
</style>