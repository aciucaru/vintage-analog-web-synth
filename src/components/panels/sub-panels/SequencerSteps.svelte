<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { voice, type Voice } from "../../../model/audio/voice";
    // import workerUrl from "$lib/worker?worker&url";

    import ViteWorker from "$lib/sequencer-worker?worker";

    import { onMount } from "svelte";

    let step0: HTMLDivElement;
    let step1: HTMLDivElement;
    let step2: HTMLDivElement;
    let step3: HTMLDivElement;
    let step4: HTMLDivElement;
    let step5: HTMLDivElement;
    let step6: HTMLDivElement;
    let step7: HTMLDivElement;
    let step8: HTMLDivElement;
    let step9: HTMLDivElement;
    let step10: HTMLDivElement;
    let step11: HTMLDivElement;
    let step12: HTMLDivElement;
    let step13: HTMLDivElement;
    let step14: HTMLDivElement;
    let step15: HTMLDivElement;

    let isEnabled0 = false;
    let isEnabled1 = false;
    let isEnabled2 = false;
    let isEnabled3 = false;
    let isEnabled4 = false;
    let isEnabled5 = false;
    let isEnabled6 = false;
    let isEnabled7 = false;
    let isEnabled8 = false;
    let isEnabled9 = false;
    let isEnabled10 = false;
    let isEnabled11 = false;
    let isEnabled12 = false;
    let isEnabled13 = false;
    let isEnabled14 = false;
    let isEnabled15 = false;

    const items: Array<HTMLDivElement> = new Array<HTMLDivElement>(16);
    const enabledItems: Array<boolean> = new Array<boolean>(16);

    let playStopButton: HTMLDivElement;

    function onToggleChange(isToggled: boolean): void { }

    function onModAmountChange(octavesOffset: number): void { }

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

    function resetAllSteps(): void
    {
        for (let i = 0; i < enabledItems.length; i++)
        {
            enabledItems[i] = false;
        }
    }

    function changeStepColor(stepIndex: number): void
    {
        if (0 <= stepIndex && stepIndex < items.length)
            enabledItems[stepIndex] = true;
        else
            enabledItems[stepIndex % 16] = true;
    }

    function updateStep(stepIndex: number): void
    {
        resetAllSteps();
        changeStepColor(stepIndex);
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
        voice.playNote(4, 2, nextNoteTime);  
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
    <div bind:this={step0}
    class="step"
    class:stepOn={enabledItems[0]}
    class:stepOff={!enabledItems[0]}
    style="grid-column: 1 / 2; grid-row: 1 / 2;">1</div>

    <div bind:this={step1}
    class="step"
    class:stepOn={enabledItems[1]}
    class:stepOff={!enabledItems[1]}
    style="grid-column: 2 / 3; grid-row: 1 / 2;">2</div>

    <div bind:this={step2}
    class="step"
    class:stepOn={enabledItems[2]}
    class:stepOff={!enabledItems[2]}
    style="grid-column: 3 / 4; grid-row: 1 / 2;">3</div>

    <div bind:this={step3}
    class="step"
    class:stepOn={enabledItems[3]}
    class:stepOff={!enabledItems[3]}
    style="grid-column: 4 / 5; grid-row: 1 / 2;">4</div>

    <div bind:this={step4}
    class="step"
    class:stepOn={enabledItems[4]}
    class:stepOff={!enabledItems[4]}
    style="grid-column: 5 / 6; grid-row: 1 / 2;">5</div>

    <div bind:this={step5}
    class="step"
    class:stepOn={enabledItems[5]}
    class:stepOff={!enabledItems[5]}
    style="grid-column: 6 / 7; grid-row: 1 / 2;">6</div>

    <div bind:this={step6}
    class="step"
    class:stepOn={enabledItems[6]}
    class:stepOff={!enabledItems[6]}
    style="grid-column: 7 / 8; grid-row: 1 / 2;">7</div>

    <div bind:this={step7}
    class="step"
    class:stepOn={enabledItems[7]}
    class:stepOff={!enabledItems[7]}
    style="grid-column: 8 / 9; grid-row: 1 / 2;">8</div>

    <div bind:this={step8}
    class="step"
    class:stepOn={enabledItems[8]}
    class:stepOff={!enabledItems[8]}
    style="grid-column: 9 / 10; grid-row: 1 / 2;">9</div>

    <div bind:this={step9}
    class="step"
    class:stepOn={enabledItems[9]}
    class:stepOff={!enabledItems[9]}
    style="grid-column: 10 / 11; grid-row: 1 / 2;">10</div>

    <div bind:this={step10}
    class="step"
    class:stepOn={enabledItems[10]}
    class:stepOff={!enabledItems[10]}
    style="grid-column: 11 / 12; grid-row: 1 / 2;">11</div>

    <div bind:this={step11}
    class="step"
    class:stepOn={enabledItems[11]}
    class:stepOff={!enabledItems[11]}
    style="grid-column: 12 / 13; grid-row: 1 / 2;">12</div>

    <div bind:this={step12}
    class="step"
    class:stepOn={enabledItems[12]}
    class:stepOff={!enabledItems[12]}
    style="grid-column: 13 / 14; grid-row: 1 / 2;">13</div>

    <div bind:this={step13}
    class="step"
    class:stepOn={enabledItems[13]}
    class:stepOff={!enabledItems[13]}
    style="grid-column: 14 / 15; grid-row: 1 / 2;">14</div>

    <div bind:this={step14}
    class="step"
    class:stepOn={enabledItems[14]}
    class:stepOff={!enabledItems[14]}
    style="grid-column: 15 / 16; grid-row: 1 / 2;">15</div>

    <div bind:this={step15}
    class="step"
    class:stepOn={enabledItems[15]}
    class:stepOff={!enabledItems[15]}
    style="grid-column: 16 / 17; grid-row: 1 / 2;">16</div>

    <div bind:this={playStopButton} class="play-stop-button" style="grid-column: 1 / 2; grid-row: 2 / 3;">Play/stop</div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px
                                auto repeat(16, 30px)
                                16px;

        grid-template-rows: 16px 30px auto 16px;

        justify-items: center;
        align-items: center;
        justify-content: space-between;
        align-content: space-between;
        gap: 0px;

        margin: 1px;
        padding: 0px;

        border-radius: 2px;
        background: linear-gradient(hsla(216, 20%, 30%, 0.7) 0%, hsla(207, 20%, 15%, 0.7) 50%);
    }

    .step
    {
        box-sizing: border-box;

        width: 30px;
        height: 30px;

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

    .play-stop-button
    {
        box-sizing: border-box;

        width: auto;
        height: 30px;

        margin: 0px;
        padding: 0px;

        border-radius: 4px;
        border: solid 1px hsl(0, 0%, 50%);

        /* background-color: gray; */
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