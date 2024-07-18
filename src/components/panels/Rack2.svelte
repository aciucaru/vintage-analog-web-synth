<script lang="ts">
    import MultipleLfoPanel from "./sub-panels/MultipleLfoPanel.svelte";
    import LfoMatrix from "./sub-panels/LfoMatrix.svelte";
</script>

<div class="main-container">
    <MultipleLfoPanel></MultipleLfoPanel>
    <LfoMatrix></LfoMatrix>
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

        background: linear-gradient(hsla(216, 20%, 30%, 0.7) 0%, hsla(207, 20%, 15%, 0.7) 50%),
                    url("../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;
    }
</style>