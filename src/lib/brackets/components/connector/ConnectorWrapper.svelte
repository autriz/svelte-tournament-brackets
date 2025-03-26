<script 
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch
	"
>
	import { getCtx } from "$lib/internal/ctx";
	import type { MatchPositionData, BaseMatch } from "$lib";
	import type { MatchData } from "$lib/internal/types.js";
	import { shiftMatchXPos } from "$lib/internal/utils";

	let { hoveredEntrantId, config } = getCtx();

	export let snippet: {
		currentMatch: MatchData<Match>;
		previousTopMatch?: MatchData<Match>;
		previousBottomMatch?: MatchData<Match>;
	};

	let { currentMatch, previousTopMatch, previousBottomMatch } = snippet;

	const extractPosition = (
		match: MatchData<Match>
	): MatchPositionData => ({ 
		indices: match.indices, 
		position: {
			x: shiftMatchXPos(match.position.x, config),
			y: match.position.y
		} 
	});
	
	let topMatchPosition =
		previousTopMatch ? extractPosition(previousTopMatch) : undefined;
	let bottomMatchPosition =
		previousBottomMatch ? extractPosition(previousBottomMatch) : undefined;
	let currentMatchPosition = extractPosition(currentMatch);

	$: isTopHighlighted =
		(currentMatch.data.opponent1?.opponentId === $hoveredEntrantId ||
			currentMatch.data.opponent2?.opponentId === $hoveredEntrantId) &&
		(previousTopMatch?.data.opponent1?.opponentId === $hoveredEntrantId ||
			previousTopMatch?.data.opponent2?.opponentId === $hoveredEntrantId);

	$: isBottomHighlighted =
		(currentMatch.data.opponent1?.opponentId === $hoveredEntrantId ||
			currentMatch.data.opponent2?.opponentId === $hoveredEntrantId) &&
		(previousBottomMatch?.data.opponent1?.opponentId === $hoveredEntrantId ||
			previousBottomMatch?.data.opponent2?.opponentId === $hoveredEntrantId);
</script>

<slot 
	{isTopHighlighted}
	{isBottomHighlighted}
	{topMatchPosition}
	{bottomMatchPosition}
	{currentMatchPosition}
/>
