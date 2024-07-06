<script lang="ts">
    import Oscillator1Panel from "./sub-panels/Oscillator1Panel.svelte";
    import Oscillator2Panel from "./sub-panels/Oscillator2Panel.svelte";
    import SubOscillatorPanel from "./sub-panels/SubOscillatorPanel.svelte";
    import NoiseOscillatorPanel from "./sub-panels/NoiseOscillatorPanel.svelte";

    import FilterSettingsPanel from "./sub-panels/FilterSettingsPanel.svelte";
    import VoiceSettingsPanel from "./sub-panels/VoiceSettingsPanel.svelte";
    import AdsrEnvelopesPanel from "./sub-panels/AdsrEnvelopesPanel.svelte";

    import InvisibleKeyboard from "../InvisibleKeyboard.svelte";
</script>

<div class="main-container">
    <Oscillator1Panel></Oscillator1Panel>
    <Oscillator2Panel></Oscillator2Panel>
    <SubOscillatorPanel></SubOscillatorPanel>
    <NoiseOscillatorPanel></NoiseOscillatorPanel>

    <FilterSettingsPanel></FilterSettingsPanel>
    <!-- <FilterEnvelopePanel></FilterEnvelopePanel> -->

    <VoiceSettingsPanel></VoiceSettingsPanel>
    <!-- <VoiceEnvelopePanel></VoiceEnvelopePanel> -->
    <AdsrEnvelopesPanel></AdsrEnvelopesPanel>
    
    <InvisibleKeyboard></InvisibleKeyboard>
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

        background: linear-gradient(hsl(0, 0%, 0%) 0%, hsl(0, 0%, 0%) 50%);
    }
</style>