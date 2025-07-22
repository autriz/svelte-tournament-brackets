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

const expressionParts = [
	"(?<disableCopy>disableCopy)",
	'(?<class>class=".*")',
	"(?<words>\\/.*\\/)",
	"(?<lines>\\{(?:\\d+(?:-\\d+)?)(?:,\\s*(?:\\d+(?:-\\d+)?))*\\})",
];
const regex = new RegExp(`${expressionParts.join("|")}`, "dgu");

/**
 * @typedef {{ type: "raw" } & import("hast").Literal} RawNode
 * @typedef {RawNode | import("hast").Root | import("hast").Doctype | import("hast").ElementContent} Node
 * @typedef {import("hast").Root} HastRoot
 * @typedef {import("unified").Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import("shiki").DecorationItem} DecorationItem
 * @typedef {import("shiki").ShikiTransformer} ShikiTransformer
 */

export const highlighter = createHighlighterCoreSync({
	themes: [vitesseDark, vitesseLight],
	langs: [typescript, javascript, svelte, bash],
	engine: createJavaScriptRegexEngine(),
});

const themes = {
	light: "vitesse-light",
	dark: "vitesse-dark",
};

/**
 *
 * @param {string} str
 */
function parseLineRange(str) {
	const result = [];
	const ranges = str.substring(1, str.length - 1).split(",");

	for (const range of ranges) {
		const [start, end] = range.split("-").map(Number);

		if (Number.isNaN(start))
			throw new Error("Invalid highlight line number");

		if (end) {
			if (Number.isNaN(end))
				throw new Error("Invalid highlight line number");

			result.push(
				...Array.from(
					{ length: end - start + 1 },
					(_v, i) => i + start,
				),
			);
		} else {
			result.push(start);
		}
	}

	return result;
}

/**
 * Extracts meta properties
 * @param {string | null} value
 * @returns {{ lines?: number[], words?: string, disableCopy?: string, class?: string }}
 */
function extractMeta(value) {
	if (!value) return {};

	return Array.from(value.matchAll(regex)).reduce((acc, match) => {
		Object.entries(match.groups).forEach(([key, value]) => {
			if (value !== undefined) {
				switch (key) {
					case "lines": {
						acc[key] = parseLineRange(value);
						break;
					}
					case "words": {
						acc[key] = escapeBraces(
							value.substring(1, value.length - 1),
						);
						break;
					}
					default: {
						acc[key] = value;
						break;
					}
				}
			}
		});
		return acc;
	}, {});
}

/**
 *
 * @param {string} str
 */
function escapeBraces(str) {
	return str
		.replaceAll("[", "\\[")
		.replaceAll("]", "\\]")
		.replaceAll("|", "\\|");
}

/**
 *
 * @param {string} code
 * @param {string} words
 * @returns {Array<DecorationItem>}
 */
function getHighlightedTextLocations(code, words) {
	/** @type {Array<DecorationItem>} */
	const result = [];

	for (const match of code.matchAll(words)) {
		const [start, end] = [match["index"], match["index"] + match[0].length];

		result.push({
			start,
			end,
			properties: { className: "word-highlighted" },
		});
	}

	return result;
}

/**
 * @param {{ lines?: number[], words?: string }} options
 * @returns {ShikiTransformer}
 */
function highlightTransformer(options) {
	return {
		name: "highlight-transformer",
		preprocess(code, opts) {
			if (options.words) {
				opts.decorations = getHighlightedTextLocations(
					code,
					options.words,
				);
			}
		},
		line(node, line) {
			if (options.lines && options.lines.includes(line))
				this.addClassToHast(node, "highlighted");
		},
	};
}

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
			// extract all the things necessary for highlighting and copy button
			const {
				disableCopy,
				class: className,
				...highlightMeta
			} = extractMeta(meta);

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes,
					transformers: [highlightTransformer(highlightMeta)],
				}),
			);

			return `<Components.CodeBlock ${className ?? ""} ${disableCopy ?? ""}>{@html \`${html}\`}</Components.CodeBlock>`;
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
function preprocessPreview(node, index, parent) {
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
			themes,
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
		parts.splice(2, 0, `\t<slot slot="code">${highlightedCode}</slot>\n`);

		parent.children[index].value = parts.join("");
	}
	// if not, treat as if it contains spaces around preview snippet
	else {
		parent.children[index + 1].value =
			`\t<slot slot="code">${highlightedCode}</slot>\n`;
	}
}

