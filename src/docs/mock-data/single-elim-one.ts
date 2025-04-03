import type { SingleEliminationProps } from "$lib";

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
				score: 3,
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
			opponent1: {
				id: 7,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 8,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 5,
			roundId: 1,
			opponent1: {
				id: 9,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 10,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 6,
			roundId: 1,
			opponent1: {
				id: 11,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 12,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 7,
			roundId: 2,
			opponent1: {
				id: 2,
				score: 2,
				status: "LOST",
			},
			opponent2: {
				id: 3,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 8,
			roundId: 2,
			opponent1: {
				id: 5,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 12,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 9,
			roundId: 2,
			opponent1: {
				id: 7,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 9,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 10,
			roundId: 2,
			opponent1: {
				id: 13,
				score: 4,
				status: "WON",
			},
			opponent2: {
				id: 14,
				score: 3,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 11,
			roundId: 3,
			opponent1: {
				id: 3,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 5,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 12,
			roundId: 3,
			opponent1: {
				id: 9,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 13,
				score: 0,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 13,
			roundId: 4,
			opponent1: {
				id: 3,
				score: 4,
				status: "WON",
			},
			opponent2: {
				id: 9,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
	],
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
		{
			id: 9,
			name: "Storm Riders",
		},
		{
			id: 10,
			name: "Titan Warriors",
		},
		{
			id: 11,
			name: "Vortex Vipers",
		},
		{
			id: 12,
			name: "Crimson Hawks",
		},
		{
			id: 13,
			name: "Mystic Dragons",
		},
		{
			id: 14,
			name: "Galactic Guardians",
		},
	],
} as SingleEliminationProps;
