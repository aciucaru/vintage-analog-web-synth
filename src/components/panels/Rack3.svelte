<script lang="ts">
    import SequencerSteps from "./sub-panels/SequencerSteps.svelte";
    import DistortionEffectPanel from "./effects/DistortionEffectPanel.svelte";
    import DelayEffectPanel from "./effects/DelayEffectPanel.svelte";
    import ReverbEffectPanel from "./effects/ReverbEffectPanel.svelte";
    import CompressorEffectPanel from "./effects/CompressorEffectPanel.svelte";
</script>

<div class="main-container">
    <!-- <SequencerSteps></SequencerSteps> -->
    <DistortionEffectPanel></DistortionEffectPanel>
    <DelayEffectPanel></DelayEffectPanel>
    <ReverbEffectPanel></ReverbEffectPanel>
    <CompressorEffectPanel></CompressorEffectPanel>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        /* width: min-content; */
        width: 100%;

        display: flex;
        flex-flow: row nowrap;
        /* set alignment on main axis */
        justify-content: flex-start;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: flex-start;

        margin: 0px;
        padding: 0px;

        text-align: center;

        background: linear-gradient(hsla(216, 20%, 20%, 0.3) 0%, hsla(207, 20%, 5%, 0.3) 50%),
                    url("../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }
</style>