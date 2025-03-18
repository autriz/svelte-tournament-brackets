<script lang="ts">
	import clsx from "clsx";
	import { AlertCircle, Check, Clipboard } from "lucide-svelte";
	import { scale } from "svelte/transition";

	export let code: string;
	let className: string | undefined = undefined;
	export { className as class };
	export let style: string | undefined = undefined;
	export let disableCopy: boolean = false;

	let copyTimeout: Timer | undefined;
	let copyStatus: "copied" | "failed" | null = null;

	function copyCode() {
		if (navigator.clipboard) {
			try {
				navigator.clipboard.writeText(code!);
				copyStatus = "copied";
			} catch (err) {
				console.error(
					"Failed to copy code: Writing to the clipboard is not allowed",
				);
				copyStatus = "failed";
			}
		} else {
			console.error(
				"Failed to copy code: Clipboard API is not available in not secure contexts",
			);
			copyStatus = "failed";
		}

		clearTimeout(copyTimeout);

		copyTimeout = setTimeout(() => {
			copyStatus = null;
		}, 1500);
	}
</script>

<div
	class={clsx(
		"group relative overflow-x-auto rounded-lg shadow-md",
		className,
	)}
	{style}
>
	{#if !disableCopy}
		<div class="absolute right-[12px] top-[12px] inline-flex size-8">
			<button
				class="relative inline-flex size-8 items-center
				justify-center rounded-lg border border-neutral-400 bg-neutral-100 opacity-0
				transition-all hover:bg-neutral-50 group-hover:opacity-100
				dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-900"
				title="Copy code"
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
	<slot />
</div>

<style>
	div > :global(.shiki) {
		@apply overflow-x-auto px-6 py-5;
	}
</style>
