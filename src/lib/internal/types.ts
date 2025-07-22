import type { BaseMatch, BaseRound, MatchPositionData } from "$lib";

export type RoundWithMatches<
	Round extends BaseRound,
	Match extends BaseMatch,
> = {
	round: Round;
	matches: Match[];
};

export type RoundWithMatchData<
	Round extends BaseRound,
	Match extends BaseMatch,
> = {
	round: Round;
	matches: MatchData<Match>[];
};

export interface MatchData<Match extends BaseMatch> extends MatchPositionData {
	data: Match;
}
