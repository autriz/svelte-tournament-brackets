import type { SingleEliminationProps } from "$lib";

export default {
	rounds: [
		{
			id: 1,
			name: "Quarterfinals",
		},
		{
			id: 2,
			name: "Semifinals",
		},
		{
			id: 3,
			name: "Final",
		},
	],
	matches: [
		// Quarterfinals (Round 1)
		{
			id: 1,
			roundId: 1,
			opponent1: { id: 1, score: 2, status: "LOST" }, // Mario
			opponent2: { id: 2, score: 3, status: "WON" }, // Luigi
			status: "DONE",
		},
		{
			id: 2,
			roundId: 1,
			opponent1: { id: 3, score: 3, status: "WON" }, // Zelda
			opponent2: { id: 4, score: 1, status: "LOST" }, // Link
			status: "DONE",
		},
		{
			id: 3,
			roundId: 1,
			opponent1: { id: 5, score: 3, status: "WON" }, // Peach
			opponent2: { id: 6, score: 0, status: "LOST" }, // Wario
			status: "DONE",
		},
		{
			id: 4,
			roundId: 1,
			opponent1: { id: 7, score: 1, status: "LOST" }, // Bowser
			opponent2: { id: 8, score: 3, status: "WON" }, // Daisy
			status: "DONE",
		},

		// Semifinals (Round 2)
		{
			id: 5,
			roundId: 2,
			opponent1: { id: 2, score: 1, status: "LOST" }, // Luigi
			opponent2: { id: 3, score: 3, status: "WON" }, // Zelda
			status: "DONE",
		},
		{
			id: 6,
			roundId: 2,
			opponent1: { id: 5, score: 3, status: "WON" }, // Peach
			opponent2: { id: 8, score: 2, status: "LOST" }, // Daisy
			status: "DONE",
		},

		// Final (Round 3)
		{
			id: 7,
			roundId: 3,
			opponent1: { id: 3, score: 3, status: "WON" }, // Zelda
			opponent2: { id: 5, score: 1, status: "LOST" }, // Peach
			status: "DONE",
		},
	],
	entrants: [
		{ id: 1, name: "Mario" },
		{ id: 2, name: "Luigi" },
		{ id: 3, name: "Zelda" },
		{ id: 4, name: "Link" },
		{ id: 5, name: "Peach" },
		{ id: 6, name: "Wario" },
		{ id: 7, name: "Bowser" },
		{ id: 8, name: "Daisy" },
	],
} as SingleEliminationProps;
