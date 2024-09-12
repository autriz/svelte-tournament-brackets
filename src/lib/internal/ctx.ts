// import { Viewer, Viewer_old } from "$lib/internal/index.js";
import { getContext, setContext } from "svelte";
import { createBracket, type CreateBracketProps } from "./Bracket.js";

const BRACKET_ROOT = Symbol("BRACKET_ROOT");

export function setCtx(props: CreateBracketProps) {
	const bracket = createBracket(props);
	// const viewer = Viewer_old.createViewer(props || {});

	setContext(BRACKET_ROOT, { ...bracket });

	return {
		...bracket
	};
}

export function getCtx() {
	return getContext<ReturnType<typeof setCtx>>(BRACKET_ROOT);
}