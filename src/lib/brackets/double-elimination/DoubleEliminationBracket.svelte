<script
	lang="ts"
	generics="
		BracketConfig extends DoubleElimBracketConfig = DoubleElimBracketConfig,
		Round extends BaseRound = BaseRound, 
		Match extends BaseMatch = BaseMatch,
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import type {
		BaseEntrant, 
		BaseRound, 
		BaseMatch, 
		DoubleEliminationProps, 
		DoubleElimBracketConfig,
	} from "$lib";
	import type { RoundWithMatchData } from "$lib/internal/types";
	import { setCtx } from "$lib/internal/ctx";
	import { 
		Connector, 
		MatchWrapper, 
		Match, 
		RoundHeader 
	} from "$lib/brackets/components";
	import {
		cn,
		generateBracketData,
		getEntrantIndices,
		getMatchPositionDataInner
	} from "$lib/internal/utils";
	import UpperBracket from "./UpperBracket.svelte";
	import LowerBracket from "./LowerBracket.svelte";
	import FinalBracket from "./FinalBracket.svelte";

	export let data: DoubleEliminationProps<Round, Match, Entrant>;
	export let bracketConfig: BracketConfig | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx({
		config: bracketConfig,
		onMatchClick
	});

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const calculateBracketDimensions = (
		bracketData: RoundWithMatchData<Round, Match>[],
		options?: {
			additionalX?: number;
			additionalY?: number;
		}
	) => {
		const [height, width] = bracketData.reduce(
			([height, width], roundData) => {
				const lowestMatchInRound = roundData.matches[roundData.matches.length - 1];

				if (!lowestMatchInRound)
					throw new Error(`[Malformed data] Missing matches in round with ID: ${roundData.round.roundId}`);

				height = Math.max(
					height,
					lowestMatchInRound.position.y + config.matchStyle.height,
				);

				width = Math.max(
					width,
					lowestMatchInRound.position.x + Math.max(config.matchStyle.width, config.roundHeaderStyle.width),
				);

				return [height, width];
			},
			[0, 0],
		);

		return { 
			width: width + (options?.additionalX || 0), 
			height: height + (options?.additionalY || 0) 
		};
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
		{ 
			additionalY: headerHeight + config.padding.top, 
			additionalX: config.padding.left
		}
	);
	const winnerDimensions = calculateBracketDimensions(
		winnerBracketData, 
		{
			additionalX: config.padding.left,
			additionalY: config.padding.top
		}
	);

	const loserBracketData = generateBracketData(
		data, 
		config, 
		(data, round) => data.matches.lower.filter(
			(match) => match.roundId === round.roundId,
		),
		{ 
			additionalY: winnerDimensions.height + config.bracketGap,
			additionalX: config.padding.left
		}
	);
	const loserDimensions = calculateBracketDimensions(
		loserBracketData,
		{
			additionalX: config.padding.left,
			additionalY: config.padding.bottom
		}
	);
	const widthWithoutFinals = Math.max(winnerDimensions.width, loserDimensions.width);

	// TODO: rework how finals are stored
	const finalsBracketData: RoundWithMatchData<Round, Match>[] = data.finalRounds ?
		data.finalRounds.map((round) => {
			const roundMatches = data.finalMatches.filter(
				(match) => match.roundId === round.roundId
			);

			return {
				round,
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
							additionalX: widthWithoutFinals + config.roundGap - config.padding.left
						}
					),
				};
			});

			return {
				round: round.round,
				matches: extendedMatches,
			};
		}) : [];
	const finalsDimensions =
		finalsBracketData.length > 0
			? calculateBracketDimensions(finalsBracketData, { additionalX: config.padding.right })
			: { width: 0, height: 0 };

	const width = finalsDimensions.width;
	const height = loserDimensions.height;

	export { height, width };
</script>

