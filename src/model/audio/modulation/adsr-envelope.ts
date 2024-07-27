import { Settings } from "../../../constants/settings";
import { NoInputBaseAudioNode } from "../no-input-base-audio-node";

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

export class AdsrEnvelope extends NoInputBaseAudioNode
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

    // this method is for sequencer beats (steps)
    public startBeat(duration: number): void
    {
        let timeDuration = 0;

        if (duration > 0)
            timeDuration = duration;
        else
            timeDuration = (60.0 / 120.0) / 4.0; // clip to 120 BPM 4/4

        const currentTime = this.audioContext.currentTime; // the time when note was triggered

        this.startAtTime(currentTime);
        this.stopAtTime(currentTime + timeDuration);
    }

    /* This method represents the ADS portion of the envelope, it basically coressponds to the 'noteOn' event */
    public start(): void
    {
        AdsrEnvelope.logger.debug(`start(): ADSR triggered`);

        /* It might be possible that the attack-decay-sustain phase has started before the previous ADSR event has finished.
        ** If we just add an 'attack-decay-sustain' event and not cancel all remaining events, the remaining events will trigger
        ** as well, because, chronologically, they are scheduled AFTER this event.
        ** In order to prevent this bug, we use 'cancelAndHoldAtTime()'. */

        // compute the time AFTER which all the events of the gain paramter should be canceled
        const cancelationStartTime = this.audioContext.currentTime;

        /* then we cancel all events that start AFTER the previous cancelation time but we keep the value
        ** that the parameter had when the cancelation started */ 
        this.adsrGainNode.gain.cancelAndHoldAtTime(cancelationStartTime);

        /* After we checked the current ADSR phase based on ADSR times, we can now compute and overwrite ADSR times
        ** with new values.
        ** Overwriting the ADSR times should only be done after we used them to check what phase we are in!
        ** These new ADSR times will be used in the stop() method as well. */
        this.attackStartTime = cancelationStartTime; // save the attack start time
        this.attackEndTime = this.attackStartTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        /* Attack and decay phases */
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime); // attack
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime); // decay
    }

    /* This method represents the R (release) portion of the envelope, it basically coressponds to the 'noteOff' event */
    public stop(): void
    {
        AdsrEnvelope.logger.debug(`stop(): stop triggered`);

        /* It might be possible that the release phase has started before the previous ADSR event has finished.
        ** If we just add a 'release' event and not cancel all remaining events, the remaining events will trigger
        ** as well, because, chronologically, they are scheduled AFTER this 'release' event.
        ** In order to prevent this bug, we use 'cancelAndHoldAtTime()'. */

        // now we compute the time AFTER all scheduled events should be canceled
        const cancelationStartTime = this.audioContext.currentTime;

        // cancel all remaining events
        this.adsrGainNode.gain.cancelAndHoldAtTime(cancelationStartTime);

        // compute the start and end of the 'release' phase
        this.releaseStartTime = cancelationStartTime;
        this.releaseEndTime = this.releaseStartTime + this.releaseDuration;

        // then start the actual 'release' phase by ramping down to the minimum possible
        // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
    }

    /* This method represents the ADS portion of the ADSR envelope, but, unlike the previous 'start()'
    ** method, this method starts the ADS event at a specific time */
    public startAtTime(startTime: number): void
    {
        AdsrEnvelope.logger.debug(`startAtTime(): ADSR triggered`);

        /* It might be possible that the attack-decay-sustain phase has started before the previous ADSR event has finished.
        ** If we just add an 'attack-decay-sustain' event and not cancel all remaining events, the remaining events will trigger
        ** as well, because, chronologically, they are scheduled AFTER this event.
        ** In order to prevent this bug, we use 'cancelAndHoldAtTime()'. */

        // compute the time AFTER which all the events of the gain paramter should be canceled
        const cancelationStartTime = startTime;

        /* then we cancel all events that start AFTER the previous cancelation time but we keep the value
        ** that the parameter had when the cancelation started */ 
        this.adsrGainNode.gain.cancelAndHoldAtTime(cancelationStartTime);

        /* After we checked the current ADSR phase based on ADSR times, we can now compute and overwrite ADSR times
        ** with new values.
        ** Overwriting the ADSR times should only be done after we used them to check what phase we are in!
        ** These new ADSR times will be used in the stop() method as well. */
        this.attackStartTime = cancelationStartTime; // save the attack start time
        this.attackEndTime = this.attackStartTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        /* Attack and decay phases */
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime); // attack
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime); // decay
    }


    /* This method represents the R (release) portion of the ADSR envelope, but, unlike the previous 'stop()'
    ** method, this method starts the R event at a specific time */
    public stopAtTime(stopTime: number): void
    {
        /* It might be possible that the release phase has started before the previous ADSR event has finished.
        ** If we just add a 'release' event and not cancel all remaining events, the remaining events will trigger
        ** as well, because, chronologically, they are scheduled AFTER this 'release' event.
        ** In order to prevent this bug, we use 'cancelAndHoldAtTime()'. */

        // now we compute the time AFTER all scheduled events should be canceled
        const cancelationStartTime = stopTime;

        // cancel all remaining events
        this.adsrGainNode.gain.cancelAndHoldAtTime(cancelationStartTime);

        // compute the start and end of the 'release' phase
        this.releaseStartTime = cancelationStartTime;
        this.releaseEndTime = this.releaseStartTime + this.releaseDuration;

        // then start the actual 'release' phase by ramping down to the minimum possible
        // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
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

    // utility method that computes the gain of the 'attack' phase corresponding to a given current time
    private computeAttackCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (this.attackStartTime <= currentTime && currentTime <= this.attackEndTime)
        {
            let currentTimeGain = 0.0;

            if (this.attackEndTime != this.attackStartTime) // avoid division by zero
            {
                const lineSlope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
                currentTimeGain = lineSlope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            AdsrEnvelope.logger.debug(`computeAttackCurrentGain(time=${currentTime}): gain = ${currentTimeGain}`);

            return currentTimeGain;
        }
        else
        {
            AdsrEnvelope.logger.warn(`computeAttackCurrentGain(time${currentTime}): currentTime is outside 'attack' phase`);
            return -1; // computation was not succesfull
        }
    }

    private computeDecayCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            let currentTimeGain = 0.0;

            if (this.decayEndTime != this.attackEndTime) // avoid division by zero
            {
                const lineSlope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
                currentTimeGain = lineSlope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            AdsrEnvelope.logger.debug(`computeAttackCurrentGain(time=${currentTime}): gain = ${currentTimeGain}`);

            return currentTimeGain;
        }
        else
        {
            AdsrEnvelope.logger.warn(`computeDecayCurrentGain(${currentTime}): currentTime is outside 'decay' phase`);
            return -1; // computation was not succesfull
        }
    }

    private computeReleaseCurrentGain(currentTime: number): number
    {
        // first, check if the 'currentTime' is really in the 'attack' phase
        if (currentTime > this.decayEndTime)
        {
            let currentTimeGain = 0.0;

            if (this.releaseEndTime != this.releaseStartTime) // avoid division by zero
            {
                const lineSlope = (Settings.minAdsrSustainLevel - this.sustainLevel) / (this.releaseEndTime - this.releaseStartTime);
                currentTimeGain = lineSlope * (currentTime - this.releaseStartTime) + this.sustainLevel;
            }
            else
                currentTimeGain = 0.0; // is it the correct value ?

            AdsrEnvelope.logger.debug(`computeAttackCurrentGain(time=${currentTime}): gain = ${currentTimeGain}`);

            return currentTimeGain;
        }
        else
        {
            AdsrEnvelope.logger.warn(`computeReleaseCurrentGain(${currentTime}): currentTime is outside 'release' phase`);
            return -1; // computation was not succesfull
        }
    }
}