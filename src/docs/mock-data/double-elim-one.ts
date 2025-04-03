import type { DoubleEliminationProps } from "$lib";

export default {
	rounds: [
		{
			id: 1,
			name: "Opening Round",
		},
		{
			id: 2,
			name: "Quarterfinals",
		},
		{
			id: 3,
			name: "Semifinals",
		},
		{
			id: 4,
			name: "Grand Finals",
		},
	],
	matches: {
		upper: [
			{
				id: 1,
				roundId: 1,
				nextMatchId: 5,
				nextLoserMatchId: 9,
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
				nextMatchId: 5,
				nextLoserMatchId: 9,
				opponent1: {
					id: 3,
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
				id: 3,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				opponent1: {
					id: 5,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 6,
					score: 1,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 4,
				roundId: 1,
				nextMatchId: 6,
				nextLoserMatchId: 10,
				opponent1: {
					id: 7,
					score: 0,
					status: "LOST",
				},
				opponent2: {
					id: 8,
					score: 2,
					status: "WON",
				},
				status: "DONE",
			},
			{
				id: 5,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				opponent1: {
					id: 1,
					score: 2,
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
				id: 6,
				roundId: 2,
				nextMatchId: 7,
				nextLoserMatchId: 11,
				opponent1: {
					id: 5,
					score: 1,
					status: "LOST",
				},
				opponent2: {
					id: 8,
					score: 2,
					status: "WON",
				},
				status: "DONE",
			},
			{
				id: 7,
				roundId: 3,
				nextMatchId: 13,
				opponent1: {
					id: 1,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 8,
					score: 0,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 13,
				roundId: 4,
				opponent1: {
					id: 1,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 3,
					score: 1,
					status: "LOST",
				},
				status: "DONE",
			},
		],
		lower: [
			{
				id: 9,
				roundId: 1,
				nextMatchId: 11,
				opponent1: {
					id: 2,
					score: 0,
					status: "LOST",
				},
				opponent2: {
					id: 3,
					score: 2,
					status: "WON",
				},
				status: "DONE",
			},
			{
				id: 10,
				roundId: 1,
				nextMatchId: 12,
				opponent1: {
					id: 6,
					score: 2,
					status: "WON",
				},
				opponent2: {
					id: 7,
					score: 0,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 11,
				roundId: 2,
				nextMatchId: 12,
				opponent1: {
					id: 3,
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
			{
				id: 12,
				roundId: 3,
				nextMatchId: 13,
				opponent1: {
					id: 6,
					score: 0,
					status: "LOST",
				},
				opponent2: {
					id: 3,
					score: 2,
					status: "WON",
				},
				status: "DONE",
			},
		],
	},
	entrants: [
		{
			id: 1,
			name: "Thunder Wolves",
		},
		{
			id: 2,
			name: "Sky Knights",
		},
		{
			id: 3,
			name: "Dragon Fury",
		},
		{
			id: 4,
			name: "Phoenix Blaze",
		},
		{
			id: 5,
			name: "Ice Giants",
		},
		{
			id: 6,
			name: "Shadow Hunters",
		},
		{
			id: 7,
			name: "Solar Flares",
		},
		{
			id: 8,
			name: "Lunar Eclipse",
		},
	],
} as DoubleEliminationProps;
