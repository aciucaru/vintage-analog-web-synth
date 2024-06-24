import { Constants } from "./constants";
import { Settings } from "./settings";
import { Note } from "../model/audio/note";

export class NoteSettings
{
    // the minimum and maximum absolute frequencies possible, that the 'Note' class can describe
    // these will be initialized in the below static block
    public static minFrequency: number;
    public static maxFrequency: number;
    public static defaultFrequency: number = Constants.a4Freq;

    static
    {
        const minNote = new Note(3, 0);
        minNote.setOctavesOffset(Settings.minOscOctavesOffset);
        minNote.setSemitonesOffset(Settings.minOscSemitonesOffset);
        minNote.setCentsOffset(Settings.minOscCentsOffset);
        NoteSettings.minFrequency = minNote.getFreq();

        const maxNote = new Note(6, 11);
        maxNote.setOctavesOffset(Settings.maxOscOctavesOffset);
        maxNote.setSemitonesOffset(Settings.maxOscSemitonesOffset);
        maxNote.setCentsOffset(Settings.maxOscCentsOffset);
        NoteSettings.maxFrequency = maxNote.getFreq();
    }
}

