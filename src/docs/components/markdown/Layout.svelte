<script context="module">
	export {
		h1,
		h2,
		h3,
		a,
		p,
		code,
		ul,
		li,
		table,
		th,
		td,
		tr,
		thead,
	} from "./index.js";
	export { default as CodeBlock } from "./CodeBlock.svelte";
</script>

<script>
	import { h1 as H1, p as P } from "./index.js";
	import Title from "$components/Title.svelte";
	import { m } from "$docs/paraglide/messages";

	/** @type string | undefined */
	let titleText = undefined;
	export { titleText as title };
	/** @type string | undefined */
	let descriptionText = undefined;
	export { descriptionText as description };
	/** @type keyof typeof m | undefined */
	export let titleKey = undefined;
	/** @type keyof typeof m | undefined */
	export let descriptionKey = undefined;

	/** @type string */
	let title;
	if (titleText) {
		title = titleText;
	} else {
		if (titleKey) {
			title = m[titleKey]();
		} else {
			console.warn("Missing `title` or `titleKey` on this page");
			title = "";
		}
	}

	/** @type string */
	let description;
	if (descriptionText) {
		description = descriptionText;
	} else {
		if (descriptionKey) {
			description = m[descriptionKey]();
		} else {
			console.warn(
				"Missing `description` or `descriptionKey` on this page",
			);
			description = "";
		}
	}
</script>

<Title>
	<H1>{title}</H1>
	<P>{description}</P>
</Title>

<slot></slot>
