<script lang="ts">
	import { SingleEliminationBracket } from "$lib";
	import data from "$docs/mock-data/single-elim-minimal";

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

	function handleSelect(
		e: MouseEvent | PointerEvent,
		attribute: (typeof attributes)[number],
	) {
		e.stopPropagation();

		if (selectedAttribute === attribute) selectedAttribute = undefined;
		else selectedAttribute = attribute;
	}

	function handleOutsideClick() {
		selectedAttribute = undefined;
	}
</script>

<svelte:body on:click={handleOutsideClick} />

<div class="m-auto flex w-fit flex-row gap-8">
	<div class="flex w-[250px] flex-col gap-2">
		{#each attributes as attribute}
			<button
				class="cursor-default text-start text-muted-foreground transition-colors data-[selected]:text-green-500 sm:text-center"
				data-selected={attribute === selectedAttribute ? "" : undefined}
				on:click={(e) => handleSelect(e, attribute)}
				on:pointerenter={(e) => handleSelect(e, attribute)}
				on:pointerleave={handleOutsideClick}
			>
				{attribute}
			</button>
		{/each}
		<p class="mt-3 text-center">Click to see element with that attribute</p>
	</div>
	<div
		class="h-full w-[225px] overflow-hidden"
		data-example-wrapper
		data-selected={selectedAttribute}
	>
		<SingleEliminationBracket {data} />
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
		@apply absolute left-0.5 top-0.5 size-[calc(100%-0.25rem)] bg-transparent opacity-40 transition-colors;
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
		@apply bg-green-500;
	}

	[data-selected="data-bracket-connector"] :global([data-bracket-connector]) {
		@apply stroke-green-500;
	}
</style>
