import type { BaseMatch, BaseRound, MatchPositionData } from "$lib";

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
