<script lang="ts">
    import { monoSynth } from "../../../model/audio/synth";

    import SingleLfoPanel from "./SingleLfoPanel.svelte";

    // get the LFOs from the voice
    const lfoArray = monoSynth.getVoice().getLfoArray();
</script>

<div class="main-container">
    <SingleLfoPanel unipolarLfo={lfoArray[0]} label={"LFO 1"}></SingleLfoPanel>
    <SingleLfoPanel unipolarLfo={lfoArray[1]} label={"LFO 2"}></SingleLfoPanel>
    <SingleLfoPanel unipolarLfo={lfoArray[2]} label={"LFO 3"}></SingleLfoPanel>
    <SingleLfoPanel unipolarLfo={lfoArray[3]} label={"LFO 4"}></SingleLfoPanel>
    <SingleLfoPanel unipolarLfo={lfoArray[4]} label={"LFO 5"}></SingleLfoPanel>
</div>

<style>
.main-container
{
    box-sizing: border-box;

    width: min-content;
    height: 250px;

    display: flex;
    flex-flow: row nowrap;
    /* set alignment on main axis */
    justify-content: flex-start;
    /* set alingment on cross-axis */
    align-items: center;
    /* set space between flex lines */
    align-content: flex-start;

    margin: 1px;
    padding: 0px;

    text-align: center;

    border-radius: 2px;
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

.unselectable
{
    user-select: none;
    -webkit-user-select: none;
}
</style>