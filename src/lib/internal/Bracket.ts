import { writable, type Writable } from "svelte/store";
import type {
	BaseMatch,
	BracketConfig as BaseBracketConfig,
	BaseEntrant,
	BaseRound,
	DeepPartial,
	DoubleElimBracketConfig,
	BaseProps,
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
	direction: "ltr",
} satisfies BaseBracketConfig | DoubleElimBracketConfig;

export interface CreateBracketProps<BracketConfig extends BaseBracketConfig> {
	config: Writable<BracketConfig>;
}

export function createConfig<BracketConfig extends BaseBracketConfig>(
	partialConfig: DeepPartial<BracketConfig> | undefined,
) {
	return (partialConfig
		? {
				...defaultConfig,
				...partialConfig,
				padding: {
					...defaultConfig.padding,
					...partialConfig.padding,
				},
				matchStyle: {
					...defaultConfig.matchStyle,
					...partialConfig.matchStyle,
				},
				roundHeaderStyle: {
					...defaultConfig.roundHeaderStyle,
					...partialConfig.roundHeaderStyle,
				},
			}
		: defaultConfig) as unknown as BracketConfig;
}

export function createBracket<
	BracketConfig extends BaseBracketConfig,
	Round extends BaseRound,
	Match extends BaseMatch,
	Entrant extends BaseEntrant,
>(props: CreateBracketProps<BracketConfig>) {
	const hoveredMatchId = writable<Match["id"] | null>(null);
	const hoveredRoundId = writable<Round["id"] | null>(null);
	const hoveredEntrantId = writable<Entrant["id"] | null>(null);

	return {
		hoveredMatchId,
		hoveredRoundId,
		hoveredEntrantId,

		config: props.config,
	};
}
