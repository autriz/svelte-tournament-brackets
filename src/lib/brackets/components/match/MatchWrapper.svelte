<script 
	lang="ts" 
	generics="
		Round extends BaseRound = BaseRound,
		Match extends BaseMatch = BaseMatch,
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import type { 
		BaseMatch, 
		BaseEntrant,
		BracketConfig, 
		BaseRound 
	} from "$lib";
	import { getCtx } from "$lib/internal/ctx";

	let { hoveredMatchId, hoveredRoundId, hoveredEntrantId } = getCtx<BracketConfig, Round, Match, Entrant>();

	export let match: Match;

	$: isMatchHovered =
		$hoveredMatchId === match.matchId &&
		$hoveredRoundId === match.roundId;
	$: isTopHovered = $hoveredEntrantId === match.opponent1?.opponentId;
	$: isBottomHovered =
		$hoveredEntrantId === match.opponent2?.opponentId;
		
	function onEnter(entrantId: Entrant["entrantId"]) {
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
	{onEnter}
	{onLeave}
/>
