<script
	lang="ts"
	generics="
		Entrant extends BaseEntrant,
		Match extends BaseMatch,
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

	export let isTopHovered: boolean = false;
	export let isBottomHovered: boolean = false;

	export let onEnter: ((entrantId: Entrant["id"]) => void) | undefined =
		undefined;
	export let onLeave: (() => void) | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	$: hasEnded = !!match.opponent1?.status && !!match.opponent2?.status;
</script>

<button
	data-bracket-match
	data-status={match.status}
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
