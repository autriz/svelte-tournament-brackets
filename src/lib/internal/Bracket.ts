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
		height: 55,
		width: 152,
		gap: 60,
		align: "center",
	},
	showRoundHeaders: true,
	roundHeaderStyle: {
		height: 48,
		width: 152,
		bottomMargin: 50,
		align: "center",
	},
	roundGap: 70,
	bracketGap: 60,
};

export type CreateBracketProps<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
> = {
	config?: BracketConfig;
	onMatchClick?: (match: Match) => void;
};

export function createBracket<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
>(props: CreateBracketProps<BracketConfig, MatchEntrant, Match>) {
	const config = (props.config
		? {
				...defaultConfig,
				...props.config,
				padding: {
					...defaultConfig.padding,
					...props.config.padding,
				},
				matchStyle: {
					...defaultConfig.matchStyle,
					...props.config.matchStyle,
				},
				roundHeaderStyle: {
					...defaultConfig.roundHeaderStyle,
					...props.config.roundHeaderStyle,
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

		onMatchClick: props.onMatchClick,
	};
}
