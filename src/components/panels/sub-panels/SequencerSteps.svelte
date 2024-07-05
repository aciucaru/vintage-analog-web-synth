<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice, type Voice } from "../../../model/audio/voice";
    // import workerUrl from "$lib/worker?worker&url";

    import ViteWorker from "$lib/sequencer-worker?worker";

    import { onMount } from "svelte";

    const enabledItems: Array<boolean> = new Array<boolean>(Settings.sequencerSteps);
    const notesSteps: Array<Array<boolean>> = new Array<Array<boolean>>(Settings.notesPerStep);
    
    for (let i = 0; i < notesSteps.length; i++)
    {
        notesSteps[i] = new Array<boolean>(Settings.sequencerSteps);
    }

    let playStopButton: HTMLDivElement;

    let isPlaying: boolean = false;

    // the tempo of the sequencer, in BPM
    let tempo = 120.0;

    // What note is currently last scheduled?
    let currentNoteIndex = 0;

    // how frequently to call scheduling function (in milisec)
    let lookAheadTime = 25.0; // 25 miliseconds

    /* How far ahead to schedule audio (seconds).
    ** This is calculated from lookahead, and overlaps with next interval (in case the timer is late) */
    let scheduleAheadTime = 0.1; // 0.1 sec = 100 milisec

    // when the next sequencer step is due
    let nextNoteTime = 0.0;

    // the notes that have been put into the web audio, and may or may not have played yet. {note, time}
    let notesInQueue: Array<{noteIndex: number, time: number}> = new Array<{noteIndex: number, time: number}>();

    // the Web Worker used to fire timer messages
    // private timingWorker: Worker;

    let viteWorker: Worker;

    function stepToggle(stepIndex: number): void
    {
        console.log(`stepToggle(${stepIndex})`);
    }

    function stepNoteToggle(noteIndex: number, stepIndex: number): void
    {
        console.log(`stepNoteToggle(${noteIndex}, ${stepIndex})`);

        notesSteps[noteIndex][stepIndex] = !notesSteps[noteIndex][stepIndex];
    }

    function resetAllSteps(): void
    {
        for (let i = 0; i < enabledItems.length; i++)
        {
            enabledItems[i] = false;
        }
    }

    function enableStep(stepIndex: number): void
    {
        if (0 <= stepIndex && stepIndex < enabledItems.length)
            enabledItems[stepIndex] = true;
        else
            enabledItems[stepIndex % 16] = true;
    }

    function updateStep(stepIndex: number): void
    {
        resetAllSteps();
        enableStep(stepIndex);
    }


    function nextNote(): void
    {
        console.log(`nextNote()`);

        // advance current note and time by a 16th note
        const secondsPerBeat = 60.0 / tempo;

        // Add beat length to last beat time
        nextNoteTime += secondsPerBeat / 4.0;

        // Advance the beat number, and (if necessar) wrap to zero
        currentNoteIndex++;
        if (currentNoteIndex == 16)
            currentNoteIndex = 0;
    }

    function scheduleNote(beatNumber: number, time: number): void
    {
        console.log(`scheduleNote(beatNumber: ${beatNumber}, time: ${time})`);

        // push the note on the queue, even if we're not playing
        notesInQueue.push({noteIndex: beatNumber, time: time});

        updateStep(beatNumber);

        const stepDuration = (60.0 / tempo) / 4.0;
    
        // this.voice.playNote(4, 2, stepDuration);
        voice.playNote(4, 2, stepDuration);
    }

    function scheduler(): void
    {
        console.log(`scheduler()`);

        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer
        while (nextNoteTime < voice.getAudioContext().currentTime + scheduleAheadTime)
        {
            scheduleNote(currentNoteIndex, nextNoteTime);
            nextNote();
        }
    }

    function play(): void
    {

        isPlaying = !isPlaying;

        if (isPlaying)
        {
            console.log("play(): is playing");

            currentNoteIndex = 0;
            nextNoteTime = voice.getAudioContext().currentTime;

            // this.timingWorker.postMessage("start");
            viteWorker.postMessage("start");
        }
        else
        {
            console.log("play(): not playing");

            // this.timingWorker.postMessage("stop");
            viteWorker.postMessage("stop");
        }
    }

    function onPlayStopClick(evt: Event): void
    {
        console.log("onPlayStop");

        play();
    }
    
    onMount( () => 
    {
        console.log("onMount()");

        for (let i = 0; i < enabledItems.length; i++)
        {
            enabledItems[i] = false;
        }

        viteWorker = new ViteWorker();
        viteWorker.onmessage = function(event: MessageEvent<any>)
        {
            if (event.data === "tick")
                scheduler();
            else
                console.log(`viteWorker onmessage(): ${event.data}`);
        };
        viteWorker.postMessage(`viteWorker interval: ${lookAheadTime}`)

        playStopButton.addEventListener("click", onPlayStopClick);
    });
