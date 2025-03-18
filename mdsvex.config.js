import { escapeSvelte } from "mdsvex";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from "shiki";

import vitesseDark from "shiki/themes/vitesse-dark.mjs";
import vitesseLight from "shiki/themes/vitesse-light.mjs";
import typescript from "shiki/langs/typescript.mjs";
import svelte from "shiki/langs/svelte.mjs";
import bash from "shiki/langs/bash.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const highlighter = createHighlighterCoreSync({
	themes: [vitesseDark, vitesseLight],
	langs: [typescript, svelte, bash],
	engine: createJavaScriptRegexEngine(),
});

export const mdsvexOptions = {
	extensions: [".svx"],
	layout: resolve(__dirname, "./src/components/markdown/Layout.svelte"),
	smartypants: {
		quotes: false,
		ellipses: false,
		backticks: false,
		dashes: false,
	},
	highlight: {
		highlighter: async (code, lang, meta) => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes: {
						light: "vitesse-light",
						dark: "vitesse-dark",
					},
				}),
			);

			meta = meta ?? "";

			return `<CodeBlock ${meta} code={\`${code}\`}>{@html \`${html}\`}</CodeBlock>`;
		},
	},
};
