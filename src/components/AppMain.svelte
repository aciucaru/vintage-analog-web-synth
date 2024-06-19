<script lang="ts">
    import MainPanel from "./panels/MainPanel.svelte";
    import KeyboardPanel from "./panels/KeyboardPanel.svelte";
    import WoodSide from "./WoodSide.svelte";
    import SidePanel from "./panels/SidePanel.svelte";
</script>

<div class="main-container">
    <WoodSide></WoodSide>
    <div class="center-container">
        <MainPanel></MainPanel>
    </div>
    <WoodSide otherside={true}></WoodSide>

    <WoodSide></WoodSide>
    <div class="center-container">
        <SidePanel></SidePanel>
    </div>
    <WoodSide otherside={true}></WoodSide>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        width: min-content;

        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        justify-content: center;
        align-content: flex-start;

        margin: 0px;
        padding: 0px;

        text-align: center;
    }

    .center-container
    {
        box-sizing: border-box;

        /* width: 100%; */

        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: flex-start;
        align-content: flex-start;

        margin: 0px;
        padding: 0px;

        text-align: center;
    }
</style>