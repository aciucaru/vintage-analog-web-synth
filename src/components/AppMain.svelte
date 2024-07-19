<script lang="ts">
    import Rack1 from "./panels/Rack1.svelte";
    import Rack2 from "./panels/Rack2.svelte";
    import Rack3 from "./panels/Rack3.svelte";
</script>

<div class="main-container">
    <div class="center-container">
        <Rack1></Rack1>
        <Rack2></Rack2>
        <Rack3></Rack3>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        /* width: min-content; */
        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        align-content: center;

        margin: 0px;
        padding: 0px;

        text-align: center;

        /* background: linear-gradient(hsl(216, 20%, 10%) 0%, hsl(207, 20%, 5%) 50%); */
    }

    .center-container
    {
        box-sizing: border-box;

        width: min-content;

        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: stretch;
        align-content: flex-start;

        margin: 0px;
        padding: 0px;

        text-align: center;
    }
</style>