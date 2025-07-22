export type DeepPartial<T> = T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T | undefined;

type Direction = "ltr" | "rtl"; //"ttb" | "btt" maybe?

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

export type Id = string | number;

export interface BaseRound {
	id: Id;
	name: string;
}

export interface Opponent {
	id: Id;
	score?: number;
	status?: "WON" | "LOST" | "DQ";
}

export interface BaseMatch {
	id: Id;
	roundId: Id;
	nextMatchId?: Id;
	nextLoserMatchId?: Id;
	opponent1?: Opponent;
	opponent2?: Opponent;
	status: any;
}

export interface BaseEntrant {
	id: Id;
	name: string;
}

export interface BaseProps<
	Round extends BaseRound = BaseRound,
	Entrant extends BaseEntrant = BaseEntrant,
> {
	rounds: Round[];
	entrants: Entrant[];
}

export interface SingleEliminationProps<
	Round extends BaseRound = BaseRound,
	Match extends BaseMatch = BaseMatch,
	Entrant extends BaseEntrant = BaseEntrant,
> extends BaseProps<Round, Entrant> {
	matches: Match[];
}

export interface DoubleEliminationProps<
	Round extends BaseRound = BaseRound,
	Match extends BaseMatch = BaseMatch,
	Entrant extends BaseEntrant = BaseEntrant,
> extends BaseProps<Round, Entrant> {
	matches: {
		upper: Match[];
		lower: Match[];
	};
}

/** Bracket configuration options */
export interface BracketConfig {
	/** Padding around bracket */
	padding: {
		/** @default 10 */
		top: number;
		/** @default 10 */
		bottom: number;
		/** @default 10 */
		left: number;
		/** @default 10 */
		right: number;
	};
	/** Certain match styles */
	matchStyle: {
		/** @default 54 */
		height: number;
		/** @default 150 */
		width: number;
		/**
		 * Gap between matches (vertical)
		 * @default 60
		 */
		gap: number;
		/**
		 * Match alignment if width is less than header's
		 * @default "center"
		 */
		align: "start" | "center" | "end";
	};
	/** @default false */
	showRoundHeaders: boolean;
	/** Certain round header styles */
	roundHeaderStyle: {
		/** @default 48 */
		height: number;
		/** @default 150 */
		width: number;
		/** @default 50 */
		bottomMargin: number;
		/**
		 * Round header alignment if width is less than matches'
		 * @default "center"
		 */
		align: "start" | "center" | "end";
	};
	/**
	 * Gap between rounds (horizontal)
	 * @default 70
	 */
	roundGap: number;
	/**
	 * Direction in which bracket will be visualized
	 * @default "ltr"
	 */
	direction: Direction;
}

/** Bracket configuration options with additional options for DoubleEliminationBracket */
export interface DoubleElimBracketConfig extends BracketConfig {
	/**
	 * Gap between winner and loser brackets
	 * @default 60
	 */
	bracketGap: number;
}
