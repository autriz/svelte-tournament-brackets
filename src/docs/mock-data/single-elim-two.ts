import type { SingleEliminationProps } from "$lib";

export default {
	rounds: [
		{ roundId: 1, roundName: "Round of 32" },
		{ roundId: 2, roundName: "Round of 16" },
		{ roundId: 3, roundName: "Quarterfinals" },
		{ roundId: 4, roundName: "Semifinals" },
		{ roundId: 5, roundName: "Grand Finals" },
	],
	matches: [
		// Round of 32 (16 matches)
		{
			matchId: 1,
			roundId: 1,
			opponent1: {
				opponentId: 1,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 2,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 2,
			roundId: 1,
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
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 8,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 5,
			roundId: 1,
			opponent1: {
				opponentId: 9,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 10,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 6,
			roundId: 1,
			opponent1: {
				opponentId: 11,
				opponentScore: 1,
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
			roundId: 1,
			opponent1: {
				opponentId: 13,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 14,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 8,
			roundId: 1,
			opponent1: {
				opponentId: 15,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 16,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 9,
			roundId: 1,
			opponent1: {
				opponentId: 17,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 18,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 10,
			roundId: 1,
			opponent1: {
				opponentId: 19,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 20,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 11,
			roundId: 1,
			opponent1: {
				opponentId: 21,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 22,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 12,
			roundId: 1,
			opponent1: {
				opponentId: 23,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 24,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 13,
			roundId: 1,
			opponent1: {
				opponentId: 25,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 26,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 14,
			roundId: 1,
			opponent1: {
				opponentId: 27,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 28,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 15,
			roundId: 1,
			opponent1: {
				opponentId: 29,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 30,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 16,
			roundId: 1,
			opponent1: {
				opponentId: 31,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 32,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},

		// Round of 16 (8 matches)
		{
			matchId: 17,
			roundId: 2,
			opponent1: {
				opponentId: 2,
				opponentScore: 1,
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
			matchId: 18,
			roundId: 2,
			opponent1: {
				opponentId: 5,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 8,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 19,
			roundId: 2,
			opponent1: {
				opponentId: 9,
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
			matchId: 20,
			roundId: 2,
			opponent1: {
				opponentId: 13,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 16,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 21,
			roundId: 2,
			opponent1: {
				opponentId: 17,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 19,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 22,
			roundId: 2,
			opponent1: {
				opponentId: 22,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 24,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 23,
			roundId: 2,
			opponent1: {
				opponentId: 25,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 28,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 24,
			roundId: 2,
			opponent1: {
				opponentId: 29,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 32,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},

		// Quarterfinals (4 matches)
		{
			matchId: 25,
			roundId: 3,
			opponent1: {
				opponentId: 4,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 5,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 26,
			roundId: 3,
			opponent1: {
				opponentId: 9,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 16,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 27,
			roundId: 3,
			opponent1: {
				opponentId: 17,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 24,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 28,
			roundId: 3,
			opponent1: {
				opponentId: 28,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 32,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},

		// Semifinals (2 matches)
		{
			matchId: 29,
			roundId: 4,
			opponent1: {
				opponentId: 5,
				opponentScore: 0,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 9,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 30,
			roundId: 4,
			opponent1: {
				opponentId: 24,
				opponentScore: 1,
				opponentStatus: "LOST",
			},
			opponent2: {
				opponentId: 32,
				opponentScore: 2,
				opponentStatus: "WON",
			},
			status: "DONE",
		},

		// Grand Finals
		{
			matchId: 31,
			roundId: 5,
			opponent1: {
				opponentId: 9,
				opponentScore: 3,
				opponentStatus: "WON",
			},
			opponent2: {
				opponentId: 32,
				opponentScore: 2,
				opponentStatus: "LOST",
			},
			status: "DONE",
		},
	],
	entrants: [
		{ entrantId: 1, entrantName: "Thunder Wolves" },
		{ entrantId: 2, entrantName: "Sky Knights" },
		{ entrantId: 3, entrantName: "Dragon Fury" },
		{ entrantId: 4, entrantName: "Phoenix Blaze" },
		{ entrantId: 5, entrantName: "Ice Giants" },
		{ entrantId: 6, entrantName: "Shadow Hunters" },
		{ entrantId: 7, entrantName: "Solar Flares" },
		{ entrantId: 8, entrantName: "Lunar Eclipse" },
		{ entrantId: 9, entrantName: "Storm Riders" },
		{ entrantId: 10, entrantName: "Titan Warriors" },
		{ entrantId: 11, entrantName: "Vortex Vipers" },
		{ entrantId: 12, entrantName: "Crimson Hawks" },
		{ entrantId: 13, entrantName: "Mystic Dragons" },
		{ entrantId: 14, entrantName: "Galactic Guardians" },
		{ entrantId: 15, entrantName: "Iron Clad" },
		{ entrantId: 16, entrantName: "Night Stalkers" },
		{ entrantId: 17, entrantName: "Blaze Brigade" },
		{ entrantId: 18, entrantName: "Frost Witches" },
		{ entrantId: 19, entrantName: "Sea Serpents" },
		{ entrantId: 20, entrantName: "Desert Nomads" },
		{ entrantId: 21, entrantName: "Thunder Hawks" },
		{ entrantId: 22, entrantName: "Cosmic Crusaders" },
		{ entrantId: 23, entrantName: "Dark Matter" },
		{ entrantId: 24, entrantName: "Light Bringers" },
		{ entrantId: 25, entrantName: "Neon Ninjas" },
		{ entrantId: 26, entrantName: "Cyber Samurai" },
		{ entrantId: 27, entrantName: "Atomic Alloys" },
		{ entrantId: 28, entrantName: "Gravity Giants" },
		{ entrantId: 29, entrantName: "Plasma Phantoms" },
		{ entrantId: 30, entrantName: "Sonic Striders" },
		{ entrantId: 31, entrantName: "Terra Titans" },
		{ entrantId: 32, entrantName: "Celestial Sentinels" },
	],
} as SingleEliminationProps;
