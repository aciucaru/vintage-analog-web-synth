/*     This class represents a single oscillator that can be joined with other oscillators in unison.
**     This class is not itself a unison oscillator, but a single oscillator that can be part of a
** unison oscillator (e.g. can be 'joined' in unison with multiple other oscillators of the same type);
**     This class is used for voice unison, for having multiple voices stacked togheter in unison.  */
export interface BaseUnisonOscillator
{
    /* Set the detuning for unison; this method is specific to every type of oscillator class that extends this class.
    ** This class itself represents only one single oscillator, without multiple oscillators in unison.
    ** But the 'unison detune' parameter refers here to the fact that instances of this class will be part of an
    ** unison oscillator, which has multiple oscillators detuned between them (the 'unison' parameter is that detune value). */
    setUnisonDetune(centsDetune: number): boolean;
}