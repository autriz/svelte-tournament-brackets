<script lang="ts">
	import clsx from "clsx";
import { Clipboard } from "lucide-svelte";
	import type { HighlighterCore } from "shiki";

	export let highlighter: HighlighterCore;
	export let code: string;
	export let lang: "svelte" | "ts" | "bash" = "ts";
	let className: string | undefined = undefined;
	export { className as class };

	$: html = highlighter.codeToHtml(
		code, 
		{ 
			lang,
			themes: {
				light: "vitesse-light", 
				dark: "vitesse-dark" 
			},
		},
	);

	function copyCode() {
		navigator.clipboard.writeText(code);
	}
</script>

<div class={clsx("relative group rounded-lg overflow-x-auto", className)}>
	<button 
		class="absolute top-[12px] right-[12px] p-1.5 rounded-lg border 
		dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-900
		border-neutral-400 bg-neutral-100 hover:bg-neutral-50
		opacity-0 group-hover:opacity-100 transition-all"
		title="Copy code"
		on:click={copyCode}
	>
		<Clipboard class="size-5 text-neutral-500"></Clipboard>
	</button>
	{@html html}
</div>

<style>
	div > :global(.shiki) {
		@apply py-5 px-6 overflow-x-auto;
	}
</style>