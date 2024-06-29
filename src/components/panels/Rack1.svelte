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
        
        background: linear-gradient(hsl(0, 0%, 0%) 0%, hsl(0, 0%, 0%) 50%);
    }
</style>