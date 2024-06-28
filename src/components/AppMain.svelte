<script lang="ts">
    import SidePanel from "./panels/SidePanel.svelte";
    import Rack1 from "./panels/Rack1.svelte";
    import Rack2 from "./panels/Rack2.svelte";
</script>

<div class="main-container">
    <div class="center-container">
        <Rack1></Rack1>
        <Rack2></Rack2>
    </div>

    <div class="center-container">
        <SidePanel></SidePanel>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        width: min-content;

        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
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