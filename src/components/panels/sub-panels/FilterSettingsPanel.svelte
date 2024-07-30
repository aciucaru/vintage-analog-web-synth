<script lang="ts">
    import { Settings } from "../../../constants/settings";

    import * as filterCallbacks from "../../../callbacks/filter-callbacks";

    import Knob from "../../Knob.svelte";
    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <!-- <div class="border" style="grid-column: 1 / 2; grid-row: 1 / 6;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 2; grid-row: 1 / 2;">FILTER</div>

    <div class="cutoff-background stretched-item unselectable" style="grid-column: 1 / 2; grid-row: 3 / 4;"></div>

    <div style="grid-column: 1 / 2; grid-row: 3 / 4;">
        <Knob label={"Cutoff"} minValue={Settings.minFilterCutoffFreq} maxValue={Settings.maxFilterCutoffFreq} initialValue={Settings.defaultFilterCutoffFreq}
        step={1} decimals={0} onValueChange={filterCallbacks.onCutoffFreqChange}></Knob>
    </div>

    <div style="grid-column: 1 / 2; grid-row: 5 / 6;">
        <Knob label={"Reso"} minValue={Settings.minFilterResonance} maxValue={Settings.maxFilterResonance} initialValue={Settings.defaultFilterResonance}
            step={0.01} decimals={0} onValueChange={filterCallbacks.onResonanceChange}></Knob>
    </div> -->

    <!-- title -->
    <div class="border" style="grid-column: 1 / 6; grid-row: 1 / 8;"></div>
    <div class="title stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 1 / 2;">FILTER</div>

    <!-- background for cutoff freq knob (does not work, works only in stretch mode) -->
    <div class="cutoff-background stretched-item unselectable" style="grid-column: 1 / 2; grid-row: 3 / 4;"></div>

    <div style="grid-column: 1 / 2; grid-row: 3 / 4;">
        <Knob label={"Cutoff"} minValue={Settings.minFilterCutoffFreq} maxValue={Settings.maxFilterCutoffFreq} initialValue={Settings.defaultFilterCutoffFreq}
        step={1} decimals={0} onValueChange={filterCallbacks.onCutoffFreqChange}></Knob>
    </div>

    <div style="grid-column: 3 / 4; grid-row: 3 / 4;">
        <Knob label={"Reso"} minValue={Settings.minFilterResonance} maxValue={Settings.maxFilterResonance} initialValue={Settings.defaultFilterResonance}
            step={0.01} decimals={0} onValueChange={filterCallbacks.onResonanceChange}></Knob>
    </div>

    <div style="grid-column: 5 / 6; grid-row: 3 / 4;">
        <Knob label={"Env amnt"} minValue={Settings.minFilterEnvelopeAmount} maxValue={Settings.maxFilterEnvelopeAmount}
        initialValue={Settings.defaultFilterEnvelopeAmount} step={10} decimals={0} onValueChange={filterCallbacks.onEnvelopeAmountChange}></Knob>
    </div>

    <!-- filter ADSR envelope -->
    <div class="title stretched-item unselectable" style="grid-column: 1 / 6; grid-row: 5 / 6;">FILTER &nbsp; ENVELOPE</div>
    <div class="adsr-container" style="grid-column: 1 / 6; grid-row: 7 / 8;">
        <div>
            <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
            initialValue={Settings.defaultAdsrFilterAttackDuration} decimals={1}
            onValueChange={filterCallbacks.onAttackChange}></VerticalFader>
        </div>

        <div>
            <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
            initialValue={Settings.defaultAdsrFilterDecayDuration} decimals={1}
            onValueChange={filterCallbacks.onDecayChange}></VerticalFader>
        </div>

        <div>
            <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
            initialValue={Settings.defaultAdsrFilterSustainLevel} displayFactor={100} step={0.01} decimals={0}
            onValueChange={filterCallbacks.onSustainChange}></VerticalFader>
        </div>
        
        <div>
            <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
            initialValue={Settings.defaultAdsrFilterReleaseDuration} decimals={1}
            onValueChange={filterCallbacks.onReleaseChange}></VerticalFader>
        </div>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* height: 350px; */

        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto 10px auto 10px auto;

        /* grid-template-columns: auto 10px auto 10px auto;
        grid-template-rows: auto 10px auto 10px auto 10px auto; */

        justify-items: center;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 0px;
        padding: 5px;

        border-radius: 2px;
    }

    .border
    {
        margin: 0px;
        padding: 0px;

        justify-self: stretch;
        align-self: stretch;

        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        border: solid 1px hsl(224, 10%, 30%);
        border-top: none;
    }

    .stretched-item
    {
        justify-self: stretch;
    }

    .title
    {
        /* pointer-events: none; */

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

    .cutoff-background
    {
        /* box-sizing: border-box; */

        padding: 0px;
        padding-left: 10px;
        padding-right: 10px;
        margin: 0px;

        border-radius: 4px;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;
    }

    .adsr-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
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

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>