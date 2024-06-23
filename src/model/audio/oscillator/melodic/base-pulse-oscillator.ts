import { BaseJoinableOscillator } from "./base-joinable-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export abstract class BasePulseOscillator extends BaseJoinableOscillator
{
    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);
    }

    /* this method is specific to every type of oscillator class that extends this class, because an oscillator
    ** class that extends this abstract class could be arbitrarily complex, a call to this class-specific method
    ** is needed, whenever the pulse width changes;
    **
    ** this meethod sets the pulse width of the internal pulse oscillator (it is assumed that the extending class
    ** is a pulse-style oscillator or contains a pulse-style oscillator internally) */
    public abstract setPulseWidth(pulseWidth: number): boolean;
}