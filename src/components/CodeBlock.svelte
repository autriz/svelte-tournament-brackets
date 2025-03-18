<script lang="ts">
	import clsx from "clsx";
	import { AlertCircle, Check, Clipboard } from "lucide-svelte";
	import type { HighlighterCore } from "shiki";
	import { scale } from "svelte/transition";
	import ThemeToggleButton from "./ThemeToggleButton.svelte";

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

	let copyTimeout: number | undefined;
	let copyStatus: "copied" | "failed" | null = null;

	function copyCode() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(code);
			copyStatus = "copied";
		} else {
			copyStatus = "failed";
		}

		clearTimeout(copyTimeout);

		copyTimeout = setTimeout(() => {
			copyStatus = null;
		}, 2500);
	}
</script>

<div class={clsx("group relative overflow-x-auto rounded-lg", className)}>
	<div class="absolute right-[12px] top-[12px] inline-flex size-8">
		<button
			class="relative rounded-lg border border-neutral-400
			bg-neutral-100 opacity-0 size-8 inline-flex items-center justify-center
			transition-all hover:bg-neutral-50 group-hover:opacity-100
			dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-900"
			title="Copy code"
			on:click={copyCode}
		>
			{#if copyStatus === "copied"}
				<div 
					class="absolute inline-flex h-full w-full justify-center items-center"
					transition:scale={{ duration: 100, delay: 50, start: 0.7 }}
				>
					<Check class="size-5 text-green-600"></Check>
				</div>
			{:else if copyStatus === "failed"}
				<div 
					class="absolute inline-flex h-full w-full justify-center items-center"
					transition:scale={{ duration: 100, delay: 50, start: 0.7 }}
				>
					<AlertCircle class="size-5 text-red-500"></AlertCircle>
				</div>
			{:else}
				<div 
					class="absolute inline-flex h-full w-full justify-center items-center"
					transition:scale={{ duration: 100, delay: 50, start: 0.7 }}
				>
					<Clipboard class="size-5 text-neutral-500"></Clipboard>
				</div>
			{/if}
		</button>
	</div>
	{@html html}
</div>

<style>
	div > :global(.shiki) {
		@apply overflow-x-auto px-6 py-5;
	}
</style>
