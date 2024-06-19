import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* General-purpose ADSR envelope; this envelope does not have a predefined min and max value,
** instead, it can vary between 0.0 , 1.0 and 'sustainLevel', where 'sustainLevel' can be maximum 1.0 (100%);
**
** The ADSR enevelope is always between 0.0 and 1.0 and is first multiplied by the 'evelope amount',
** where the 'envelope amount' is no longer a relative value (between 0 and 1) but an absolute value,
** in the same measurement units as the parameter (destination) it's modulating.
**
** Then, the ADSR envelope is added to the current value of the parameter it's modulating.
**
** The 'envelope amount' can be positive or negative. When it's positive, the ADSR envelope is added to
** the current value of the parameter is' modulating. When the 'envelope amount' is negative, the result of
** the ADSR envelope is subtracted from the current value of the parameter it's modulating.
** But regardless of the sign, the ADSR envelope is first multiplied with the 'envelope amount' and then
** added to the current value of the parameter it's modulating.
**
** The 'envelope amount' parameter is not inside the ADSR envelope, but inside the modulatable parameter.
** This means that maybe not all parameters accept an envelope. The parameters that accept an envelope must
** contain an 'evelope amount' parameter inside their implementation. */
export class AdsrEnvelope extends BaseAudioNode
{
    private adsrGainNode: GainNode;

    // main parameters: durations (not times/moments!) and sustain level
    private attackDuration: number = Settings.defaultAdsrAttackDuration;
    private decayDuration: number = Settings.defaultAdsrDecayDuration;
    private sustainLevel: number = Settings.defaultAdsrSustainLevel;
    private releaseDuration: number = Settings.defaultAdsrReleaseDuration;

    // time parameters:
    private attackStartTime = this.audioContext.currentTime;
    private attackEndTime = this.audioContext.currentTime + this.attackDuration; // the time the attack phase should end
    private decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end
    private releaseStartTime = this.decayEndTime + Settings.adsrSafetyDuration; // the time the release should start
    private releaseEndTime = this.releaseStartTime + this.releaseDuration; // the time the release phase should end

    private hasReleasePhaseStarted: boolean = false;
    
    private static readonly logger: Logger<ILogObj> = new Logger({name: "AdsrEnvelope", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.adsrGainNode = this.audioContext.createGain();
        this.adsrGainNode.gain.setValueAtTime(Settings.minAdsrSustainLevel, this.audioContext.currentTime);
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.adsrGainNode; }

    public startAndStop(duration: number): void
    {
        if (duration > 0)
            AdsrEnvelope.logger.debug(`startAndStop(${duration}): ADSR triggered for ${duration} seconds`);
        else
        {
            const clippedDuration = 0.1; // clip to 100 milisec

            AdsrEnvelope.logger.warn(`startAndStop(${duration}): ADSR triggerd, duration is negative, value clipped to ${clippedDuration}`);
        }

        // get relevant times
        const currentTime = this.audioContext.currentTime; // the time when note was triggered
        this.attackStartTime = currentTime; // save the attack start time also
        this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end
        const sustainEndTime = this.decayEndTime + duration;
        this.releaseEndTime = sustainEndTime + this.releaseDuration; // the time the attack phase should end

        // first phase: cancel all remaining events
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, currentTime);
        this.adsrGainNode.gain.cancelScheduledValues(currentTime + Settings.adsrSafetyDuration);

        // before Attack: set gain to minimum, 'setValueAtTime()' acts like the first checkpoint before the first ramp
        // the next ramps do not need a checkpoint, because the previous ramp is a checkpoint (an event)
        this.adsrGainNode.gain.setValueAtTime(Settings.minAdsrSustainLevel, currentTime);

        /* Attack phase: raise gain to maximum in 'attackTime' seconds;
        ** we use linear ramp for this, because exponential ramp does not seem to work properly, it works like a delay instead;
        ** exponential ramp should be prefered, because it will be perceived as linear by the human ear; */
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime);

        // Decay phase: lower gain to 'sustainLevel' in 'decayTime' seconds
        // for decay phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime);

