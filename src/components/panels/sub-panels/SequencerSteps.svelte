<script lang="ts">
    import { Settings } from "../../../constants/settings";
    import { Note } from "../../../model/audio/note";
    import { voice } from "../../../model/audio/voice";

    // import workerUrl from "$lib/worker?worker&url";
    import ViteWorker from "$lib/sequencer-worker?worker";
    import { onMount } from "svelte";

    import Knob from "../../Knob.svelte";
    import NumericScreen from "../../NumericScreen.svelte";

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    const logger: Logger<ILogObj> = new Logger({name: "StepSequencer", minLevel: Settings.minLogLevel });

    /* This class describes a single step out of a sequence of steps.
    ** The step sequencer will contain multiple such steps. */
    class SequencerStep
    {
        public isEnabled: boolean;
        public octavesOffset: number;
        public semitonesOffset: number;
        public showOnAnimation: boolean;

        /* The array of available notes; each element of the array corresponds to one note. The array contains all possible
        ** notes for one single step, as boolean values.
        ** This array is not used for any logic, is only for display purposes, to allow the generation of UI steps
        ** by using for loops instead of manually writing each of the 25 x 16 total number of steps. */
        public dummyDisplayNotes: Array<boolean>;

        public constructor()
        {
            this.isEnabled = false;
            this.octavesOffset = 0;
            this.semitonesOffset = 0;
            this.showOnAnimation = false;

            this.dummyDisplayNotes = new Array<boolean>(Settings.notesPerStep);
        }
    }

    // is the sequencer enabled?
    let isSequencerEnabled: boolean = false;

    let isPlaying: boolean = false;

    // the tempo of the sequencer, in BPM
    let tempo = 120.0;

    // the multiplier/divider of the tempo
    let tempoMultiplier = 1.0;

    // how many steps should be played out of the total number of possible steps
    let playedSteps = Settings.sequencerSteps;

    // should the sequencer play without a note being pressed? 
    let latch = false;

    // What note is currently last scheduled?
    let currentNoteIndex = 0;

    // how frequently to call scheduling function (in milisec)
    let lookAheadTime = 25.0; // 25 miliseconds

    /* How far ahead to schedule audio (seconds).
    ** This is calculated from lookahead, and overlaps with next interval (in case the timer is late) */
    let scheduleAheadTime = 0.1; // 0.1 sec = 100 milisec

    // when the next sequencer step is due
    let nextNoteTime = 0.0;

    // the notes that have been put into the web audio, and may or may not have played yet
    let notesInQueue: Array<{noteIndex: number, time: number}> = new Array<{noteIndex: number, time: number}>();

    /* The main array of on/off steps; this array keeps track of which steps are enabled/disabled and also keeps track
    ** of the currently animated step.
    ** This array is used for the logic of the sequencer and, sometimes, for display purposes. */
    const sequencerSteps: Array<SequencerStep> = new Array<SequencerStep>(Settings.sequencerSteps);

    // initialize the sequencer steps array
    for (let i = 0; i < sequencerSteps.length; i++)
    {
        sequencerSteps[i] = new SequencerStep();

        for (let j = 0; j < sequencerSteps[i].dummyDisplayNotes.length; j++)
        {
            sequencerSteps[i].dummyDisplayNotes[j] = false;
        }
    }

    // for each sequencer step, set the current note as the middle one
    for (let i = 0; i < sequencerSteps.length; i++)
    {
        sequencerSteps[i].dummyDisplayNotes[11] = true;
    }

    // the Web Worker used to fire timer messages
    let viteWorker: Worker;

    /* this function toggles a complete step on/off, it basically enables/disables a step regardless of
    ** the note of that step */
    function stepToggle(stepIndex: number): void
    {
        logger.debug(`stepToggle(${stepIndex})`);
    }

    /* This function sets the note of a sequencer step. The sequencer is monophonic, so there can be only
    ** a single note per each step. */
    function setStepNote(stepIndex: number, noteIndex: number): void
    {
        logger.debug(`stepNoteToggle(${stepIndex}, ${noteIndex})`);

        // toggle the note to determine the visual aspects of the note (this is for display purposes only)
        // this must be done before we reset all the notes of this step
        const noteVisualState = !sequencerSteps[stepIndex].dummyDisplayNotes[noteIndex];

        // reset all notes of this step
        for (let i = 0; i < sequencerSteps[stepIndex].dummyDisplayNotes.length; i++)
        {
            sequencerSteps[stepIndex].dummyDisplayNotes[i] = false;
        }

        // set the visual aspects of the note (this is for display purposes only)
        sequencerSteps[stepIndex].dummyDisplayNotes[noteIndex] = noteVisualState;

        // set the actual note of the specified step:
        /* compute the note position (notes start from bottom to top, but the 'noteIndex' starts from top to bottom,
        ** so we need to make a conversion) */
        // const notePosition = Settings.notesPerStep - noteIndex;
        const notePosition = noteIndex;

        // determine the absolute octaves offset (from 0 to 2)
        // and the absolute semitones offset (from 0 to 11)
        const noteAbsoluteOctavesOffset = Math.floor(notePosition / 12);
        const noteAbsoluteSemitonesOffset = notePosition - noteAbsoluteOctavesOffset * 12;

        logger.debug(`stepNoteToggle(): abs octaves offset = ${noteAbsoluteOctavesOffset}, abs semitones offset = ${noteAbsoluteSemitonesOffset}`);

        // determine the absolute octaves offset (from -1 to 1)
        // and the absolute semitones offset (from -11 to 11)
        const relativeOctavesOffset = noteAbsoluteOctavesOffset - 1;
        let relativeSemitonesOffset = noteAbsoluteSemitonesOffset;
        // if (relativeOctavesOffset >= 0)
        //     relativeSemitonesOffset = noteAbsoluteSemitonesOffset;
        // else
        //     relativeSemitonesOffset = 12 - noteAbsoluteSemitonesOffset;

        sequencerSteps[stepIndex].octavesOffset = relativeOctavesOffset;
        sequencerSteps[stepIndex].semitonesOffset = relativeSemitonesOffset;
    }

    function resetAnimationAllSteps(): void
    {
        for (let i = 0; i < sequencerSteps.length; i++)
        {
            sequencerSteps[i].showOnAnimation = false;
        }
    }

    function enableAnimationStep(stepIndex: number): void
    {
        if (0 <= stepIndex && stepIndex < sequencerSteps.length)
            sequencerSteps[stepIndex].showOnAnimation = true;
        else
            sequencerSteps[stepIndex % Settings.sequencerSteps].showOnAnimation = true;
    }

    function updateStep(stepIndex: number): void
    {
        resetAnimationAllSteps();
        enableAnimationStep(stepIndex);
    }

    function nextNote(): void
    {
        logger.debug(`nextNote()`);

        // advance current note and time by a 16th note
        const secondsPerBeat = 60.0 / tempo;

        // Add beat length to last beat time
        nextNoteTime += secondsPerBeat / 4.0;

        // Advance the beat number, and (if necessar) wrap to zero
        currentNoteIndex++;
        if (currentNoteIndex == 16)
            currentNoteIndex = 0;
    }

    function scheduleNote(currentStepIndex: number, time: number): void
    {
        logger.debug(`scheduleNote(beatNumber: ${currentStepIndex}, time: ${time})`);

        // push the note on the queue, even if we're not playing
        notesInQueue.push({noteIndex: currentStepIndex, time: time});

        updateStep(currentStepIndex);

        const stepDuration = (60.0 / tempo) / 4.0;
    
        const octavesOffset = sequencerSteps[currentNoteIndex].octavesOffset;
        const semitonesOffset = sequencerSteps[currentNoteIndex].semitonesOffset;

        voice.playNoteWithOffset(octavesOffset, semitonesOffset, stepDuration);
    }

    function scheduler(): void
    {
        logger.debug(`scheduler()`);

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
            logger.debug("play(): is playing");

            currentNoteIndex = 0;
            nextNoteTime = voice.getAudioContext().currentTime;

            viteWorker.postMessage("start");
        }
        else
        {
            logger.debug("play(): not playing");

            viteWorker.postMessage("stop");
        }
    }

    // callbacks for UI elements (knobs, faders, etc.) ******************************************************

    function onTempoChange(tempo: number): void
    {
        logger.debug(`onTempoChange(${tempo})`);
    }

    function onPlayStopClick(evt: Event): void
    {
        logger.debug("onPlayStop");

        play();
    }
    
    onMount( () => 
    {
        logger.debug("onMount()");

        for (let i = 0; i < sequencerSteps.length; i++)
        {
            sequencerSteps[i].showOnAnimation = false;
        }

        viteWorker = new ViteWorker();
        viteWorker.onmessage = function(event: MessageEvent<any>)
        {
            if (event.data === "tick")
                scheduler();
            else
                logger.debug(`viteWorker onmessage(): ${event.data}`);
        };
        viteWorker.postMessage(`viteWorker interval: ${lookAheadTime}`)
    });
