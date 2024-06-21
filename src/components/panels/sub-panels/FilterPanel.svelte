<script lang="ts">
    import { Settings } from "../../../constants/settings";

    import * as filterCallbacks from "../../../callbacks/filter-callbacks";

    import Knob from "../../Knob.svelte";
    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <div class="section-background" style="grid-column: 1 / 8; grid-row: 1 / 11;"></div>

    <!-- filter main paramenters *********************************************************************************************** -->
    <!-- section title -->
    <div class="title unselectable" style="grid-column: 2 / 7; grid-row: 2 / 3;">FILTER</div>

    <!-- background for knobs: -->
    <!-- background for cutoff freq knob -->
    <div class="cutoff-background" style="grid-column: 2 / 3; grid-row: 4 / 8;"></div>

    <div style="grid-column: 2 / 3; grid-row: 4 / 8;">
        <Knob title={"Cutoff"} minValue={Settings.minFilterCutoffFreq} maxValue={Settings.maxFilterCutoffFreq} initialValue={Settings.defaultFilterCutoffFreq}
        step={1} decimals={0} onValueChange={filterCallbacks.onCutoffFreqChange}></Knob>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 4 / 6;">
        <Knob title={"Reso"} minValue={Settings.minFilterResonance} maxValue={Settings.maxFilterResonance} initialValue={Settings.defaultFilterResonance}
            step={0.01} decimals={0} onValueChange={filterCallbacks.onResonanceChange}></Knob>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 4 / 6;">
        <Knob title={"Key trck"} minValue={Settings.minFilterKeyTrackingAmount} maxValue={Settings.maxFilterKeyTrackingAmount} initialValue={Settings.defaultFilterKeyTrackingAmount}
            step={1} decimals={0} onValueChange={filterCallbacks.onKeyTrackingChange}></Knob>
    </div>

    <!-- filter envelope parameters **************************************************************************************************** -->
    <div class="faders-container" style="grid-column: 2 / 7; grid-row: 9 / 10;">
        <!-- <div style="grid-column: 1 / 2; grid-row: 1 / 2;"> -->
            <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
            initialValue={Settings.defaultAdsrFilterAttackDuration} decimals={1} onValueChange={filterCallbacks.onAttackChange}></VerticalFader>
        <!-- </div> -->
    
        <!-- <div style="grid-column: 2 / 3; grid-row: 1 / 2;"> -->
            <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
            initialValue={Settings.defaultAdsrFilterDecayDuration} decimals={1} onValueChange={filterCallbacks.onDecayChange}></VerticalFader>
        <!-- </div> -->
    
        <!-- <div style="grid-column: 3 / 4; grid-row: 1 / 2;"> -->
            <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
            initialValue={Settings.defaultAdsrFilterSustainLevel} displayFactor={100} step={0.01} decimals={0}
            onValueChange={filterCallbacks.onSustainChange}></VerticalFader>
        <!-- </div> -->
        
        <!-- <div style="grid-column: 4 / 5; grid-row: 1 / 2;"> -->
            <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
            initialValue={Settings.defaultAdsrFilterReleaseDuration} decimals={1} onValueChange={filterCallbacks.onReleaseChange}></VerticalFader>
        <!-- </div> -->

        <!-- <div style="grid-column: 5 / 6; grid-row: 1 / 2;"> -->
            <VerticalFader label={"Amnt"} minValue={Settings.minFilterEnvelopeAmount} maxValue={Settings.maxFilterEnvelopeAmount}
            initialValue={Settings.defaultFilterEnvelopeAmount} step={10} decimals={0} bidirectionalTrack={true} onValueChange={filterCallbacks.onEnvelopeAmountChange}></VerticalFader>
        <!-- </div> -->
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 5px auto 5px auto 5px auto 5px;
        grid-template-rows: 5px
                            auto 5px
                            auto auto 5px auto 5px
                            auto 5px;
        
        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        margin-left: 10px;
        padding: 0px;
        /* padding: 0px; */

        /* border: solid 1px hsla(0, 0%, 100%, 0.25); */
        border-radius: 5px;
        border-bottom-left-radius: 0px;

        /* background: hsla(230, 10%, 15%, 0.5) linear-gradient(160deg, hsl(230, 10%, 15%), hsl(230, 10%, 10%)); */
    }

    .section-background
    {
        box-sizing: border-box;

        margin: 0px;
        padding: 0px;
        border-radius: 5px;
        border-bottom-left-radius: 0px;

        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }

    .faders-container
    {
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        justify-content: space-between;
        /* justify-content: start; */
        align-content: stretch;

        margin: 0px;
        padding: 0px;
    }

    .title
    {
        /* pointer-events: none; */

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

    .knob-group
    {
        /* box-sizing: border-box; */

        padding: 0px;
        padding-left: 5px;
        padding-right: 5px;
        margin: 0px;

        border-radius: 4px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;
    }

    .cutoff-background
    {
        /* box-sizing: border-box; */

        padding: 0px;
        padding-left: 40px;
        padding-right: 40px;
        margin: 0px;

        border-radius: 4px;

        background: url("../../../assets/texture/title-texture-filt-seamless.jpg") repeat top left;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>