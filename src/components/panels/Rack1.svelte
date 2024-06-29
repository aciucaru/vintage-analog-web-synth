<script lang="ts">
    import MainScreen from "./sub-panels/MainScreen.svelte";
    import MultipleLfoPanel from "./sub-panels/MultipleLfoPanel.svelte";
    import LfoMatrix from "./sub-panels/LfoMatrix.svelte";
</script>

<div class="main-container">
    <MainScreen></MainScreen>
    <MultipleLfoPanel></MultipleLfoPanel>
    <LfoMatrix></LfoMatrix>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        width: min-content;

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
    }

    .textured-background
    {
        grid-column: 1 / 9;
        grid-row: 1 / 8;

        justify-self: stretch;
        align-self: stretch;

        margin: 0px;
        padding: 0px;

        background: url("../../assets/texture/texture-large-filt-seamless.jpg") repeat left top;
    }

    .gradient-background
    {
        grid-column: 1 / 9;
        grid-row: 1 / 8;

        justify-self: stretch;
        align-self: stretch;

        margin: 0px;
        padding: 0px;

        background-image: radial-gradient(ellipse at top, hsla(216, 20%, 30%, 0.7) 0%, hsla(207, 20%, 15%, 0.7) 50%);
    }
</style>