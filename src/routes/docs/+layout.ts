import type { LayoutLoad } from "./$types";
import {
	createJavaScriptRegexEngine,
	getSingletonHighlighterCore,
} from "shiki";

const getHighlighter = async () =>
	await getSingletonHighlighterCore({
		themes: [
			await import("shiki/themes/vitesse-dark.mjs"),
			await import("shiki/themes/vitesse-light.mjs"),
		],
		langs: [
			await import("shiki/langs/typescript.mjs"),
			await import("shiki/langs/svelte.mjs"),
			await import("shiki/langs/bash.mjs"),
		],
		engine: createJavaScriptRegexEngine(),
	});

export const load: LayoutLoad = async () => {
	const highlighter = await getHighlighter();

	return {
		highlighter,
	};
};
