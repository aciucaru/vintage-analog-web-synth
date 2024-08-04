import { Settings } from "../../../../constants/settings";
import { Note } from "../../note";
import { BaseOscillator } from "../base/base-oscillator";

/* This class refers to an oscillator that has the concept of musical note,
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

    /* Methods for FM and ring modulation between main oscillators. These methods are only for connecting the main oscillators
    ** of a voice between them, for FM or ring modulation. For connecting LFOs or other modulators, other methods or logic are used. */

    /* This method returns the node to which another main oscillators is supossed to be connected to, when that main oscillator is
    ** an FM or ring modulator of this OscillatorNode.
    ** This method basically returns a node to wich to connect a modulation source input. */
    public abstract fmModulationInput(): GainNode;

    /* This method does the same as the 'fmModulationInput()' method, but for ring modulation, not FM modulation. It give a node
    ** where to connect a main oscillator that will be a ring modulator. */
    public abstract ringModulationInput(): GainNode;

    // offsets for sequencer steps (beats)
    public abstract setBeatOctavesOffset(octavesBeatOffset: number): boolean;

    public abstract setBeatSemitonesOffset(semitonesBeatOffset: number): boolean;
}