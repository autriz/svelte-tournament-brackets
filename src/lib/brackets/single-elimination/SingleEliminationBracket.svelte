<script 
	lang="ts" 
	generics="
		BracketConfig extends BaseBracketConfig = BaseBracketConfig,
		Round extends BaseRound = BaseRound, 
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>, 
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import { setCtx } from "$lib/internal/ctx.js";
	import type {
		BaseEntrant, 
		BaseRound, 
		BaseMatch, 
		SingleEliminationProps, 
		BracketConfig as BaseBracketConfig, 
		BaseMatchEntrant,
	} from "$lib/internal/types.js";
	import { 
		ConnectorWrapper, 
		Connector, 
		MatchWrapper, 
		Match, 
		RoundHeader 
	} from "$lib/brackets/components/index.js";
	import {
	cn,
		generateBracketData,
		getEntrantIndices,
		getPreviousMatches,
		shiftHeaderXPos,
		shiftMatchXPos,
	} from "$lib/internal/utils.js";

	export let data: SingleEliminationProps<Round, MatchEntrant, Match, Entrant>;
	export let bracketConfig: BracketConfig | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx({
		config: bracketConfig,
		onMatchClick
	});

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const headerHeight = config.showRoundHeaders
		? config.roundHeaderStyle.height +
			config.roundHeaderStyle.bottomMargin
		: 0;

	const bracketData = generateBracketData(
		data, 
		config, 
		(data, round) => data.matches.filter(
			(match) => match.roundId === round.roundId,
		),
		{ 
			additionalY: headerHeight + config.padding.top,
			additionalX: config.padding.left
		}
	);

	const calculateBracketDimensions = () => {
		const [height, width] = bracketData.reduce(([height, width], round) => {
			const lowestMatchInRound = round.matches[round.matches.length - 1];

			if (!lowestMatchInRound)
				throw new Error(`[Malformed data] Missing matches in round with ID: ${round.roundId}`);

			height = Math.max(
				height, 
				lowestMatchInRound.position.y + config.matchStyle.height
			);

			width = Math.max(
				width,
				lowestMatchInRound.position.x + Math.max(config.matchStyle.width, config.roundHeaderStyle.width)
			);

			return [height, width];
		}, [0, 0]);

		return { 
			width: width + config.padding.right, 
			height: height + config.padding.top + config.padding.bottom 
		};
	};

	const { width, height } = calculateBracketDimensions();
	
	export { height, width };
</script>

<svg x="0" y="0" {width} {height} class={cn("fill-transparent", className)}>
	<rect x="0" y="0" {width} {height} />
	{#each bracketData as round, roundIdx}
		{@const x = round.matches[0].position.x}
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
				{#each round.matches as match, matchIdx}
					{@const y = match.position.y}
					{#if roundIdx !== 0}
						<ConnectorWrapper
							snippet={{
								currentMatch: match,
								...getPreviousMatches(
									bracketData, 
									roundIdx, 
									matchIdx
								)
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
							entrant1={data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.entrant1?.entrantId,
							)}
							entrant2={data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.entrant2?.entrantId,
							)}
							let:entrant1
							let:entrant2
							let:isMatchHovered
							let:isTopHovered
							let:isBottomHovered
							let:onEnter
							let:onLeave
						>
							{@const entrantIndices = getEntrantIndices(data, match.data)}
							<slot
								name="match"
								match={match.data}
								indices={{
									...entrantIndices,
									...match.indices
								}}
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
									indices={{
										...entrantIndices,
										...match.indices
									}}
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
</svg>
