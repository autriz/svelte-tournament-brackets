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
				entrantScore: 3,
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
			entrant1: {
				entrantId: 7,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 8,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 5,
			roundId: 1,
			entrant1: {
				entrantId: 9,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 10,
				entrantScore: 2,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 6,
			roundId: 1,
			entrant1: {
				entrantId: 11,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 12,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 7,
			roundId: 2,
			entrant1: {
				entrantId: 2,
				entrantScore: 2,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 3,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 8,
			roundId: 2,
			entrant1: {
				entrantId: 5,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 12,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 9,
			roundId: 2,
			entrant1: {
				entrantId: 7,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			entrant2: {
				entrantId: 9,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			status: "DONE",
		},
		{
			matchId: 10,
			roundId: 2,
			entrant1: {
				entrantId: 13,
				entrantScore: 4,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 14,
				entrantScore: 3,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 11,
			roundId: 3,
			entrant1: {
				entrantId: 3,
				entrantScore: 3,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 5,
				entrantScore: 1,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 12,
			roundId: 3,
			entrant1: {
				entrantId: 9,
				entrantScore: 2,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 13,
				entrantScore: 0,
				entrantStatus: "LOST",
			},
			status: "DONE",
		},
		{
			matchId: 13,
			roundId: 4,
			entrant1: {
				entrantId: 3,
				entrantScore: 4,
				entrantStatus: "WON",
			},
			entrant2: {
				entrantId: 9,
				entrantScore: 2,
				entrantStatus: "LOST",
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
