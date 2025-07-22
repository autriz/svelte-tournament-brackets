<script lang="ts" context="module">
	export function modifyMatchPosition<
		Match extends BaseMatch,
		BracketConfig extends BaseBracketConfig,
	>(match: MatchData<Match>, config: BracketConfig): MatchPositionData {
		return {
			indices: match.indices,
			position: {
				x: shiftMatchXPos(match.position.x, config),
				y: match.position.y,
			},
		};
	}
</script>

<script
	lang="ts"
	generics="Match extends BaseMatch, BracketConfig extends BaseBracketConfig"
>
	import { getCtx, shiftMatchXPos, type MatchData } from "$lib/internal";
	import type {
		MatchPositionData,
		BaseMatch,
		BracketConfig as BaseBracketConfig,
	} from "$lib";

	let { hoveredEntrantId, config } = getCtx();

	export let snippet: {
		currentMatch: MatchData<Match>;
		previousTopMatch?: MatchData<Match>;
		previousBottomMatch?: MatchData<Match>;
	};

	$: ({ currentMatch, previousTopMatch, previousBottomMatch } = snippet);

	$: topMatchPosition = previousTopMatch
		? modifyMatchPosition(previousTopMatch, $config)
		: undefined;
	$: bottomMatchPosition = previousBottomMatch
		? modifyMatchPosition(previousBottomMatch, $config)
		: undefined;
	$: currentMatchPosition = modifyMatchPosition(currentMatch, $config);

	$: isHovered = (matchData: Match | undefined) =>
		matchData?.opponent1?.id === $hoveredEntrantId ||
		matchData?.opponent2?.id === $hoveredEntrantId;

	$: isTopHighlighted =
		isHovered(currentMatch.data) && isHovered(previousTopMatch?.data);

	$: isBottomHighlighted =
		isHovered(currentMatch.data) && isHovered(previousBottomMatch?.data);
</script>

<slot
	{isTopHighlighted}
	{isBottomHighlighted}
	{topMatchPosition}
	{bottomMatchPosition}
	{currentMatchPosition}
/>
