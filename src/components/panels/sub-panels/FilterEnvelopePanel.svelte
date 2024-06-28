<script lang="ts">
    import { Settings } from "../../../constants/settings";

    import * as filterCallbacks from "../../../callbacks/filter-callbacks";

    import VerticalFader from "../../VerticalFader.svelte";
</script>

<div class="main-container">
    <!-- title -->
    <div class="title unselectable" style="grid-column: 1 / 10; grid-row: 3 / 4;">ADSR</div>

    <div style="grid-column: 1 / 3; grid-row: 5 / 6;">
        <VerticalFader label={"A"} minValue={Settings.minAdsrAttackDuration} maxValue={Settings.maxAdsrAttackDuration}
        initialValue={Settings.defaultAdsrFilterAttackDuration} decimals={1} onValueChange={filterCallbacks.onAttackChange}></VerticalFader>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 5 / 6;">
        <VerticalFader label={"D"} minValue={Settings.minAdsrDecayDuration} maxValue={Settings.maxAdsrDecayDuration}
        initialValue={Settings.defaultAdsrFilterDecayDuration} decimals={1} onValueChange={filterCallbacks.onDecayChange}></VerticalFader>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 5 / 6;">
        <VerticalFader label={"S"} minValue={Settings.minAdsrSustainLevel} maxValue={Settings.maxAdsrSustainLevel}
        initialValue={Settings.defaultAdsrFilterSustainLevel} displayFactor={100} step={0.01} decimals={0}
        onValueChange={filterCallbacks.onSustainChange}></VerticalFader>
    </div>
    
    <div style="grid-column: 8 / 10; grid-row: 5 / 6;">
        <VerticalFader label={"R"} minValue={Settings.minAdsrReleaseDuration} maxValue={Settings.maxAdsrReleaseDuration}
        initialValue={Settings.defaultAdsrFilterReleaseDuration} decimals={1} onValueChange={filterCallbacks.onReleaseChange}></VerticalFader>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px auto 5px auto 5px auto 5px auto 16px;
        grid-template-rows: 16px
                            5px auto
                            5px auto 5px
                            16px;
        
        justify-items: stretch;
        align-items: start;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 0px;
        padding-left: 10px;
        padding-right: 10px;

        border-radius: 2px;
        background: url("../../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
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