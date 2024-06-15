export class RadioButtonData
{
    // the index inside the container (the group of radio buttons)
    public index: number;

    // callback that is called when the button is toggled
    public onToggleChange: () => void;

    // an optional title prop wich represents the option to be toggled
    public label: string = "";

    public isToggled: boolean = false;

    constructor(index: number, label: string = "", onToggleChange: () => void, isToggled: boolean = false)
    {
        this.index = index;
        this.label = label;
        this.onToggleChange = onToggleChange;
        this.isToggled = isToggled;
    }
}