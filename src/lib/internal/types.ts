import type { BaseMatch, BaseRound } from "$lib";

export type DeepRequired<T> = T extends object
	? { [P in keyof T]-?: DeepRequired<T[P]> }
	: T;

export type RoundWithMatches<
	Round extends BaseRound = BaseRound,
	Match extends BaseMatch = BaseMatch,
> = {
	round: Round;
	matches: Match[];
};

export type RoundWithMatchData<
	Round extends BaseRound = BaseRound,
	Match extends BaseMatch = BaseMatch,
> = {
	round: Round;
	matches: MatchData<Match>[];
};

export interface MatchData<Match extends BaseMatch = BaseMatch>
	extends MatchPositionData {
	data: Match;
}

export type MatchPositionData = {
	indices: {
		round: number;
		match: number;
	};
	position: {
		x: number;
		y: number;
	};
};
