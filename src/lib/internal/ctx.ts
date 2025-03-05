import { getContext, setContext } from "svelte";
import { createBracket, type CreateBracketProps } from "./Bracket.js";
import type { BaseMatch } from "./types.js";

const BRACKET_ROOT = Symbol("BRACKET_ROOT");

export function setCtx<Match extends BaseMatch = BaseMatch>(
	props: CreateBracketProps<Match>,
) {
	const bracket = createBracket(props);

	setContext(BRACKET_ROOT, { ...bracket });

	return {
		...bracket,
	};
}

export function getCtx() {
	return getContext<ReturnType<typeof setCtx>>(BRACKET_ROOT);
}
