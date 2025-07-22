<script lang="ts">
	import { m } from "$docs/paraglide/messages";
	import { copyToClipboard, type CopyResult } from "$docs/utils/clipboard";
	import { AlertCircle, Check } from "lucide-svelte";
	import { scale, crossfade } from "svelte/transition";
	import { Tab, Tabs } from "./tabs";
	import { Tabs as BitsTabs } from "bits-ui";

	/** Name pointing to preview source code file. */
	export let name: string | undefined = undefined;

	$: shouldRenderPreviewCode = !!name;

	let blockRef: HTMLElement;

	let copyTimeout: Timer | undefined;
	let copyStatus: CopyResult | null = null;

	const [send, receive] = crossfade({ duration: 150 });

	function copyCode() {
		copyStatus = copyToClipboard(blockRef.innerText);

		clearTimeout(copyTimeout);

		copyTimeout = setTimeout(() => {
			copyStatus = null;
		}, 1500);
	}
</script>

<Tabs tabs={shouldRenderPreviewCode ? [m.preview(), m.code()] : [m.preview()]}>
	<BitsTabs.List
		class="flex flex-row justify-between border-b border-dashed
			border-neutral-200 px-4 pb-2 text-sm text-muted-foreground
			dark:border-neutral-800"
		slot="list"
		let:tabs
		let:active
	>
		<div class="flex flex-row gap-3">
			{#each tabs as tab}
				<BitsTabs.Trigger
					class="relative font-semibold transition-colors hover:text-primary data-[state=active]:text-primary"
					value={tab}
				>
					{tab}
					{#if tab === active}
						<div
							in:send={{ key: "tab" }}
							out:receive={{ key: "tab" }}
							class="absolute -bottom-[0.5625rem] h-px w-full bg-primary"
						></div>
					{/if}
				</BitsTabs.Trigger>
			{/each}
		</div>
		<button
			class="relative font-semibold transition-colors hover:text-primary"
			on:click={copyCode}
		>
			{m.copyCode()}
			{#if copyStatus === "copied"}
				<div
					class="absolute -left-7 inline-flex h-full w-full items-center justify-start"
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
					class="absolute -left-7 inline-flex h-full w-full items-center justify-start"
					transition:scale={{
						duration: 100,
						delay: 50,
						start: 0.7,
					}}
				>
					<AlertCircle class="size-5 text-red-500"></AlertCircle>
				</div>
			{/if}
		</button>
	</BitsTabs.List>
	<div data-preview-wrapper>
		<div data-preview-content>
			<Tab name={m.preview()} class="relative" data-preview>
				<div
					class="relative grid max-h-[700px] min-h-[350px]
					place-items-center overflow-auto"
				>
					<slot />
				</div>
			</Tab>
			<Tab
				name={m.code()}
				class="max-h-[700px] min-h-[350px] w-full overflow-auto"
				data-preview-code
			>
				<div bind:this={blockRef}>
					<slot name="code" />
				</div>
			</Tab>
		</div>
	</div>
</Tabs>

<style>
	:global([data-preview-code]) > div > :global(.shiki) {
		height: fit-content;
		min-height: 100%;
		min-width: 100%;
		padding: 0.75rem;
	}

	[data-preview-wrapper] {
		background: border-box;
		@apply rounded-lg border border-transparent bg-gradient-to-t from-muted to-muted-foreground/30 shadow-md;

		&:is(.dark) {
			@apply shadow-none;
		}
	}

	[data-preview-content] {
		--background-color: 247 247 247;
		background-color: rgb(var(--background-color));
		@apply w-full overflow-clip rounded-lg;
	}

	[data-preview-content]:is(.dark *) {
		--background-color: 18 18 18;
	}

	:global([data-preview]::before) {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image:
			radial-gradient(
				circle at center,
				rgba(0, 0, 0, 0) 50%,
				rgb(var(--background-color)) 80%,
				rgb(var(--background-color)) 100%
			),
			radial-gradient(
				circle at 1px 1px,
				rgb(115 115 115 / 0.5) 1px,
				transparent 0
			);
		background-size:
			115% 115%,
			1.5rem 1.5rem;
		background-repeat: no-repeat, repeat;
		background-position:
			center center,
			0.5rem center;
		z-index: 1;
	}

	:global([data-preview]::after) {
		background-image: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 1) 70%,
			rgba(255, 255, 255, 1) 100%
		);
	}

	:global([data-preview] > *) {
		z-index: 10;
	}
</style>
