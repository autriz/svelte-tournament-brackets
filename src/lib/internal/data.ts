import type {
	BaseEntrant,
	BaseMatch,
	BaseProps,
	BaseRound,
	BracketConfig,
} from "$lib";
import {
	calculateBracketDimensions,
	getMatchPositionData,
} from "./dimensions.js";
import type { RoundWithMatchData } from "./types.js";

/**
 * Generates position data for matches from filtered initial data
 * @param data Generic object with rounds, matches and entrants.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @param filter Function that should return round matches from `data` object.
 * @param options Determines additional X and Y pixels added to match position.
 * @returns Rounds array with match data inside them.
 */
export function generateBracketData<
	Props extends BaseProps,
	Match extends BaseMatch,
>(
	data: Props,
	config: BracketConfig,
	filter: (data: Props, round: Props["rounds"][number]) => Match[],
	options: {
		additionalX?: number;
		additionalY?: number;
	} = {
		additionalX: 0,
		additionalY: 0,
	},
): RoundWithMatchData<Props["rounds"][number], Match>[] {
	const rounds = data.rounds.map((round) => {
		const roundMatches = filter(data, round);

		return {
			round,
			matches: roundMatches,
		};
	});

	let roundsWithMatchData = rounds.map((round, roundIdx) => {
		const extendedMatches = round.matches.map((match, matchIdx) => {
			return {
				data: match,
				...getMatchPositionData(
					rounds,
					roundIdx,
					matchIdx,
					config,
					options,
				),
			};
		});

		return {
			round: round.round,
			matches: extendedMatches,
		};
	});

	if (config.direction === "rtl") {
		const reversedHorizontalPositions = roundsWithMatchData
			.map((round) => round.matches[0].position.x)
			.reverse();

		roundsWithMatchData = roundsWithMatchData.map((round, idx) => {
			round.matches = round.matches.map((matchData) => {
				matchData.position.x = reversedHorizontalPositions[idx];
				return matchData;
			});

			return round;
		});
	}

	return roundsWithMatchData;
}

/**
 * Simple wrapper around `generateBracketData` and `calculateBracketDimensions`
 * @param data Generic object with rounds, matches and entrants.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @param filter Function that should return round matches from `data` object.
 * @param padding Object containing padding of the bracket.
 * Top and left are applied when generating match data,
 * bottom and right after calculating bracket dimensions.
 * @returns Rounds array with match data inside them and bracket dimensions.
 */
export function generateDataAndDims<
	Props extends BaseProps,
	Match extends BaseMatch,
>(
	data: Props,
	config: BracketConfig,
	filter: (data: Props, round: Props["rounds"][number]) => Match[],
	padding: {
		top: number;
		left: number;
		right: number;
		bottom: number;
	},
) {
	const bracketData = generateBracketData(data, config, filter, {
		additionalY: padding.top,
		additionalX: padding.left,
	});
	const dimensions = calculateBracketDimensions(bracketData, config, {
		additionalX: padding.right,
		additionalY: padding.bottom,
	});

	return { bracketData, dimensions };
}

/**
 * Filters final rounds and matches from all rounds and matches.
 *
 * Yoinked from {@link https://github.com/Shenato/react-tournament-brackets/blob/master/src/bracket-double/double-elim-bracket.tsx#L18|React Tournament Brackets}
 * @param rounds Array of generic round objects.
 * @param matches Object with `lower` and `upper` properties both containing arrays of generic match objects.
 * @returns Object with final rounds and final matches.
 */
export function findFinalRounds<
	Match extends BaseMatch,
	Round extends BaseRound,
>(rounds: Round[], matches: { upper: Match[]; lower: Match[] }) {
	const isFinalInUpper = matches.upper.some((match) => !match.nextMatchId);
	const isFinalInLower = matches.lower.some((match) => !match.nextMatchId);

	let convergingMatch: Match;
	let finalMatches: Match[] = [];

	if (isFinalInLower) {
		const lastUpper = matches.upper.find((match) => {
			const hasNextMatchInUpper = matches.upper.some(
				(m) => m.id === match.nextMatchId,
			);
			return !hasNextMatchInUpper;
		})!;

		convergingMatch = matches.lower.find(
			(match) => match.id === lastUpper.nextMatchId,
		)!;

		finalMatches = [
			convergingMatch,
			matches.lower.find(
				(match) => match.id === convergingMatch?.nextMatchId,
			),
		].filter((match) => match?.id) as Match[];
	} else if (isFinalInUpper) {
		const lastLower = matches.lower.find((match) => {
			const hasNextMatchInLower = matches.lower.some(
				(m) => m.id === match.nextMatchId,
			);
			return !hasNextMatchInLower;
		})!;

		convergingMatch = matches.upper.find(
			(match) => match.id === lastLower.nextMatchId,
		)!;

		finalMatches = [
			convergingMatch,
			matches.upper.find(
				(match) => match.id === convergingMatch?.nextMatchId,
			),
		].filter((match) => match?.id) as Match[];
	}

	const finalRounds = [
		...rounds.filter((round) => {
			const hasFinalMatch = finalMatches.some(
				(match) => match.roundId === round.id,
			);

			return hasFinalMatch;
		}),
	];

	return {
		finalMatches,
		finalRounds,
	};
}
