// export enum ButtonIcon
// {
//     WAVE_SINE = "WAVE_SINE",
//     WAVE_PULSE = "WAVE_PULSE",
//     WAVE_SAW = "WAVE_SAW",
//     WAVE_TRIANGLE = "WAVE_TRIANGLE"
// }

export class ToggleButtonData
{
    public imageWidth: number = 0;
    public imageHeight: number = 0;

    /* props that gives the images paths and dimensions for the background of the button;
    ** the background description is made out of 2 images (for On and for Off); */
    public bgImageOnPath: string = "";
    public bgImageOffPath: string = "";

    /* props that gives the images paths and dimensions for the foreground of the button (the actual button images);
    ** the background description is made out of 2 images (for On and for Off); */
    public fgImageOnPath: string = "";
    public fgImageOffPath: string = "";

    constructor() { }
}