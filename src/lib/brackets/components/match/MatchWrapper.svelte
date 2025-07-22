<script
	lang="ts"
	generics="
		Round extends BaseRound,
		Match extends BaseMatch,
		Entrant extends BaseEntrant
	"
>
	import type {
		BaseMatch,
		BaseEntrant,
		BracketConfig,
		BaseRound,
	} from "$lib";
	import { getCtx } from "$lib/internal";

	let { hoveredMatchId, hoveredRoundId, hoveredEntrantId } = getCtx<
		BracketConfig,
		Round,
		Match,
		Entrant
	>();

	export let match: Match;

	$: isMatchHovered =
		$hoveredMatchId === match.id && $hoveredRoundId === match.roundId;
	$: isTopHovered = $hoveredEntrantId === match.opponent1?.id;
	$: isBottomHovered = $hoveredEntrantId === match.opponent2?.id;

	function onEnter(entrantId: Entrant["id"]) {
		$hoveredMatchId = match.id;
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
