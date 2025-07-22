import type {
	BaseMatch,
	BaseRound,
	BracketConfig,
	MatchPositionData,
} from "$lib";
import type {
	MatchData,
	RoundWithMatchData,
	RoundWithMatches,
} from "./types.js";

/**
 * Calculates bracket dimensions from match positions
 * @param bracketData Rounds array with match data inside them.
 * Obtained when passing initial bracket data through
 * {@link generateBracketData}.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @param options Object containing x and y offsets from top and left sides.
 * @returns Object with height and width of the bracket.
 */
export function calculateBracketDimensions<
	Round extends BaseRound,
	Match extends BaseMatch,
	Config extends BracketConfig,
>(
	bracketData: RoundWithMatchData<Round, Match>[],
	config: Config,
	options?: {
		additionalX?: number;
		additionalY?: number;
	},
) {
	const headerWidth = config.showRoundHeaders
		? config.roundHeaderStyle.width
		: 0;

	const [height, width] = bracketData.reduce(
		([height, width], roundData) => {
			const lowestMatchInRound =
				roundData.matches[roundData.matches.length - 1];

			if (!lowestMatchInRound) {
				if (options) return [height, width];

				throw new Error(
					`[Malformed data] Missing matches in round with ID: ${roundData.round.id}`,
				);
			}

			height = Math.max(
				height,
				lowestMatchInRound.position.y + config.matchStyle.height,
			);

			width = Math.max(
				width,
				lowestMatchInRound.position.x +
					Math.max(config.matchStyle.width, headerWidth),
			);

			return [height, width];
		},
		[0, 0],
	);

	return {
		width: width + (options?.additionalX || 0),
		height: height + (options?.additionalY || 0),
	};
}

const calcVerticalStartingPoint = (
	roundIdx: number,
	height: number,
	matchGap: number,
) => 2 ** roundIdx * ((height + matchGap) / 2) - (height + matchGap) / 2;

const columnIncrement = (roundIdx: number, height: number, matchGap: number) =>
	2 ** roundIdx * (height + matchGap);

const calcHeightIncrease = (
	roundIdx: number,
	matchIdx: number,
	height: number,
	matchGap: number,
) => columnIncrement(roundIdx, height, matchGap) * matchIdx;

/**
 * Calculates match position data from bracket data.
 * @param bracketData Rounds array with match data inside them.
 * Obtained when passing initial bracket data through
 * {@link generateBracketData}.
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @param options Object containing x and y offsets from top and left sides.
 * @returns Match position data.
 * @internal
 */
export function getMatchPositionData<
	Round extends BaseRound,
	Match extends BaseMatch,
>(
	bracketData: RoundWithMatches<Round, Match>[],
	roundIdx: number,
	matchIdx: number,
	config: BracketConfig,
	options: {
		additionalX?: number;
		additionalY?: number;
	},
): MatchPositionData {
	const { previousBottomMatch, previousTopMatch } = getPreviousMatchesIndices(
		bracketData,
		roundIdx,
		matchIdx,
	);

	return {
		indices: {
			round: roundIdx,
			match: matchIdx,
		},
		position: calcMatchPos(roundIdx, matchIdx, {
			matchHeight: config.matchStyle.height,
			matchWidth: Math.max(
				config.matchStyle.width,
				config.roundHeaderStyle.width,
			),
			matchGap: config.matchStyle.gap,
			roundGap: config.roundGap,
			hasPreviousTopMatch: !!previousTopMatch,
			hasPreviousBottomMatch: !!previousBottomMatch,
			additionalX: options.additionalX,
			additionalY: options.additionalY,
		}),
	};
}

/**
 * @internal
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @param options Object containing match height, gap, round gap, and previous match data.
 * @returns Vertical position of the match.
 */
