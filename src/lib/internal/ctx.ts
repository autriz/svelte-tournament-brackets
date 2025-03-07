import { getContext, setContext } from "svelte";
import { createBracket, type CreateBracketProps } from "./Bracket.js";
import type {
	BracketConfig as BaseBracketConfig,
	BaseEntrant,
	BaseMatch,
	BaseMatchEntrant,
	BaseRound,
} from "./types.js";

const BRACKET_ROOT = Symbol("BRACKET_ROOT");

export function setCtx<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
>(props: CreateBracketProps<BracketConfig, MatchEntrant, Match>) {
	const bracket = createBracket<
		BracketConfig,
		Round,
		MatchEntrant,
		Match,
		Entrant
	>(props);

	setContext(BRACKET_ROOT, { ...bracket });

	return {
		...bracket,
	};
}

export function getCtx<
	BracketConfig extends BaseBracketConfig = BaseBracketConfig,
	Round extends BaseRound = BaseRound,
	MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
	Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	Entrant extends BaseEntrant = BaseEntrant,
>() {
	return getContext<
		ReturnType<
			typeof setCtx<BracketConfig, Round, MatchEntrant, Match, Entrant>
		>
	>(BRACKET_ROOT);
}
