<script lang="ts">
	import { scale } from "svelte/transition";
	import { mode, toggleMode } from "mode-watcher";
	import { Moon, Sun } from "lucide-svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn } from "$docs/utils/cn";
	import { m } from "$docs/paraglide/messages";

	let className: HTMLButtonAttributes["class"] = "";

	export { className as class };
</script>

<button
	aria-label="Theme mode toggle"
	title={$mode === "dark" ? m.toggleThemeLight() : m.toggleThemeDark()}
	class={cn("relative inline-flex group items-center justify-center px-2 py-1 \
		rounded-md size-10", className)}
	on:click={toggleMode}
>
	{#if $mode === "dark"}
		<div 
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ duration: 200, delay: 50, start: 0.7 }}
		>
			<Moon fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" class="size-5" />
		</div>
	{:else}
		<div 
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ duration: 200, delay: 50, start: 0.7 }}
		>
			<Sun fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" class="size-5" />
		</div>
	{/if}
</button>
