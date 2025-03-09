<script
	lang="ts"
	generics="
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>
	"
>
	import { getCtx } from "$lib/internal/ctx";
	import type {
		BaseMatch,
		MatchData,
		MatchPositionData,
		BaseMatchEntrant,
	} from "$lib/internal/types";
	import { shiftMatchXPos } from "$lib/internal/utils";

	let { hoveredEntrantId, config } = getCtx();

	export let snippet: {
		currentMatch: MatchData<MatchEntrant, Match>;
		previousTopMatch?: MatchData<MatchEntrant, Match>;
		previousBottomMatch?: MatchData<MatchEntrant, Match>;
	};

	let { currentMatch, previousTopMatch, previousBottomMatch } = snippet;

	const extractPosition = (
		match: MatchData<MatchEntrant, Match>,
	): MatchPositionData => ({
		index: match.index,
		position: {
			x: shiftMatchXPos(match.position.x, config),
			y: match.position.y,
		},
	});

	let topMatchPosition = previousTopMatch
		? extractPosition(previousTopMatch)
		: undefined;
	let bottomMatchPosition: MatchPositionData | undefined = previousBottomMatch
		? extractPosition(previousBottomMatch)
		: undefined;
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
			previousBottomMatch?.data.entrant2?.entrantId ===
				$hoveredEntrantId);
</script>

<slot
	{isTopHighlighted}
	{isBottomHighlighted}
	{topMatchPosition}
	{bottomMatchPosition}
	{currentMatchPosition}
/>
