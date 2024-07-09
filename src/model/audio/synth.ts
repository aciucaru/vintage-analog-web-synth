import { DelayEffect } from "./effects/delay-effect";
import { Voice } from "./voice";

export class MonoSynth
{
    private audioContext: AudioContext;
    private voice: Voice;
    private delayEffect: DelayEffect;

    public constructor(audioContext: AudioContext)
    {
        this.audioContext = audioContext;

        this.voice = new Voice(this.audioContext);

        this.delayEffect = new DelayEffect(this.audioContext, this.voice);
    }
}
