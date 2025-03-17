<script lang="ts">
	import clsx from "clsx";
	import { Clipboard } from "lucide-svelte";
	import type { HighlighterCore } from "shiki";

	export let highlighter: HighlighterCore;
	export let code: string;
	export let lang: "svelte" | "ts" | "bash" = "ts";
	let className: string | undefined = undefined;
	export { className as class };

	$: html = highlighter.codeToHtml(code, {
		lang,
		themes: {
			light: "vitesse-light",
			dark: "vitesse-dark",
		},
	});

	function copyCode() {
		navigator.clipboard.writeText(code);
	}
</script>

<div class={clsx("group relative overflow-x-auto rounded-lg", className)}>
	<button
		class="absolute right-[12px] top-[12px] rounded-lg border border-neutral-400
		bg-neutral-100 p-1.5 opacity-0
		transition-all hover:bg-neutral-50 group-hover:opacity-100
		dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-900"
		title="Copy code"
		on:click={copyCode}
	>
		<Clipboard class="size-5 text-neutral-500"></Clipboard>
	</button>
	{@html html}
</div>

<style>
	div > :global(.shiki) {
		@apply overflow-x-auto px-6 py-5;
	}
</style>
