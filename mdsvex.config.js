import { escapeSvelte } from "mdsvex";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from "shiki";
import { visit } from "unist-util-visit";
import { readFileSync } from "fs";

import vitesseDark from "shiki/themes/vitesse-dark.mjs";
import vitesseLight from "shiki/themes/vitesse-light.mjs";
import typescript from "shiki/langs/typescript.mjs";
import javascript from "shiki/langs/javascript.mjs";
import svelte from "shiki/langs/svelte.mjs";
import bash from "shiki/langs/bash.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {{ type: "raw" } & import("hast").Literal} RawNode
 * @typedef {RawNode | import("hast").Root | import("hast").Doctype | import("hast").ElementContent} Node
 * @typedef {import("hast").Root} HastRoot
 * @typedef {import("unified").Transformer<HastRoot, HastRoot>} HastTransformer
 */

export const highlighter = createHighlighterCoreSync({
	themes: [vitesseDark, vitesseLight],
	langs: [typescript, javascript, svelte, bash],
	engine: createJavaScriptRegexEngine(),
});

/** @type {import("mdsvex").MdsvexOptions} */
export const mdsvexOptions = {
	extensions: [".svx"],
	layout: resolve(__dirname, "./src/docs/components/markdown/Layout.svelte"),
	smartypants: {
		quotes: false,
		ellipses: false,
		backticks: false,
		dashes: false,
	},
	rehypePlugins: [rehypeInsertSourceCodeToComponentExample],
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

			return `<Components.CodeBlock ${meta}>{@html \`${html}\`}</Components.CodeBlock>`;
		},
	},
};

/**
 * As this long name suggests, it modifies component example
 * declaration, inserting in it source code from provided example
 *
 * @returns {HastTransformer} - unified transformer
 */
function rehypeInsertSourceCodeToComponentExample() {
	return async (tree) => {
		visit(tree, visitorCallback);
	};
}

/**
 *
 * @param {Node} node
 * @param {number | undefined} index
 * @param {HastRoot | Element | undefined} parent
 */
function visitorCallback(node, index, parent) {
	// Searching for Preview component opening
	if (node?.type === "raw" && node.value.startsWith("<Preview")) {
		// If found, look for name property of Preview
		/** @type string | null */
		const name = node.value.match(/name="([^"]+)"/)?.[1] ?? null;
		if (!name || !index) return;

		// TODO: wrap try/catch block around it
		// Search for source code based on provided name
		// and when found, replace all "$lib" imports with
		// "svelte-tournament-brackets"
		const sourceCode = getComponentSourceCode(name).replaceAll(
			"$lib",
			"svelte-tournament-brackets",
		);

		// Make it pretty
		const highlightedCode = escapeSvelte(
			highlighter.codeToHtml(sourceCode, {
				lang: "svelte",
				themes: {
					light: "vitesse-light",
					dark: "vitesse-dark",
				},
			}),
		);

		/**
		 * 	This AST visitor treats continuous block of code as one node
		 * 	i.e this:
		 *
		 * 	<Preview name="test-comp">
		 * 		<TestComp />
		 * 	</Preview>
		 *
		 * 	will result in something like this:
		 *
		 * 	{
		 * 		type: 'raw',
		 * 		value: '<Preview name="test-comp">\n\t<TestComp />\n</Preview>'
		 * 	},
		 *
		 * 	whereas this:
		 *
		 * 	<Preview name="test-comp">
		 *
		 * 		<TestComp />
		 *
		 * 	</Preview>
		 *
		 * 	will result in a bunch of nodes like this:
		 *
		 * 	[
		 * 		{
		 * 			type: 'raw'
		 * 			value: '<Preview name="test-comp">'
		 * 		},
		 * 		{
		 * 			type: 'text',
		 * 			value: '\n'
		 * 		},
		 * 		{
		 * 			type: 'raw',
		 * 			value: '\t<TestComp />\n\t\n</Preview>'
		 * 		}
		 * 	]
		 *
		 * 	aaand I don't know why visitor treats first newline as separate and second as continuation
		 */

		// Check if closing tag is inside this node
		if (node.value.endsWith("</Preview>")) {
			const parts = [
				node.value.slice(0, node.value.indexOf(">") + 1),
				node.value.slice(
					node.value.indexOf(">") + 1,
					node.value.indexOf("</Preview>"),
				),
				node.value.slice(node.value.indexOf("</Preview>")),
			];
			parts.splice(
				2,
				0,
				`\t<slot slot="code">${highlightedCode}</slot>\n`,
			);

			parent.children[index].value = parts.join("");
		}
		// if not, treat as if it contains spaces around preview snippet
		else {
			parent.children[index + 1].value =
				`\t<slot slot="code">${highlightedCode}</slot>\n`;
		}
	}
}

/**
 * Returns raw source code from specified component
 * @param {string} src
 * @throws IO Error
 */
function getComponentSourceCode(src) {
	const filePath = resolve(
		__dirname,
		`./src/docs/components/demos/${src}.svelte`,
	);

	return readFileSync(filePath, "utf-8");
}
