<script
	lang="ts"
	generics="
		Round extends BaseRound = BaseRound,
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import type {
		BaseMatch,
		BaseEntrant,
		BaseMatchEntrant,
		BracketConfig,
		BaseRound,
	} from "$lib/internal/types";
	import { getCtx } from "$lib/internal/ctx";

	let { hoveredMatchId, hoveredRoundId, hoveredEntrantId } = getCtx<
		BracketConfig,
		Round,
		MatchEntrant,
		Match,
		Entrant
	>();
	
	export let match: Match;
	export let entrant1: Entrant | undefined = undefined;
	export let entrant2: Entrant | undefined = undefined;

	$: isMatchHovered =
		$hoveredMatchId === match.matchId && $hoveredRoundId === match.roundId;
	$: isTopHovered = $hoveredEntrantId === match.entrant1?.entrantId;
	$: isBottomHovered = $hoveredEntrantId === match.entrant2?.entrantId;

	function onEnter(entrantId: MatchEntrant["entrantId"]) {
		$hoveredMatchId = match.matchId;
		$hoveredRoundId = match.roundId;
		$hoveredEntrantId = entrantId;
	}

	function onLeave() {
		$hoveredMatchId = null;
		$hoveredRoundId = null;
		$hoveredEntrantId = null;
	}
</script>

<slot
	{isMatchHovered}
	{isTopHovered}
	{isBottomHovered}
	{match}
	{entrant1}
	{entrant2}
	{onEnter}
	{onLeave}
/>
