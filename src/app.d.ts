import type { m } from "$docs/paraglide/messages";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module "*.svx" {
		import type { SvelteComponent } from "svelte";

		export default class Comp extends SvelteComponent {}

		export const metadata: {
			title?: string;
			titleKey?: keyof typeof m;
			description?: string;
			descriptionKey?: keyof typeof m;
		};
	}
}

export {};
