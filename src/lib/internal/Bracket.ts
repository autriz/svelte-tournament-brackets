import { writable } from "svelte/store";
import type {
	BaseMatch,
	BracketConfig as BaseBracketConfig,
	DeepRequired,
	BaseEntrant,
	BaseRound,
	BaseMatchEntrant,
} from "./types.js";

export const defaultConfig = {
	padding: {
		top: 10,
		bottom: 10,
		left: 10,
		right: 10,
	},
	matchStyle: {
		height: 54,
		width: 150,
		gap: 60,
		align: "center",
	},
	showRoundHeaders: true,
	roundHeaderStyle: {
		height: 48,
		width: 150,
		bottomMargin: 50,
		align: "center",
	},
	roundGap: 70,
	bracketGap: 60,
};

export function createBracket<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
>(bracketConfig?: BracketConfig) {
	const config = (bracketConfig
		? {
				...defaultConfig,
				...bracketConfig,
				padding: {
					...defaultConfig.padding,
					...bracketConfig.padding,
				},
				matchStyle: {
					...defaultConfig.matchStyle,
					...bracketConfig.matchStyle,
				},
				roundHeaderStyle: {
					...defaultConfig.roundHeaderStyle,
					...bracketConfig.roundHeaderStyle,
				},
			}
		: defaultConfig) as unknown as DeepRequired<BracketConfig>;

	const hoveredMatchId = writable<Match["matchId"] | null>(null);
	const hoveredRoundId = writable<Round["roundId"] | null>(null);
	const hoveredEntrantId = writable<Entrant["entrantId"] | null>(null);

	return {
		hoveredMatchId,
		hoveredRoundId,
		hoveredEntrantId,

		config,
	};
}
