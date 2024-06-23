import { BaseMelodicOscillator } from "./base-melodic-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";
import type { LfoManager } from "../../modulation/lfo-manager";

/* this class represents a single oscillator that can be joined with other oscillators in unison;
** this class is not itself a unison oscillator, but a single oscillator that can be part of a
** unison oscillator (e.g. can be 'joined' in unison with multiple other oscillators of the same type);  */
export abstract class BaseJoinableOscillator extends BaseMelodicOscillator
{
    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);
    }

    /* set the detuning for unison; this method is specific to every type of oscillator class that extends this class;
    ** this class itself represents only one single oscillator, without multiple oscillators in unison;
    ** but the 'unison detune' parameter refers here to the fact that instances of this class will be part of an
    ** unison oscillator, which has multiple oscillators detuned between them (the 'unison' parameter is that detune value) */
    public abstract setUnisonDetune(centsDetune: number): boolean;
}