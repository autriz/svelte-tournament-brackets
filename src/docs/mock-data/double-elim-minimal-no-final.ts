import type { DoubleEliminationProps } from "$lib";
export default {
	rounds: [
		{
			id: 1,
			name: "Round 1",
		},
		{
			id: 2,
			name: "Round 2",
		},
	],
	matches: {
		upper: [
			{
				id: 1,
				roundId: 1,
				nextMatchId: 4,
				nextLoserMatchId: 3,
				opponent1: {
					id: 1,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 2,
					score: 0,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 2,
				roundId: 1,
				nextMatchId: 4,
				nextLoserMatchId: 3,
				opponent1: {
					id: 3,
					score: 3,
					status: "WON",
				},
				opponent2: {
					id: 4,
					score: 2,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 4,
				roundId: 2,
				opponent1: {
					id: 1,
					score: 1,
					status: "LOST",
				},
				opponent2: {
					id: 3,
					score: 3,
					status: "WON",
				},
				status: "DONE",
			},
		],
		lower: [
			{
				id: 3,
				roundId: 1,
				nextMatchId: 5,
				opponent1: {
					id: 2,
					score: 0,
					status: "LOST",
				},
				opponent2: {
					id: 4,
					score: 2,
					status: "WON",
				},
				status: "DONE",
			},
			{
				id: 5,
				roundId: 2,
				opponent1: {
					id: 1,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 4,
					score: 0,
					status: "LOST",
				},
				status: "DONE",
			},
		],
	},
	entrants: [
		{
			id: 1,
			name: "Titan Warriors",
		},
		{
			id: 2,
			name: "Vortex Vipers",
		},
		{
			id: 3,
			name: "Sky Knights",
		},
		{
			id: 4,
			name: "Ice Giants",
		},
	],
} as DoubleEliminationProps;
