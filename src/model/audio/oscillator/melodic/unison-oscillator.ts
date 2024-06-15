import { Settings } from "../../../../constants/settings";
import { BasePulseOscillator } from "./base-pulse-oscillator";
import { MultiShapeOscillator } from "./multi-shape-oscillator";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";


export class UnisonOscillator extends BasePulseOscillator
{
    /* array of SingleOscillators that contains the main oscillator (index=0), which is always audible
    ** and also all the aditional unison oscillators, which some may be silent */
    private unisonOscillatorNodes: Array<MultiShapeOscillator>;

    private mainOscillatorGainNode: GainNode;
    private unisonOscillatorsGainNode: GainNode;

    private static readonly logger: Logger<ILogObj> = new Logger({name: "UnisonOscillator", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext, initialGain: number)
    {
        super(audioContext, initialGain);

        this.unisonOscillatorNodes = new Array<MultiShapeOscillator>(Settings.oscUnisonCount);
        /* notice: do not use for..of for instantiating the array elements, use regular for loop,
        ** because it seems it skips null references and, up to this point, all
        ** references of this array are null */
        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            this.unisonOscillatorNodes[i] = new MultiShapeOscillator(this.audioContext, Settings.maxOscGain);
        }

        /* instantiate gain nodes for the main oscillator (unison oscillator of index 0) and the rest
        ** of the unison oscillators (index 1...N-1) */
        this.mainOscillatorGainNode = this.audioContext.createGain();
        this.unisonOscillatorsGainNode = this.audioContext.createGain();

        // set gain of main SingleOscillator (which is always audible)
        this.unisonOscillatorNodes[0].setOutputGain(Settings.maxOscGain);

        // set gain of aditional unison oscillators
        /* first we compute the gain corresponding to the audible unison oscillators only (not necessarily
        ** all the unison oscillators, just the audible ones corresponding to unisonCount-1);
        ** to do that, we divide the maximum gain the the unison oscillators count, e.g. (unison - 1),
        ** because the first oscillator is the main one, not an aditional unison oscillator */
        const audibleUnisonOscGain = 1.0 / (Settings.oscUnisonCount - 1);
        for (let i = 1; i < this.unisonOscillatorNodes.length; i++)
        {
            this.unisonOscillatorNodes[i].setOutputGain(audibleUnisonOscGain);
        }

        // set the detuning for the main oscillator (which is always audible)
        this.unisonOscillatorNodes[0].setUnisonDetune(Settings.defaultOscUnisonCentsDetune);

        // set the detuning for all aditional unison osc (except the first one)
        for (let i = 1; i < this.unisonOscillatorNodes.length; i++)
        {
            this.unisonOscillatorNodes[i].setUnisonDetune(Settings.defaultOscUnisonCentsDetune);
        }

        this.mainOscillatorGainNode.gain.setValueAtTime(Settings.maxOscUnisonBlend - Settings.defaultOscUnisonBlend, this.audioContext.currentTime);
        this.unisonOscillatorsGainNode.gain.setValueAtTime(Settings.defaultOscUnisonBlend, this.audioContext.currentTime);

        // connect the main oscillator to it's intermediate gain node
        this.unisonOscillatorNodes[0].outputNode().connect(this.mainOscillatorGainNode);

        // connect the rest of the unison oscillators to their intermediate gain node
        for (let i = 1; i < this.unisonOscillatorNodes.length; i++)
        {
            this.unisonOscillatorNodes[i].outputNode().connect(this.unisonOscillatorsGainNode);
        }

        // connect the intermediate gain nodes to the final gain node gain node
        this.mainOscillatorGainNode.connect(this.outputGainNode); // NECESSARY
        this.unisonOscillatorsGainNode.connect(this.outputGainNode); // NECESSARY

        // connect unison oscillators to the gain node for the anlyser node
        this.mainOscillatorGainNode.connect(this.analyserGainNode);
        this.unisonOscillatorsGainNode.connect(this.analyserGainNode);
    }

    public override setNote(octaves: number, semitones: number): boolean
    {
        let isChangeSuccessfull = true;

        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            isChangeSuccessfull = isChangeSuccessfull && this.unisonOscillatorNodes[i].setNote(octaves, semitones);
        }

