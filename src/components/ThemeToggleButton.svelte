<script lang="ts">
	import { fade, fly, scale } from "svelte/transition";
	import { mode, toggleMode } from "mode-watcher";
	import { Moon, Sun } from "lucide-svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import clsx from "clsx";

	let className: HTMLButtonAttributes["class"] = "";

	export { className as class };
</script>

<button
	aria-label="Theme mode toggle"
	class={clsx("relative inline-flex items-center justify-center px-2 py-1 \
		rounded-md size-10", className)}
	on:click={toggleMode}
>
	{#if $mode === "dark"}
		<div 
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ duration: 200, delay: 50, start: 0.7 }}
		>
			<Moon class="size-5 fill-[#24292f] dark:fill-[#fff]" />
		</div>
	{:else}
		<div 
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{ duration: 200, delay: 50, start: 0.7 }}
		>
			<Sun class="size-5 fill-[#24292f] dark:fill-[#fff]" />
		</div>
	{/if}
</button>
