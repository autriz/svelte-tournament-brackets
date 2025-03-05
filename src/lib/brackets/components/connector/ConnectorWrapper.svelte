<script 
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch
	"
>
	import { getCtx } from "$lib/internal/ctx.js";
	import type { 
		BaseMatch, 
		MatchData, 
		BracketConfig, 
		MatchPositionData 
	} from "$lib/internal/types.js";

	let { hoveredEntrantId } = getCtx();

	export let snippet: {
		currentMatch: MatchData<Match>;
		previousTopMatch?: MatchData<Match>;
		previousBottomMatch?: MatchData<Match>;
	};
	export let config: BracketConfig;

	let { currentMatch, previousTopMatch, previousBottomMatch } = snippet;

	const extractPosition = (
		match: MatchData<Match>
	): MatchPositionData => ({ 
		index: match.index, 
		position: match.position 
	});
	
	let topMatchPosition =
		previousTopMatch ? extractPosition(previousTopMatch) : undefined;
	let bottomMatchPosition: MatchPositionData | undefined =
		previousBottomMatch ? extractPosition(previousBottomMatch) : undefined;
	let currentMatchPosition: MatchPositionData = extractPosition(currentMatch);

	$: isTopHighlighted =
		(currentMatch.data.entrant1?.entrantId === $hoveredEntrantId ||
			currentMatch.data.entrant2?.entrantId === $hoveredEntrantId) &&
		(previousTopMatch?.data.entrant1?.entrantId === $hoveredEntrantId ||
			previousTopMatch?.data.entrant2?.entrantId === $hoveredEntrantId);

	$: isBottomHighlighted =
		(currentMatch.data.entrant1?.entrantId === $hoveredEntrantId ||
			currentMatch.data.entrant2?.entrantId === $hoveredEntrantId) &&
		(previousBottomMatch?.data.entrant1?.entrantId === $hoveredEntrantId ||
			previousBottomMatch?.data.entrant2?.entrantId === $hoveredEntrantId);
</script>

<slot 
	{isTopHighlighted}
	{isBottomHighlighted}
	{topMatchPosition}
	{bottomMatchPosition}
	{currentMatchPosition}
	{config}
/>
