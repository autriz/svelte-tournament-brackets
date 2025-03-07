<script 
	lang="ts"
	generics="
		BracketConfig extends BaseBracketConfig = BaseBracketConfig
	"
>
	import clsx from "clsx";
	import type {
		BracketConfig as BaseBracketConfig, 
		DeepRequired, 
		MatchPositionData 
	} from "$lib/internal/types.js";

	export let isTopHighlighted: boolean;
	export let isBottomHighlighted: boolean;
	export let topMatchPosition: MatchPositionData | undefined;
	export let bottomMatchPosition: MatchPositionData | undefined;
	export let currentMatchPosition: MatchPositionData;
	export let config: DeepRequired<BracketConfig>;

	const widthMargin = 8; // turn into a configurable value
	const matchHalfHeight = config.matchStyle.height / 2;

	const calcPath = (data: MatchPositionData) => {
		const startPos = `${
			data.position.x + config.matchStyle.width + widthMargin
		} ${data.position.y + matchHalfHeight}`;
		const roundGap = currentMatchPosition.position.x - data.position.x - config.matchStyle.width;
		const halfWidth = roundGap / 2 - widthMargin;
		const verticalSize = currentMatchPosition.position.y + matchHalfHeight;

		// config.roundGap / 2 - widthMargin

		let path = [
			`M${startPos}`,
			`h${halfWidth}`,
			`V${verticalSize}`,
			`h${halfWidth}`,
		];

		return path.join(" ");
	};
</script>

{#if isTopHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
	/>
{/if}
{#if topMatchPosition}
	<path
		d={calcPath(topMatchPosition)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
		fill="transparent"
		class={clsx(
			isTopHighlighted ? "stroke-white" : "stroke-gray-600",
			"transition-colors -z-10",
		)}
	/>
{/if}
{#if isBottomHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
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