function calcVerticalPos(
	roundIdx: number,
	matchIdx: number,
	options: {
		matchHeight: number;
		matchGap: number;
		roundGap: number;
		hasPreviousTopMatch: boolean;
		hasPreviousBottomMatch: boolean;
	},
): number {
	const { hasPreviousTopMatch, hasPreviousBottomMatch, ...restOptions } =
		options;

	// If we are in the first round, or the match has two feeders,
	// calculate its position directly based on its index.
	if (roundIdx === 0 || (hasPreviousTopMatch && hasPreviousBottomMatch)) {
		return (
			calcHeightIncrease(
				roundIdx,
				matchIdx,
				options.matchHeight,
				options.matchGap,
			) +
			calcVerticalStartingPoint(
				roundIdx,
				options.matchHeight,
				options.matchGap,
			)
		);
	}

	// If a match is missing one of its feeders, its vertical position is
	// determined by the position of the single feeder match in the previous round.
	// This ensures the connector line is straight.
	if (hasPreviousTopMatch || hasPreviousBottomMatch) {
		const previousMatchIdx = matchIdx * 2 + (hasPreviousTopMatch ? 0 : 1);

		return calcVerticalPos(roundIdx - 1, previousMatchIdx, {
			...restOptions,
			hasPreviousTopMatch: hasPreviousTopMatch || true,
			hasPreviousBottomMatch: hasPreviousBottomMatch || true,
		});
	}

	// If a match has no previous matches (e.g., a floating match in a sparse bracket),
	// calculate its position as if it were a standard match in its round and index.
	return (
		calcHeightIncrease(
			roundIdx,
			matchIdx,
			options.matchHeight,
			options.matchGap,
		) +
		calcVerticalStartingPoint(
			roundIdx,
			options.matchHeight,
			options.matchGap,
		)
	);
}

const calcXPos = (roundIdx: number, matchWidth: number, roundGap: number) =>
	roundIdx * (matchWidth + roundGap);

/**
 * @internal
 * @param bracketData Rounds array with match data inside them.
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @param options Object containing x and y offsets from top and left sides.
 * @returns Object with x and y position of the match.
 */
function calcMatchPos(
	roundIdx: number,
	matchIdx: number,
	options: {
		matchHeight: number;
		matchWidth: number;
		roundGap: number;
		matchGap: number;
		hasPreviousTopMatch: boolean;
		hasPreviousBottomMatch: boolean;
		additionalX?: number;
		additionalY?: number;
	},
) {
	const { matchWidth, ...restOptions } = options;

	const x =
		calcXPos(roundIdx, matchWidth, options.roundGap) +
		(options.additionalX || 0);
	const y =
		calcVerticalPos(roundIdx, matchIdx, restOptions) +
		(options.additionalY || 0);

	return { x, y };
}

/**
 * @internal
 * @param bracketData Rounds array with match data inside them.
 * Obtained when passing initial bracket data through
 * {@link generateBracketData}.
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @returns Object with previous top and bottom match data.
 */
function getPreviousMatchesInner<Match, Round extends BaseRound = BaseRound>(
	bracketData: { round: Round; matches: any[] }[],
	roundIdx: number,
	matchIdx: number,
): { previousTopMatch?: Match; previousBottomMatch?: Match } {
	if (roundIdx === 0)
		return {
			previousTopMatch: undefined,
			previousBottomMatch: undefined,
		};

	let prevRoundIdx = roundIdx - 1;
	while (
		prevRoundIdx >= 0 &&
		bracketData[prevRoundIdx].matches.length === 0
	) {
		prevRoundIdx--;
	}

	const previousTopMatch = bracketData[prevRoundIdx].matches[matchIdx * 2];
	const previousBottomMatch =
		bracketData[prevRoundIdx].matches[matchIdx * 2 + 1];

	return {
		previousTopMatch,
		previousBottomMatch,
	};
}

/**
 * @param bracketData Rounds array with match data inside them.
 * Obtained when passing initial bracket data through
 * {@link generateBracketData}.
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @returns Object with previous top and bottom match data.
 */
export function getPreviousMatches<
	Round extends BaseRound,
	Match extends BaseMatch,
>(
	bracketData: RoundWithMatchData<Round, Match>[],
	roundIdx: number,
	matchIdx: number,
) {
	return getPreviousMatchesInner<MatchData<Match>>(
		bracketData,
		roundIdx,
		matchIdx,
	);
}

/**
 * @internal
 * @param bracketData Rounds array with match data inside them.
 * Obtained when passing initial bracket data through
 * {@link generateBracketData}.
 * @param roundIdx Index of the round.
 * @param matchIdx Index of the match.
 * @returns Object with previous top and bottom match indices.
 */
function getPreviousMatchesIndices<
	Round extends BaseRound,
	Match extends BaseMatch,
>(
	bracketData: RoundWithMatches<Round, Match>[],
	roundIdx: number,
	matchIdx: number,
) {
	const { previousTopMatch, previousBottomMatch } =
		getPreviousMatchesInner<Match>(bracketData, roundIdx, matchIdx);

	return {
		previousTopMatch: previousTopMatch
			? { round: roundIdx - 1, match: matchIdx * 2 }
			: undefined,
		previousBottomMatch: previousBottomMatch
			? { round: roundIdx - 1, match: matchIdx * 2 + 1 }
			: undefined,
	};
}
