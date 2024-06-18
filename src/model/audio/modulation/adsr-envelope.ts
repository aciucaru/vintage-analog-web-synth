import { Settings } from "../../../constants/settings";
import { BaseAudioNode } from "../base-audio-node";

import { Logger } from "tslog";
import type { ILogObj } from "tslog";

/* General-purpose ADSR envelope; this envelope does not have a predefined min and max value,
** instead, it can vary between 0 and 'sustainLevel', where 'sustainLevel' can be maximum 1.0 (100%);
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
        this.adsrGainNode.gain.cancelScheduledValues(currentTime + AdsrEnvelope.SAFETY_DURATION);

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
        AdsrEnvelope.logger.debug(`start(): ADSR triggered`);

        // get relevant times
        const currentTime = this.audioContext.currentTime; // the time when note was triggered
        this.attackStartTime = currentTime; // save the attack start time also
        this.attackEndTime = currentTime + this.attackDuration; // the time the attack phase should end
        this.decayEndTime = this.attackEndTime + this.decayDuration; // the time the decay phase should end

        /* It might be possible that the the 'noteOn' (atack-decay) phase has started before the 'release' phase of the
        ** previous note, so we verify this first: */
        if (this.releaseStartTime < currentTime && currentTime < this.releaseEndTime)
        {
            // in this case, we first compute the gain value that would correspond to the 'currentTime', through linear interpolation
            const lineSlope = (Settings.minAdsrSustainLevel - this.sustainLevel) / (this.releaseEndTime - this.releaseStartTime);
            const currentTimeGain = lineSlope * (currentTime - this.releaseStartTime) + this.sustainLevel;

            // then we set the gain to the computed value, this is the gain that would appear on time 'currentTime'
            this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, currentTime);

            // then we cancel all event that start AFTER the previous event
            this.
        }

        // first phase: cancel all remaining events
        // first we add an event before the canceling occurs, the value will revert back to the last value of this event
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, currentTime);
        // cancel all events after the previous event
        this.adsrGainNode.gain.cancelScheduledValues(currentTime + AdsrEnvelope.SAFETY_DURATION);

        /* Attack phase: raise gain to maximum in 'attackTime' seconds;
        ** we use linear ramp for this, because exponential ramp does not seem to work properly, it instead delays the value;
        ** exponential ramp should be prefered, because it will be perceived as linear by the human ear; */
        this.adsrGainNode.gain.linearRampToValueAtTime(Settings.maxAdsrSustainLevel, this.attackEndTime);

        // Decay phase: lower gain to 'sustainLevel' in 'decayTime' seconds
        // for decay phase we use linear ramp, not exponential, because exponential goes down to quick
        this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, this.decayEndTime);
    }

    /* This method represents the R (release) portion of the envelope, it basically coressponds to the 'noteOff' event */
    public stop(): void
    {
        // get relevant times
        const currentTime = this.audioContext.currentTime; // the time when note was released

        /* Release phase, lower gain to minimum (zero is not used because it does not work with exponential ramp).
        **
        ** It might be possible that the release phase has started before the attack-decay phase has finished,
        ** in this case the envelope will drop, but then, it will rise back again, because the attack ending time
        ** is after the release time(!), and so the value won't be at miminum, as expected, it will rise up again.
        ** In order to prevent this bug, we check if the release hapened before the attack was scheduled to end
        ** and we cancel all remaining events: */
        // if the release happened before the attack has finished
        if (currentTime <= this.attackEndTime)
        {
            // first phase: cancel all remaining events
            // this.adsrGainNode.gain.cancelScheduledValues(this.attackEndTime - AdsrEnvelope.SAFETY_DURATION);
            this.adsrGainNode.gain.cancelScheduledValues(currentTime);

            // then compute the value at the time of the 'stop' phase, this is done by linear interpolation
            const slope = (Settings.maxAdsrSustainLevel - Settings.minAdsrSustainLevel) / (this.attackEndTime - this.attackStartTime);
            const currentTimeGain = slope * (currentTime - this.attackStartTime) + Settings.minAdsrSustainLevel;

            // then set the gain to the previously computed value
            this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, currentTime + AdsrEnvelope.SAFETY_DURATION);

            // compute the end of the 'release' phase
            this.releaseEndTime = currentTime + AdsrEnvelope.SAFETY_DURATION + this.releaseDuration;

            // then start the actual 'release' phase by ramping down to the minimum possible
            // for 'release' phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }
        // if the release ha happened after the attack phase but before the decay phase
        else if (this.attackEndTime < currentTime && currentTime <= this.decayEndTime)
        {
            // first phase: cancel all remaining events
            this.adsrGainNode.gain.cancelScheduledValues(this.decayEndTime - AdsrEnvelope.SAFETY_DURATION);
            // unfortunately, the much more usefull 'cancelAndHoldAtTime(); does not work on Firefox

            // then compute the value at the time of the 'stop' phase, this is done by linear interpolation
            const slope = (this.sustainLevel - Settings.maxAdsrSustainLevel) / (this.decayEndTime - this.attackEndTime);
            const currentTimeGain = slope * (currentTime - this.attackEndTime) + Settings.maxAdsrSustainLevel;

            // then set the gain to the previously computed value
            this.adsrGainNode.gain.linearRampToValueAtTime(currentTimeGain, currentTime + AdsrEnvelope.SAFETY_DURATION);

            // compute the end of the 'release' phase
            this.releaseEndTime = currentTime + AdsrEnvelope.SAFETY_DURATION + this.releaseDuration;

            // for release phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }
        else // if the release has happend normally, after the decay phase
        {
            // first phase: set gain to 'sustainLevel'
            this.adsrGainNode.gain.linearRampToValueAtTime(this.sustainLevel, currentTime);

            // for release phase we use linear ramp, not exponential, because exponential goes down to quick
            this.adsrGainNode.gain.linearRampToValueAtTime(Settings.minAdsrSustainLevel, this.releaseEndTime);
        }

        AdsrEnvelope.logger.debug(`start(): ADSR stoped`);
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