<svg x="0" y="0" width={width} {height} class={cn("fill-transparent", className)}>
	<rect x="0" y="0" width={width} {height} />
	<UpperBracket bracketData={winnerBracketData} {config}>
		<!-- 
			Due to indirection type system can't infer 
		 	correct type from the passed round property,
			instead of that we use index to get round object
			from the root.
		-->
		<slot slot="header" let:roundIdx>
			{@const idx = Number(roundIdx)}
			{#if !$$slots["winner-header"]}
				<slot name="header" round={winnerBracketData[idx].round}>
					<RoundHeader round={winnerBracketData[idx].round} />
				</slot>
			{:else}
				<slot name="winner-header" round={winnerBracketData[idx].round} />
			{/if}
		</slot>
		<slot 
			slot="connector" 
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
		>
			{#if !$$slots["winner-connector"]}
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
			{:else}
				<slot 
					name="winner-connector" 
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					{config}
				/>
			{/if}
		</slot>
		<slot slot="match" let:match let:matchIndices>
			<MatchWrapper
				match={match}
				let:isMatchHovered
				let:isTopHovered
				let:isBottomHovered
				let:onEnter
				let:onLeave
			>
				{@const entrantIndices = getEntrantIndices(data, match)}
				{@const indices = { ...entrantIndices, ...matchIndices }}
				{@const entrant1 = data.entrants.find(
					(entrant) => entrant.entrantId === match.opponent1?.opponentId
				)}
				{@const entrant2 = data.entrants.find(
					(entrant) => entrant.entrantId === match.opponent2?.opponentId
				)}
				{#if !$$slots["winner-match"]}
					<slot 
						name="match"
						{match}
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
							{match}
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
				{:else}
					<slot 
						name="winner-match"
						{match}
						{indices}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{isMatchHovered}
						{onMatchClick}
						{onEnter}
						{onLeave}
					/>
				{/if}
			</MatchWrapper>
		</slot>
	</UpperBracket>
	<LowerBracket bracketData={loserBracketData} {config}>
		<slot 
			slot="connector"
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
		>
			{#if !$$slots["loser-connector"]}
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
			{:else}
				<slot 
					name="loser-connector" 
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					{config}
				/>
			{/if}
		</slot>
		<slot slot="match" let:match let:matchIndices>
			<MatchWrapper 
				{match}
				let:isMatchHovered
				let:isTopHovered
				let:isBottomHovered
				let:onEnter
				let:onLeave
			>
				{@const entrantIndices = getEntrantIndices(data, match)}
				{@const indices = { ...entrantIndices, ...matchIndices }}
				{@const entrant1 = data.entrants.find(
					(entrant) => entrant.entrantId === match.opponent1?.opponentId
				)}
				{@const entrant2 = data.entrants.find(
					(entrant) => entrant.entrantId === match.opponent2?.opponentId
				)}
				{#if !$$slots["loser-match"]}
					<slot 
						name="match"
						{match}
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
							{match}
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
				{:else}
					<slot 
						name="loser-match"
						{match}
						{indices}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{isMatchHovered}
						{onMatchClick}
						{onEnter}
						{onLeave}
					/>
				{/if}
			</MatchWrapper>
		</slot>
	</LowerBracket>
	{#if finalsBracketData.length > 0}
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
			<!-- 
				Due to indirection type system can't infer 
				correct type from the passed round property,
				instead of that we use index to get round object
				from the root.
			-->
			<slot slot="header" let:roundIdx>
				{@const idx = Number(roundIdx)}
				{#if !$$slots["finals-header"]}
					<slot name="header" round={finalsBracketData[idx].round}>
						<RoundHeader round={finalsBracketData[idx].round} />
					</slot>
				{:else}
					<slot name="finals-header" round={finalsBracketData[idx].round} />
				{/if}
			</slot>
			<slot
				slot="connector"
				let:topMatchPosition
				let:bottomMatchPosition
				let:currentMatchPosition
				let:isTopHighlighted
				let:isBottomHighlighted
			>
				{#if !$$slots["finals-connector"]}
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
				{:else}
					<slot 
						name="finals-connector" 
						{topMatchPosition}
						{bottomMatchPosition}
						{currentMatchPosition}
						{isTopHighlighted}
						{isBottomHighlighted}
						{config}
					/>
				{/if}
			</slot>
			<slot slot="match" let:match let:matchIndices>
				<MatchWrapper 
					{match}
					let:isMatchHovered
					let:isTopHovered
					let:isBottomHovered
					let:onEnter
					let:onLeave
				>
					{@const entrantIndices = getEntrantIndices(data, match)}
					{@const indices = { ...entrantIndices, ...matchIndices }}
					{@const entrant1 = data.entrants.find(
						(entrant) => entrant.entrantId === match.opponent1?.opponentId
					)}
					{@const entrant2 = data.entrants.find(
						(entrant) => entrant.entrantId === match.opponent2?.opponentId
					)}
					{#if !$$slots["finals-match"]}
						<slot 
							name="match"
							{match}
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
								{match}
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
					{:else}
						<slot 
							name="finals-match"
							{match}
							{indices}
							{entrant1}
							{entrant2}
							{isTopHovered}
							{isBottomHovered}
							{isMatchHovered}
							{onMatchClick}
							{onEnter}
							{onLeave}
						/>
					{/if}
				</MatchWrapper>
			</slot>
		</FinalBracket>
	{/if}
</svg>
