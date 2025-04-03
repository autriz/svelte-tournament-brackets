<script
	lang="ts"
	generics="
		BracketConfig extends BaseBracketConfig = BaseBracketConfig,
		Round extends BaseRound = BaseRound, 
		Match extends BaseMatch = BaseMatch,
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import { setCtx } from "$lib/internal/ctx";
	import type {
		BaseEntrant,
		BaseRound,
		BaseMatch,
		SingleEliminationProps,
		BracketConfig as BaseBracketConfig,
		DeepPartial,
	} from "$lib";
	import {
		ConnectorWrapper,
		Connector,
		MatchWrapper,
		Match,
		RoundHeader,
		SvgWrapper,
	} from "$lib/brackets/components";
	import {
		generateBracketData,
		getEntrantIndices,
		getPreviousMatches,
		shiftHeaderXPos,
		shiftMatchXPos,
	} from "$lib/internal/utils";

	export let data: SingleEliminationProps<Round, Match, Entrant>;
	export let bracketConfig: DeepPartial<BracketConfig> | undefined =
		undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx({
		config: bracketConfig,
		onMatchClick,
	});

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const headerHeight = config.showRoundHeaders
		? config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin
		: 0;

	const bracketData = generateBracketData(
		data,
		config,
		(data, round) =>
			data.matches.filter((match) => match.roundId === round.id),
		{
			additionalY: headerHeight + config.padding.top,
			additionalX: config.padding.left,
		},
	);

	const calculateBracketDimensions = () => {
		const [height, width] = bracketData.reduce(
			([height, width], roundData) => {
				const lowestMatchInRound =
					roundData.matches[roundData.matches.length - 1];

				if (!lowestMatchInRound)
					throw new Error(
						`[Malformed data] Missing matches in round with ID: ${roundData.round.id}`,
					);

				height = Math.max(
					height,
					lowestMatchInRound.position.y + config.matchStyle.height,
				);

				width = Math.max(
					width,
					lowestMatchInRound.position.x +
						Math.max(
							config.matchStyle.width,
							config.roundHeaderStyle.width,
						),
				);

				return [height, width];
			},
			[0, 0],
		);

		return {
			width: width + config.padding.right,
			height: height + config.padding.top + config.padding.bottom,
		};
	};

	const { width, height } = calculateBracketDimensions();

	export { height, width };
</script>

<SvgWrapper {width} {height} class={className}>
	{#each bracketData as { matches, round }, roundIdx}
		{@const x = matches[0].position.x}
		<g>
			{#if config.showRoundHeaders}
				<g>
					<foreignObject
						x={shiftHeaderXPos(x, config)}
						y={config.padding.top}
						width={config.roundHeaderStyle.width}
						height={config.roundHeaderStyle.height}
					>
						<slot name="header" {round}>
							<RoundHeader {round} />
						</slot>
					</foreignObject>
				</g>
			{/if}
			<g>
				{#each matches as match, matchIdx}
					{@const y = match.position.y}
					{#if roundIdx !== 0}
						<ConnectorWrapper
							snippet={{
								currentMatch: match,
								...getPreviousMatches(
									bracketData,
									roundIdx,
									matchIdx,
								),
							}}
							let:topMatchPosition
							let:bottomMatchPosition
							let:currentMatchPosition
							let:isTopHighlighted
							let:isBottomHighlighted
						>
							<slot
								name="connector"
								{topMatchPosition}
								{bottomMatchPosition}
								{currentMatchPosition}
								{isTopHighlighted}
								{isBottomHighlighted}
								{config}
							>
								<Connector
									{topMatchPosition}
									{bottomMatchPosition}
									{currentMatchPosition}
									{isTopHighlighted}
									{isBottomHighlighted}
									{config}
								/>
							</slot>
						</ConnectorWrapper>
					{/if}
					<foreignObject
						class="overflow-visible"
						x={shiftMatchXPos(x, config)}
						{y}
						width={config.matchStyle.width}
						height={config.matchStyle.height}
					>
						<MatchWrapper
							match={match.data}
							let:isMatchHovered
							let:isTopHovered
							let:isBottomHovered
							let:onEnter
							let:onLeave
						>
							{@const indices = {
								...getEntrantIndices(data, match.data),
								...match.indices,
							}}
							{@const entrant1 = data.entrants.find(
								(entrant) =>
									entrant.id === match.data.opponent1?.id,
							)}
							{@const entrant2 = data.entrants.find(
								(entrant) =>
									entrant.id === match.data.opponent2?.id,
							)}
							<slot
								name="match"
								match={match.data}
								{indices}
								{entrant1}
								{entrant2}
								{isTopHovered}
								{isBottomHovered}
								{isMatchHovered}
								{onMatchClick}
								{onEnter}
								{onLeave}
							>
								<Match
									match={match.data}
									{indices}
									{entrant1}
									{entrant2}
									{isTopHovered}
									{isBottomHovered}
									{onMatchClick}
									{onEnter}
									{onLeave}
								/>
							</slot>
						</MatchWrapper>
					</foreignObject>
				{/each}
			</g>
		</g>
	{/each}
</SvgWrapper>
