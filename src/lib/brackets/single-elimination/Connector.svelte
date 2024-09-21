<script lang="ts">
	import { getCtx } from "$lib/internal/ctx.js";
	import type { Match } from "$lib/internal/types.js";
	import clsx from "clsx";
    import type { BracketConfig, MatchPositionData } from "./types.js";
	import { getMatchPositionDataInner } from "./SingleEliminationBracket.svelte";

    let {
        hoveredMatchId,
        hoveredRoundId,
        hoveredEntrantId,
    } = getCtx();

    type Indices = { round: number; match: number; };

    export let indices: { 
        currentMatch: Indices, 
        previousTopMatch: Indices | null, 
        previousBottomMatch: Indices | null 
    };
    export let snippet: { 
        currentMatch: Match, 
        previousTopMatch: Match | null, 
        previousBottomMatch: Match | null 
    };
    export let config: BracketConfig;
        
    let {
        currentMatch,
        previousTopMatch,
        previousBottomMatch,
    } = snippet;

    let {
        currentMatch: currentIndices,
        previousTopMatch: previousTopIndices,
        previousBottomMatch: previousBottomIndices
    } = indices;

    // topMatchPosition={getMatchPositionData(roundIdx - 1, matchIdx * 2)}
    // bottomMatchPosition={getMatchPositionData(roundIdx - 1, matchIdx * 2 + 1)}
    // currentMatchPosition={getMatchPositionData(roundIdx, matchIdx)}
    
    let topMatchPosition: MatchPositionData | undefined = previousTopMatch && previousTopIndices ? 
        getMatchPositionDataInner(previousTopIndices.round, previousTopIndices.match, config) : 
        undefined;
    let bottomMatchPosition: MatchPositionData | undefined = previousBottomMatch && previousBottomIndices ? 
        getMatchPositionDataInner(previousBottomIndices.round, previousBottomIndices.match, config) : 
        undefined;
    let currentMatchPosition: MatchPositionData = getMatchPositionDataInner(currentIndices.round, currentIndices.match, config);


    $: isTopHighlighted = (
        currentMatch.opponent1?.opponentId === $hoveredEntrantId || 
        currentMatch.opponent2?.opponentId === $hoveredEntrantId) && (
        previousTopMatch?.opponent1?.opponentId === $hoveredEntrantId ||
        previousTopMatch?.opponent2?.opponentId === $hoveredEntrantId
    );

    $: isBottomHighlighted = (
        currentMatch.opponent1?.opponentId === $hoveredEntrantId || 
        currentMatch.opponent2?.opponentId === $hoveredEntrantId) && (
        previousBottomMatch?.opponent1?.opponentId === $hoveredEntrantId ||
        previousBottomMatch?.opponent2?.opponentId === $hoveredEntrantId
    );

    const calcPath = (data: MatchPositionData) => {
        const widthMargin = 8; // turn into a configurable value
        const roundHeaderHeight = config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin;
        const matchHalfHeight = config.matchStyle.height / 2;
        
        const startPos = `${
            data.position.x + config.matchStyle.width + widthMargin
        } ${
            data.position.y + matchHalfHeight + roundHeaderHeight
        }`;

        let path = [
            `M${startPos}`,
            `h${config.roundStyle.gap - widthMargin}`,
            `V${currentMatchPosition.position.y + matchHalfHeight + roundHeaderHeight}`,
            `h${config.roundStyle.gap - widthMargin}`
        ];

        return path.join(" ");
    }
</script>

{#if topMatchPosition}
    <path 
        d={calcPath(topMatchPosition)}
        id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
        fill="transparent"
        class={clsx(isTopHighlighted ? "stroke-white" : "stroke-gray-600", "transition-colors")}
    />
{/if}
{#if bottomMatchPosition}
    <path 
        d={calcPath(bottomMatchPosition)}
        id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
        fill="transparent"
        class={clsx(isBottomHighlighted ? "stroke-white" : "stroke-gray-600", "transition-colors")}
    />
{/if}

{#if isTopHighlighted}
    <use href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`} />
{/if}
{#if isBottomHighlighted}
    <use href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`} />
{/if}