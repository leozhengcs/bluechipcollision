// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Slot } from "$lib/types/calendar";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

declare module 'svelte-recaptcha';