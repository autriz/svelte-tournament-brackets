import type { SingleEliminationProps } from "$lib/index.js";
import type { PageLoad } from "./$types.js";

const one: SingleEliminationProps = {
    rounds: [
        {
            roundId: 1,
            roundName: "test 1"
        },
        {
            roundId: 2,
            roundName: "test 2"
        },
        {
            roundId: 3,
            roundName: "test 3"
        },
        {
            roundId: 4,
            roundName: "test 4"
        }
    ],
    matches: [
        {
            matchId: 1,
            roundId: 1,
            opponent1: {
                opponentId: 1,
                opponentScore: 2,
                opponentStatus: "LOST"
            },
            opponent2: {
                opponentId: 2,
                opponentScore: 3,
                opponentStatus: "WON"
            },
            status: "DONE"
        },
        {
            matchId: 2,
            roundId: 1,
            opponent1: {
                opponentId: 3,
                opponentScore: 3,
                opponentStatus: "WON"
            },
            opponent2: {
                opponentId: 4,
                opponentScore: 1,
                opponentStatus: "LOST"
            },
            status: "DONE"
        },
        {
            matchId: 3,
            roundId: 1,
            opponent1: {
                opponentId: 5
            },
            opponent2: {
                opponentId: 6
            },
            status: "PENDING"
        },
        {
            matchId: 4,
            roundId: 1,
            opponent1: {
                opponentId: 7
            },
            opponent2: {
                opponentId: 8
            },
            status: "PENDING"
        },
        {
            matchId: 5,
            roundId: 1,
            opponent1: {
                opponentId: 9
            },
            opponent2: {
                opponentId: 10
            },
            status: "PENDING"
        },
        {
            matchId: 6,
            roundId: 1,
            opponent1: {
                opponentId: 11
            },
            opponent2: {
                opponentId: 12
            },
            status: "PENDING"
        },
        {
            matchId: 7,
            roundId: 2,
            opponent1: {
                opponentId: 2
            },
            opponent2: {
                opponentId: 3
            },
            status: "PENDING"
        },
        {
            matchId: 8,
            roundId: 2,
            opponent1: {
                opponentId: 5
            },
            status: "PENDING"
        },
        {
            matchId: 9,
            roundId: 2,
            status: "PENDING"
        },
        {
            matchId: 10,
            roundId: 2,
            opponent1: {
                opponentId: 13,
            },
            opponent2: {
                opponentId: 14,
            },
            status: "PENDING"
        },
        {
            matchId: 11,
            roundId: 3,
            opponent1: {
                opponentId: 3
            },
            status: "PENDING"
        },
        {
            matchId: 12,
            roundId: 3,
            status: "PENDING"
        },
        {
            matchId: 13,
            roundId: 4,
            status: "PENDING"
        },
    ],
    entrants: [
        {
            entrantId: 1,
            entrantName: "1",
        },
        {
            entrantId: 2,
            entrantName: "2"
        },
        {
            entrantId: 3,
            entrantName: "3",
        },
        {
            entrantId: 4,
            entrantName: "4"
        },
        {
            entrantId: 5,
            entrantName: "5",
        },
        {
            entrantId: 6,
            entrantName: "6"
        },
        {
            entrantId: 7,
            entrantName: "7",
        },
        {
            entrantId: 8,
            entrantName: "8"
        },
        {
            entrantId: 9,
            entrantName: "9"
        },
        {
            entrantId: 10,
            entrantName: "10"
        },
        {
            entrantId: 11,
            entrantName: "11"
        },
        {
            entrantId: 12,
            entrantName: "12"
        },
        {
            entrantId: 13,
            entrantName: "13"
        },
        {
            entrantId: 14,
            entrantName: "14"
        },
    ]
};

