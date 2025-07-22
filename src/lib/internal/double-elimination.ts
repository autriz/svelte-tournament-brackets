import type {
	BaseEntrant,
	BaseMatch,
	BaseRound,
	DoubleElimBracketConfig,
	DoubleEliminationProps,
} from "$lib/brackets";
import { findFinalRounds, generateDataAndDims } from "./data";
import { getHeaderHeight } from "./helpers";

export function processDoubleEliminationData<
	Round extends BaseRound,
	Match extends BaseMatch,
	Entrant extends BaseEntrant,
	Props extends DoubleEliminationProps<Round, Match, Entrant>,
	Config extends DoubleElimBracketConfig,
>(data: Props, config: Config) {
	const { finalMatches, finalRounds } = findFinalRounds(
		data.rounds,
		data.matches,
	);

	const roundsWithoutFinals = data.rounds.filter(
		(round) =>
			!finalRounds.some((finalRound) => finalRound.id === round.id),
	);

	let finalsDimensions: { width: number; height: number };

	// Calculate finals dimensions first if direction is RTL
	if (config.direction === "rtl") {
		const { dimensions } = generateDataAndDims(
			{ ...data, matches: finalMatches, rounds: finalRounds },
			config,
			(data, round) =>
				data.matches.filter((match) => match.roundId === round.id),
			{
				top: 0,
				left: config.padding.left,
				right: 0,
				bottom: 0,
			},
		);
		finalsDimensions = dimensions;
	}

	const { bracketData: winnerBracketData, dimensions: winnerDimensions } =
		generateDataAndDims(
			{ ...data, rounds: roundsWithoutFinals },
			config,
			(data, round) =>
				data.matches.upper.filter(
					(match) => match.roundId === round.id,
				),
			{
				top: getHeaderHeight(config) + config.padding.top,
				left:
					config.direction === "rtl"
						? finalsDimensions!.width + config.roundGap
						: config.padding.left,
				right: 0,
				bottom: 0,
			},
		);

	const { bracketData: loserBracketData, dimensions: loserDimensions } =
		generateDataAndDims(
			{ ...data, rounds: roundsWithoutFinals },
			config,
			(data, round) =>
				data.matches.lower.filter(
					(match) => match.roundId === round.id,
				),
			{
				top: winnerDimensions.height + config.bracketGap,
				left:
					config.direction === "rtl"
						? finalsDimensions!.width + config.roundGap
						: config.padding.left,
				right: 0,
				bottom: config.padding.bottom,
			},
		);

	const widthWithoutFinals = Math.max(
		winnerDimensions.width,
		loserDimensions.width,
	);

	const { bracketData: finalsBracketData, dimensions: _finalsDimensions } =
		generateDataAndDims(
			{ ...data, matches: finalMatches, rounds: finalRounds },
			config,
			(data, round) =>
				data.matches.filter((match) => match.roundId === round.id),
			{
				top: loserDimensions.height / 2, // FIXME maybe: Inconsistent y position when round header is shown vs not
				left:
					config.direction === "rtl"
						? config.padding.left
						: widthWithoutFinals + config.roundGap,
				right: 0,
				bottom: config.padding.bottom,
			},
		);

	finalsDimensions = _finalsDimensions;

	const width =
		Math.max(
			finalsDimensions.width,
			winnerDimensions.width,
			loserDimensions.width,
		) + config.padding.right;
	const height = loserDimensions.height;

	return {
		winnerBracketData,
		loserBracketData,
		finalsBracketData,
		width,
		height,
	};
}
