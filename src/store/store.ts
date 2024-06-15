import { writable } from "svelte/store";
import { voice } from "../model/audio/voice";

export const shouldUpdate = writable(true);