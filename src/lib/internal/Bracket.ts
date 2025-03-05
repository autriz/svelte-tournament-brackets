import {
	isWritable,
	overridable,
	type MaybeWritable,
} from "./helpers/store.js";
import { get, writable, type Writable } from "svelte/store";
import type { BaseMatch, BracketConfig } from "./types.js";

export const defaultConfig = {
	matchStyle: {
		height: 52,
		width: 150,
		gap: 60,
	},
	showRoundHeaders: true,
	roundHeaderStyle: {
		height: 48,
		width: 150,
		bottomMargin: 50,
	},
	roundStyle: {
		gap: 70,
	},
	bracketGap: 60,
} as const;

export type CreateBracketProps<Match extends BaseMatch = BaseMatch> = {
	config?: BracketConfig;
	onMatchClick?: (match: Match) => void;
};

export function createBracket<Match extends BaseMatch = BaseMatch>(
	props: CreateBracketProps<Match>,
) {
	const config = props.config
		? { ...defaultConfig, ...props.config }
		: defaultConfig;

	const hoveredMatchId = overridable<number | null>(writable(null));
	const hoveredRoundId = overridable<number | null>(writable(null));
	const hoveredEntrantId = overridable<number | null>(writable(null));

	return {
		hoveredMatchId,
		hoveredRoundId,
		hoveredEntrantId,

		config,

		onMatchClick: props.onMatchClick,
	};
}
