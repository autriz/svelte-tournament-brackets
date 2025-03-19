<!-- <script lang="ts">
	import { onMount } from "svelte";
	import { getHighlighter } from "./utils";

	let showCode = false;
	let container: HTMLDivElement;
	let code: string = "";

	onMount(() => {
		code = getHighlighter().codeToHtml(container.innerHTML, {
			lang: "svelte",
			themes: {
				light: "vitesse-light",
				dark: "vitesse-dark",
			},
		});
	});
</script>

<div class="flex flex-col">
	<div
		class="flex flex-row justify-between border-b border-muted px-4 pb-2 text-sm text-muted-foreground"
	>
		<div class="flex flex-row gap-3">
			<button
				class="font-semibold transition-colors hover:text-primary data-[active]:text-primary"
				on:click={() => (showCode = false)}
				data-active={!showCode ? "" : undefined}
			>
				Preview
			</button>
			<button
				class="font-semibold transition-colors hover:text-primary data-[active]:text-primary"
				on:click={() => (showCode = true)}
				data-active={showCode ? "" : undefined}
			>
				Code
			</button>
		</div>
		<button class="font-semibold transition-colors hover:text-primary">
			Copy code
		</button>
	</div>
	<div
		class="mt-4 h-[300px] w-full overflow-auto rounded-lg border border-muted shadow-md"
		bind:this={container}
	>
		{#if !showCode}
			<slot />
		{:else}
			{@html code}
		{/if}
	</div>
</div>

<style>
	div > :global(.shiki) {
		@apply h-fit min-h-full w-fit min-w-full p-3;
	}
</style> -->
