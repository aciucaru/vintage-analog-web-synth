import { Settings } from "../../../../constants/settings";
import { PulseOscillator } from "./pulse-oscillator";
import { BasePulseOscillator } from "./base-pulse-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class MultiShapeOscillator extends BasePulseOscillator
{
    private triangleOscNode: OscillatorNode;
    private sawOscNode: OscillatorNode;
    private pulseOscNode: PulseOscillator;

    private triangleOscEnabled: boolean = true;
    private sawOscEnabled: boolean = false;
    private pulseOscEnabled: boolean = false;

    private triangleOscGainValue: number = 1.0;
    private sawOscGainValue: number = 0.0;
    private pulseOscGainValue: number = 0.0;

    private triangleOscGainNode: GainNode;
    private sawOscGainNode: GainNode;
    private pulseOscGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "MultiShapeOscillator", minLevel: Settings.minLogLevel });

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);

        // instantiate all sound oscillators
        this.triangleOscNode = this.audioContext.createOscillator();
        this.sawOscNode = this.audioContext.createOscillator();
        this.pulseOscNode = new PulseOscillator(this.audioContext, Settings.maxOscGain);
        
        // set the shape of the sound oscillators (never changes)
        this.triangleOscNode.type = "triangle";
        this.sawOscNode.type = "sawtooth";

        // set the initial frequency of the sound oscillators
        this.triangleOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        this.sawOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        this.pulseOscNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);

        // instatiate the gain nodes of the sound oscillators
        this.triangleOscGainNode = this.audioContext.createGain();
        this.sawOscGainNode = this.audioContext.createGain();
        this.pulseOscGainNode = this.audioContext.createGain();

        // set the initial gain of the gain nodes
        this.triangleOscGainNode.gain.setValueAtTime(this.triangleOscGainValue, this.audioContext.currentTime);
        this.sawOscGainNode.gain.setValueAtTime(this.sawOscGainValue, this.audioContext.currentTime);
        this.pulseOscGainNode.gain.setValueAtTime(this.pulseOscGainValue, this.audioContext.currentTime);

        // connect the nodes betwen them:
        // connect the 3 oscillators to their coresponding gain node
        this.triangleOscNode.connect(this.triangleOscGainNode);
        this.sawOscNode.connect(this.sawOscGainNode);
        this.pulseOscNode.outputNode().connect(this.pulseOscGainNode);

        // connect the gain nodes for the 3 oscillators to the same intermediate gain node, to combine them
        this.triangleOscGainNode.connect(this.outputGainNode);
        this.sawOscGainNode.connect(this.outputGainNode);
        this.pulseOscGainNode.connect(this.outputGainNode);

        // connect the output gain to the gain node for the analyser
        this.triangleOscGainNode.connect(this.analyserGainNode);
        this.sawOscGainNode.connect(this.analyserGainNode);
        this.pulseOscGainNode.connect(this.analyserGainNode);

        // start the sound oscillators
        this.triangleOscNode.start();
        this.sawOscNode.start();
        // this.pulseOscNode was already started in it's constructor, no need to start it manually
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        const isChangeSuccessfull = this.note.setOctavesAndSemitones(octaves, semitones);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setOctavesAndSemitones(${octaves}, ${semitones})`);

            this.triangleOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setOctavesAndSemitones(${octaves}, ${semitones}): value/values outside bounds`);

        return isChangeSuccessfull;
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setOctavesOffset(octavesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setOctavesOffset(${octavesOffset})`);

            this.triangleOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setOctavesOffset(${octavesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setSemitonesOffset(semitonesOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setSemitonesOffset(${semitonesOffset})`);

            // this.mainOsc.frequency.value = this.note.freq;
            this.triangleOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setSemitonesOffset(${semitonesOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        // try to set the new value
        const isChangeSuccessfull = this.note.setCentsOffset(centsOffset);

        if (isChangeSuccessfull)
        {
            MultiShapeOscillator.logger.debug(`setCentsOffset(${centsOffset})`);

            // this.mainOsc.frequency.value = this.note.freq;
            this.triangleOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.sawOscNode.frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
            this.pulseOscNode.getOscillatorNode().frequency.setValueAtTime(this.note.getFreq(), this.audioContext.currentTime);
        }
        else
            MultiShapeOscillator.logger.warn(`setCentsOffset(${centsOffset}): value outside bounds`);

        return isChangeSuccessfull;
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            MultiShapeOscillator.logger.debug(`setDetune(${centsDetune})`);

            this.triangleOscNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.sawOscNode.detune.setValueAtTime(centsDetune, this.audioContext.currentTime);
            this.pulseOscNode.getOscillatorNode().detune.setValueAtTime(centsDetune, this.audioContext.currentTime);

            return true;
        }
        else
        {
            MultiShapeOscillator.logger.warn(`setDetune(${centsDetune}): value is outside bounds`);
            return false;
        }
    }

    public override setPulseWidth(pulseWidth: number): boolean
    {
        const isChangeSuccsefull = this.pulseOscNode.setPulseWidth(pulseWidth);

        if (isChangeSuccsefull)
        {
            MultiShapeOscillator.logger.debug(`setPulseWidth(${pulseWidth})`);
            return true; // change was successfull
        }
        else
        {
            MultiShapeOscillator.logger.warn(`setPulseWidth(${pulseWidth}): value is outside bounds`);
            return false; // change was not successfull
        }
    }

    private computeGainValues(): void
    {
        let enabledOscillatorsCount = 0;

        if (this.triangleOscEnabled)
            enabledOscillatorsCount += 1;

        if (this.sawOscEnabled)
            enabledOscillatorsCount += 1;

        if (this.pulseOscEnabled)
            enabledOscillatorsCount += 1;

        // compute the gain that each audible oscillator should have
        if (enabledOscillatorsCount > 0)
        {
            /* we subtract Number.EPSILON (the smallest positive number possible) to make sure
            ** the 3 oscillators don't exceed a combined amplitude of 1.0 (to avoid clicks and pops) */
            const audibleOscGain = (1.0 / enabledOscillatorsCount) - Number.EPSILON;

            if (this.triangleOscEnabled)
                this.triangleOscGainValue = audibleOscGain;
            else
                this.triangleOscGainValue = 0;
    
            if (this.sawOscEnabled)
                this.sawOscGainValue = audibleOscGain;
            else
                this.sawOscGainValue = 0;
    
            if (this.pulseOscEnabled)
                this.pulseOscGainValue = audibleOscGain;
            else
                this.pulseOscGainValue = 0;
        }
        else
        {
            this.triangleOscGainValue = 0;
            this.sawOscGainValue = 0;
            this.pulseOscGainValue = 0;
        }
    }

    private setGainValues(): void
    {
        const currentTime = this.audioContext.currentTime;

        // set the gain values for all oscillators (using their associated gain values)
        this.triangleOscGainNode.gain.setValueAtTime(this.triangleOscGainValue, currentTime);
        this.sawOscGainNode.gain.setValueAtTime(this.sawOscGainValue, currentTime);
        this.pulseOscGainNode.gain.setValueAtTime(this.pulseOscGainValue, currentTime);
    }

    public toggleTriangleShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.triangleOscEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleTriangleShape(): disable triangle");

            // then disable it
            this.triangleOscEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleTriangleShape(): enable triangle");

            // then enable it
            this.triangleOscEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        this.setGainValues();
    }

    public toggleSawShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.sawOscEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleSawShape(): disable saw");

            // then disable it
            this.sawOscEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleSawShape(): enable saw");

            // then enable it
            this.sawOscEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        this.setGainValues();
    }

    public togglePulseShape(): void
    {
        // if the triangle oscillator is already enabled
        if (this.pulseOscEnabled)
        {
            MultiShapeOscillator.logger.debug("toggleSquareShape(): disable square");

            // then disable it
            this.pulseOscEnabled = false;
        }
        // if the triangle oscillator is not enabled
        else
        {
            MultiShapeOscillator.logger.debug("toggleSquareShape(): enable square");

            // then enable it
            this.pulseOscEnabled = true;
        }

        // recompute the gain values for all oscillators
        this.computeGainValues();

        // reset the gain values for all oscillators (based on computed values from 'computeGainValues()')
        this.setGainValues();
    }
}