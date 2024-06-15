import { writable } from "svelte/store";

export const pointerAngle = writable(270 * Math.PI / 180);