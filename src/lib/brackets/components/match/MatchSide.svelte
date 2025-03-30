<script lang="ts" generics="Entrant extends BaseEntrant = BaseEntrant">
	import type { BaseEntrant, Opponent } from "$lib";

	/** Entrant data snippet */
	export let entrant: Entrant | undefined;
	/** Entrant data of the match */
	export let opponent: Opponent | undefined;
	export let entrantIdx: number | undefined;
	export let side: "top" | "bottom";
	export let isHovered: boolean;
	export let hasEnded: boolean;
	export let onEnter: ((id: Entrant["entrantId"]) => void) | undefined =
		undefined;
	export let onLeave: (() => void) | undefined = undefined;

	const isValidNumber = (value: unknown): value is number =>
		Number.isInteger(value);

	$: hasWon = opponent?.opponentStatus === "WON";
</script>

<div
	data-bracket-match-side
	data-disabled={opponent ? undefined : true}
	data-hovered={isHovered ? true : undefined}
	data-side={side}
	data-won={hasEnded ? hasWon : undefined}
	aria-disabled={opponent ? undefined : true}
	on:pointerenter={() =>
		opponent ? onEnter?.(opponent.opponentId) : undefined}
	on:pointerleave={() => onLeave?.()}
>
	<span data-bracket-match-seed>
		{#if opponent && entrant && isValidNumber(entrantIdx)}
			{entrantIdx + 1}
		{/if}
	</span>
	<span data-bracket-match-entrant>
		{#if opponent && entrant}
			{entrant.entrantName}
		{/if}
	</span>
	<span data-bracket-match-score>
		{#if opponent && entrant}
			{#if hasEnded}
				{opponent.opponentStatus}
			{:else}
				{opponent.opponentScore ?? 0}
			{/if}
		{/if}
	</span>
</div>
