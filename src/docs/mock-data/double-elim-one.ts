import type { DoubleEliminationProps } from "$lib";

export default {
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
			{
				matchId: 1,
				roundId: 1,
				nextMatchId: 5,
				nextLoserMatchId: 9,
				opponent1: {
					opponentId: 1,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 2,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 2,
				roundId: 1,
				nextMatchId: 5,
				nextLoserMatchId: 9,
				opponent1: {
					opponentId: 3,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				opponent2: {
					opponentId: 4,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				status: "DONE",
			},
			{
				matchId: 3,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				opponent1: {
					opponentId: 5,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 6,
					opponentScore: 1,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 4,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				opponent1: {
					opponentId: 7,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				opponent2: {
					opponentId: 8,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				status: "DONE",
			},
			{
				matchId: 5,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				opponent1: {
					opponentId: 1,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 4,
					opponentScore: 1,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 6,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				opponent1: {
					opponentId: 5,
					opponentScore: 1,
					opponentStatus: "LOST",
				},
				opponent2: {
					opponentId: 8,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				status: "DONE",
			},
			// Финал верхней сетки
			{
				matchId: 7,
				roundId: 3,
				nextMatchId: 13,
				opponent1: {
					opponentId: 1,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 8,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
		],
		lower: [
			{
				matchId: 9,
				roundId: 1,
				nextMatchId: 11,
				opponent1: {
					opponentId: 2,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				opponent2: {
					opponentId: 3,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				status: "DONE",
			},
			{
				matchId: 10,
				roundId: 1,
				nextMatchId: 12,
				opponent1: {
					opponentId: 6,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 7,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 11,
				roundId: 2,
				nextMatchId: 12,
				opponent1: {
					opponentId: 3,
					opponentScore: 2,
					opponentStatus: "WON",
				},
				opponent2: {
					opponentId: 4,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				status: "DONE",
			},
			{
				matchId: 12,
				roundId: 3,
				nextMatchId: 13,
				opponent1: {
					opponentId: 6,
					opponentScore: 0,
					opponentStatus: "LOST",
				},
				opponent2: {
					opponentId: 3,
					opponentScore: 2,
					opponentStatus: "WON",
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
			opponent1: {
				opponentId: 1,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 3,
				opponentScore: 1,
				opponentStatus: "LOST",
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
} as DoubleEliminationProps;
