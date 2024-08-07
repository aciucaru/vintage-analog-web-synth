<script lang="ts">
    import { Settings } from "../constants/settings";
    import keyboard5OctavesSVG from '../assets/keyboard/keyboard-5-octaves-simple-opt.svg?raw';
    import { voice } from '../model/audio/intermediate-node/voicemediate-node/voice';

    import { Logger } from "tslog";
    import type { ILogObj } from "tslog";

    // a prop which represents which octave is the first octave of the keyboard
    export let startOctave = 2;

    let isKeyPressed: boolean = false;
    let isMousePressed: boolean = false;

    const logger: Logger<ILogObj> = new Logger({name: "Keyboard5", minLevel: Settings.minLogLevel });

    function onClick(event: Event): void
    {
        const target = event.target as HTMLDivElement;

        /* each SVG "key" (a shape) may contain multiple classes, but the first class always represents
        ** the pressed key (e.g: note-0-0, note-0-1), so we get the first class of the clicked element */
        const noteString = target.classList[0];

        if (noteString !== undefined && isMousePressed === false)
        {
            // // mark the mouse as being pressed 
            // isMousePressed = true;

            // the 'noteString' pattern is note-octave-semitone (e.g. note-0-1, note-4-11, etc.)
            // so we split the string by the '-' character to get individual octave and semitone numbers
            const noteStringWords = noteString.split('-');

            // convert the octave and semitone strings into real numbers
            const octave = parseInt(noteStringWords[1]);
            const semitone = parseInt(noteStringWords[2]);

            logger.debug(`onClick(): pressed note: ${noteString}, octave = ${octave}, semitone = ${semitone}`);

            // required for browser compliance so the audio is resumed after an user interaction
            voice.resume();

            // note duration is 0.05 sec (50 milisec)
            const duration = 0.05;

            // play the note for the specified duration
            voice.playNote(octave + startOctave, semitone, duration);
        }
    }

    function onMouseDown(event: Event): void
    {
        const target = event.target as HTMLDivElement;

        /* each SVG "key" (a shape) may contain multiple classes, but the first class always represents
        ** the pressed key (e.g: note-0-0, note-0-1), so we get the first class of the clicked element */
        const noteString = target.classList[0];

        if (noteString !== undefined && isMousePressed === false)
        {
            // mark the mouse as being pressed 
            isMousePressed = true;

            // the 'noteString' pattern is note-octave-semitone (e.g. note-0-1, note-4-11, etc.)
            // so we split the string by the '-' character to get individual octave and semitone numbers
            const noteStringWords = noteString.split('-');
            
            // convert the octave and semitone strings into real numbers
            const octave = parseInt(noteStringWords[1]);
            const semitone = parseInt(noteStringWords[2]);

            logger.debug(`onMouseDown(): pressed note: ${noteString}, octave = ${octave}, semitone = ${semitone}`);

            target.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mouseup', onMouseUp);

            // target.removeEventListener('click', onClick);

            // required for browser compliance so the audio is resumed after an user interaction
            voice.resume();

            // play the note
            voice.noteOn(octave + startOctave, semitone);
        }
    }

    function onMouseUp(event: Event): void
    {
        logger.debug(`onMouseUp(): released note`);

        if (isMousePressed === true)
        {
            // mark the mouse as not being pressed 
            isMousePressed = false;

            const target = event.target as HTMLDivElement;

            voice.noteOff();

            target.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseup', onMouseUp);

            // target.addEventListener('click', onClick);
        }
    }

    function startNote(octave: number, semitone: number): void
    {
        logger.debug(`startNote(): octave = ${octave}, semitone = ${semitone}`);

        isKeyPressed = true;

        // required for browser compliance so the audio is resumed after an user interaction
        voice.resume();

        // play the note
        voice.noteOn(octave + startOctave, semitone);
    }

    function onKeyDown(event: KeyboardEvent): void
    {
        // 'key' is deprecated but still higly supported by browsers, so we try this first
        if (event.key !== undefined && isKeyPressed === false)
        {
            switch(event.key)
            {
                case "a": case "A":
                    startNote(2, 0);
                    break;

                case "w": case "W":
                    startNote(2, 1);
                    break;

                case "s": case "S":
                    startNote(2, 2);
                    break;

                case "e": case "E":
                    startNote(2, 3);
                    break;

                case "d": case "D":
                    startNote(2, 4);
                    break;

                case "f": case "F":
                    startNote(2, 5);
                    break;

                case "t": case "T":
                    startNote(2, 6);
                    break;

                case "g": case "G":
                    startNote(2, 7);
                    break;

                case "y": case "Y":
                    startNote(2, 8);
                    break;

                case "h": case "H":
                    startNote(2, 9);
                    break;

                case "u": case "U":
                    startNote(2, 10);
                    break;

                case "j": case "J":
                    startNote(2, 11);
                    break;

                case "k": case "K":
                    startNote(3, 0);
                    break;

                case "o": case "O":
                    startNote(3, 1);
                    break;

                case "l": case "L":
                    startNote(3, 2);
                    break;

                default:
                    break;
            }
        }
        else if (event.keyCode !== undefined && isKeyPressed === false)
        {
            switch (event.keyCode)
            {
                case 65: // "A":
                    startNote(2, 0);
                    break;

                case 87: // "W":
                    startNote(2, 1);
                    break;

                case 83: // "S":
                    startNote(2, 2);
                    break;

                case 69: // "E":
                    startNote(2, 3);
                    break;

                case 44: // "D":
                    startNote(2, 4);
                    break;

                case 46: // "F":
                    startNote(2, 5);
                    break;

                case 54: // "T":
                    startNote(2, 6);
                    break;

                case 47: // "G":
                    startNote(2, 7);
                    break;

                case 89: // "Y":
                    startNote(2, 8);
                    break;

                case 48: // "H":
                    startNote(2, 9);
                    break;

                case 55: // "U":
                    startNote(2, 10);
                    break;

                case 74: // "J":
                    startNote(2, 11);
                    break;

                case 75: // "K":
                    startNote(3, 0);
                    break;

                case 79: // "O":
                    startNote(3, 1);
                    break;

                case 96: // "L":
                    startNote(3, 2);
                    break;

                default:
                    break;
            }
        }
    }

    function onKeyUp(event: Event): void
    {
        logger.debug(`onKeyeUp(): released key`);

        if (isKeyPressed === true)
        {
            isKeyPressed = false;
            voice.noteOff();
        }


        // window.removeEventListener('keyup', onKeyUp);
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp}/>
<div on:mousedown={onMouseDown} class="main-container">
    {@html keyboard5OctavesSVG}
</div>

<style>
    .main-container
    {
        box-sizing: border-box;
        width: 100%;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 0px;
    }
</style>