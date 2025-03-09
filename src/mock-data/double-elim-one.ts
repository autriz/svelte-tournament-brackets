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
} as DoubleEliminationProps;
