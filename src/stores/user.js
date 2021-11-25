import { writable } from "svelte/store";

export const user = writable(null);
export const isLoggedIn = writable(false);
export const firstVisit = writable(false);
export const role = writable("visitor");
export const identityChecksDone = writable(false);