/**
 * Highlights inline code block if language
 * is specified, i.e. `console.log(){:js}`
 *
 * @param {Node} node
 * @param {number | undefined} index
 * @param {HastRoot | Element | undefined} parent
 */
function preprocessInlineCodeBlock(node, index, parent) {
	/** @type Node | undefined */
	const childNode = node.children.at(0);

	if (childNode && childNode.type === "text") {
		let text = childNode.value;
		let lang = (text.match(/(\{\:.*\})|(&#123;\:.*&#125;)/g) || [])[0];

		if (lang) {
			text = text.substring(0, text.length - lang.length);
			lang = lang.replaceAll(/&#123;|&#125;|\{|\}|\:/g, "");

			const ast = highlighter.codeToHast(escapeSvelte(text), {
				lang,
				themes: {
					light: "vitesse-light",
					dark: "vitesse-dark",
				},
			});

			const highlighted = ast.children[0].children[0];

			parent.children[index] = highlighted;
		}
	}
}

/**
 * Adds tabs attribute to Tabs component
 *
 * @param {Node} node
 * @param {number | undefined} index
 * @param {HastRoot | Element | undefined} parent
 */
function preprocessTabs(node, index, parent) {
	const tabs = [];
	const nodes = [];
	let offset = 0;
	let tempNode = parent.children[index + offset];

	while (!tempNode.type === "raw" || !tempNode.value.includes("</Tabs>")) {
		nodes.push(tempNode);

		offset++;
		tempNode = parent.children[index + offset];
	}

	nodes.push(parent.children[index + offset]);

	const rawText = nodes.map((node) => node.value).join("");
	let [tabsOpen, innerHtml, tabsClose] = [
		rawText.slice(0, node.value.indexOf(">") + 1),
		rawText.slice(rawText.indexOf(">") + 1, rawText.indexOf("</Tabs>")),
		rawText.slice(rawText.indexOf("</Tabs>")),
	];

	if (tabsOpen.includes("tabs=")) return;

	let tempIdx = 0;

	while (tempIdx < innerHtml.length - 1) {
		let tabLBIdx = innerHtml.indexOf("<Tab", tempIdx);

		if (tabLBIdx === -1) {
			break;
		}

		let tabRBIdx = innerHtml.indexOf(">", tabLBIdx);

		tabs.push(extractTabName(innerHtml.substring(tabLBIdx, tabRBIdx + 1)));
		tempIdx = innerHtml.indexOf("</Tab>", tabRBIdx);
	}

	tabsOpen = `<Tabs tabs={[${tabs.toString()}]}>`;

	if (offset === 0) {
		parent.children[index].value = [tabsOpen, innerHtml, tabsClose].join(
			"",
		);
	} else {
		parent.children[index].value = parent.children[index].value.replace(
			/<Tabs\s*>/,
			tabsOpen,
		);
	}
}

/**
 *
 * @param {string} string
 *
 * @returns string
 */
function extractTabName(string) {
	const matches = string.match(/(?<name>name=(?<value>(".*")|(\{.*\})))/);

	return matches.groups.value.replaceAll(/\{|\}/g, "").trim();
}

/**
 *
 * @param {Node} node
 * @param {number | undefined} index
 * @param {HastRoot | Element | undefined} parent
 */
function visitorCallback(node, index, parent) {
	if (node?.type === "raw") {
		if (node.value.startsWith("<Preview")) {
			preprocessPreview(node, index, parent);
		} else if (node.value.startsWith("<Tabs")) {
			preprocessTabs(node, index, parent);
		}
	} else if (node?.type === "element" && node.tagName === "code") {
		preprocessInlineCodeBlock(node, index, parent);
	}
}

/**
 * Returns raw source code from specified component
 * @param {string} src
 * @throws IO Error
 */
function getComponentSourceCode(src) {
	const filePath = resolve(__dirname, `./src/docs/demos/${src}.svelte`);

	return readFileSync(filePath, "utf-8");
}
