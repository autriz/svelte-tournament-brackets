<script lang="ts">
	import { copyToClipboard, type CopyResult } from "$docs/utils/clipboard";
	import { AlertCircle, Check } from "lucide-svelte";
	import { scale, crossfade } from "svelte/transition";

	/** Name pointing to preview source code file. */
	export let name: string | undefined = undefined;

	$: shouldRenderPreviewCode = !!name;

	let showCode = false;
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

<div class="mt-5 flex flex-col">
	{#if shouldRenderPreviewCode}
		<div
			class="flex flex-row justify-between border-b border-muted px-4 pb-2 text-sm text-muted-foreground"
		>
			<div class="flex flex-row gap-3">
				<button
					class="relative font-semibold transition-colors hover:text-primary data-[active]:text-primary"
					on:click={() => (showCode = false)}
					data-active={!showCode ? "" : undefined}
				>
					Preview
					{#if !showCode}
						<div
							in:send={{ key: "tab" }}
							out:receive={{ key: "tab" }}
							class="absolute -bottom-[0.5625rem] h-px w-full bg-primary"
						></div>
					{/if}
				</button>
				<button
					class="relative font-semibold transition-colors hover:text-primary data-[active]:text-primary"
					on:click={() => (showCode = true)}
					data-active={showCode ? "" : undefined}
				>
					Code
					{#if showCode}
						<div
							in:send={{ key: "tab" }}
							out:receive={{ key: "tab" }}
							class="absolute -bottom-[0.5625rem] h-px w-full bg-primary"
						></div>
					{/if}
				</button>
			</div>
			<button
				class="relative font-semibold transition-colors hover:text-primary"
				on:click={copyCode}
			>
				Copy code
				{#if copyStatus === "copied"}
					<div
						class="absolute -left-12 inline-flex h-full w-full items-center justify-center"
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
						class="absolute -left-12 inline-flex h-full w-full items-center justify-center"
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
		</div>
		<div class="mt-4 w-full rounded-lg border border-muted shadow-md">
			<div
				class="relative"
				data-preview
				hidden={!!showCode && $$slots.default}
			>
				<div
					class="relative flex max-h-[700px] min-h-[350px] w-full items-center justify-center"
				>
					<slot />
				</div>
			</div>
			<div
				class="max-h-[700px] min-h-[350px] w-full overflow-auto"
				data-preview-code
				hidden={!showCode && $$slots.code}
				bind:this={blockRef}
			>
				<slot name="code" />
			</div>
		</div>
	{:else}
		<div
			class="relative w-full rounded-lg border border-muted shadow-md"
			data-preview
		>
			<div
				class="relative flex max-h-[700px] min-h-[350px] w-full items-center justify-center"
			>
				<slot />
			</div>
		</div>
	{/if}
</div>

<style>
	[data-preview-code] > :global(.shiki) {
		@apply h-fit min-h-full w-fit min-w-full p-3;
	}

	[data-preview] {
		--background-color: 247 247 247;
		background-color: rgb(var(--background-color));
	}

	[data-preview]:is(.dark *) {
		--background-color: 18 18 18;
	}

	[data-preview]::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: radial-gradient(
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

	[data-preview]::after {
		background-image: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 1) 70%,
			rgba(255, 255, 255, 1) 100%
		);
	}

	[data-preview] > :global(*) {
		z-index: 10;
	}
</style>
