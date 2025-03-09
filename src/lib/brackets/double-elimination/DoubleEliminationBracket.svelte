<script
	lang="ts"
	generics="
		BracketConfig extends DoubleElimBracketConfig = DoubleElimBracketConfig,
		Round extends BaseRound = BaseRound, 
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>, 
		Entrant extends BaseEntrant = BaseEntrant
	"
>
	import type {
		BaseEntrant,
		BaseRound,
		BaseMatch,
		DoubleEliminationProps,
		DoubleElimBracketConfig,
		MatchData,
		BaseMatchEntrant,
	} from "$lib/internal/types";
	import { clsx } from "clsx";
	import { setCtx } from "$lib/internal/ctx";
	import {
		Connector,
		MatchWrapper,
		Match,
		RoundHeader,
	} from "$lib/brackets/components";
	import {
		generateBracketData,
		getMatchPositionDataInner,
	} from "$lib/internal/utils";
	import UpperBracket from "./UpperBracket.svelte";
	import LowerBracket from "./LowerBracket.svelte";
	import FinalBracket from "./FinalBracket.svelte";

	export let data: DoubleEliminationProps<
		Round,
		MatchEntrant,
		Match,
		Entrant
	>;
	export let bracketConfig: BracketConfig | undefined = undefined;
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	const { config } = setCtx(bracketConfig);

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	const calculateBracketDimensions = (
		bracketData: (Round & {
			matches: MatchData<MatchEntrant, Match>[];
		})[],
		options?: {
			additionalX?: number;
			additionalY?: number;
		},
	) => {
		const [height, width] = bracketData.reduce(
			([height, width], round) => {
				const lowestMatchInRound =
					round.matches[round.matches.length - 1];

				if (!lowestMatchInRound)
					throw new Error(
						`[Malformed data] Missing matches in round with ID: ${round.roundId}`,
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
			width: width + (options?.additionalX || 0),
			height: height + (options?.additionalY || 0),
		};
	};

	const headerHeight = config.showRoundHeaders
		? config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin
		: 0;

	const winnerBracketData = generateBracketData(
		data,
		config,
		(data, round) =>
			data.matches.upper.filter(
				(match) => match.roundId === round.roundId,
			),
		{
			additionalY: headerHeight + config.padding.top,
			additionalX: config.padding.left,
		},
	) as (Round & { matches: MatchData<MatchEntrant, Match>[] })[];
	const winnerDimensions = calculateBracketDimensions(winnerBracketData, {
		additionalX: config.padding.left,
		additionalY: config.padding.top,
	});

	const loserBracketData = generateBracketData(
		data,
		config,
		(data, round) =>
			data.matches.lower.filter(
				(match) => match.roundId === round.roundId,
			),
		{
			additionalY: winnerDimensions.height + config.bracketGap,
			additionalX: config.padding.left,
		},
	) as (Round & { matches: MatchData<MatchEntrant, Match>[] })[];
	const loserDimensions = calculateBracketDimensions(loserBracketData, {
		additionalX: config.padding.left,
		additionalY: config.padding.bottom,
	});
	const widthWithoutFinals = Math.max(
		winnerDimensions.width,
		loserDimensions.width,
	);

	const finalsBracketData = data.finalRounds
		? data.finalRounds
				.map((round) => {
					const roundMatches = data.finalMatches.filter(
						(match) => match.roundId === round.roundId,
					);

					return {
						...round,
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
						...round,
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

	const width = finalsDimensions.width;
	const height = loserDimensions.height;

	export { height, width };
</script>

<svg x="0" y="0" {width} {height} class={clsx(className)}>
	<rect x="0" y="0" {width} {height} />
	<UpperBracket bracketData={winnerBracketData} {config}>
		<!-- 
			we cannot use <slot name="winner-header" slot="header" /> 
			there, so wrapping tag around slot is the only solution
		-->
		<div
			slot="header"
			xmlns="http://www.w3.org/1999/xhtml"
			style="width: 100%; height: 100%;"
			let:round
		>
			<slot name="winner-header" {round}>
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
		<div
			slot="match"
			xmlns="http://www.w3.org/1999/xhtml"
			style="width: 100%; height: 100%;"
			let:match
		>
			<MatchWrapper
				{match}
				entrant1={data.entrants.find(
					(entrant) =>
						entrant.entrantId === match.entrant1?.entrantId,
				)}
				entrant2={data.entrants.find(
					(entrant) =>
						entrant.entrantId === match.entrant2?.entrantId,
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
					{onMatchClick}
				>
					<Match
						{match}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{onEnter}
						{onLeave}
						{onMatchClick}
					/>
				</slot>
			</MatchWrapper>
		</div>
	</UpperBracket>
	<LowerBracket bracketData={loserBracketData} {config}>
		<g
			slot="connector"
			style="width: 100%; height: 100%;"
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
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
		<div
			slot="match"
			xmlns="http://www.w3.org/1999/xhtml"
			style="width: 100%; height: 100%;"
			let:match
		>
			<MatchWrapper
				{match}
				entrant1={data.entrants.find(
					(entrant) =>
						entrant.entrantId === match.entrant1?.entrantId,
				)}
				entrant2={data.entrants.find(
					(entrant) =>
						entrant.entrantId === match.entrant2?.entrantId,
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
					{onMatchClick}
				>
					<Match
						{match}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{onEnter}
						{onLeave}
						{onMatchClick}
					/>
				</slot>
			</MatchWrapper>
		</div>
	</LowerBracket>
	{#if finalsBracketData.length > 0}
		<FinalBracket
			bracketData={finalsBracketData}
			bracketHeight={loserDimensions.height}
			lastWinnerMatch={winnerBracketData[winnerBracketData.length - 1]
				.matches[0]}
			lastLoserMatch={loserBracketData[loserBracketData.length - 1]
				.matches[0]}
			{config}
		>
			<div
				slot="header"
				xmlns="http://www.w3.org/1999/xhtml"
				style="width: 100%; height: 100%;"
				let:round
			>
				<slot name="winner-header" {round}>
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
			<div
				slot="match"
				xmlns="http://www.w3.org/1999/xhtml"
				style="width: 100%; height: 100%;"
				let:match
			>
				<MatchWrapper
					{match}
					entrant1={data.entrants.find(
						(entrant) =>
							entrant.entrantId ===
							match.entrant1?.entrantId,
					)}
					entrant2={data.entrants.find(
						(entrant) =>
							entrant.entrantId ===
							match.entrant2?.entrantId,
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
						{onMatchClick}
					>
						<Match
							{match}
							{entrant1}
							{entrant2}
							{isTopHovered}
							{isBottomHovered}
							{onEnter}
							{onLeave}
							{onMatchClick}
						/>
					</slot>
				</MatchWrapper>
			</div>
		</FinalBracket>
	{/if}
</svg>
