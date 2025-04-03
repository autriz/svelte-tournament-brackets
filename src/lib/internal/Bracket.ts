import { writable } from "svelte/store";
import type {
	BaseMatch,
	BracketConfig as BaseBracketConfig,
	BaseEntrant,
	BaseRound,
	DeepPartial,
} from "$lib";

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
	BracketConfig extends
		DeepPartial<BaseBracketConfig> = DeepPartial<BaseBracketConfig>,
	Match extends BaseMatch = BaseMatch,
> = {
	config?: BracketConfig;
	onMatchClick?: (match: Match) => void;
};

export function createBracket<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	Round extends BaseRound = BaseRound,
	Match extends BaseMatch = BaseMatch,
	Entrant extends BaseEntrant = BaseEntrant,
>(props: CreateBracketProps<DeepPartial<BracketConfig>, Match>) {
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
		: defaultConfig) as unknown as BracketConfig;

	const hoveredMatchId = writable<Match["id"] | null>(null);
	const hoveredRoundId = writable<Round["id"] | null>(null);
	const hoveredEntrantId = writable<Entrant["id"] | null>(null);

	return {
		hoveredMatchId,
		hoveredRoundId,
		hoveredEntrantId,

		config,

		onMatchClick: props.onMatchClick,
	};
}
