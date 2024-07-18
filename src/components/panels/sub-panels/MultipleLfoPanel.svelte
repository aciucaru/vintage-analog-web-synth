<script lang="ts">
    import SingleLfoPanel from "./SingleLfoPanel.svelte";
</script>

<div class="main-container">
    <SingleLfoPanel lfoIndex={0}></SingleLfoPanel>
    <SingleLfoPanel lfoIndex={1}></SingleLfoPanel>
    <SingleLfoPanel lfoIndex={2}></SingleLfoPanel>
    <SingleLfoPanel lfoIndex={3}></SingleLfoPanel>
    <SingleLfoPanel lfoIndex={4}></SingleLfoPanel>
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