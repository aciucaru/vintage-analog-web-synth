import { Settings } from "../../../constants/settings";
import { Note } from "../note";
import type { Voice } from "../voice";


export class Sequencer
{
    private voice: Voice;

    private isPlaying: boolean = false;

    // the tempo of the sequencer, in BPM
    private tempo = 120.0;

    // What note is currently last scheduled?
    private currentNoteIndex = 0;

    // how frequently to call scheduling function (in milisec)
    private lookAheadTime: number = 25.0; // 25 miliseconds

    /* How far ahead to schedule audio (seconds).
    ** This is calculated from lookahead, and overlaps with next interval (in case the timer is late) */
    private scheduleAheadTime = 0.1; // 0.1 sec = 100 milisec

    // when the next sequencer step is due
    private nextNoteTime = 0.0;

    // the notes that have been put into the web audio, and may or may not have played yet. {note, time}
    private notesInQueue: Array<{noteIndex: number, time: number}>;

    // the Web Worker used to fire timer messages
    private timingWorker: Worker;

    public constructor(voice: Voice)
    {
        this.voice = voice;

        this.notesInQueue = new Array<{noteIndex: number, time: number}>(Settings.sequencerSteps);

        this.timingWorker = new Worker("");

        /* Assign 'this' to a variable of a different name, because inside Web Worker 'onmessage'
        ** 'this' will refer to the Web Worker, not the class instance. Storing 'this' in a
        ** a variable of a diferrent name avoids this conflict. */
        const currentInstance = this;

        this.timingWorker.onmessage = function(event: MessageEvent)
        {
            if (event.data === "tick")
                currentInstance.scheduler();
        };

        this.timingWorker.postMessage(`timerWorker interval: ${this.lookAheadTime}`);
    }

    private nextNote(): void
    {
        // advance current note and time by a 16th note
        const secondsPerBeat = 60.0 / this.tempo;

        // Add beat length to last beat time
        this.nextNoteTime += secondsPerBeat / 4.0;

        // Advance the beat number, and (if necessar) wrap to zero
        this.currentNoteIndex++;
        if (this.currentNoteIndex == 16)
            this.currentNoteIndex = 0;
    }

    private scheduleNote(beatNumber: number, time: number): void
    {
        // push the note on the queue, even if we're not playing
        this.notesInQueue.push({noteIndex: beatNumber, time: time});

        // resetAllSteps();
        // changeStepColor(beatNumber);

        const stepDuration = (60.0 / this.tempo) / 4.0;
    
        this.voice.playNote(4, 2, stepDuration);
    }
    
    private scheduler(): void
    {
        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer
        while (this.nextNoteTime < this.voice.getAudioContext().currentTime + this.scheduleAheadTime)
        {
            this.scheduleNote(this.currentNoteIndex, this.nextNoteTime);
            this.nextNote();
        }
    }
}
