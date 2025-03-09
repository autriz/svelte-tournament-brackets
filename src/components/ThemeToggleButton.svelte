<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { mode, toggleMode } from "mode-watcher";
	import { Moon, Sun } from "lucide-svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let className: HTMLButtonAttributes["class"] = "";

	export { className as class };
</script>

<button
	aria-label="Theme mode toggle"
	class={className}
	on:click={toggleMode}
>
	{#if $mode === "dark"}
		<div in:fly={{ duration: 250, delay: 250, y: -5 }}>
			<Moon class="size-7 fill-[#24292f] dark:fill-[#fff]" />
		</div>
	{:else}
		<div in:fly={{ duration: 250, delay: 250, y: -5 }}>
			<Sun class="size-7 fill-[#24292f] dark:fill-[#fff]" />
		</div>
	{/if}
</button>
