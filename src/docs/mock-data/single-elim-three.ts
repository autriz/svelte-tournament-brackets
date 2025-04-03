import type { SingleEliminationProps } from "$lib";

export default {
	rounds: [
		{
			id: 1,
			name: "test 1",
		},
		{
			id: 2,
			name: "test 2",
		},
		{
			id: 3,
			name: "test 3",
		},
		{
			id: 4,
			name: "test 4",
		},
	],
	matches: [
		{
			id: 1,
			roundId: 1,
			opponent1: {
				id: 1,
				score: 2,
				status: "LOST",
			},
			opponent2: {
				id: 2,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 2,
			roundId: 1,
			opponent1: {
				id: 3,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 4,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 3,
			roundId: 1,
			opponent1: {
				id: 5,
			},
			opponent2: {
				id: 6,
			},
			status: "PENDING",
		},
		{
			id: 4,
			roundId: 1,
			opponent1: {
				id: 7,
			},
			opponent2: {
				id: 8,
			},
			status: "PENDING",
		},
		{
			id: 5,
			roundId: 1,
			opponent1: {
				id: 9,
			},
			opponent2: {
				id: 10,
			},
			status: "PENDING",
		},
		{
			id: 6,
			roundId: 1,
			opponent1: {
				id: 11,
			},
			opponent2: {
				id: 12,
			},
			status: "PENDING",
		},
		{
			id: 7,
			roundId: 2,
			opponent1: {
				id: 2,
			},
			opponent2: {
				id: 3,
			},
			status: "PENDING",
		},
		{
			id: 8,
			roundId: 2,
			opponent1: {
				id: 5,
			},
			status: "PENDING",
		},
		{
			id: 9,
			roundId: 2,
			status: "PENDING",
		},
		{
			id: 10,
			roundId: 3,
			opponent1: {
				id: 3,
			},
			status: "PENDING",
		},
		{
			id: 11,
			roundId: 3,
			status: "PENDING",
		},
		{
			id: 12,
			roundId: 4,
			status: "PENDING",
		},
	],
	entrants: [
		{
			id: 1,
			name: "1",
		},
		{
			id: 2,
			name: "2",
		},
		{
			id: 3,
			name: "3",
		},
		{
			id: 4,
			name: "4",
		},
		{
			id: 5,
			name: "5",
		},
		{
			id: 6,
			name: "6",
		},
		{
			id: 7,
			name: "7",
		},
		{
			id: 8,
			name: "8",
		},
		{
			id: 9,
			name: "9",
		},
		{
			id: 10,
			name: "10",
		},
		{
			id: 11,
			name: "11",
		},
		{
			id: 12,
			name: "12",
		},
		{
			id: 13,
			name: "13",
		},
		{
			id: 14,
			name: "14",
		},
	],
} as SingleEliminationProps;