const two: SingleEliminationProps = {
    rounds: [
        {
            roundId: 1,
            roundName: "test 1"
        },
        {
            roundId: 2,
            roundName: "test 2"
        },
        {
            roundId: 3,
            roundName: "test 3"
        },
        {
            roundId: 4,
            roundName: "test 4"
        }
    ],
    matches: [
        {
            matchId: 1,
            roundId: 1,
            opponent1: {
                opponentId: 1,
                opponentScore: 2,
                opponentStatus: "LOST"
            },
            opponent2: {
                opponentId: 2,
                opponentScore: 3,
                opponentStatus: "WON"
            },
            status: "DONE"
        },
        {
            matchId: 2,
            roundId: 1,
            opponent1: {
                opponentId: 3,
                opponentScore: 3,
                opponentStatus: "WON"
            },
            opponent2: {
                opponentId: 4,
                opponentScore: 1,
                opponentStatus: "LOST"
            },
            status: "DONE"
        },
        {
            matchId: 3,
            roundId: 1,
            opponent1: {
                opponentId: 5
            },
            opponent2: {
                opponentId: 6
            },
            status: "PENDING"
        },
        {
            matchId: 4,
            roundId: 1,
            opponent1: {
                opponentId: 7
            },
            opponent2: {
                opponentId: 8
            },
            status: "PENDING"
        },
        {
            matchId: 5,
            roundId: 1,
            opponent1: {
                opponentId: 9
            },
            opponent2: {
                opponentId: 10
            },
            status: "PENDING"
        },
        {
            matchId: 6,
            roundId: 1,
            opponent1: {
                opponentId: 11
            },
            opponent2: {
                opponentId: 12
            },
            status: "PENDING"
        },
        {
            matchId: 7,
            roundId: 1,
            opponent1: {
                opponentId: 13
            },
            opponent2: {
                opponentId: 14
            },
            status: "PENDING"
        },
        {
            matchId: 8,
            roundId: 1,
            opponent1: {
                opponentId: 15
            },
            opponent2: {
                opponentId: 16
            },
            status: "PENDING"
        },
        {
            matchId: 9,
            roundId: 2,
            opponent1: {
                opponentId: 2
            },
            opponent2: {
                opponentId: 3
            },
            status: "PENDING"
        },
        {
            matchId: 10,
            roundId: 2,
            opponent1: {
                opponentId: 5
            },
            status: "PENDING"
        },
        {
            matchId: 11,
            roundId: 2,
            status: "PENDING"
        },
        {
            matchId: 12,
            roundId: 2,
            status: "PENDING"
        },
        {
            matchId: 13,
            roundId: 3,
            opponent1: {
                opponentId: 3
            },
            status: "PENDING"
        },
        {
            matchId: 14,
            roundId: 3,
            status: "PENDING"
        },
        {
            matchId: 15,
            roundId: 4,
            status: "PENDING"
        },
    ],
    entrants: [
        {
            entrantId: 1,
            entrantName: "1",
        },
        {
            entrantId: 2,
            entrantName: "2"
        },
        {
            entrantId: 3,
            entrantName: "3",
        },
        {
            entrantId: 4,
            entrantName: "4"
        },
        {
            entrantId: 5,
            entrantName: "5",
        },
        {
            entrantId: 6,
            entrantName: "6"
        },
        {
            entrantId: 7,
            entrantName: "7",
        },
        {
            entrantId: 8,
            entrantName: "8"
        },
        {
            entrantId: 9,
            entrantName: "9"
        },
        {
            entrantId: 10,
            entrantName: "10"
        },
        {
            entrantId: 11,
            entrantName: "11"
        },
        {
            entrantId: 12,
            entrantName: "12"
        },
        {
            entrantId: 13,
            entrantName: "13"
        },
        {
            entrantId: 14,
            entrantName: "14"
        },
        {
            entrantId: 15,
            entrantName: "15"
        },
        {
            entrantId: 16,
            entrantName: "16"
        },
    ]
};

export const load: PageLoad = (data) => {
    return {
        tournament: two
    }
}