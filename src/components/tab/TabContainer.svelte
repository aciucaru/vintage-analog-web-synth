<script lang="ts">
    import Tab from "./Tab.svelte";

    // props:
    export let tabs: Array<{label: string, tab: Tab, onToggleChange: () => void}>;
</script>

<div class="main-container">
    <div class="tab-selectors">
        {#each tabs as tab}
            <div>tab.label</div>
        {/each}
    </div>

    <div class="tab-content">
        {#each tabs as tabItem}
            {#if tabItem.tab.isSelected}
                <Tab></Tab>
            {/if}
        {/each}
    </div>
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