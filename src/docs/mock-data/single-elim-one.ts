import type { SingleEliminationProps } from "$lib";

export default {
	rounds: [
		{
			roundId: 1,
			roundName: "Opening Round",
		},
		{
			roundId: 2,
			roundName: "Quarterfinals",
		},
		{
			roundId: 3,
			roundName: "Semifinals",
		},
		{
			roundId: 4,
			roundName: "Grand Finals",
		},
	],
	matches: [
		{
			matchId: 1,
			roundId: 1,
			opponent1: {
				opponentId: 1,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 2,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
			opponent1: {
				opponentId: 3,
				opponentScore: 3,
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
			matchId: 3,
			roundId: 1,
			opponent1: {
				opponentId: 5,
				opponentScore: 3,
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
			opponent1: {
				opponentId: 7,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 8,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 5,
			roundId: 1,
			opponent1: {
				opponentId: 9,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 10,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 6,
			roundId: 1,
			opponent1: {
				opponentId: 11,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 12,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 7,
			roundId: 2,
			opponent1: {
				opponentId: 2,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 3,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 8,
			roundId: 2,
			opponent1: {
				opponentId: 5,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 12,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 9,
			roundId: 2,
			opponent1: {
				opponentId: 7,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 9,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 10,
			roundId: 2,
			opponent1: {
				opponentId: 13,
				opponentScore: 4,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 14,
				opponentScore: 3,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 11,
			roundId: 3,
			opponent1: {
				opponentId: 3,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 5,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 12,
			roundId: 3,
			opponent1: {
				opponentId: 9,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 13,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 13,
			roundId: 4,
			opponent1: {
				opponentId: 3,
				opponentScore: 4,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 9,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
	],
	entrants: [
		{
			entrantId: 1,
			entrantName: "Thunder Wolves",
		},
		{
			entrantId: 2,
			entrantName: "Sky Knights",
		},
		{
			entrantId: 3,
			entrantName: "Dragon Fury",
		},
		{
			entrantId: 4,
			entrantName: "Phoenix Blaze",
		},
		{
			entrantId: 5,
			entrantName: "Ice Giants",
		},
		{
			entrantId: 6,
			entrantName: "Shadow Hunters",
		},
		{
			entrantId: 7,
			entrantName: "Solar Flares",
		},
		{
			entrantId: 8,
			entrantName: "Lunar Eclipse",
		},
		{
			entrantId: 9,
			entrantName: "Storm Riders",
		},
		{
			entrantId: 10,
			entrantName: "Titan Warriors",
		},
		{
			entrantId: 11,
			entrantName: "Vortex Vipers",
		},
		{
			entrantId: 12,
			entrantName: "Crimson Hawks",
		},
		{
			entrantId: 13,
			entrantName: "Mystic Dragons",
		},
		{
			entrantId: 14,
			entrantName: "Galactic Guardians",
		},
	],
} as SingleEliminationProps;
