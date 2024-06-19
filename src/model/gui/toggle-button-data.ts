export enum ButtonIcon
{
    WAVE_SINE = "WAVE_SINE",
    WAVE_PULSE = "WAVE_PULSE",
    WAVE_SAW = "WAVE_SAW",
    WAVE_TRIANGLE = "WAVE_TRIANGLE"
}

export class ToggleButtonData
{
    // callback prop, that is called when the button is toggled
    public onToggleChange: (isToggled: boolean) => void;

    // an optional title prop wich represents the option to be toggled
    public label: string = "";

    public isToggled: boolean = false;

    /* the name of an optional image file that this component will use as icon;
    ** the component assumes that the file is found in a certain path (see below) and does not look elsewhere */
    // public iconType: ButtonIcon | null = null;

    constructor(label: string = "", onToggleChange: (isToggled: boolean) => void, isToggled: boolean = false)
    {
        this.label = label;
        // this.iconType = iconType;
        this.onToggleChange = onToggleChange;
        this.isToggled = isToggled;
    }
}