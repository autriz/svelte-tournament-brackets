import type {
	BaseMatch,
	BaseRound,
	MatchData,
	MatchPositionData,
	BracketConfig,
	BaseProps,
	DeepRequired,
	BaseMatchEntrant,
	BaseEntrant,
} from "./types.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes));
}

export function shiftHeaderXPos(
	x: number,
	config: DeepRequired<BracketConfig>,
) {
	if (config.matchStyle.width > config.roundHeaderStyle.width) {
		const diff = config.matchStyle.width - config.roundHeaderStyle.width;

		switch (config.roundHeaderStyle.align) {
			case "start":
				return x;
			case "center":
				return x + diff / 2;
			case "end":
				return x + diff;
		}
	}

	return x;
}

export function shiftMatchXPos(x: number, config: DeepRequired<BracketConfig>) {
	if (config.matchStyle.width < config.roundHeaderStyle.width) {
		const diff = config.roundHeaderStyle.width - config.matchStyle.width;

		switch (config.matchStyle.align) {
			case "start":
				return x;
			case "center":
				return x + diff / 2;
			case "end":
				return x + diff;
		}
	}

	return x;
}

export function getEntrantIndices<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
>(data: BaseProps<Round, Entrant>, match: Match) {
	const entrant1 = data.entrants.findIndex(
		(entrant) => entrant.entrantId === match.entrant1?.entrantId,
	);

	const entrant2 = data.entrants.findIndex(
		(entrant) => entrant.entrantId === match.entrant2?.entrantId,
	);

	return {
		entrant1: entrant1 < 0 ? undefined : entrant1,

		entrant2: entrant2 < 0 ? undefined : entrant2,
	};
}

export function generateBracketData<
	Props extends BaseProps = BaseProps,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
>(
	data: Props,
	config: DeepRequired<BracketConfig>,
	filter: (data: Props, round: Props["rounds"][number]) => Match[],
	options: {
		additionalX?: number;
		additionalY?: number;
	} = {
		additionalX: 0,
		additionalY: 0,
	},
) {
	const rounds = data.rounds.map((round) => {
		const roundMatches = filter(data, round);

		return {
			...round,
			matches: roundMatches,
		};
	});

	return rounds.map((round, roundIdx) => {
		const extendedMatches = round.matches.map((match, matchIdx) => {
			return {
				data: match,
				...getMatchPositionDataInner(
					rounds,
					roundIdx,
					matchIdx,
					config,
					options,
				),
			};
		});

		return {
			...round,
			matches: extendedMatches,
		};
	});
}

export function getPreviousMatches<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
>(
	bracketData: (Round & {
		matches: MatchData<MatchEntrant, Match>[];
	})[],
	roundIdx: number,
	matchIdx: number,
) {
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

export function getPreviousMatchesIndices<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
>(
	bracketData: (Round & {
		matches: Match[];
	})[],
	roundIdx: number,
	matchIdx: number,
) {
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
		previousTopMatch: previousTopMatch
			? { round: roundIdx - 1, match: matchIdx * 2 }
			: undefined,
		previousBottomMatch: previousBottomMatch
			? { round: roundIdx - 1, match: matchIdx * 2 + 1 }
			: undefined,
	};
}

export const calcVerticalStartingPoint = (
	roundIdx: number,
	height: number,
	matchGap: number,
) => 2 ** roundIdx * ((height + matchGap) / 2) - (height + matchGap) / 2;

export const columnIncrement = (
	roundIdx: number,
	height: number,
	matchGap: number,
) => 2 ** roundIdx * (height + matchGap);

export const calcHeightIncrease = (
	roundIdx: number,
	matchIdx: number,
	height: number,
	matchGap: number,
) => columnIncrement(roundIdx, height, matchGap) * matchIdx;

export function calcVerticalPos(
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
	const hasPrevTop = options.hasPreviousTopMatch;
	const hasPrevBottom = options.hasPreviousBottomMatch;

	if (roundIdx === 0 || (hasPrevTop && hasPrevBottom)) {
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

	if (hasPrevTop || hasPrevBottom) {
		return calcVerticalPos(
			roundIdx - 1,
			matchIdx * 2 + (hasPrevTop ? 0 : 1),
			{
				matchHeight: options.matchHeight,
				matchGap: options.matchGap,
				roundGap: options.roundGap,
				hasPreviousTopMatch: hasPrevTop || true,
				hasPreviousBottomMatch: hasPrevBottom || true,
			},
		);
	} else {
		return calcVerticalPos(roundIdx, matchIdx, {
			matchHeight: options.matchHeight,
			matchGap: options.matchGap,
			roundGap: options.roundGap,
			hasPreviousTopMatch: true,
			hasPreviousBottomMatch: true,
		});
	}
}

export const calcXPos = (
	roundIdx: number,
	matchWidth: number,
	roundGap: number,
) => roundIdx * (matchWidth + roundGap);

export const calcYPos = (
	matchIdx: number,
	matchHeight: number,
	matchGap: number,
) => matchIdx * (matchHeight + matchGap);

export function calcMatchPos(
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

export function getMatchPositionDataInner<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
>(
	bracketData: (Round & {
		matches: Match[];
	})[],
	roundIdx: number,
	matchIdx: number,
	config: DeepRequired<BracketConfig>,
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
