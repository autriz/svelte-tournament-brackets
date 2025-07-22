import { getContext, setContext } from "svelte";
import { createBracket, type CreateBracketProps } from "./Bracket.js";
import type {
	BracketConfig as BaseBracketConfig,
	BaseEntrant,
	BaseMatch,
	BaseRound,
	DeepPartial,
} from "$lib";

const BRACKET_ROOT = Symbol("BRACKET_ROOT");

export function setCtx<
	BracketConfig extends BaseBracketConfig,
	Round extends BaseRound,
	Match extends BaseMatch,
	Entrant extends BaseEntrant,
>(props: CreateBracketProps<BracketConfig>) {
	const bracket = createBracket<BracketConfig, Round, Match, Entrant>(props);

	setContext(BRACKET_ROOT, { ...bracket });

	return {
		...bracket,
	};
}

export function getCtx<
	BracketConfig extends BaseBracketConfig,
	Round extends BaseRound,
	Match extends BaseMatch,
	Entrant extends BaseEntrant,
>() {
	return getContext<
		ReturnType<typeof setCtx<BracketConfig, Round, Match, Entrant>>
	>(BRACKET_ROOT);
}