        // Sustain phase: keep the value of the gain for the duration of the note
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, sustainEndTime);

        // Release phase, lower gain to minimum (zero cannot be used with exponential ramp)
        // for release phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
    }

    /* This method represents the ADS portion of the envelope, it basically coressponds to the 'noteOn' event */
    public start(): void
    {
        // AdsrEnvelope.logger.debug(`start(): ADSR triggered`);

        // the time when the current note was triggered
        const currentTime = this.audioContext.currentTime;

        // the gain corresponding to the time the current note was triggered
        let currentTimeGain = 0.0;

        // if the current note has started during the previous note's 'attack' phase
        if (this.attackStartTime <= currentTime && currentTime <= this.attackEndTime)
        {
            const lineSlope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
            currentTimeGain = lineSlope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;
        }
        // if the current note has started during the previous note's 'decay' phase
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;
        }
        /* if the current note has started after the previous note's 'decay' phase
        ** here we have only 2 possibilities:
        ** - we are in the 'sustain' phase of the previous note
        ** - we are in the 'release' phase of the previous note */
        else if (currentTime > this.decayEndTime)
        {
            // we check if we are in the 'sustain' phase or 'release' phase of the previous note
            if (this.hasReleasePhaseStarted === false) // are we in the 'sustain' phase?
            {
                // here we are for sure in the sustain phase of the previorus note, and the gain is constant
                currentTimeGain = this.sustainLevel;
            }
            else // we are in the 'release' phase of the previous note
            {
                // in this case, we first compute the gain value that would correspond to the 'currentTime', through linear interpolation
                const lineSlope = (Settings.minAdsrSustainLevel - this.sustainLevel) / (this.releaseEndTime - this.releaseStartTime);
                currentTimeGain = lineSlope * (currentTime - this.releaseStartTime) + this.sustainLevel;
            }
        }
        /* Ideal case: if the current note has started after the previous note's 'release' phase.
        ** This means that the previous note has finished playin completely and there should not be other remaining events. */
        else if (currentTime > this.releaseEndTime)
        {
            // we are no longer in 'release' phase
            this.hasReleasePhaseStarted = false;
        }

        /* Now that we have the correct starting gain value, we first schedule a value change to 'currentTimeGain' 
        ** and the we cancell all remaining events.
        ** The cancelation of remaining events will trigger the parameter to go back to the last scheduled value
        ** before the cancelation, which is the value of this next line: */
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, this.attackStartTime);

        // compute the time AFTER which all the events of the gain paramter should be canceled
        const cancelationStartTime = currentTime + Settings.adsrSafetyDuration;

        // then we cancel all events that start AFTER the previous cancelation time, this is not really necessary
        this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

        // compute and set relevant times
        this.attackStartTime = cancelationStartTime; // save the attack start time
        this.attackEndTime = this.attackStartTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        /* Attack phase: raise gain to maximum in 'attackTime' seconds;
        ** we use linear ramp for this, because exponential ramp does not seem to work properly, it instead delays the value;
        ** exponential ramp should be prefered, because it will be perceived as linear by the human ear; */
        // this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, this.attackStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.attackStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime);

        // Decay phase: lower gain to 'sustainLevel' in 'decayTime' seconds
        // for decay phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime);
    }

    /* This method represents the R (release) portion of the envelope, it basically coressponds to the 'noteOff' event */
    public stop(): void
    {
        // the time the 'noteOff' (stop) event was triggerd
        const currentTime = this.audioContext.currentTime; // the time when note was released

        // the gain corresponding to the time the current 'noteOff' event was triggered
        let currentTimeGain = 0.0;

        /* Release phase, lower gain to minimum (zero is not used because it does not work with exponential ramp).
        **
        ** It might be possible that the release phase has started before the attack-decay phase has finished, if
        ** the user releases the key before these phases finish.
        ** If we just add a 'release' event and not cancel all remaining events, the remaining events will trigger
        ** as well, because, chronologically, they are scheduled AFTER this 'release' event.
        ** In order to prevent this bug, we check if the release hapened before the attack was scheduled to end
        ** and we cancel all remaining events: */

        // if the release happened during the 'attack' phase of the previous note
        if (this.attackStartTime <= currentTime && currentTime <= this.attackEndTime)
        {
            // compute the value at the time of the 'stop' phase, this is done by linear interpolation
            const slope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
            currentTimeGain = slope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;
        }
        // if the release happened during the 'decay phase' of the previous note
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;
        }

            // then set the gain to the previously computed value
            this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, currentTime);

            // now we compute the time AFTER all scheduled events should be canceled
            let cancelationStartTime = 0.0;
            if (currentTime + Settings.adsrSafetyDuration < this.attackEndTime) // perfect situation case
                cancelationStartTime = currentTime + Settings.adsrSafetyDuration;
            else // not so perfect case
                // TO DO: this time might not be perfect, should find better values?
                cancelationStartTime = currentTime;

            // first phase: cancel all remaining events
            // this.adsrGainNode.gain.cancelScheduledValues(this.attackEndTime - AdsrEnvelope.SAFETY_DURATION);
            this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

            // compute the end of the 'release' phase
            this.releaseEndTime = cancelationStartTime + this.releaseDuration;

            // then start the actual 'release' phase by ramping down to the minimum possible
            // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }
        // if the release ha happened after the attack phase but before the decay phase
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            // compute the value at the time of the 'stop' phase, this is done by linear interpolation
            const slope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            const currentTimeGain = slope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;

            // then set the gain to the previously computed value
            this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, currentTime);

            // now we compute the time AFTER all scheduled events should be canceled
            let cancelationStartTime = 0.0;
            if (currentTime + Settings.adsrSafetyDuration < this.decayEndTime) // perfect situation case
                cancelationStartTime = currentTime + Settings.adsrSafetyDuration;
            else // not so perfect case
                // TO DO: this time might not be perfect, should find better values?
                cancelationStartTime = currentTime;

            // first phase: cancel all remaining events
            this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

            // compute the end of the 'release' phase
            this.releaseEndTime = cancelationStartTime + this.releaseDuration;

            // for release phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }
        else // perfect situation: the release has happend normally, after the decay phase
        {
            // first phase: set gain to 'sustainLevel'
            this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, currentTime);

            // now we compute the time AFTER all scheduled events should be canceled
            const cancelationStartTime = currentTime + Settings.adsrSafetyDuration;

            // first phase: cancel all remaining events
            // here, this is not really necessary, it's only for safety
            this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

            // compute the end of the 'release' phase
            this.releaseEndTime = cancelationStartTime + this.releaseDuration;

            // for release phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }

        // AdsrEnvelope.logger.debug(`start(): ADSR stoped`);
    }

    public getAttackTime(): number { return this.attackDuration; }

    public setAttackTime(attackTime: number): boolean
    {
        if (Settings.minAdsrAttackDuration <= attackTime && attackTime <= Settings.maxAdsrAttackDuration)
        {
            AdsrEnvelope.logger.debug(`setAttackTime(${attackTime})`);

            this.attackDuration = attackTime;
            return true; // value change was succesfull
        }
        else
        {
            AdsrEnvelope.logger.warn(`setAttackTime(${attackTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getDecayTime(): number { return this.decayDuration; }

    public setDecayTime(decayTime: number): boolean
    {
        if (Settings.minAdsrDecayDuration <= decayTime && decayTime <= Settings.maxAdsrDecayDuration)
        {
            AdsrEnvelope.logger.debug(`setDecayTime(${decayTime})`);

            this.decayDuration = decayTime;
            return true; // value change was succesfull
        }
        else
        {
            AdsrEnvelope.logger.warn(`setDecayTime(${decayTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getSustainLevel(): number { return this.sustainLevel; }

    public setSustainLevel(sustainLevel: number): boolean
    {
        if (Settings.minAdsrSustainLevel <= sustainLevel && sustainLevel <= Settings.maxAdsrSustainLevel)
        {
            AdsrEnvelope.logger.debug(`setSustainLevel(${sustainLevel})`);

            this.sustainLevel = sustainLevel;
            return true; // value change was succesfull
        }
        else
        {
            AdsrEnvelope.logger.warn(`setSustainLevel(${sustainLevel}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getReleaseTime(): number { return this.releaseDuration; }

    public setReleaseTime(releaseTime: number): boolean
    {
        if (Settings.minAdsrReleaseDuration <= releaseTime && releaseTime <= Settings.maxAdsrReleaseDuration)
        {
            AdsrEnvelope.logger.debug(`setReleaseTime(${releaseTime})`);

            this.releaseDuration = releaseTime;
            return true; // value change was succesfull
        }
        else
        {
            AdsrEnvelope.logger.warn(`setReleaseTime(${releaseTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }
}