        // check if the main note of all oscillators was changed successfully
        if (isChangeSuccessfull)
        {
            UnisonOscillator.logger.debug(`setGlobalNote(${octaves}, ${semitones})`);
            return true; // change was successfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setGlobalNote(${octaves}, ${semitones}): value/values outside bounds`);
            return false; // change was not successfull
        }
    }

    public override setOctavesOffset(octavesOffset: number): boolean
    {
        let isChangeSuccessfull = true;

        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            isChangeSuccessfull = isChangeSuccessfull && this.unisonOscillatorNodes[i].setOctavesOffset(octavesOffset);
        }

        // check if the main note of all oscillators was changed successfully
        if (isChangeSuccessfull)
        {
            UnisonOscillator.logger.debug(`setGlobalOctavesOffset(${octavesOffset})`);
            return true; // change was successfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setGlobalOctavesOffset(${octavesOffset}): value outside bounds`);
            return false; // change was not successfull
        }
    }

    public override setSemitonesOffset(semitonesOffset: number): boolean
    {
        let isChangeSuccessfull = true;

        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            isChangeSuccessfull = isChangeSuccessfull && this.unisonOscillatorNodes[i].setSemitonesOffset(semitonesOffset);
        }

        // check if the main note of all oscillators was changed successfully
        if (isChangeSuccessfull)
        {
            UnisonOscillator.logger.debug(`setGlobalSemitonesOffset(${semitonesOffset})`);
            return true; // change was successfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setGlobalSemitonesOffset(${semitonesOffset}): value outside bounds`);
            return false; // change was not successfull
        }
    }

    public override setCentsOffset(centsOffset: number): boolean
    {
        let isChangeSuccessfull = true;

        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            isChangeSuccessfull = isChangeSuccessfull && this.unisonOscillatorNodes[i].setCentsOffset(centsOffset);
        }

        // check if the main note of all oscillators was changed successfully
        if (isChangeSuccessfull)
        {
            UnisonOscillator.logger.debug(`setGlobalCentsOffset(${centsOffset})`);
            return true; // change was successfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setGlobalCentsOffset(${centsOffset}): value outside bounds`);
            return false; // change was not successfull
        }
    }

    public override setUnisonDetune(centsDetune: number): boolean
    {
        if (Settings.minOscUnisonCentsDetune <= centsDetune && centsDetune <= Settings.maxOscUnisonCentsDetune)
        {
            UnisonOscillator.logger.debug(`setUnisonDetune(${centsDetune})`);

            // version 1: asymmetric detune (works)
            let centsOffset = 0;
            for (let i = 1; i < this.unisonOscillatorNodes.length; i++)
            {
                // compute the cents offset for the current oscillator
                centsOffset = i * centsDetune;

                this.unisonOscillatorNodes[i].setUnisonDetune(centsDetune);
            }

            // version 2: symetric detune (works, but not a big difference)
            // const lowerHalfEndIndex = Math.floor(this.unisonCount / 2);
            // UnisonOscillator2.unisonOscLogger.debug(`setUnisonDetune(): lowerHalfEndIndex=${lowerHalfEndIndex}`);

            // let centsOffset = 0;
            // for (let i = 1; i <= lowerHalfEndIndex; i++)
            // {
            //     centsOffset = i * (-1) * centsDetune;
            //     this.unisonOscillatorNodes[i].setUnisonDetune(centsDetune);
            // }

            // for (let i = lowerHalfEndIndex + 1; i < this.unisonOscillatorNodes.length; i++)
            // {
            //     centsOffset = i * centsDetune;
            //     this.unisonOscillatorNodes[i].setUnisonDetune(centsDetune);
            // }

            return true; // the change was successful
        }
        else
        {
            UnisonOscillator.logger.warn(`setUnisonDetune(${centsDetune}): values is outside bounds`);
            return false; // the change was not successful
        }
    }

    public override setPulseWidth(pulseWidth: number): boolean
    {
        let isChangeSuccessfull = true;

        for (let i = 0; i < this.unisonOscillatorNodes.length; i++)
        {
            isChangeSuccessfull = isChangeSuccessfull && this.unisonOscillatorNodes[i].setPulseWidth(pulseWidth);
        }

        // check if the main note of all oscillators was changed successfully
        if (isChangeSuccessfull)
        {
            UnisonOscillator.logger.debug(`setGlobalPulseWidth(${pulseWidth})`);
            return true; // change was successfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setGlobalPulseWidth(${pulseWidth}): value outside bounds`);
            return false; // change was not successfull
        }
    }

    // private setUnisonCount(unison: number): boolean
    // {
    //     if (Settings.minOscUnisonCount <= unison && unison <= Settings.maxOscUnisonCount)
    //     {
    //         UnisonOscillator.logger.debug(`setUnisonCount(${unison})`);

    //         // this.unisonCount = unison;

    //         /* the first oscillator (index = 0) is always audible and always has max gain;
    //         ** the unison oscillators (index = 1..length) have a gain that depends on the unison count; */

    //         /* first we compute the gain corresponding to the audible unison oscillators only (not necessarily
    //         ** all the unison oscillators, just the audible ones corresponding to unisonCount-1);
    //         ** to do that, we divide the maximum gain the the unison oscillators count, e.g. (unison - 1),
    //         ** because the first oscillator is the main one, not an aditional unison oscillator */
    //         const audibleUnisonOscGain = 1.0 / (unison - 1);

    //         // then we apply the computed gain to the audible unison oscillators only
    //         for (let i = 1; i < unison; i++)
    //         {
    //             UnisonOscillator.logger.debug(`setUnisonCount(${unison}: i=${i} enable`);
    //             this.unisonOscillatorNodes[i].setOutputGain(audibleUnisonOscGain);
    //         }

    //         /* the rest of the oscillators is outside the audible unison oscillators (index = unison...length)
    //         ** e.g. their index is larger than 'unisonOscEndIndex', these oscillators must be muted */
    //         for (let i = unison; i < this.unisonOscillatorNodes.length; i++)
    //         {
    //             UnisonOscillator.logger.debug(`setUnisonCount(${unison}: i=${i} disable`);
    //             this.unisonOscillatorNodes[i].setOutputGain(Settings.minOscGain);
    //         }

    //         return true; // change was succesfull
    //     }
    //     else
    //     {
    //         UnisonOscillator.logger.warn(`setUnisonCount(${unison}): value outside bounds`);
    //         return false; // change was not succesfull
    //     }
    // }

    public setUnisonBlend(blend: number): boolean
    {
        if (Settings.minOscUnisonBlend <= blend && blend <= Settings.maxOscUnisonBlend)
        {
            UnisonOscillator.logger.debug(`setUnisonBlend(${blend})`);

            const mainOscillatorGain = Settings.maxOscUnisonBlend - blend;
            const unisonOscillatorsGain = blend;

            const currentTime = this.audioContext.currentTime;

            // set the new gain value for the main oscillator
            this.mainOscillatorGainNode.gain.linearRampToValueAtTime(mainOscillatorGain, currentTime);

            // set the new gain value for the unison oscillators
            this.unisonOscillatorsGainNode.gain.linearRampToValueAtTime(unisonOscillatorsGain, currentTime);

            return true; // change was succesfull
        }
        else
        {
            UnisonOscillator.logger.warn(`setUnisonBlend(${blend}): value is outside bounds`);
            return true; // change was not succesfull
        }
    }

    public toggleGlobalTriangleShape(): void
    {
        UnisonOscillator.logger.debug("toggleGlobalTriangleShape(): triangle toggled");

        // toggle triangle shape for all oscillators
        for (const unisonOscillator of this.unisonOscillatorNodes)
        {
            unisonOscillator.toggleTriangleShape();
        }
    }

    public toggleGlobalSawShape(): void
    {
        UnisonOscillator.logger.debug("toggleGlobalSawShape(): saw toggled");

        // toggle triangle shape for all oscillators
        for (const unisonOscillator of this.unisonOscillatorNodes)
        {
            unisonOscillator.toggleSawShape();
        }
    }

    public toggleGlobalSquareShape(): void
    {
        UnisonOscillator.logger.debug("toggleGlobalSquareShape(): square toggled");

        // toggle triangle shape for all oscillators
        for (const unisonOscillator of this.unisonOscillatorNodes)
        {
            unisonOscillator.togglePulseShape();
        }
    }

    public getUnisonOscillators(): Array<MultiShapeOscillator> { return this.unisonOscillatorNodes; }

    public getMainOscillatorGainNode(): GainNode { return this.mainOscillatorGainNode; }
    public getUnisonOscillatorsGainNode(): GainNode { return this.unisonOscillatorsGainNode; }

}