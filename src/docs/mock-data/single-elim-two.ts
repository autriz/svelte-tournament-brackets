import type { SingleEliminationProps } from "$lib";

export default {
	rounds: [
		{ id: 1, name: "Round of 32" },
		{ id: 2, name: "Round of 16" },
		{ id: 3, name: "Quarterfinals" },
		{ id: 4, name: "Semifinals" },
		{ id: 5, name: "Grand Finals" },
	],
	matches: [
		{
			id: 1,
			roundId: 1,
			opponent1: {
				id: 1,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 2,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 2,
			roundId: 1,
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
				status: "LOST",
			},
			opponent2: {
				id: 8,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 5,
			roundId: 1,
			opponent1: {
				id: 9,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 10,
				score: 0,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 6,
			roundId: 1,
			opponent1: {
				id: 11,
				score: 1,
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
			roundId: 1,
			opponent1: {
				id: 13,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 14,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 8,
			roundId: 1,
			opponent1: {
				id: 15,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 16,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 9,
			roundId: 1,
			opponent1: {
				id: 17,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 18,
				score: 0,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 10,
			roundId: 1,
			opponent1: {
				id: 19,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 20,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 11,
			roundId: 1,
			opponent1: {
				id: 21,
				score: 2,
				status: "LOST",
			},
			opponent2: {
				id: 22,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 12,
			roundId: 1,
			opponent1: {
				id: 23,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 24,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 13,
			roundId: 1,
			opponent1: {
				id: 25,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 26,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 14,
			roundId: 1,
			opponent1: {
				id: 27,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 28,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 15,
			roundId: 1,
			opponent1: {
				id: 29,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 30,
				score: 1,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 16,
			roundId: 1,
			opponent1: {
				id: 31,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 32,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},

		// Round of 16 (8 matches)
		{
			id: 17,
			roundId: 2,
			opponent1: {
				id: 2,
				score: 1,
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
			id: 18,
			roundId: 2,
			opponent1: {
				id: 5,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 8,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 19,
			roundId: 2,
			opponent1: {
				id: 9,
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
			id: 20,
			roundId: 2,
			opponent1: {
				id: 13,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 16,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 21,
			roundId: 2,
			opponent1: {
				id: 17,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 19,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 22,
			roundId: 2,
			opponent1: {
				id: 22,
				score: 2,
				status: "LOST",
			},
			opponent2: {
				id: 24,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 23,
			roundId: 2,
			opponent1: {
				id: 25,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 28,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 24,
			roundId: 2,
			opponent1: {
				id: 29,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 32,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},

		// Quarterfinals (4 matches)
		{
			id: 25,
			roundId: 3,
			opponent1: {
				id: 4,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 5,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 26,
			roundId: 3,
			opponent1: {
				id: 9,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 16,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
		{
			id: 27,
			roundId: 3,
			opponent1: {
				id: 17,
				score: 2,
				status: "LOST",
			},
			opponent2: {
				id: 24,
				score: 3,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 28,
			roundId: 3,
			opponent1: {
				id: 28,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 32,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},

		// Semifinals (2 matches)
		{
			id: 29,
			roundId: 4,
			opponent1: {
				id: 5,
				score: 0,
				status: "LOST",
			},
			opponent2: {
				id: 9,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},
		{
			id: 30,
			roundId: 4,
			opponent1: {
				id: 24,
				score: 1,
				status: "LOST",
			},
			opponent2: {
				id: 32,
				score: 2,
				status: "WON",
			},
			status: "DONE",
		},

		// Grand Finals
		{
			id: 31,
			roundId: 5,
			opponent1: {
				id: 9,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 32,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		},
	],
	entrants: [
		{ id: 1, name: "Thunder Wolves" },
		{ id: 2, name: "Sky Knights" },
		{ id: 3, name: "Dragon Fury" },
		{ id: 4, name: "Phoenix Blaze" },
		{ id: 5, name: "Ice Giants" },
		{ id: 6, name: "Shadow Hunters" },
		{ id: 7, name: "Solar Flares" },
		{ id: 8, name: "Lunar Eclipse" },
		{ id: 9, name: "Storm Riders" },
		{ id: 10, name: "Titan Warriors" },
		{ id: 11, name: "Vortex Vipers" },
		{ id: 12, name: "Crimson Hawks" },
		{ id: 13, name: "Mystic Dragons" },
		{ id: 14, name: "Galactic Guardians" },
		{ id: 15, name: "Iron Clad" },
		{ id: 16, name: "Night Stalkers" },
		{ id: 17, name: "Blaze Brigade" },
		{ id: 18, name: "Frost Witches" },
		{ id: 19, name: "Sea Serpents" },
		{ id: 20, name: "Desert Nomads" },
		{ id: 21, name: "Thunder Hawks" },
		{ id: 22, name: "Cosmic Crusaders" },
		{ id: 23, name: "Dark Matter" },
		{ id: 24, name: "Light Bringers" },
		{ id: 25, name: "Neon Ninjas" },
		{ id: 26, name: "Cyber Samurai" },
		{ id: 27, name: "Atomic Alloys" },
		{ id: 28, name: "Gravity Giants" },
		{ id: 29, name: "Plasma Phantoms" },
		{ id: 30, name: "Sonic Striders" },
		{ id: 31, name: "Terra Titans" },
		{ id: 32, name: "Celestial Sentinels" },
	],
} as SingleEliminationProps;
