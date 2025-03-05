<script
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch, 
		Round extends BaseRound = BaseRound, 
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import { clsx } from "clsx";
	import { setCtx } from "$lib/internal/ctx";
	import type {
		BaseEntrant, 
		BaseRound, 
		BaseMatch, 
		DoubleEliminationProps, 
		BracketConfig, 
		MatchData

	} from "$lib/internal/types";
	import { 
		Connector, 
		MatchWrapper, 
		Match, 
		RoundHeader 
	} from "$lib/brackets/components";
	import {
		generateBracketData,
		getMatchPositionDataInner
	} from "$lib/internal/utils";
	import UpperBracket from "./UpperBracket.svelte";
	import LowerBracket from "./LowerBracket.svelte";
	import FinalBracket from "./FinalBracket.svelte";

	export let data: DoubleEliminationProps<Match, Round, Entrant>;
	export let bracketConfig: BracketConfig & { bracketGap: number; } | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx({
		config: bracketConfig,
		onMatchClick
	});

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const calculateBracketDimensions = (
		bracketData: (Round & {
			matches: MatchData<Match>[];
		})[],
	) => {
		const [height, width] = bracketData.reduce(
			([height, width], round) => {
				const lowestMatchInRound = round.matches[round.matches.length - 1];

				height = Math.max(
					height,
					lowestMatchInRound.position.y + config.matchStyle.height,
				);

				width = Math.max(
					width,
					lowestMatchInRound.position.x + config.matchStyle.width,
				);

				return [height, width];
			},
			[0, 0],
		);

		return { width, height };
	};

	const headerHeight = config.showRoundHeaders
		? config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin
		: 0;

	const winnerBracketData = generateBracketData(
		data, 
		config, 
		(data, round) => data.matches.upper.filter(
			(match) => match.roundId === round.roundId,
		),
		{ additionalY: headerHeight }
	) as (Round & { matches: MatchData<Match>[]; })[];
	const winnerDimensions = calculateBracketDimensions(winnerBracketData);

	const loserBracketData = generateBracketData(
		data, 
		config, 
		(data, round) => data.matches.lower.filter(
			(match) => match.roundId === round.roundId,
		),
		{ additionalY: winnerDimensions.height + config.bracketGap }
	) as (Round & { matches: MatchData<Match>[]; })[];
	const loserDimensions = calculateBracketDimensions(loserBracketData);
	const widthWithoutFinals = Math.max(winnerDimensions.width, loserDimensions.width);

	const finalsBracketData = data.finalRounds ?
		data.finalRounds.map((round) => {
			const roundMatches = data.finalMatches.filter(
				(match) => match.roundId === round.roundId
			);

			return {
				...round,
				matches: roundMatches,
			};
		}).map((round, roundIdx, rounds) => {
			const extendedMatches = round.matches.map((match, matchIdx) => {
				return {
					data: match,
					...getMatchPositionDataInner(
						rounds,
						roundIdx,
						matchIdx,
						config,
						{
							additionalX: widthWithoutFinals + config.roundStyle.gap 
						}
					),
				};
			});

			return {
				...round,
				matches: extendedMatches,
			};
		}) : [];
	const finalsDimensions =
		finalsBracketData.length > 0
			? calculateBracketDimensions(finalsBracketData)
			: { width: 0, height: 0 };

	const width = finalsDimensions.width;
	const height = loserDimensions.height;

	export { height, width };
</script>

<svg x="0" y="0" width={width} {height} class={clsx(className)}>
	<rect x="0" y="0" width={width} {height} />
	<g>
		<UpperBracket bracketData={winnerBracketData} {config}>
			<!-- 
				we cannot use <slot name="winner-header" slot="header" /> 
			 	there, so wrapping tag around slot is the only solution
			-->
			<div slot="header" xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;" let:round>
				<slot name="winner-header" round={round}>
					<RoundHeader {round} />
				</slot>
			</div>
			<g 
				slot="connector" 
				style="width: 100%; height: 100%;" 
				let:topMatchPosition
				let:bottomMatchPosition
				let:currentMatchPosition
				let:isTopHighlighted
				let:isBottomHighlighted
				let:config
			>
				<slot 
					name="winner-connector" 
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
			</g>
			<div slot="match" xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;" let:match>
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
						name="winner-match"
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
			</div>
		</UpperBracket>
	</g>
	<g>
		<LowerBracket bracketData={loserBracketData} config={{...config, showRoundHeaders: false}}>
			<g 
				slot="connector" 
				style="width: 100%; height: 100%;" 
				let:topMatchPosition
				let:bottomMatchPosition
				let:currentMatchPosition
				let:isTopHighlighted
				let:isBottomHighlighted
				let:config
			>
				<slot 
					name="loser-connector" 
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
			</g>
			<div slot="match" xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;" let:match>
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
						name="loser-match"
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
			</div>
		</LowerBracket>
	</g>
	{#if finalsBracketData.length > 0}
		<g>
			<FinalBracket 
				bracketData={finalsBracketData} 
				bracketHeight={loserDimensions.height}
				lastWinnerMatch={
					winnerBracketData[winnerBracketData.length - 1]
						.matches[0]
				}
				lastLoserMatch={
					loserBracketData[loserBracketData.length - 1]
						.matches[0]
				}
				{config} 
			>
				<div slot="header" xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;" let:round>
					<slot name="winner-header" round={round}>
						<RoundHeader {round} />
					</slot>
				</div>
				<g 
					slot="connector" 
					style="width: 100%; height: 100%;" 
					let:topMatchPosition
					let:bottomMatchPosition
					let:currentMatchPosition
					let:isTopHighlighted
					let:isBottomHighlighted
					let:config
				>
					<slot 
						name="finals-connector" 
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
				</g>
				<div slot="match" xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;" let:match>
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
							name="finals-match"
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
				</div>
			</FinalBracket>
		</g>
	{/if}
</svg>
