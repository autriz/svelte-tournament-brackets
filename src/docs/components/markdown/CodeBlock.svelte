<script lang="ts">
	import { copyToClipboard, type CopyResult } from "$docs/utils/clipboard";
	import { cn } from "$docs/utils/cn";
	import { AlertCircle, Check, Clipboard } from "lucide-svelte";
	import { scale } from "svelte/transition";
	import { m } from "$docs/paraglide/messages.js";

	let className: string | undefined = undefined;
	export { className as class };
	export let style: string | undefined = undefined;
	export let disableCopy: boolean = false;

	let blockRef: HTMLElement;
	let copyTimeout: Timer | undefined;
	let copyStatus: CopyResult | null = null;

	function copyCode() {
		copyStatus = copyToClipboard(blockRef.innerText);

		clearTimeout(copyTimeout);

		copyTimeout = setTimeout(() => {
			copyStatus = null;
		}, 1500);
	}
</script>

<div class={cn("group relative my-4", className)} {style}>
	{#if !disableCopy}
		<div class="absolute right-[12px] top-[12px] inline-flex size-9">
			<button
				class="lg pointer-events-none relative inline-flex size-9 items-center
				justify-center rounded-lg border border-neutral-400
				bg-neutral-100 opacity-0 transition-all hover:bg-neutral-50
				group-hover:pointer-events-auto group-hover:opacity-100 dark:border-neutral-700
				dark:bg-neutral-800 dark:hover:bg-neutral-900"
				title={m.copyCode()}
				on:click={copyCode}
			>
				{#if copyStatus === "copied"}
					<div
						class="absolute inline-flex h-full w-full items-center justify-center"
						transition:scale={{
							duration: 100,
							delay: 50,
							start: 0.7,
						}}
					>
						<Check class="size-5 text-green-600"></Check>
					</div>
				{:else if copyStatus === "failed"}
					<div
						class="absolute inline-flex h-full w-full items-center justify-center"
						transition:scale={{
							duration: 100,
							delay: 50,
							start: 0.7,
						}}
					>
						<AlertCircle class="size-5 text-red-500"></AlertCircle>
					</div>
				{:else}
					<div
						class="absolute inline-flex h-full w-full items-center justify-center"
						transition:scale={{
							duration: 100,
							delay: 50,
							start: 0.7,
						}}
					>
						<Clipboard class="size-5 text-neutral-500"></Clipboard>
					</div>
				{/if}
			</button>
		</div>
	{/if}
	<div data-code-block bind:this={blockRef}>
		<slot />
	</div>
</div>

<style>
	div > :global(pre.shiki) {
		tab-size: 4;
		@apply overflow-auto py-5;

		& > code {
			@apply block w-fit min-w-full px-6;
		}
	}

	[data-code-block] {
		background: border-box;
		@apply overflow-x-auto rounded-lg border border-transparent bg-gradient-to-t from-muted to-muted-foreground/30 shadow-md dark:shadow-none;
	}

	@media (hover: none) {
		button {
			opacity: 100%;
			pointer-events: auto;
		}
	}
</style>
