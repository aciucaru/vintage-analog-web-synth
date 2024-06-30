<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice } from "../../../model/audio/voice";

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";

    function onToggleChange(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }
</script>

<div class="main-container">

    <div style="grid-column: 2 / 3; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 4 / 5; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 6 / 7; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 8 / 9; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 10 / 11; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 12 / 13; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 14 / 15; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 16 / 17; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 18 / 19; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 20 / 21; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 22 / 23; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 24 / 25; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 26 / 27; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 28 / 29; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 30 / 31; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>

    <div style="grid-column: 32 / 33; grid-row: 2 / 3;">
        <ToggleButton onToggleChange={onToggleChange}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>
    </div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px
                                auto repeat(16, 1px auto)
                                16px;

        grid-template-rows: 16px
                            repeat(5, auto 1px)
                            auto
                            auto 16px;

        justify-items: center;
        align-items: center;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 0px;

        border-radius: 2px;
        background: linear-gradient(hsla(216, 20%, 30%, 0.7) 0%, hsla(207, 20%, 15%, 0.7) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;
    }

    .main-label
    {
        box-sizing: border-box;

        writing-mode: vertical-rl;
        text-orientation: mixed;

        margin: 0px;
        padding: 0px;

        color: hsl(210, 40%, 10%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }


    .mod-destination-title
    {
        margin: 0px;
        padding: 2px;

        background: linear-gradient(hsla(46, 100%, 88%, 0.5) 0%, hsla(46, 100%, 80%, 0.5) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 20%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: clip;
        white-space: normal;
        text-overflow: clip; */
    }

    .mod-source-header
    {
        margin: 0px;
        padding: 2px;

        background: url("../../../assets/texture/pad-texture-small-light-blue-filt-seamless.jpg") repeat top left;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .lfo-button-bg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 30%);
    }

    .lfo-button-bg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 10%);
    }

    .lfo-button-fg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(210, 40%, 70%) 0%, hsl(210, 40%, 50%) 90%);
    }

    .lfo-button-fg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(0, 0%, 50%) 0%, hsl(0, 0%, 30%) 90%);
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>