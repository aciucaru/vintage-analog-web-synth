import { Settings } from "../../../constants/settings";
import { NoInputBaseAudioNode } from "../base/no-input-base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* General-purpose ADSR envelope; this envelope does not have a predefined min and max value,
** instead, it can vary between 0.0 and 1.0.
** It also has a sustain level, where 'sustainLevel' can be maximum 1.0 (100%);
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
export class SimpleAdsrEnvelope extends NoInputBaseAudioNode
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
    private sustainEndTime = this.decayEndTime + Settings.adsrSafetyDuration;
    private releaseStartTime = this.decayEndTime + Settings.adsrSafetyDuration; // the time the release should start
    private releaseEndTime = this.releaseStartTime + this.releaseDuration; // the time the release phase should end

    private hasReleasePhaseStarted: boolean = false;
    
    private static readonly logger: Logger<ILogObj> = new Logger({name: "SimpleAdsrEnvelope", minLevel: Settings.minLogLevel});

    constructor(audioContext: AudioContext)
    {
        super(audioContext);

        this.adsrGainNode = this.audioContext.createGain();
        this.adsrGainNode.gain.setValueAtTime(Settings.minAdsrSustainLevel, this.audioContext.currentTime);
    }

    /* implementation of 'mainNode()', the only method of the BaseAudioNode abstract class
    ** this method is supposed to return the main node of the class */
    public override mainNode(): AudioNode { return this.adsrGainNode; }

    // this method is for sequencer beats (steps)
    public startBeat(duration: number): void
    {
        let timeDuration = 0;

        if (duration > 0)
            timeDuration = duration;
            // SimpleAdsrEnvelope.logger.debug(`startAndStop(${duration}): ADSR triggered for ${duration} seconds`);
        else
        {
            timeDuration = (60.0 / 120.0) / 4.0; // clip to 120 BPM 4/4

            // SimpleAdsrEnvelope.logger.warn(`startAndStop(${duration}): ADSR triggerd, duration is negative, value clipped to ${timeDuration}`);
        }

        const currentTime = this.audioContext.currentTime; // the time when note was triggered

        // if the duration of the note contains all 4 phases (ADSR)
        if (timeDuration > this.attackDuration + this.decayDuration + this.releaseDuration)
        {
            /* First compute the duration of the sustain phase, where the sustain duration is the time remaining after
            ** subtracting the ADR duration from the note full duration. */
            const sustainDuration = timeDuration - (this.attackDuration + this.decayDuration + this.releaseDuration);

            // then compute all phases times:
            // const currentTime = this.audioContext.currentTime; // the time when note was triggered
            this.attackStartTime = currentTime; // save the attack start time also
            this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
            this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end
            this.releaseStartTime = this.decayEndTime + sustainDuration; // the time the release phase should start
            this.releaseEndTime = this.releaseStartTime + this.releaseDuration; // the time the release phase should end
        }
        // if the duration of the note contains the first 3 phases (ADS)
        else if (timeDuration > this.attackDuration + this.decayDuration)
        {
            /* First compute the duration of the sustain phase, where the sustain duration is the time remaining after
            ** subtracting the AD duration from the note full duration.*/
            const sustainDuration = timeDuration - (this.attackDuration + this.decayDuration);

            /* Until now, everything is just like the previous case, but the release (R) phase duration will be zero */
            this.releaseDuration = 0;

            // then compute all phases times:
            // const currentTime = this.audioContext.currentTime; // the time when note was triggered
            this.attackStartTime = currentTime; // save the attack start time also
            this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
            this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end
            this.sustainEndTime = this.decayEndTime + sustainDuration;
            this.releaseStartTime = this.sustainEndTime; // the time the release phase should start
            this.releaseEndTime = this.sustainEndTime; // the time the release phase should end
        }
        // if the duration of the note contains the first 2 phases (AD)
        else if (timeDuration > this.attackDuration)
        {
            /* First compute the duration of the decay phase, where the decay duration is the time remaining after
            ** subtracting the attack duration from the note full duration.*/
            this.decayDuration = timeDuration - this.attackDuration;

            // the release (R) phase duration will be zero
            this.releaseDuration = 0;

            // then compute all phases times:
            // const currentTime = this.audioContext.currentTime; // the time when note was triggered
            this.attackStartTime = currentTime; // save the attack start time also
            this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
            this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end
            this.sustainEndTime = this.decayEndTime;
            this.releaseStartTime = this.decayEndTime; // the time the release phase should start
            this.releaseEndTime = this.decayEndTime; // the time the release phase should end
        }
        else if (timeDuration <= this.attackDuration)
        {
            this.attackDuration = timeDuration;

            // all other duration will be zero
            this.decayDuration = 0;
            this.releaseDuration = 0;

            // then compute all phases times:
            // const currentTime = this.audioContext.currentTime; // the time when note was triggered
            this.attackStartTime = currentTime; // save the attack start time also
            this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
            this.decayEndTime = this.attackEndTime; // the time the decay phase should end
            this.sustainEndTime = this.attackEndTime;
            this.releaseStartTime = this.attackEndTime; // the time the release phase should start
            this.releaseEndTime = this.attackEndTime; // the time the release phase should end
        }

        // first phase: cancel all remaining events
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, currentTime);
        this.adsrGainNode.gain.cancelScheduledValues(currentTime + Settings.adsrSafetyDuration);

        this.startAtTime(currentTime);
        this.stopAtTime(currentTime + timeDuration);
    }

    /* This method represents the ADS portion of the envelope, it basically coressponds to the 'noteOn' event */
    public start(): void
    {
        SimpleAdsrEnvelope.logger.debug(`start(): ADSR triggered`);

        // the time when the current note was triggered
        const currentTime = this.audioContext.currentTime;

        // the gain corresponding to the time the current note was triggered
        let currentTimeGain = 0.0;

        /* Ideal case: if the current note has started after the previous note's 'release' phase.
        ** This means that the previous note has finished playin completely and there should not be other remaining events. */

        // we are no longer in 'release' phase
        this.hasReleasePhaseStarted = false;

        // after the 'release' phase has finished, the gain will surely be at it's minimum level
        currentTimeGain = Settings.minAdsrSustainLevel;

        // compute intermediate times based on brand new current time
        const rampEndTime = this.audioContext.currentTime;
        const checkPointTime = rampEndTime + Settings.adsrSafetyDuration;
        // compute the time AFTER which all the events of the gain paramter should be canceled
        const cancelationStartTime = checkPointTime + Settings.adsrSafetyDuration;

        // compute and set relevant times
        this.attackStartTime = currentTime; // save the attack start time
        this.attackEndTime = this.attackStartTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        this.adsrGainNode.gain.linearRampToValueAtTime(0, currentTime);

        /* Now that we have the correct starting gain value, we first schedule a value change to 'currentTimeGain' 
        ** and the we cancell all remaining events.
        ** The cancelation of remaining events will trigger the parameter to go back to the last scheduled value
        ** before the cancelation, which is the value of this next line: */
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, rampEndTime);

        // then we cancel all events that start AFTER the previous cancelation time, this is not really necessary
        this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

        /* Attack phase: raise gain to maximum in 'attackTime' seconds;
        ** we use linear ramp for this, because exponential ramp does not seem to work properly, it instead delays the value;
        ** exponential ramp should be prefered, because it will be perceived as linear by the human ear; */
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.attackStartTime); // works better without
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel * (-2000), this.attackEndTime);

        // Decay phase: lower gain to 'sustainLevel' in 'decayTime' seconds
        // for decay phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel * (-2000), this.decayEndTime);
    }

    /* This method represents the R (release) portion of the envelope, it basically coressponds to the 'noteOff' event */
    public stop(): void
    {
        SimpleAdsrEnvelope.logger.debug(`stop(): stop triggered`);

        // the time the 'noteOff' (stop) event was triggerd
        const currentTime = this.audioContext.currentTime; // the time when note was released

        // the gain corresponding to the time the current 'noteOff' event was triggered
        let currentTimeGain = 0.0;

        // we set the fact that the release phase has started
        this.hasReleasePhaseStarted = true;

        // in the 'sustain' phase, the gain is constant, so it's easy to compute
        currentTimeGain = this.sustainLevel;

        // compute intermediate times
        const rampEndTime = this.audioContext.currentTime;
        const checkPointTime = rampEndTime + Settings.adsrSafetyDuration;

        // now we compute the time AFTER all scheduled events should be canceled
        const cancelationStartTime = checkPointTime + Settings.adsrSafetyDuration;

        // compute the start and end of the 'release' phase
        this.releaseStartTime = cancelationStartTime + Settings.adsrSafetyDuration;
        this.releaseEndTime = this.releaseStartTime + this.releaseDuration;

        /* Now that we have the correct starting gain value, we first schedule a value change to 'currentTimeGain' 
        ** and the we cancell all remaining events.
        ** The cancelation of remaining events will trigger the parameter to go back to the last scheduled value
        ** before the cancelation, which is the value of this next line: */
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain * (-2000), rampEndTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain * (-2000), checkPointTime);

        // cancel all remaining events
        this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

        // then start the actual 'release' phase by ramping down to the minimum possible
        // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain * (-2000), this.releaseStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
    }

    /* This method represents the ADS portion of the ADSR envelope, it basically coressponds to the 'noteOn' event,
    ** but, unlike the previous 'start()' method */
    public startAtTime(startTime: number): void
    {
        // SimpleAdsrEnvelope.logger.debug(`start(): ADSR triggered`);

        // the time when the current note was triggered
        const currentTime = startTime;

        // the gain corresponding to the time the current note was triggered
        let currentTimeGain = 0.0;

        // if the current note has started during the previous note's 'attack' phase
        if (this.attackStartTime <= currentTime && currentTime <= this.attackEndTime)
        {
            // const lineSlope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
            // currentTimeGain = lineSlope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;

            currentTimeGain = this.computeAttackCurrentGain(currentTime);
        }
        // if the current note has started during the previous note's 'decay' phase
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            // const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            // currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;
            
            currentTimeGain = this.computeDecayCurrentGain(currentTime);
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
                // const lineSlope = (Settings.minAdsrSustainLevel - this.sustainLevel) / (this.releaseEndTime - this.releaseStartTime);
                // currentTimeGain = lineSlope * (currentTime - this.releaseStartTime) + this.sustainLevel;

                currentTimeGain = this.computeReleaseCurrentGain(currentTime);
            }
        }
        /* Ideal case: if the current note has started after the previous note's 'release' phase.
        ** This means that the previous note has finished playin completely and there should not be other remaining events. */
        else if (currentTime > this.releaseEndTime)
        {
            // we are no longer in 'release' phase
            this.hasReleasePhaseStarted = false;

            // after the 'release' phase has finished, the gain will surely be at it's minimum level
            currentTimeGain = Settings.minAdsrSustainLevel;
        }

        // compute intermediate times based on brand new current time
        const rampEndTime = this.audioContext.currentTime;
        const checkPointTime = rampEndTime + Settings.adsrSafetyDuration;
        // compute the time AFTER which all the events of the gain paramter should be canceled
        const cancelationStartTime = checkPointTime + Settings.adsrSafetyDuration;
        // const cancelationStartTime = rampEndTime + Settings.adsrSafetyDuration;

        // compute and set relevant times
        this.attackStartTime = cancelationStartTime + Settings.adsrSafetyDuration; // save the attack start time
        this.attackEndTime = this.attackStartTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        /* Now that we have the correct starting gain value, we first schedule a value change to 'currentTimeGain' 
        ** and the we cancell all remaining events.
        ** The cancelation of remaining events will trigger the parameter to go back to the last scheduled value
        ** before the cancelation, which is the value of this next line: */
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, rampEndTime);
        // this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, checkPointTime);

        // then we cancel all events that start AFTER the previous cancelation time, this is not really necessary
        this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

        /* Attack phase: raise gain to maximum in 'attackTime' seconds;
        ** we use linear ramp for this, because exponential ramp does not seem to work properly, it instead delays the value;
        ** exponential ramp should be prefered, because it will be perceived as linear by the human ear; */
        // this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, this.attackStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.attackStartTime); // works better without
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime);

        // Decay phase: lower gain to 'sustainLevel' in 'decayTime' seconds
        // for decay phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime);
    }


    /* This method represents the R (release) portion of the envelope, it basically coressponds to the 'noteOff' event */
    public stopAtTime(stopTime: number): void
    {
        // the time the 'noteOff' (stop) event was triggerd
        const currentTime = stopTime; // the time when note was released

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
            // const lineSlope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
            // currentTimeGain = lineSlope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;

            currentTimeGain = this.computeAttackCurrentGain(currentTime);
        }
        // if the release happened during the 'decay phase' of the previous note
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            // const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            // currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;

            currentTimeGain = this.computeDecayCurrentGain(currentTime);
        }
        /* Ideal case: if the current 'noteOff' event has started after the previous note's 'decay' phase.
        ** This means we are in the 'sustain' phase, which where norammly the 'release' phase should be triggered.*/
        else if (currentTime > this.decayEndTime)
        {
            // we set the fact that the release phase has started
            this.hasReleasePhaseStarted = true;
   
            // in the 'sustain' phase, the gain is constant, so it's easy to compute
            currentTimeGain = this.sustainLevel;
        }

        // compute intermediate times
        const rampEndTime = this.audioContext.currentTime;
        const checkPointTime = rampEndTime + Settings.adsrSafetyDuration;

        // now we compute the time AFTER all scheduled events should be canceled
        const cancelationStartTime = checkPointTime + Settings.adsrSafetyDuration;

        // compute the start and end of the 'release' phase
        this.releaseStartTime = cancelationStartTime + Settings.adsrSafetyDuration;
        this.releaseEndTime = this.releaseStartTime + this.releaseDuration;

        /* Now that we have the correct starting gain value, we first schedule a value change to 'currentTimeGain' 
        ** and the we cancell all remaining events.
        ** The cancelation of remaining events will trigger the parameter to go back to the last scheduled value
        ** before the cancelation, which is the value of this next line: */
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, rampEndTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, checkPointTime);

        // cancel all remaining events
        this.adsrGainNode.gain.cancelScheduledValues(cancelationStartTime);

        // then start the actual 'release' phase by ramping down to the minimum possible
        // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
        // this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.releaseStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, this.releaseStartTime);
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);

        // just to be safe, cancell all events after thE release has finished
        // this.adsrGainNode.gain.cancelScheduledValues(this.releaseEndTime + Settings.adsrSafetyDuration);

        // SimpleAdsrEnvelope.logger.debug(`start(): ADSR stoped`);
    }

    public getAttackTime(): number { return this.attackDuration; }

    public setAttackTime(attackTime: number): boolean
    {
        if (Settings.minAdsrAttackDuration <= attackTime && attackTime <= Settings.maxAdsrAttackDuration)
        {
            SimpleAdsrEnvelope.logger.debug(`setAttackTime(${attackTime})`);

            this.attackDuration = attackTime;
            return true; // value change was succesfull
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`setAttackTime(${attackTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getDecayTime(): number { return this.decayDuration; }

    public setDecayTime(decayTime: number): boolean
    {
        if (Settings.minAdsrDecayDuration <= decayTime && decayTime <= Settings.maxAdsrDecayDuration)
        {
            SimpleAdsrEnvelope.logger.debug(`setDecayTime(${decayTime})`);

            this.decayDuration = decayTime;
            return true; // value change was succesfull
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`setDecayTime(${decayTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getSustainLevel(): number { return this.sustainLevel; }

    public setSustainLevel(sustainLevel: number): boolean
    {
        if (Settings.minAdsrSustainLevel <= sustainLevel && sustainLevel <= Settings.maxAdsrSustainLevel)
        {
            SimpleAdsrEnvelope.logger.debug(`setSustainLevel(${sustainLevel})`);

            this.sustainLevel = sustainLevel;
            return true; // value change was succesfull
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`setSustainLevel(${sustainLevel}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    public getReleaseTime(): number { return this.releaseDuration; }

    public setReleaseTime(releaseTime: number): boolean
    {
        if (Settings.minAdsrReleaseDuration <= releaseTime && releaseTime <= Settings.maxAdsrReleaseDuration)
        {
            SimpleAdsrEnvelope.logger.debug(`setReleaseTime(${releaseTime})`);

            this.releaseDuration = releaseTime;
            return true; // value change was succesfull
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`setReleaseTime(${releaseTime}): argument is outside bounds`);
            return false; // value change was not succesfull
        }
    }

    // utility method that computes the gain of the 'attack' phase corresponding to a given current time
    private computeAttackCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (this.attackStartTime <= currentTime && currentTime <= this.attackEndTime)
        {
            SimpleAdsrEnvelope.logger.debug(`computeAttackCurrentGain(${currentTime})`);

            let currentTimeGain = 0.0;

            if (this.attackEndTime != this.attackStartTime) // avoid division by zero
            {
                const lineSlope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
                currentTimeGain = lineSlope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            return currentTimeGain;
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`computeAttackCurrentGain(${currentTime}): currentTime is outside 'attack' phase`);
            return -1; // computation was not succesfull
        }
    }

    private computeDecayCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            SimpleAdsrEnvelope.logger.debug(`computeDecayCurrentGain(${currentTime})`);

            let currentTimeGain = 0.0;

            if (this.decayEndTime != this.attackEndTime) // avoid division by zero
            {
                const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
                currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            return currentTimeGain;
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`computeDecayCurrentGain(${currentTime}): currentTime is outside 'decay' phase`);
            return -1; // computation was not succesfull
        }
    }

    private computeReleaseCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (currentTime > this.decayEndTime)
        {
            SimpleAdsrEnvelope.logger.debug(`computeReleaseCurrentGain(${currentTime})`);

            let currentTimeGain = 0.0;

            if (this.releaseEndTime != this.releaseStartTime) // avoid division by zero
            {
                const lineSlope = (Settings.minAdsrSustainLevel - this.sustainLevel) / (this.releaseEndTime - this.releaseStartTime);
                currentTimeGain = lineSlope * (currentTime - this.releaseStartTime) + this.sustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            return currentTimeGain;
        }
        else
        {
            SimpleAdsrEnvelope.logger.warn(`computeReleaseCurrentGain(${currentTime}): currentTime is outside 'release' phase`);
            return -1; // computation was not succesfull
        }
    }
}