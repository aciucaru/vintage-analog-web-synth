import { Settings } from "../../../../constants/settings";
import { Note } from "../../note";
import { BaseOscillator } from "./base-oscillator";

/* the 'MelodicOscillator' class refers to an oscillator that has the concept of musical note,
** e.g. an oscillator who's frequency corresponds to musical notes and can change acording to the
** key pressed;
**
** the 'BaseOscillator' does not have the concept of musical notes; */
export abstract class BaseMelodicOscillator extends BaseOscillator
{
    // the note that the oscillator is supposed to produce
    protected note: Note;

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext);

        this.note = new Note(Settings.noteDefaultOctaves, Settings.noteDefaultSemitones);
    }

    /* these note methods are specific to every type of oscillator class that extends this class, because an oscillator
    ** class that extends this abstract class could be arbitrarily complex (it might contain one internal
    ** oscillator or maybe 4 internal oscillators), a call to these class-specific methods is needed, whenever the note
    ** changes; */
    public abstract setNote(octaves: number, semitones: number): boolean;

    public abstract setOctavesOffset(octavesOffset: number): boolean;

    public abstract setSemitonesOffset(semitonesOffset: number): boolean;

    public abstract setCentsOffset(centsOffset: number): boolean;
}