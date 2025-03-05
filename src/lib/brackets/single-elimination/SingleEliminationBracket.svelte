<script 
	lang="ts" 
	generics="
		Match extends BaseMatch = BaseMatch, 
		Round extends BaseRound = BaseRound, 
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import { clsx } from "clsx";
	import { setCtx } from "$lib/internal/ctx.js";
	import type {
		BaseEntrant, 
		BaseRound, 
		BaseMatch, 
		SingleEliminationProps, 
		BracketConfig 
	} from "$lib/internal/types.js";
	import { 
		ConnectorWrapper, 
		Connector, 
		MatchWrapper, 
		Match, 
		RoundHeader 
	} from "$lib/brackets/components/index.js";
	import {
		generateBracketData,
		getPreviousMatches,
	} from "$lib/internal/utils.js";

	export let data: SingleEliminationProps<Match, Round, Entrant>;
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

			height = Math.max(
				height, 
				lowestMatchInRound.position.y + config.matchStyle.height
			);

			width = Math.max(
				width,
				lowestMatchInRound.position.x + config.matchStyle.width
			);

			return [height, width];
		}, [0, 0]);

		return { 
			width: width + config.padding.left + config.padding.right, 
			height: height + config.padding.top + config.padding.bottom 
		};
	};

	const { width, height } = calculateBracketDimensions();
	
	export { height, width };
</script>

<svg x="0" y="0" {width} {height} class={clsx(className)}>
	<rect x="0" y="0" {width} {height} />
	<g>
		{#each bracketData as round, roundIdx}
			{@const x = round.matches[0].position.x}
			<g>
				{#if config.showRoundHeaders}
					<g>
						<foreignObject
							x={x}
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
								{config}
								let:topMatchPosition
								let:bottomMatchPosition
								let:currentMatchPosition
								let:isTopHighlighted
								let:isBottomHighlighted
								let:config
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
							{x}
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
								<slot
									name="match"
									{match}
									{entrant1}
									{entrant2}
									{isTopHovered}
									{isBottomHovered}
									{isMatchHovered}
									{onEnter}
									{onLeave}
								>
									<Match
										match={match.data}
										{entrant1}
										{entrant2}
										{isTopHovered}
										{isBottomHovered}
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
	</g>
</svg>
