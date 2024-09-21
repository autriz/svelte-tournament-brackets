<script lang="ts">
    import type { Match, Entrant } from "$lib/internal/types.js";
	import { getCtx } from "$lib/internal/ctx.js";

    let {
        hoveredMatchId,
        hoveredRoundId,
        hoveredEntrantId,
    } = getCtx();

    export let match: Match;
    export let entrant1: Entrant | null = null;
    export let entrant2: Entrant | null = null;

    Number(match.matchId)

    $: isMatchHovered = ($hoveredMatchId === Number(match.matchId) && $hoveredRoundId === Number(match.roundId));
    $: isTopHovered = ($hoveredEntrantId === Number(match.opponent1?.opponentId));
    $: isBottomHovered = ($hoveredEntrantId === Number(match.opponent2?.opponentId));

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