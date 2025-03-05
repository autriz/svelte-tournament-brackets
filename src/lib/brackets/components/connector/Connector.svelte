<script 
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch, 
		Round extends BaseRound = BaseRound
	"
>
	import clsx from "clsx";
	import type { 
		BaseMatch, 
		BaseRound, 
		BracketConfig, 
		MatchPositionData 
	} from "$lib/internal/types.js";

	export let isTopHighlighted: boolean;
	export let isBottomHighlighted: boolean;
	export let topMatchPosition: MatchPositionData | undefined;
	export let bottomMatchPosition: MatchPositionData | undefined;
	export let currentMatchPosition: MatchPositionData;
	export let config: BracketConfig;

	const widthMargin = 8; // turn into a configurable value
	const headerHeight = config.showRoundHeaders ?
		config.roundHeaderStyle.height +
		config.roundHeaderStyle.bottomMargin : 0;
	const matchHalfHeight = config.matchStyle.height / 2;

	const calcPath = (data: MatchPositionData) => {
		const startPos = `${
			data.position.x + config.matchStyle.width + widthMargin
		} ${data.position.y + matchHalfHeight}`;

		const verticalSize = currentMatchPosition.position.y + matchHalfHeight;

		let path = [
			`M${startPos}`,
			`h${config.roundStyle.gap / 2 - widthMargin}`,
			`V${verticalSize}`,
			`h${config.roundStyle.gap / 2 - widthMargin}`,
		];

		return path.join(" ");
	};
</script>

{#if topMatchPosition}
	<path
		d={calcPath(topMatchPosition)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
		fill="transparent"
		class={clsx(
			isTopHighlighted ? "stroke-white" : "stroke-gray-600",
			"transition-colors",
		)}
	/>
{/if}
{#if bottomMatchPosition}
	<path
		d={calcPath(bottomMatchPosition)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
		fill="transparent"
		class={clsx(
			isBottomHighlighted ? "stroke-white" : "stroke-gray-600",
			"transition-colors",
		)}
	/>
{/if}

<!-- {#if isTopHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
	/>
{/if}
{#if isBottomHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
	/>
{/if} -->
