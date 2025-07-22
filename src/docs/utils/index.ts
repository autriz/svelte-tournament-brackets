import { m } from "$docs/paraglide/messages";

export const pageNameMap = {
	"getting-started": m.gettingStarted(),
	"customizable-components": m.customizableComponents(),
	"extendable-types": m.extendableTypes(),
	configuration: "Configuration",
	"single-elimination-bracket": "Single Elimination Bracket",
	"double-elimination-bracket": "Double Elimination Bracket",
};

export const pageDescriptionMap = {
	"getting-started": m.gettingStartedDescription(),
	"customizable-components": m.customizableComponentsDescription(),
	"extendable-types": m.extendableTypesDescription(),
	configuration:
		"Description of all configuration options available for the bracket components",
	"single-elimination-bracket": "Single Elimination Bracket",
	"double-elimination-bracket": "Double Elimination Bracket",
};

interface Section {
	title: string;
	links: (keyof typeof pageNameMap)[];
}

export const pageSectionMap: Record<string, Section> = {
	basics: {
		title: m.basics(),
		links: ["getting-started"],
	},
	customization: {
		title: m.customization(),
		links: ["customizable-components", "extendable-types", "configuration"],
	},
	components: {
		title: m.components(),
		links: ["single-elimination-bracket", "double-elimination-bracket"],
	},
};

export function isPageName(key: string): key is keyof typeof pageNameMap {
	return key in pageNameMap;
}

export function getPageNeighbors(key: string | undefined) {
	if (!key || !isPageName(key))
		return {
			next: undefined,
			previous: undefined,
		};

	const keys = Object.keys(pageNameMap) as (keyof typeof pageNameMap)[];
	const currIdx = keys.indexOf(key);
	const prevKey = keys[currIdx - 1];
	const nextKey = keys[currIdx + 1];

	return {
		next: nextKey
			? {
					href: `/docs/${nextKey}`,
					title: pageNameMap[nextKey],
				}
			: undefined,
		previous: prevKey
			? {
					href: `/docs/${prevKey}`,
					title: pageNameMap[prevKey],
				}
			: undefined,
	};
}
