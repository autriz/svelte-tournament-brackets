<script
	lang="ts"
	generics="
		Entrant extends BaseEntrant = BaseEntrant,
		Match extends BaseMatch = BaseMatch,
	"
>
	import type { BaseMatch, BaseEntrant } from "$lib";
	import MatchSide from "./MatchSide.svelte";

	export let match: Match;
	export let indices: {
		entrant1: number | undefined;
		entrant2: number | undefined;
		round: number;
		match: number;
	};
	export let entrant1: Entrant | undefined = undefined;
	export let entrant2: Entrant | undefined = undefined;

	export let isTopHovered: boolean;
	export let isBottomHovered: boolean;

	export let onEnter: (entrantId: Entrant["entrantId"]) => void;
	export let onLeave: () => void;
	export let onMatchClick: ((match: Match) => void) | undefined;

	$: hasEnded =
		!!match.opponent1?.opponentStatus && !!match.opponent2?.opponentStatus;
</script>

<button
	class="grid h-full w-full grid-flow-row grid-rows-2 overflow-visible
	bg-neutral-100 text-start shadow-md dark:bg-neutral-900 dark:shadow-none"
	on:click={() => onMatchClick?.(match)}
>
	<MatchSide
		entrant={entrant1}
		opponent={match.opponent1}
		entrantIdx={indices.entrant1}
		{hasEnded}
		isHovered={isTopHovered}
		{onEnter}
		{onLeave}
		side="top"
	/>
	<MatchSide
		entrant={entrant2}
		opponent={match.opponent2}
		entrantIdx={indices.entrant2}
		{hasEnded}
		isHovered={isBottomHovered}
		{onEnter}
		{onLeave}
		side="bottom"
	/>
</button>
