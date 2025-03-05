export interface BaseRound {
	roundId: number;
	roundName: string;
}

export interface BaseMatch<T extends BaseMatchEntrant = BaseMatchEntrant> {
	matchId: number;
	roundId: number;
	nextMatchId?: number;
	nextLoserMatchId?: number;
	entrant1?: T;
	entrant2?: T;
	status: string; // DONE, IN_GAME, PREP or some shit
}

export interface BaseMatchEntrant {
	entrantId: number;
	entrantScore?: number;
	entrantStatus?: "WON" | "LOST" | "DQ";
}

export interface BaseEntrant {
	entrantId: number;
	entrantName: string;
	entrantAvatar?: {
		value: string;
		type: "url" | "base64";
	};
}

export type BaseProps<
	Round extends BaseRound = BaseRound,
	Entrant extends BaseEntrant = BaseEntrant,
> = {
	rounds: Round[];
	entrants: Entrant[];
};

export type MatchData<Match extends BaseMatch = BaseMatch> = {
	data: Match;
	position: { x: number; y: number };
	index: { round: number; match: number };
};

export type SingleEliminationProps<
	Match extends BaseMatch = BaseMatch,
	Round extends BaseRound = BaseRound,
	Entrant extends BaseEntrant = BaseEntrant,
> = BaseProps<Round, Entrant> & {
	matches: Match[];
};

export type RoundRobinProps<T extends BaseMatchEntrant = BaseMatchEntrant> =
	BaseProps & {
		matches: BaseMatch<T>[];
	};

export type DoubleEliminationProps<
	Match extends BaseMatch = BaseMatch,
	Round extends BaseRound = BaseRound,
	Entrant extends BaseEntrant = BaseEntrant,
> = BaseProps<Round, Entrant> & {
	matches: {
		upper: Match[];
		lower: Match[];
	};
	finalRounds: Round[];
	finalMatches: Match[];
};

export type BracketConfig = {
	padding: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	matchStyle: {
		height: number;
		width: number;
		gap: number;
	};
	showRoundHeaders: boolean;
	roundHeaderStyle: {
		height: number;
		width: number;
		bottomMargin: number;
	};
	roundStyle: {
		gap: number;
	};
};

export type MatchPositionData = {
	index: {
		round: number;
		match: number;
	};
	position: {
		x: number;
		y: number;
	};
};
