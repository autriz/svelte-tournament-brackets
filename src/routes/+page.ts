import type {
	SingleEliminationProps,
	DoubleEliminationProps,
} from "$lib/index.js";
import type { PageLoad } from "./$types.js";

const one: SingleEliminationProps = {
	rounds: [
		{
			roundId: 1,
			roundName: "test 1",
		},
		{
			roundId: 2,
			roundName: "test 2",
		},
		{
			roundId: 3,
			roundName: "test 3",
		},
		{
			roundId: 4,
			roundName: "test 4",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 2,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			entrant1: {
				entrantId: 3,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 4,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 3,
			roundId: 1,
			entrant1: {
				entrantId: 5,
			},
			entrant2: {
				entrantId: 6,
			},
			status: "PENDING",
		},
		{
			matchId: 4,
			roundId: 1,
			entrant1: {
				entrantId: 7,
			},
			entrant2: {
				entrantId: 8,
			},
			status: "PENDING",
		},
		{
			matchId: 5,
			roundId: 1,
			entrant1: {
				entrantId: 9,
			},
			entrant2: {
				entrantId: 10,
			},
			status: "PENDING",
		},
		{
			matchId: 6,
			roundId: 1,
			entrant1: {
				entrantId: 11,
			},
			entrant2: {
				entrantId: 12,
			},
			status: "PENDING",
		},
		{
			matchId: 7,
			roundId: 2,
			entrant1: {
				entrantId: 2,
			},
			entrant2: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 8,
			roundId: 2,
			entrant1: {
				entrantId: 5,
			},
			status: "PENDING",
		},
		{
			matchId: 9,
			roundId: 2,
			status: "PENDING",
		},
		{
			matchId: 10,
			roundId: 2,
			entrant1: {
				entrantId: 13,
			},
			entrant2: {
				entrantId: 14,
			},
			status: "PENDING",
		},
		{
			matchId: 11,
			roundId: 3,
			entrant1: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 12,
			roundId: 3,
			status: "PENDING",
		},
		{
			matchId: 13,
			roundId: 4,
			status: "PENDING",
		},
	],
	entrants: [
		{
			entrantId: 1,
			entrantName: "1",
		},
		{
			entrantId: 2,
			entrantName: "2",
		},
		{
			entrantId: 3,
			entrantName: "3",
		},
		{
			entrantId: 4,
			entrantName: "4",
		},
		{
			entrantId: 5,
			entrantName: "5",
		},
		{
			entrantId: 6,
			entrantName: "6",
		},
		{
			entrantId: 7,
			entrantName: "7",
		},
		{
			entrantId: 8,
			entrantName: "8",
		},
		{
			entrantId: 9,
			entrantName: "9",
		},
		{
			entrantId: 10,
			entrantName: "10",
		},
		{
			entrantId: 11,
			entrantName: "11",
		},
		{
			entrantId: 12,
			entrantName: "12",
		},
		{
			entrantId: 13,
			entrantName: "13",
		},
		{
			entrantId: 14,
			entrantName: "14",
		},
	],
};

const two: SingleEliminationProps = {
	rounds: [
		{
			roundId: 1,
			roundName: "test 1",
		},
		{
			roundId: 2,
			roundName: "test 2",
		},
		{
			roundId: 3,
			roundName: "test 3",
		},
		{
			roundId: 4,
			roundName: "test 4",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 2,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			entrant1: {
				entrantId: 3,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 4,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 3,
			roundId: 1,
			entrant1: {
				entrantId: 5,
			},
			entrant2: {
				entrantId: 6,
			},
			status: "PENDING",
		},
		{
			matchId: 4,
			roundId: 1,
			entrant1: {
				entrantId: 7,
			},
			entrant2: {
				entrantId: 8,
			},
			status: "PENDING",
		},
		{
			matchId: 5,
			roundId: 1,
			entrant1: {
				entrantId: 9,
			},
			entrant2: {
				entrantId: 10,
			},
			status: "PENDING",
		},
		{
			matchId: 6,
			roundId: 1,
			entrant1: {
				entrantId: 11,
			},
			entrant2: {
				entrantId: 12,
			},
			status: "PENDING",
		},
		{
			matchId: 7,
			roundId: 1,
			entrant1: {
				entrantId: 13,
			},
			entrant2: {
				entrantId: 14,
			},
			status: "PENDING",
		},
		{
			matchId: 8,
			roundId: 1,
			entrant1: {
				entrantId: 15,
			},
			entrant2: {
				entrantId: 16,
			},
			status: "PENDING",
		},
		{
			matchId: 9,
			roundId: 2,
			entrant1: {
				entrantId: 2,
			},
			entrant2: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 10,
			roundId: 2,
			entrant1: {
				entrantId: 5,
			},
			status: "PENDING",
		},
		{
			matchId: 11,
			roundId: 2,
			status: "PENDING",
		},
		{
			matchId: 12,
			roundId: 2,
			status: "PENDING",
		},
		{
			matchId: 13,
			roundId: 3,
			entrant1: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 14,
			roundId: 3,
			status: "PENDING",
		},
		{
			matchId: 15,
			roundId: 4,
			status: "PENDING",
		},
	],
	entrants: [
		{
			entrantId: 1,
			entrantName: "1",
		},
		{
			entrantId: 2,
			entrantName: "2",
		},
		{
			entrantId: 3,
			entrantName: "3",
		},
		{
			entrantId: 4,
			entrantName: "4",
		},
		{
			entrantId: 5,
			entrantName: "5",
		},
		{
			entrantId: 6,
			entrantName: "6",
		},
		{
			entrantId: 7,
			entrantName: "7",
		},
		{
			entrantId: 8,
			entrantName: "8",
		},
		{
			entrantId: 9,
			entrantName: "9",
		},
		{
			entrantId: 10,
			entrantName: "10",
		},
		{
			entrantId: 11,
			entrantName: "11",
		},
		{
			entrantId: 12,
			entrantName: "12",
		},
		{
			entrantId: 13,
			entrantName: "13",
		},
		{
			entrantId: 14,
			entrantName: "14",
		},
		{
			entrantId: 15,
			entrantName: "15",
		},
		{
			entrantId: 16,
			entrantName: "16",
		},
	],
};

const three: SingleEliminationProps = {
	rounds: [
		{
			roundId: 1,
			roundName: "test 1",
		},
		{
			roundId: 2,
			roundName: "test 2",
		},
		{
			roundId: 3,
			roundName: "test 3",
		},
		{
			roundId: 4,
			roundName: "test 4",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 2,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			entrant1: {
				entrantId: 3,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 4,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 3,
			roundId: 1,
			entrant1: {
				entrantId: 5,
			},
			entrant2: {
				entrantId: 6,
			},
			status: "PENDING",
		},
		{
			matchId: 4,
			roundId: 1,
			entrant1: {
				entrantId: 7,
			},
			entrant2: {
				entrantId: 8,
			},
			status: "PENDING",
		},
		{
			matchId: 5,
			roundId: 1,
			entrant1: {
				entrantId: 9,
			},
			entrant2: {
				entrantId: 10,
			},
			status: "PENDING",
		},
		{
			matchId: 6,
			roundId: 1,
			entrant1: {
				entrantId: 11,
			},
			entrant2: {
				entrantId: 12,
			},
			status: "PENDING",
		},
		{
			matchId: 7,
			roundId: 1,
			entrant1: {
				entrantId: 13,
			},
			entrant2: {
				entrantId: 14,
			},
			status: "PENDING",
		},
		{
			matchId: 9,
			roundId: 2,
			entrant1: {
				entrantId: 2,
			},
			entrant2: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 10,
			roundId: 2,
			entrant1: {
				entrantId: 5,
			},
			status: "PENDING",
		},
		{
			matchId: 11,
			roundId: 2,
			status: "PENDING",
		},
		{
			matchId: 13,
			roundId: 3,
			entrant1: {
				entrantId: 3,
			},
			status: "PENDING",
		},
		{
			matchId: 14,
			roundId: 3,
			status: "PENDING",
		},
		{
			matchId: 15,
			roundId: 4,
			status: "PENDING",
		},
	],
	entrants: [
		{
			entrantId: 1,
			entrantName: "1",
		},
		{
			entrantId: 2,
			entrantName: "2",
		},
		{
			entrantId: 3,
			entrantName: "3",
		},
		{
			entrantId: 4,
			entrantName: "4",
		},
		{
			entrantId: 5,
			entrantName: "5",
		},
		{
			entrantId: 6,
			entrantName: "6",
		},
		{
			entrantId: 7,
			entrantName: "7",
		},
		{
			entrantId: 8,
			entrantName: "8",
		},
		{
			entrantId: 9,
			entrantName: "9",
		},
		{
			entrantId: 10,
			entrantName: "10",
		},
		{
			entrantId: 11,
			entrantName: "11",
		},
		{
			entrantId: 12,
			entrantName: "12",
		},
		{
			entrantId: 13,
			entrantName: "13",
		},
		{
			entrantId: 14,
			entrantName: "14",
		},
	],
};

const four: SingleEliminationProps = {
	entrants: [
		{
			entrantId: 1,
			entrantName: "1",
		},
		{
			entrantId: 2,
			entrantName: "2",
		},
		{
			entrantId: 3,
			entrantName: "3",
		},
		{
			entrantId: 4,
			entrantName: "4",
		},
		{
			entrantId: 5,
			entrantName: "5",
		},
		{
			entrantId: 6,
			entrantName: "6",
		},
		{
			entrantId: 7,
			entrantName: "7",
		},
		{
			entrantId: 8,
			entrantName: "8",
		},
		{
			entrantId: 9,
			entrantName: "9",
		},
	],
	rounds: [
		{
			roundId: 1,
			roundName: "Round 1",
		},
		{
			roundId: 2,
			roundName: "Round 2",
		},
		{
			roundId: 3,
			roundName: "Round 3",
		},
		{
			roundId: 4,
			roundName: "Round 4",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			nextMatchId: 5,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 2,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			nextMatchId: 5,
			entrant1: {
				entrantId: 3,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 4,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 3,
			roundId: 1,
			nextMatchId: 6,
			entrant1: {
				entrantId: 5,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 6,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 4,
			roundId: 1,
			nextMatchId: 6,
			entrant1: {
				entrantId: 7,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 5,
			roundId: 2,
			nextMatchId: 7,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 3,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 6,
			roundId: 2,
			nextMatchId: 7,
			entrant1: {
				entrantId: 5,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 7,
			roundId: 4,
			entrant1: {
				entrantId: 1,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
	],
};

const five: SingleEliminationProps = {
	entrants: [
		{
			entrantId: 1,
			entrantName: "1",
		},
		{
			entrantId: 2,
			entrantName: "2",
		},
		{
			entrantId: 3,
			entrantName: "3",
		},
		{
			entrantId: 4,
			entrantName: "4",
		},
		{
			entrantId: 5,
			entrantName: "5",
		},
		{
			entrantId: 6,
			entrantName: "6",
		},
		{
			entrantId: 7,
			entrantName: "7",
		},
		{
			entrantId: 8,
			entrantName: "8",
		},
		{
			entrantId: 9,
			entrantName: "9",
		},
	],
	rounds: [
		{
			roundId: 1,
			roundName: "Round 1",
		},
		{
			roundId: 2,
			roundName: "Round 2",
		},
		{
			roundId: 3,
			roundName: "Round 3",
		},
		{
			roundId: 4,
			roundName: "Round 4",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			nextMatchId: 5,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 2,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			nextMatchId: 5,
			entrant1: {
				entrantId: 3,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 4,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 3,
			roundId: 1,
			nextMatchId: 6,
			entrant1: {
				entrantId: 5,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 6,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 4,
			roundId: 1,
			nextMatchId: 6,
			entrant1: {
				entrantId: 7,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 5,
			roundId: 2,
			nextMatchId: 7,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 3,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 6,
			roundId: 2,
			nextMatchId: 7,
			entrant1: {
				entrantId: 5,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 7,
			roundId: 4,
			entrant1: {
				entrantId: 1,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
	],
};

// Mock-данные для двойной турнирной сетки
const doubleElimination: DoubleEliminationProps = {
	rounds: [
		{
			roundId: 1,
			roundName: "Раунд 1",
		},
		{
			roundId: 2,
			roundName: "Раунд 2",
		},
		{
			roundId: 3,
			roundName: "Раунд 3",
		},
	],
	matches: {
		upper: [
			// Верхняя сетка (победители)
			{
				matchId: 1,
				roundId: 1,
				nextMatchId: 5,
				nextLoserMatchId: 9,
				entrant1: {
					entrantId: 1,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 2,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 2,
				roundId: 1,
				nextMatchId: 5,
				nextLoserMatchId: 9,
				entrant1: {
					entrantId: 3,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				entrant2: {
					entrantId: 4,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				status: "DONE",
			},
			{
				matchId: 3,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				entrant1: {
					entrantId: 5,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 6,
					entrantScore: 1,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 4,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				entrant1: {
					entrantId: 7,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				entrant2: {
					entrantId: 8,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				status: "DONE",
			},
			// Полуфиналы верхней сетки
			{
				matchId: 5,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				entrant1: {
					entrantId: 1,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 4,
					entrantScore: 1,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 6,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				entrant1: {
					entrantId: 5,
					entrantScore: 1,
					entrantStatus: "LOST",
				},
				entrant2: {
					entrantId: 8,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				status: "DONE",
			},
			// Финал верхней сетки
			{
				matchId: 7,
				roundId: 3,
				nextMatchId: 13,
				entrant1: {
					entrantId: 1,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 8,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
		],
		lower: [
			// Первый раунд нижней сетки (проигравшие)
			{
				matchId: 9,
				roundId: 1,
				nextMatchId: 11,
				entrant1: {
					entrantId: 2,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				entrant2: {
					entrantId: 3,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				status: "DONE",
			},
			{
				matchId: 10,
				roundId: 1,
				nextMatchId: 12,
				entrant1: {
					entrantId: 6,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 7,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
			// Второй раунд нижней сетки
			{
				matchId: 11,
				roundId: 2,
				nextMatchId: 12,
				entrant1: {
					entrantId: 3,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				entrant2: {
					entrantId: 4,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 12,
				roundId: 3,
				nextMatchId: 13,
				entrant1: {
					entrantId: 6,
					entrantScore: 0,
					entrantStatus: "LOST",
				},
				entrant2: {
					entrantId: 3,
					entrantScore: 2,
					entrantStatus: "WON",
				},
				status: "DONE",
			},
		],
	},
	finalRounds: [
		{
			roundId: 4,
			roundName: "Гранд-финал",
		},
	],
	finalMatches: [
		{
			matchId: 13,
			roundId: 4,
			entrant1: {
				entrantId: 1,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 3,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
	],
	entrants: [
		{
			entrantId: 1,
			entrantName: "Игрок 1",
		},
		{
			entrantId: 2,
			entrantName: "Игрок 2",
		},
		{
			entrantId: 3,
			entrantName: "Игрок 3",
		},
		{
			entrantId: 4,
			entrantName: "Игрок 4",
		},
		{
			entrantId: 5,
			entrantName: "Игрок 5",
		},
		{
			entrantId: 6,
			entrantName: "Игрок 6",
		},
		{
			entrantId: 7,
			entrantName: "Игрок 7",
		},
		{
			entrantId: 8,
			entrantName: "Игрок 8",
		},
	],
};

export const load: PageLoad = (data) => {
	return {
		singleElimination: one,
		doubleElimination: doubleElimination,
	};
};
