export type DeepRequired<T> = T extends object
	? { [P in keyof T]-?: DeepRequired<T[P]> }
	: T;

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
	status: string; // DONE, IN_GAME, PREP, etc.
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

export interface BaseProps<
	Round extends BaseRound = BaseRound,
	Entrant extends BaseEntrant = BaseEntrant,
> {
	rounds: Round[];
	entrants: Entrant[];
}

export interface MatchData<
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
> extends MatchPositionData {
	data: Match;
}

export interface SingleEliminationProps<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
> extends BaseProps<Round, Entrant> {
	matches: Match[];
}

export interface RoundRobinProps<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
> extends BaseProps<Round, Entrant> {
	matches: Match[];
}

export interface DoubleEliminationProps<
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
> extends BaseProps<Round, Entrant> {
	matches: {
		upper: Match[];
		lower: Match[];
	};
	finalRounds: Round[];
	finalMatches: Match[];
}

export interface BracketConfig {
	/** Padding around bracket */
	padding?: {
		/** @default 10 */
		top?: number;
		/** @default 10 */
		bottom?: number;
		/** @default 10 */
		left?: number;
		/** @default 10 */
		right?: number;
	};
	/** Certain match styles */
	matchStyle?: {
		/** @default 54 */
		height?: number;
		/** @default 150 */
		width?: number;
		/**
		 * Gap between matches (vertical)
		 * @default 60
		 */
		gap?: number;
		/**
		 * Match alignment if width is less than header's
		 */
		align?: "start" | "center" | "end";
	};
	/** @default true */
	showRoundHeaders?: boolean;
	/** Certain round header styles */
	roundHeaderStyle?: {
		/** @default 48 */
		height?: number;
		/** @default 150 */
		width?: number;
		/** @default 50 */
		bottomMargin?: number;
		/**
		 * Round header alignment if width is less than matches'
		 */
		align?: "start" | "center" | "end";
	};
	/**
	 * Gap between rounds (horizontal)
	 * @default 70
	 */
	roundGap?: number;
}

export interface DoubleElimBracketConfig extends BracketConfig {
	/**
	 * Gap between winner and loser brackets
	 * @default 60
	 */
	bracketGap?: number;
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