</script>

<div class="main-container">
    <div class="screen-frame unselectable" style="grid-column: 2 / 24; grid-row: 2 / 42;"></div>
    <div class="screen unselectable" style="grid-column: 3 / 23; grid-row: 3 / 41;"></div>

    <!-- fake keyboard, serves as visual reference -->
    <!-- upper octave -->
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 4 / 5;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 5 / 7;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 7 / 10;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 10 / 13;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 13 / 15;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 6 / 8;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 9 / 11;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 12 / 14;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 15 / 17;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 17 / 20;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 20 / 22;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 16 / 18;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 19 / 21;"></div>

    <!-- lower octave -->
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 22 / 24;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 24 / 27;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 27 / 30;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 30 / 32;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 23 / 25;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 26 / 28;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 29 / 31;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 32 / 34;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 34 / 37;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 37 / 39;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 33 / 35;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 36 / 38;"></div>


    <!-- horizontal backgrounds and guide lines for steps -->
    <!-- upper octave -->
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 4 / 5;"></div>

    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 5 / 6;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 8 / 9;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 11 / 12;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 14 / 15;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 6 / 8;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 9 / 11;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 12 / 14;"></div>

    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 15 / 16;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 18 / 19;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 21 / 22;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 16 / 18;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 19 / 21;"></div>

    <!-- lower octave -->
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 22 / 23;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 25 / 26;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 28 / 29;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 31 / 32;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 23 / 25;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 26 / 28;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 29 / 31;"></div>

    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 32 / 33;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 35 / 36;"></div>
    <div class="white-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 38 / 39;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 33 / 35;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 36 / 38;"></div>

    <!-- vertical guidelines for steps -->
    <div class="vertical-step-background unselectable" style="grid-column: 6 / 7; grid-row: 4 / 39;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 7 / 8; grid-row: 4 / 39;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 8 / 9; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 9 / 10; grid-row: 4 / 40;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 10 / 11; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 11 / 12; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 12 / 13; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 13 / 14; grid-row: 4 / 40;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 14 / 15; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 15 / 16; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 16 / 17; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 17 / 18; grid-row: 4 / 40;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 18 / 19; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 19 / 20; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 20 / 21; grid-row: 4 / 40;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 21 / 22; grid-row: 4 / 40;"></div>

    <!-- notes selectors -->
    {#each notesSteps as noteSteps, i}
        {#each noteSteps as step, j}
            <div 
            class="stepNote unselectable"
            class:stepNoteOn={notesSteps[i][j]}
            class:stepNoteOff={!notesSteps[i][j]}
            on:click={() => stepNoteToggle(i, j)}
            style="grid-column: {i + 6} / {i + 7}; grid-row: {j + 4} / {j + 6};"></div>
        {/each}
    {/each}

    <!-- step buttons -->
    {#each enabledItems as stepButton, i}
        <div 
            class="step unselectable"
            class:stepOn={enabledItems[i]}
            class:stepOff={!enabledItems[i]}
            on:click={() => stepToggle(i)}
            style="grid-column: {i + 6} / {i + 7}; grid-row: 41 / 42;">{i + 1}</div>
    {/each}
    
    <div bind:this={playStopButton} class="play-stop-button" style="grid-column: 3 / 5; grid-row: 41 / 42;">Play/stop</div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 300px;

        display: grid;
        grid-template-columns: 16px
                                10px
                                5px
                                30px 20px repeat(16, 20px)
                                5px
                                10px
                                5px
                                repeat(4, 30px)
                                16px;

        grid-template-rows: 5px 16px 5px
                            5px
                            5px
                            repeat(50, 3px)
                            6px 5px
                            5px
                            5px 30px 5px;

        justify-items: stretch;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 1px;

        margin: 1px;
        padding: 0px;

        border-radius: 2px;
        background: linear-gradient(hsla(216, 20%, 15%, 0.8) 0%, hsla(207, 20%, 5%, 0.8) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;
    }

    .screen-frame
    {
        margin: 0px;
        padding: 0px;

        border-radius: 2px;
        background: linear-gradient(hsla(0, 0%, 5%, 0.8) 0%, hsla(0, 0%, 0%, 0.8) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;
    }

    .screen
    {
        margin: 0px;
        padding: 0px;

        background: linear-gradient(hsla(216, 30%, 31%, 0.4) 0%, hsla(216, 30%, 30%, 0.4) 50%),
                    url("../../../assets/texture/lcd-screen-color-seamless.png") repeat left top;
    }

    .white-key
    {
        margin: 0px;
        padding: 0px;

        border: solid 1px hsl(210, 50%, 15%);
        /* background: hsla(210, 50%, 50%, 0.5); */
    }

    .black-key
    {
        margin: 0px;
        padding: 0px;

        border: solid 1px hsl(210, 50%, 15%);
        background: hsl(210, 50%, 15%);
    }

    .white-key-step-background 
    {
        margin: 0px;
        padding: 0px;

        border-top: solid 1px hsla(210, 50%, 15%, 0.5);
        /* border-bottom: solid 1px hsla(210, 50%, 15%, 0.5); */
    }

    .black-key-step-background 
    {
        margin: 0px;
        padding: 0px;

        /* border: solid 1px hsl(210, 50%, 15%); */
        background: hsla(210, 50%, 15%, 0.5);
    }

    .vertical-step-background
    {
        border-right: solid 1px hsla(210, 50%, 15%, 0.5);
    }

    .step-buttons-container
    {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: repeat(4, auto);

        grid-template-rows: repeat(4, auto);

        justify-items: stretch;
        align-items: stretch;
        justify-content: space-between;
        align-content: space-between;
        gap: 10px;

        margin: 0px;
        padding: 0px;

    }

    .step
    {
        box-sizing: border-box;

        /* width: 30px;
        height: 30px; */

        margin: 0px;
        padding: 0px;

        border-radius: 4px;
        border: solid 1px hsl(0, 0%, 50%);
    }

    .stepOff
    {
        background: linear-gradient(hsl(230, 20%, 30%) 0%, hsl(230, 20%, 10%) 50%);
    }

    .stepOn
    {
        background: linear-gradient(hsl(230, 20%, 60%) 0%, hsl(230, 20%, 40%) 50%);
    }

    .stepNote
    {
        box-sizing: border-box;

        /* width: 30px;
        height: 30px; */

        margin: 0px;
        padding: 0px;

        border-radius: 0px;
        border: solid 1px hsl(0, 0%, 50%);
    }

    .stepNoteOff
    {
        border: solid 1px hsl(210, 50%, 15%);
    }

    .stepNoteOn
    {
        border: solid 1px hsl(210, 50%, 15%);
        background: hsl(210, 50%, 15%);
    }

    .play-stop-button
    {
        box-sizing: border-box;

        /* width: auto;
        height: 30px; */

        margin: 0px;
        padding: 0px;

        border-radius: 4px;
        border: solid 1px hsl(0, 0%, 50%);

        background: linear-gradient(hsl(230, 20%, 47%) 0%, hsl(228, 23%, 35%) 50%);
    }

    .lfo-button-bg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 30%);
    }

    .lfo-button-bg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 10%);
        background-color: hsl(0, 0%, 10%);
    }

    .lfo-button-fg-on
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(210, 40%, 70%) 0%, hsl(210, 40%, 50%) 90%);
    }

    .lfo-button-fg-off
    {
        box-sizing: border-box;

        width: 20px;
        height: 16px;

        padding: 0px;
        margin: 0px;

        border: solid 1px hsl(0, 0%, 20%);
        background-image: radial-gradient(ellipse at center, hsl(0, 0%, 50%) 0%, hsl(0, 0%, 30%) 90%);
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>