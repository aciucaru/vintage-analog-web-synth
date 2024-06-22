<script lang="ts">

    import Knob from "../../Knob.svelte";
    import ToggleButton from "../../toggle/ToggleButton.svelte";

    function onLfoToggle(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }
</script>

<div class="main-container">
    <div class="title unselectable" style="grid-column: 2 / 7; grid-row: 2 / 3;">MODULATION MATRIX</div>

    <div class="horizontal-container">
        <div class="mod-source-header unselectable">SRC</div>
        <div class="mod-source-header unselectable">LFO1</div>
        <div class="mod-source-header unselectable">LFO2</div>
        <div class="mod-source-header unselectable">LFO3</div>
        <div class="mod-source-header unselectable">LFO4</div>
        <div class="mod-source-header unselectable">LFO5</div>
        <div class="mod-source-header unselectable">Amount</div>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC1 Freq</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC1 Amp</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC1 PW</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC1 Detune</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC2 Freq</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC2 Amp</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC2 PW</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">OSC3 Detune</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">SUB Freq</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">SUB Amp</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>



    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">FILTER Cutoff</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
    </div>

    <div class="horizontal-container">
        <div class="mod-destination-title unselectable">FILTER Res</div>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <ToggleButton onToggleChange={onLfoToggle} isToggled={true}>
            <div slot="bgOnImage"   class="lfo-button-bg-on"></div>
            <div slot="bgOffImage"  class="lfo-button-bg-off"></div>
            <div slot="fgOnImage"   class="lfo-button-fg-on"></div>
            <div slot="fgOffImage"  class="lfo-button-fg-off"></div>
        </ToggleButton>

        <Knob onValueChange={onModAmountChange}></Knob>
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
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .mod-source-header
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
        /* overflow: hidden; */
        /* white-space: nowrap; */
        /* text-overflow: clip; */
    }

    .lfo-button-bg-on
    {
        box-sizing: border-box;

        width: 30px;
        height: 30px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 30%);
    }

    .lfo-button-bg-off
    {
        box-sizing: border-box;

        width: 30px;
        height: 30px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 10%);
    }

    .lfo-button-fg-on
    {
        box-sizing: border-box;

        width: 30px;
        height: 30px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(210, 40%, 70%) 0%, hsl(210, 40%, 50%) 90%);
    }

    .lfo-button-fg-off
    {
        box-sizing: border-box;

        width: 30px;
        height: 30px;

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