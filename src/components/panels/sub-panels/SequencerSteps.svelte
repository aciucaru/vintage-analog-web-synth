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

    // const items: Array<HTMLDivElement> = new Array<HTMLDivElement>(16);
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

    <div class="step-buttons-container" style="grid-column: 25 / 26; grid-row: 2 / 41;">
        <div bind:this={step0}
        class="step unselectable"
        class:stepOn={enabledItems[0]}
        class:stepOff={!enabledItems[0]}
        style="grid-column: 1 / 2; grid-row: 1 / 2;">1</div>

        <div bind:this={step1}
        class="step unselectable"
        class:stepOn={enabledItems[1]}
        class:stepOff={!enabledItems[1]}
        style="grid-column: 2 / 3; grid-row: 1 / 2;">2</div>

        <div bind:this={step2}
        class="step unselectable"
        class:stepOn={enabledItems[2]}
        class:stepOff={!enabledItems[2]}
        style="grid-column: 3 / 4; grid-row: 1 / 2;">3</div>

        <div bind:this={step3}
        class="step unselectable"
        class:stepOn={enabledItems[3]}
        class:stepOff={!enabledItems[3]}
        style="grid-column: 4 / 5; grid-row: 1 / 2;">4</div>


        <div bind:this={step4}
        class="step unselectable"
        class:stepOn={enabledItems[4]}
        class:stepOff={!enabledItems[4]}
        style="grid-column: 1 / 2; grid-row: 2 / 3;">5</div>

        <div bind:this={step5}
        class="step unselectable"
        class:stepOn={enabledItems[5]}
        class:stepOff={!enabledItems[5]}
        style="grid-column: 2 / 3; grid-row: 2 / 3;">6</div>

        <div bind:this={step6}
        class="step unselectable"
        class:stepOn={enabledItems[6]}
        class:stepOff={!enabledItems[6]}
        style="grid-column: 3 / 4; grid-row: 2 / 3;">7</div>

        <div bind:this={step7}
        class="step unselectable"
        class:stepOn={enabledItems[7]}
        class:stepOff={!enabledItems[7]}
        style="grid-column: 4 / 5; grid-row: 2 / 3;">8</div>


        <div bind:this={step8}
        class="step unselectable"
        class:stepOn={enabledItems[8]}
        class:stepOff={!enabledItems[8]}
        style="grid-column: 1 / 2; grid-row: 3 / 4;">9</div>

        <div bind:this={step9}
        class="step unselectable"
        class:stepOn={enabledItems[9]}
        class:stepOff={!enabledItems[9]}
        style="grid-column: 2 / 3; grid-row: 3 / 4;">10</div>

        <div bind:this={step10}
        class="step unselectable"
        class:stepOn={enabledItems[10]}
        class:stepOff={!enabledItems[10]}
        style="grid-column: 3 / 4; grid-row: 3 / 4;">11</div>

        <div bind:this={step11}
        class="step unselectable"
        class:stepOn={enabledItems[11]}
        class:stepOff={!enabledItems[11]}
        style="grid-column: 4 / 5; grid-row: 3 / 4;">12</div>


        <div bind:this={step12}
        class="step unselectable"
        class:stepOn={enabledItems[12]}
        class:stepOff={!enabledItems[12]}
        style="grid-column: 1 / 2; grid-row: 4 / 5;">13</div>

        <div bind:this={step13}
        class="step unselectable"
        class:stepOn={enabledItems[13]}
        class:stepOff={!enabledItems[13]}
        style="grid-column: 2 / 3; grid-row: 4 / 5;">14</div>

        <div bind:this={step14}
        class="step unselectable"
        class:stepOn={enabledItems[14]}
        class:stepOff={!enabledItems[14]}
        style="grid-column: 3 / 4; grid-row: 4 / 5;">15</div>

        <div bind:this={step15}
        class="step unselectable"
        class:stepOn={enabledItems[15]}
        class:stepOff={!enabledItems[15]}
        style="grid-column: 4 / 5; grid-row: 4 / 5;">16</div>
    </div>

    <div bind:this={playStopButton} class="play-stop-button" style="grid-column: 3 / 5; grid-row: 41 / 42;">Play/stop</div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 250px;

        display: grid;
        grid-template-columns: 16px
                                10px
                                5px
                                30px 20px repeat(16, 30px)
                                5px
                                10px
                                5px
                                repeat(4, 30px)
                                16px;

        grid-template-rows: 6px 10px
                            5px
                            9px
                            6px repeat(3, 3px 3px 6px)
                            6px repeat(2, 3px 3px 6px)

                            6px repeat(3, 3px 3px 6px)
                            6px repeat(2, 3px 3px 6px)
                            9px
                            5px
                            10px 6px;

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
        border-radius: 2px;
        background: linear-gradient(hsla(0, 0%, 5%, 0.8) 0%, hsla(0, 0%, 0%, 0.8) 50%),
                    url("../../../assets/texture/texture-large-filt-seamless.jpg") repeat top left;
    }

    .screen
    {
        background: linear-gradient(hsla(216, 30%, 31%, 0.4) 0%, hsla(216, 30%, 30%, 0.4) 50%),
                    url("../../../assets/texture/lcd-screen-color-seamless.png") repeat left top;
    }

    .white-key
    {
        border: solid 1px hsl(210, 50%, 15%);
        /* background: hsla(210, 50%, 50%, 0.5); */
    }

    .black-key
    {
        border: solid 1px hsl(210, 50%, 15%);
        background: hsl(210, 50%, 15%);
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

        margin: 1px;
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