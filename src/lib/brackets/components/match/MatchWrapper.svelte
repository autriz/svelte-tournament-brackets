<script lang="ts">
	import type { BaseMatch, BaseEntrant } from "$lib/internal/types.js";
	import { getCtx } from "$lib/internal/ctx.js";

	let { hoveredMatchId, hoveredRoundId, hoveredEntrantId } = getCtx();

	export let match: BaseMatch;
	export let entrant1: BaseEntrant | undefined = undefined;
	export let entrant2: BaseEntrant | undefined = undefined;

	$: isMatchHovered =
		$hoveredMatchId === Number(match.matchId) &&
		$hoveredRoundId === Number(match.roundId);
	$: isTopHovered = $hoveredEntrantId === Number(match.entrant1?.entrantId);
	$: isBottomHovered =
		$hoveredEntrantId === Number(match.entrant2?.entrantId);
		
	function onEnter(entrantId: number) {
		$hoveredMatchId = Number(match.matchId);
		$hoveredRoundId = Number(match.roundId);
		$hoveredEntrantId = Number(entrantId);
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
