<script lang="ts" generics="Entrant extends BaseEntrant">
	import type { BaseEntrant, Opponent } from "$lib";

	export let entrant: Entrant | undefined;
	export let opponent: Opponent | undefined;
	export let entrantIdx: number | undefined;
	export let side: "top" | "bottom";
	export let isHovered: boolean;
	export let hasEnded: boolean;
	export let onEnter: ((id: Entrant["id"]) => void) | undefined = undefined;
	export let onLeave: (() => void) | undefined = undefined;

	const isValidNumber = (value: unknown): value is number =>
		Number.isInteger(value);

	$: hasWon = opponent?.status === "WON";
</script>

<div
	data-bracket-match-side
	data-disabled={opponent ? undefined : true}
	data-hovered={isHovered ? true : undefined}
	data-side={side}
	data-won={hasEnded ? hasWon : undefined}
	aria-disabled={opponent ? undefined : true}
	on:pointerenter={() => (opponent ? onEnter?.(opponent.id) : undefined)}
	on:pointerleave={() => (opponent ? onLeave?.() : undefined)}
>
	<span data-bracket-match-seed>
		{#if opponent && entrant && isValidNumber(entrantIdx)}
			{entrantIdx + 1}
		{/if}
	</span>
	<span data-bracket-match-entrant>
		{#if opponent && entrant}
			{entrant.name}
		{/if}
	</span>
	<span data-bracket-match-score>
		{#if opponent && entrant}
			{#if hasEnded}
				{opponent.status}
			{:else}
				{opponent.score ?? 0}
			{/if}
		{/if}
	</span>
</div>
