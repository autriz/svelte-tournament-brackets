import type { SingleEliminationProps } from "$lib";

export default {
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
} as SingleEliminationProps;
