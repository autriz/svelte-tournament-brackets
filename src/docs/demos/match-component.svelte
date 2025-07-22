<script lang="ts">
	import { SingleEliminationBracket } from "$lib";
	import data from "$docs/mock-data/single-elim-minimal";
	import { m } from "$docs/paraglide/messages";

	const attributes = [
		"data-bracket-match",
		"data-bracket-match-side",
		"data-bracket-match-seed",
		"data-bracket-match-entrant",
		"data-bracket-match-score",
		"data-bracket-round-header",
		"data-bracket-connector",
	] as const;

	let selectedAttribute: (typeof attributes)[number] | undefined = undefined;
	let selectedReason: "pointer" | "hover" | undefined = undefined;

	function handleSelect(
		e: MouseEvent | PointerEvent,
		attribute: (typeof attributes)[number],
		reason: "pointer" | "hover",
	) {
		e.stopPropagation();

		if (reason === "hover" && selectedReason === "pointer") return;

		if (reason === "pointer" && selectedReason === "hover") {
			selectedReason = "pointer";
			if (selectedAttribute === attribute) return;
		}

		if (selectedAttribute === attribute) {
			if (reason === "pointer" && selectedReason === "pointer") {
				selectedReason = "hover";
			} else {
				selectedAttribute = undefined;
				selectedReason = undefined;
			}
		} else {
			selectedAttribute = attribute;
			selectedReason = reason;
		}
	}

	function handleDeselect(hover: boolean = false) {
		if (hover && selectedReason === "pointer") return;
		selectedAttribute = undefined;
		selectedReason = undefined;
	}
</script>

<svelte:body on:click={() => handleDeselect()} />

<div class="m-auto flex w-fit flex-row gap-8">
	<div class="mx-3 flex w-[250px] flex-col gap-2 lg:mx-0">
		{#each attributes as attribute}
			<button
				class="cursor-default text-center text-muted-foreground
				transition-colors data-[selected]:text-green-500
				sm:text-center"
				data-selected={attribute === selectedAttribute ? "" : undefined}
				on:click={(e) => handleSelect(e, attribute, "pointer")}
				on:pointerenter={(e) => handleSelect(e, attribute, "hover")}
				on:pointerleave={() => handleDeselect(true)}
			>
				{attribute}
			</button>
		{/each}
		<p class="mt-3 text-center">{m.clickElementToSeeAttribute()}</p>
	</div>
	<div
		class="h-full w-[225px] overflow-hidden"
		data-example-wrapper
		data-selected={selectedAttribute}
	>
		<SingleEliminationBracket {data} class="fill-transparent" />
	</div>
</div>

<style>
	[data-example-wrapper] :global([data-bracket-match]),
	[data-example-wrapper] :global([data-bracket-match-side]),
	[data-example-wrapper] :global([data-bracket-match-seed]),
	[data-example-wrapper] :global([data-bracket-match-entrant]),
	[data-example-wrapper] :global([data-bracket-match-score]),
	[data-example-wrapper] :global([data-bracket-round-header]) {
		position: relative;
	}

	[data-example-wrapper] :global([data-bracket-match]::after),
	[data-example-wrapper] :global([data-bracket-match-side]::after),
	[data-example-wrapper] :global([data-bracket-match-seed]::after),
	[data-example-wrapper] :global([data-bracket-match-entrant]::after),
	[data-example-wrapper] :global([data-bracket-match-score]::after),
	[data-example-wrapper] :global([data-bracket-round-header]::after) {
		content: "";
		position: absolute;
		left: 1px;
		top: 1px;
		height: calc(100% - 0.125rem);
		width: calc(100% - 0.125rem);
		background: transparent;
		opacity: 0.4;
		transition-property:
			color, background-color, border-color, text-decoration-color, fill,
			stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	[data-selected="data-bracket-match"] :global([data-bracket-match]::after),
	[data-selected="data-bracket-match-side"]
		:global([data-bracket-match-side]::after),
	[data-selected="data-bracket-match-seed"]
		:global([data-bracket-match-seed]::after),
	[data-selected="data-bracket-match-entrant"]
		:global([data-bracket-match-entrant]::after),
	[data-selected="data-bracket-match-score"]
		:global([data-bracket-match-score]::after),
	[data-selected="data-bracket-round-header"]
		:global([data-bracket-round-header]::after) {
		background: rgb(34 197 94);
	}

	[data-selected="data-bracket-connector"] :global([data-bracket-connector]) {
		stroke: rgb(34 197 94);
	}
</style>
