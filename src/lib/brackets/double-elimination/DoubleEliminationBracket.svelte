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
		RoundHeader,
		ConnectorWrapper,
		SvgWrapper,
	} from "$lib/brackets/components";
	import {
		findFinalRounds,
		generateBracketData,
		getEntrantIndices,
		getMatchPositionDataInner,
		getPreviousMatches,
		shiftHeaderXPos,
		shiftMatchXPos,
	} from "$lib/internal/utils";

	export let data: DoubleEliminationProps<Round, Match, Entrant>;
	export let bracketConfig: BracketConfig | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx({
		config: bracketConfig,
		onMatchClick,
	});

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const calculateBracketDimensions = (
		bracketData: RoundWithMatchData<Round, Match>[],
		options?: {
			additionalX?: number;
			additionalY?: number;
		},
	) => {
		const [height, width] = bracketData.reduce(
			([height, width], roundData) => {
				const lowestMatchInRound =
					roundData.matches[roundData.matches.length - 1];

				if (!lowestMatchInRound)
					// throw new Error(
					// 	`[Malformed data] Missing matches in round with ID: ${roundData.round.roundId}`,
					// );
					return [height, width];

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
			width: width + (options?.additionalX || 0),
			height: height + (options?.additionalY || 0),
		};
	};

	const { finalMatches, finalRounds } = findFinalRounds(
		data.rounds,
		data.matches,
	);

	const roundsWithoutFinals = data.rounds.filter(
		(round) =>
			!finalRounds.some(
				(finalRound) => finalRound.roundId === round.roundId,
			),
	);

	const headerHeight = config.showRoundHeaders
		? config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin
		: 0;

	const winnerBracketData = generateBracketData(
		{ ...data, rounds: roundsWithoutFinals },
		config,
		(data, round) =>
			data.matches.upper.filter(
				(match) => match.roundId === round.roundId,
			),
		{
			additionalY: headerHeight + config.padding.top,
			additionalX: config.padding.left,
		},
	);
	const winnerDimensions = calculateBracketDimensions(winnerBracketData, {
		additionalX: config.padding.left,
		additionalY: config.padding.top,
	});

	const loserBracketData = generateBracketData(
		{ ...data, rounds: roundsWithoutFinals },
		config,
		(data, round) =>
			data.matches.lower.filter(
				(match) => match.roundId === round.roundId,
			),
		{
			additionalY: winnerDimensions.height + config.bracketGap,
			additionalX: config.padding.left,
		},
	);
	const loserDimensions = calculateBracketDimensions(loserBracketData, {
		additionalX: config.padding.left,
		additionalY: config.padding.bottom,
	});
	const widthWithoutFinals = Math.max(
		winnerDimensions.width,
		loserDimensions.width,
	);

	console.log("rounds", finalRounds);

	const finalsBracketData: RoundWithMatchData<Round, Match>[] = finalRounds
		? finalRounds
				.map((round) => {
					const roundMatches = finalMatches.filter(
						(match) => match.roundId === round.roundId,
					);

					return {
						round,
						matches: roundMatches,
					};
				})
				.map((round, roundIdx, rounds) => {
					const extendedMatches = round.matches.map(
						(match, matchIdx) => {
							return {
								data: match,
								...getMatchPositionDataInner(
									rounds,
									roundIdx,
									matchIdx,
									config,
									{
										additionalX:
											widthWithoutFinals +
											config.roundGap -
											config.padding.left,
									},
								),
							};
						},
					);

					return {
						round: round.round,
						matches: extendedMatches,
					};
				})
		: [];
	const finalsDimensions =
		finalsBracketData.length > 0
			? calculateBracketDimensions(finalsBracketData, {
					additionalX: config.padding.right,
				})
			: { width: 0, height: 0 };

	const width = Math.max(
		finalsDimensions.width,
		winnerDimensions.width,
		loserDimensions.width,
	);
	const height = loserDimensions.height;

	export { height, width };
</script>

<SvgWrapper {height} {width} class={className}>
	<!-- Why they are not separated? Two things:
		1. Type issue: when passing round, for example, 
		from child to parent, it loses generic types,
		which will bother end-user;
		2. Nested slot props issue: when getting props from
		child slot and passing them to higher slots, 
		they get lost on page reload.
	-->
	<!-- Upper bracket -->
	{#each winnerBracketData as { matches, round }, roundIdx}
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
						{#if !$$slots["winner-header"]}
							<slot name="header" {round}>
								<RoundHeader {round} />
							</slot>
						{:else}
							<slot name="winner-header" {round} />
						{/if}
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
									winnerBracketData,
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
							{@const entrantIndices = getEntrantIndices(
								data,
								match.data,
							)}
							{@const indices = {
								...entrantIndices,
								...match.indices,
							}}
							{@const entrant1 = data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.opponent1?.opponentId,
							)}
							{@const entrant2 = data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.opponent2?.opponentId,
							)}
							{#if !$$slots["winner-match"]}
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
							{:else}
								<slot
									name="winner-match"
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
								/>
							{/if}
						</MatchWrapper>
					</foreignObject>
				{/each}
			</g>
		</g>
	{/each}
	<!-- Lower bracket -->
	{#each loserBracketData as { matches }, roundIdx}
		{@const x = shiftMatchXPos(matches[0].position.x, config)}
		<g>
			<g>
				{#each matches as match, matchIdx}
					{@const y = match.position.y}
					{#if roundIdx !== 0}
						<ConnectorWrapper
							snippet={{
								currentMatch: match,
								...getPreviousMatches(
									loserBracketData,
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
						</ConnectorWrapper>
					{/if}
					<foreignObject
						class="overflow-visible"
						{x}
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
							{@const entrantIndices = getEntrantIndices(
								data,
								match.data,
							)}
							{@const indices = {
								...entrantIndices,
								...match.indices,
							}}
							{@const entrant1 = data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.opponent1?.opponentId,
							)}
							{@const entrant2 = data.entrants.find(
								(entrant) =>
									entrant.entrantId ===
									match.data.opponent2?.opponentId,
							)}
							{#if !$$slots["loser-match"]}
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
							{:else}
								<slot
									name="loser-match"
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
								/>
							{/if}
						</MatchWrapper>
					</foreignObject>
				{/each}
			</g>
		</g>
	{/each}
	<!-- Finals -->
	{#if finalsBracketData.length > 0}
		{@const bracketHeight = loserDimensions.height}
		{@const lastWinnerMatch =
			winnerBracketData[winnerBracketData.length - 1].matches[0]}
		{@const lastLoserMatch =
			loserBracketData[loserBracketData.length - 1].matches[0]}
		{#each finalsBracketData as { matches, round }}
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
							{#if !$$slots["finals-header"]}
								<slot name="header" {round}>
									<RoundHeader {round} />
								</slot>
							{:else}
								<slot name="finals-header" {round} />
							{/if}
						</foreignObject>
					</g>
				{/if}
				<g>
					{#each matches as match}
						{@const y =
							(bracketHeight +
								config.roundHeaderStyle.bottomMargin) /
							2}
						<ConnectorWrapper
							snippet={{
								currentMatch: {
									...match,
									position: {
										x,
										y,
									},
								},
								previousTopMatch: lastWinnerMatch,
								previousBottomMatch: lastLoserMatch,
							}}
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
						</ConnectorWrapper>
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
								{@const entrantIndices = getEntrantIndices(
									data,
									match.data,
								)}
								{@const indices = {
									...entrantIndices,
									...match.indices,
								}}
								{@const entrant1 = data.entrants.find(
									(entrant) =>
										entrant.entrantId ===
										match.data.opponent1?.opponentId,
								)}
								{@const entrant2 = data.entrants.find(
									(entrant) =>
										entrant.entrantId ===
										match.data.opponent2?.opponentId,
								)}
								{#if !$$slots["finals-match"]}
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
								{:else}
									<slot
										name="finals-match"
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
									/>
								{/if}
							</MatchWrapper>
						</foreignObject>
					{/each}
				</g>
			</g>
		{/each}
	{/if}
</SvgWrapper>
