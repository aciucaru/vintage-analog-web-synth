<script lang="ts">
    import AppMain from "../components/AppMain.svelte";

</script>

<AppMain></AppMain>

<!-- apply an inline global style to the <body> element of the page -->
<style>
    :global(body)
    {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;

        color: hsl(0, 0%, 75%);
        /* background: linear-gradient(hsl(216, 10%, 10%) 0%, hsl(207, 20%, 1%) 50%); */
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-attachment: scroll;
    }

    :global(body.dark-mode)
    {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;

        color: hsl(0, 0%, 75%);
        /* background: linear-gradient(hsl(216, 10%, 10%) 0%, hsl(207, 20%, 1%) 50%); */
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-attachment: scroll;
    }
</style>
