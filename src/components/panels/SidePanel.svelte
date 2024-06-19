<script lang="ts">
    import ModulationPanel from "./ModulationPanel.svelte";


</script>

<div class="main-container">
    <div class="textured-background"></div>
    <div class="gradient-background"></div>

    <div style="grid-column: 2 / 3; grid-row: 2 / 3;">
        <ModulationPanel></ModulationPanel>
    </div>
</div>


<style>
    .main-container
    {
        box-sizing: border-box;

        width: 100%;
        /* height: min-content; */
        height: auto;

        display: grid;
        grid-template-columns: 30px
                                auto 20px
                                auto auto 20px
                                auto
                                30px;

        grid-template-rows: 30px
                            auto
                            20px
                            auto 20px
                            auto
                            30px;

        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

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