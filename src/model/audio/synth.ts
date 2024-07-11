import { Settings } from "../../constants/settings";
import { audioContext } from "../../constants/shareable-audio-nodes";

import { Voice } from "./voice";
import { DelayEffect } from "./effects/delay-effect";

export class MonoSynth
{
    private audioContext: AudioContext;

    private voice: Voice;
    private delayEffect: DelayEffect;

    // the output node of this synth
    private outputGainNode: GainNode;

    public constructor(audioContext: AudioContext)
    {
        this.audioContext = audioContext;

        this.voice = new Voice(this.audioContext);

        this.delayEffect = new DelayEffect(this.audioContext);


        // instantiate and set the gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        // connect the output from the voice to the delay effect
        this.delayEffect.connectInput(this.voice.outputNode());

        // connect the effect node to the final output node
        this.delayEffect.outputNode().connect(this.outputGainNode);

        // connect the main output gain to the audio context destination
        this.outputGainNode.connect(this.audioContext.destination);
    }

    public getVoice(): Voice { return this.voice; }
    public getDelayEffect(): DelayEffect { return this.delayEffect; }
}

export const monoSynth = new MonoSynth(audioContext);