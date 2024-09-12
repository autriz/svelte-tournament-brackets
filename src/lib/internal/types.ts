export interface Round {
	roundId: number;
	roundName: string;
}

export interface Match {
	matchId: number;
	roundId: number;
	opponent1?: MatchOpponent;
	opponent2?: MatchOpponent;
	status: string; // DONE, IN_GAME, PREP or some shit
	
}

export interface MatchOpponent {
	opponentId: number;
	opponentScore?: number;
	opponentStatus?: "WON" | "LOST" | "DQ";
}

export interface Entrant {
	entrantId: number;
	entrantName: string;
	entrantAvatar?: {
		value: string,
		type: "url" | "base64",
	}
}

export type BaseProps = {
	rounds: Round[];
	entrants: Entrant[];
}

export type SingleEliminationProps = BaseProps & {
	matches: Match[];
}

export type RoundRobinProps = BaseProps & {
	matches: Match[];
}

export type DoubleEliminationProps = BaseProps & {
	matches: {
		upper: Match[];
		lower: Match[];
	};
}