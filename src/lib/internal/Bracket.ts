import { createEventDispatcher } from "svelte"
import { overridable } from "./helpers/index.js"
import { writable } from "svelte/store";
import type { DoubleEliminationProps, Match, RoundRobinProps, SingleEliminationProps } from "./types.js";

export type CreateBracketProps = {
    tournamentData: SingleEliminationProps | DoubleEliminationProps | RoundRobinProps;
    onMatchClick: (match: Match) => void;
}

export function createBracket(props: CreateBracketProps) {
    let hoveredMatchId = overridable<number | null>(writable(null));
    let hoveredRoundId = overridable<number | null>(writable(null));
    let hoveredEntrantId = overridable<number | null>(writable(null));

    let tournamentData = null;



    function setHoveredMatch(id: number | null) {
        hoveredMatchId.set(id);
    }

    function setHoveredRound(id: number | null) {
        hoveredRoundId.set(id);
    }

    function setHoveredEntrant(id: number | null) {
        hoveredEntrantId.set(id);
    }

    return {
        hoveredMatchId,
        hoveredRoundId,
        hoveredEntrantId,

        setHoveredMatch,
        setHoveredRound,
        setHoveredEntrant,

        onMatchClick: props.onMatchClick,
    }
}