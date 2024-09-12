<script lang="ts">
    import type { Match, Entrant } from "$lib/internal/types.js";
	import { getCtx } from "$lib/internal/ctx.js";

    let {
        hoveredMatchId,
        hoveredRoundId,
        hoveredEntrantId,

        setHoveredEntrant,
        setHoveredMatch,
        setHoveredRound,
    } = getCtx();

    export let match: Match;
    export let entrant1: Entrant | null = null;
    export let entrant2: Entrant | null = null;

    Number(match.matchId)

    $: isMatchHovered = ($hoveredMatchId === Number(match.matchId) && $hoveredRoundId === Number(match.roundId));
    $: isTopHovered = ($hoveredEntrantId === Number(match.opponent1?.opponentId));
    $: isBottomHovered = ($hoveredEntrantId === Number(match.opponent2?.opponentId));

    function onEnter(entrantID: number) {
        setHoveredMatch(Number(match.matchId));
        setHoveredRound(Number(match.roundId));
        setHoveredEntrant(entrantID);
    }

    function onLeave() {
        setHoveredMatch(Number(null));
        setHoveredRound(Number(null));
        setHoveredEntrant(null);
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