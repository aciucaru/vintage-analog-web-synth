<script lang="ts">
    // props:
    export let isSelected: boolean = false;
</script>

<div class="main-container">
    {#if isSelected}
        <slot></slot>
    {/if}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        width: auto;
        height: auto;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        align-content: center;

        padding: 0px;
        margin: 2px;
    }
</style>