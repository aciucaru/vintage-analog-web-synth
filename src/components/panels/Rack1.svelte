<script lang="ts">
    import Oscillator1Panel from "./sub-panels/Oscillator1Panel.svelte";
    import Oscillator2Panel from "./sub-panels/Oscillator2Panel.svelte";
    import SubOscillatorPanel from "./sub-panels/SubOscillatorPanel.svelte";
    import NoiseOscillatorPanel from "./sub-panels/NoiseOscillatorPanel.svelte";

    import FilterSettingsPanel from "./sub-panels/FilterSettingsPanel.svelte";
    import VoiceSettingsPanel from "./sub-panels/VoiceSettingsPanel.svelte";
    import AdsrEnvelopesPanel from "./sub-panels/AdsrEnvelopesPanel.svelte";
    import InvisibleKeyboard from "../InvisibleKeyboard.svelte";

    import TestOscillatorPanel from "./sub-panels/TestOscillatorPanel.svelte";
    import TestFilterSettingsPanel from "./sub-panels/TestFilterSettingsPanel.svelte";
    import TestInvisibleKeyboard from "../TestInvisibleKeyboard.svelte";
</script>

<div class="main-container">
    <Oscillator1Panel></Oscillator1Panel>
    <Oscillator2Panel></Oscillator2Panel>
    <SubOscillatorPanel></SubOscillatorPanel>
    <NoiseOscillatorPanel></NoiseOscillatorPanel>

    <FilterSettingsPanel></FilterSettingsPanel>
    <VoiceSettingsPanel></VoiceSettingsPanel>
    <!-- <AdsrEnvelopesPanel></AdsrEnvelopesPanel> -->

    <TestOscillatorPanel></TestOscillatorPanel>
    <TestFilterSettingsPanel></TestFilterSettingsPanel>
    
    <!-- <InvisibleKeyboard></InvisibleKeyboard> -->
    <TestInvisibleKeyboard></TestInvisibleKeyboard>
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
        align-items: stretch;
        /* set space between flex lines */
        align-content: flex-start;

        margin: 0px;
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;

        text-align: center;

        background: linear-gradient(hsla(216, 20%, 20%, 0.3) 0%, hsla(207, 20%, 5%, 0.3) 50%),
                    url("../../assets/texture/pad-texture-small-dark-blue-filt-seamless.jpg") repeat top left;
    }
</style>