</script>

<div class="main-container">
    <div class="screen-frame unselectable" style="grid-column: 2 / 24; grid-row: 3 / 58;"></div>
    <div class="screen unselectable" style="grid-column: 3 / 23; grid-row: 4 / 57;"></div>

    <!-- fake keyboard, serves as visual reference -->
    <!-- upper octave -->
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 5 / 7;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 7 / 10;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 10 / 14;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 14 / 18;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 18 / 21;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 9 / 11;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 13 / 15;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 17 / 19;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 21 / 24;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 24 / 28;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 28 / 31;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 23 / 25;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 27 / 29;"></div>

    <!-- lower octave -->
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 31 / 34;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 34 / 38;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 38 / 42;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 42 / 45;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 33 / 35;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 37 / 39;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 41 / 43;"></div>

    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 45 / 48;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 48 / 52;"></div>
    <div class="white-key unselectable" style="grid-column: 4 / 6; grid-row: 52 / 55;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 47 / 49;"></div>
        <div class="black-key unselectable" style="grid-column: 4 / 5; grid-row: 51 / 53;"></div>


    <!-- horizontal backgrounds and guide lines for steps -->
    <!-- upper octave -->
    <div class="white-key-step-background-top unselectable" style="grid-column: 6 / 22; grid-row: 5 / 7;"></div>

    <div class="white-key-step-background-top unselectable" style="grid-column: 6 / 22; grid-row: 7 / 9;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 9 / 11;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 11 / 13;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 13 / 15;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 15 / 17;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 17 / 19;"></div>
    <div class="white-key-step-background-bottom unselectable" style="grid-column: 6 / 22; grid-row: 19 / 21;"></div>


    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 21 / 23;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 23 / 25;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 25 / 27;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 27 / 29;"></div>
    <div class="white-key-step-background-bottom unselectable" style="grid-column: 6 / 22; grid-row: 29 / 31;"></div>

    <!-- lower octave -->
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 31 / 33;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 33 / 35;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 35 / 37;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 37 / 39;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 39 / 41;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 41 / 43;"></div>
    <div class="white-key-step-background-bottom unselectable" style="grid-column: 6 / 22; grid-row: 43 / 45;"></div>

    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 45 / 47;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 47 / 49;"></div>
    <div class="white-key-step-no-background unselectable" style="grid-column: 6 / 22; grid-row: 49 / 51;"></div>
        <div class="black-key-step-background unselectable" style="grid-column: 6 / 22; grid-row: 51 / 53;"></div>
    <div class="white-key-step-background-bottom unselectable" style="grid-column: 6 / 22; grid-row: 53 / 55;"></div>

    <!-- vertical guidelines for steps -->
    <div class="vertical-step-background unselectable" style="grid-column: 6 / 7; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 7 / 8; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 8 / 9; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 9 / 10; grid-row: 5 / 55;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 10 / 11; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 11 / 12; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 12 / 13; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 13 / 14; grid-row: 5 / 55;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 14 / 15; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 15 / 16; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 16 / 17; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 17 / 18; grid-row: 5 / 55;"></div>

    <div class="vertical-step-background unselectable" style="grid-column: 18 / 19; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 19 / 20; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 20 / 21; grid-row: 5 / 55;"></div>
    <div class="vertical-step-background unselectable" style="grid-column: 21 / 22; grid-row: 5 / 55;"></div>

    <!-- notes selectors -->
    {#each sequencerSteps as stepNotes, stepIndex}
        {#each stepNotes.dummyDisplayNotes as displayNote, noteIndex}
            <div 
            class="stepNote unselectable"
            class:stepNoteOn={displayNote}
            class:stepNoteOff={!displayNote}
            on:click={() => setStepNote(stepIndex, noteIndex)}
            style="grid-column: {stepIndex + 6} / {stepIndex + 7}; grid-row: {53 - noteIndex*2} / {55 - noteIndex*2};"></div>
        {/each}
    {/each}

    <!-- step buttons -->
    {#each sequencerSteps as stepButton, i}
        <div 
        class="stepIndicator unselectable"
        class:stepIndicatorOn={sequencerSteps[i].showOnAnimation}
        class:stepIndicatorOff={!sequencerSteps[i].showOnAnimation}
        style="grid-column: {i + 6} / {i + 7}; grid-row: 55 / 56;">
            <div
            class="stepToggle unselectable"
            class:stepToggleOn={sequencerSteps[i].showOnAnimation}
            class:stepToggleOff={!sequencerSteps[i].showOnAnimation}
            on:click={() => stepToggle(i)}></div>
        </div>
    {/each}
    
    <div class="lcd-screen" style="grid-column: 25 / 26; grid-row: 9 / 19;">
        <NumericScreen minValue={Settings.minSequencerTempo} maxValue={Settings.maxSequencerTempo} initialValue={Settings.defaultSequencerTempo}
            step={1} decimals={0} onValueChange={onTempoChange}></NumericScreen>
    </div>

    <div style="grid-column: 25 / 26; grid-row: 21 / 31;">
        <Knob label={"Clock"} minValue={Settings.minSequencerTempo} maxValue={Settings.maxSequencerTempo} initialValue={Settings.defaultSequencerTempo}
            step={1} decimals={0} onValueChange={onTempoChange}></Knob>
    </div>

    <div on:click={onPlayStopClick} class="play-stop-button unselectable" style="grid-column: 25 / 26; grid-row: 3 / 7;">Latch</div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        height: 400px;

        display: grid;
        grid-template-columns: 16px
                                10px
                                5px
                                30px 20px repeat(16, 20px)
                                5px
                                10px
                                16px;

        grid-template-rows: 16px 5px
                            5px
                            5px
                            repeat(50, 4px)
                            20px 5px
                            5px
                            5px 20px;

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

    .param-label
    {
        margin: 0px;
        padding: 0px;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
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

    .white-key-step-background-top
    {
        margin: 0px;
        padding: 0px;

        border: solid 1px hsla(0, 0%, 0%, 0);
        border-top: solid 1px hsla(210, 50%, 15%, 0.5);
    }

    .white-key-step-background-bottom
    {
        margin: 0px;
        padding: 0px;

        border: solid 1px hsla(0, 0%, 0%, 0);
        border-bottom: solid 1px hsla(210, 50%, 15%, 0.5);
    }

    .white-key-step-no-background
    {
        margin: 0px;
        padding: 0px;

        border: solid 1px hsla(0, 0%, 0%, 0);
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

    /* The stepIndicator* classes are for the outer boundary of the sequencer steps.
    ** The elements that belong to these classes only serve as a visual indicator of the current step,
    ** they are for animation purposes, they don't have user interaction. */
    .stepIndicator
    {
        box-sizing: border-box;

        width: 20px;
        height: 20px;

        margin: 0px;
        padding: 2px;

        border-radius: 0px;
        border: solid 2px transparent;

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .stepIndicatorOff
    {
        border-color: transparent;
    }

    .stepIndicatorOn
    {
        border-color: hsl(210, 50%, 15%);
    }

    /* The stepToggle* classes are for the inner content of the sequencer steps.
    ** The elements that belong to these classes are ment to be clicked on to toggle on/off the clicked step.
    ** These elements are never animated, they are only toggled on/off. */
    .stepToggle
    {
        box-sizing: border-box;

        width: 12px;
        height: 12px;

        margin: 0px;
        padding: 0px;

        border-radius: 0px;
        border: solid 1px hsl(210, 50%, 15%);

        color: hsl(0, 0%, 85%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .stepToggleOff
    {
        background: transparent;
    }

    .stepToggleOn
    {
        background: hsl(210, 50%, 15%);
    }

    /* the exact note selected on the screen, per each step */
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
        border: solid 1px hsla(210, 50%, 15%, 0);
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

        background: linear-gradient(hsl(230, 20%, 40%) 0%, hsl(228, 23%, 25%) 50%);
    }

    .play-stop-button:hover
    {
        background: linear-gradient(hsl(230, 20%, 47%) 0%, hsl(228, 23%, 35%) 50%);
    }

    .lcd-screen
    {
        box-sizing: border-box;

        width: min-content;
        height: min-content;

        margin: 0px;
        padding: 0px;
/* 
        background: linear-gradient(hsl(200, 10%, 50%) 0%, hsl(200, 10%, 40%) 50%);
        border: solid 1px hsl(0, 0%, 10%); */

        border-radius: 3px;
        border: solid 1px;
        border-top-color: hsla(228, 47%, 0%, 0.2);
        border-bottom-color: hsla(228, 47%, 40%, 0.2);
        border-left-color: hsla(228, 47%, 10%, 0.2);
        border-right-color: hsla(228, 47%, 80%, 0.2);

        background: linear-gradient(hsl(216, 5%, 10%) 0%, hsl(207, 5%, 5%) 50%);

        box-shadow: inset 1px 1px 4px 1px hsl(0, 0%, 0%);
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