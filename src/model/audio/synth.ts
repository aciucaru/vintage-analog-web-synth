import { Settings } from "../../constants/settings";
import { audioContext } from "../../constants/shareable-audio-nodes";

import { Voice } from "./voice";
import { DelayEffect } from "./effects/delay-effect";
import { DistortionEffect } from "./effects/distortion-effect";
import { ReverbEffect } from "./effects/reverb-effect";

export class MonoSynth
{
    private audioContext: AudioContext;

    private voice: Voice;
    private distortionEffect: DistortionEffect;
    private delayEffect: DelayEffect;
    private reverbEffect: ReverbEffect;

    // the output node of this synth
    private outputGainNode: GainNode;

    public constructor(audioContext: AudioContext)
    {
        this.audioContext = audioContext;

        this.voice = new Voice(this.audioContext);

        this.distortionEffect = new DistortionEffect(this.audioContext);
        this.delayEffect = new DelayEffect(this.audioContext);
        this.reverbEffect = new ReverbEffect(this.audioContext);

        // instantiate and set the gain node
        this.outputGainNode = this.audioContext.createGain();
        this.outputGainNode.gain.setValueAtTime(Settings.maxOscGain, this.audioContext.currentTime);

        this.distortionEffect.connectInput(this.voice.outputNode());

        // connect the output from the voice to the delay effect
        this.delayEffect.connectInput(this.distortionEffect.outputNode());

        // connect output from delay effect to reverb effect
        this.reverbEffect.connectInput(this.delayEffect.outputNode());

        // connect the final effect node to the final output node
        this.reverbEffect.outputNode().connect(this.outputGainNode);

        // connect the main output gain to the audio context destination
        this.outputGainNode.connect(this.audioContext.destination);
    }

    public getVoice(): Voice { return this.voice; }

    public getDistortionEffect(): DistortionEffect { return this.distortionEffect; }
    public getDelayEffect(): DelayEffect { return this.delayEffect; }
    public getReverbEffect(): ReverbEffect { return this.reverbEffect; }
}

export const monoSynth = new MonoSynth(audioContext);