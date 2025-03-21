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
		MatchPositionData,
	} from "$lib/internal/types.js";

	export let isTopHighlighted: boolean;
	export let isBottomHighlighted: boolean;
	export let topMatchPosition: MatchPositionData | undefined;
	export let bottomMatchPosition: MatchPositionData | undefined;
	export let currentMatchPosition: MatchPositionData;
	export let config: DeepRequired<BracketConfig>;

	const widthMargin = 8; // turn into a configurable value
	const matchHalfHeight = config.matchStyle.height / 2;

	const getRoundGap = (data: MatchPositionData) => {
		return (
			currentMatchPosition.position.x -
			data.position.x -
			config.matchStyle.width
		);
	};

	const calcPath = (data: MatchPositionData) => {
		const startPos = `${
			data.position.x + config.matchStyle.width + widthMargin
		} ${data.position.y + matchHalfHeight}`;
		const roundGap = getRoundGap(data);
		const halfWidth = roundGap / 2 - widthMargin;
		const verticalSize = currentMatchPosition.position.y + matchHalfHeight;

		// config.roundGap / 2 - widthMargin

		let path = [`M${startPos}`, `h${halfWidth}`, `V${verticalSize}`];

		return path.join(" ");
	};

	const calcCenterPath = () => {
		const roundGap = Math.max(
			bottomMatchPosition ? getRoundGap(bottomMatchPosition) : 0,
			topMatchPosition ? getRoundGap(topMatchPosition) : 0,
		);
		const halfWidth = roundGap / 2 - widthMargin;
		const startPos = `${currentMatchPosition.position.x - halfWidth - widthMargin} ${currentMatchPosition.position.y + matchHalfHeight}`;

		let path = [`M${startPos}`, `h${halfWidth}`];

		return path.join(" ");
	};
</script>

{#if isTopHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
	/>
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-c`}
	/>
{/if}
{#if topMatchPosition}
	<path
		d={calcPath(topMatchPosition)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
		fill="transparent"
		class="stroke-neutral-500 transition-colors data-[highlighted]:stroke-black dark:data-[highlighted]:stroke-white"
		data-highlighted={isTopHighlighted ? "" : undefined}
	/>
{/if}
{#if isBottomHighlighted}
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
	/>
	<use
		href={`#conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-c`}
	/>
{/if}
{#if bottomMatchPosition}
	<path
		d={calcPath(bottomMatchPosition)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
		fill="transparent"
		class="stroke-neutral-500 transition-colors data-[highlighted]:stroke-black dark:data-[highlighted]:stroke-white"
		data-highlighted={isBottomHighlighted ? "" : undefined}
	/>
{/if}
{#if topMatchPosition || bottomMatchPosition}
	<path
		d={calcCenterPath()}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-c`}
		fill="transparent"
		class="stroke-neutral-500 transition-colors data-[highlighted]:stroke-black dark:data-[highlighted]:stroke-white"
		data-highlighted={isTopHighlighted || isBottomHighlighted
			? ""
			: undefined}
	/>
{/if}
