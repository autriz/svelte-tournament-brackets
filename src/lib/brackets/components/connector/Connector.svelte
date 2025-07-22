<script lang="ts" generics="BracketConfig extends BaseBracketConfig">
	import type {
		BracketConfig as BaseBracketConfig,
		MatchPositionData,
	} from "$lib";

	export let isTopHighlighted: boolean;
	export let isBottomHighlighted: boolean;
	export let topMatchPosition: MatchPositionData | undefined;
	export let bottomMatchPosition: MatchPositionData | undefined;
	export let currentMatchPosition: MatchPositionData;
	export let config: BracketConfig;

	const widthMargin = 8;
	// Note that if you want to use config value to create some derived value - use "$:":
	$: matchHalfHeight = config.matchStyle.height / 2;
	// Or use some getter function for it:
	// const getMatchHalfHeight = () => matchHalfHeight = config.matchStyle.height / 2;

	const getRoundGap = (data: MatchPositionData, config: BracketConfig) => {
		return (
			Math.abs(currentMatchPosition.position.x - data.position.x) -
			config.matchStyle.width
		);
	};

	const getHalfWidth = (roundGap: number) => roundGap / 2 - widthMargin;

	function calcPath(data: MatchPositionData, config: BracketConfig) {
		let startPos: [number, number];
		let verticalSize: number;

		const roundGap = getRoundGap(data, config);
		const halfWidth =
			getHalfWidth(roundGap) * (config.direction === "rtl" ? -1 : 1);

		if (config.direction === "rtl") {
			startPos = [
				data.position.x - widthMargin,
				data.position.y + matchHalfHeight,
			];

			verticalSize = currentMatchPosition.position.y + matchHalfHeight;
		} else {
			startPos = [
				data.position.x + config.matchStyle.width + widthMargin,
				data.position.y + matchHalfHeight,
			];

			verticalSize = currentMatchPosition.position.y + matchHalfHeight;
		}

		// config.roundGap / 2 - widthMargin

		return `M${startPos.join(" ")} h${halfWidth} V${verticalSize}`;
	}

	function calcCenterPath(config: BracketConfig) {
		let startPos: [number, number];

		const roundGap = Math.max(
			bottomMatchPosition ? getRoundGap(bottomMatchPosition, config) : 0,
			topMatchPosition ? getRoundGap(topMatchPosition, config) : 0,
		);
		const halfWidth = getHalfWidth(roundGap);

		if (config.direction === "rtl") {
			startPos = [
				currentMatchPosition.position.x +
					config.matchStyle.width +
					widthMargin,
				currentMatchPosition.position.y + matchHalfHeight,
			];
		} else {
			startPos = [
				currentMatchPosition.position.x - halfWidth - widthMargin,
				currentMatchPosition.position.y + matchHalfHeight,
			];
		}

		return `M${startPos.join(" ")} h${halfWidth}`;
	}
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
		data-bracket-connector
		d={calcPath(topMatchPosition, config)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-t`}
		fill="transparent"
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
		data-bracket-connector
		d={calcPath(bottomMatchPosition, config)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-b`}
		fill="transparent"
		data-highlighted={isBottomHighlighted ? "" : undefined}
	/>
{/if}
{#if topMatchPosition || bottomMatchPosition}
	<path
		data-bracket-connector
		d={calcCenterPath(config)}
		id={`conn-${currentMatchPosition.position.x}-${currentMatchPosition.position.y}-c`}
		fill="transparent"
		data-highlighted={isTopHighlighted || isBottomHighlighted
			? ""
			: undefined}
	/>
{/if}
