<script lang="ts">
	import {
		DoubleEliminationBracket,
		type DoubleEliminationProps,
	} from "$lib";

	let data: DoubleEliminationProps = {
		rounds: [
			{
				roundId: 1,
				roundName: "Round 1",
			},
			{
				roundId: 2,
				roundName: "Round 2",
			},
		],
		matches: {
			upper: [
				{
					matchId: 1,
					roundId: 1,
					nextMatchId: 4,
					nextLoserMatchId: 3,
					opponent1: {
						opponentId: 1,
						opponentScore: 2,
						opponentStatus: "WON",
					},
					opponent2: {
						opponentId: 2,
						opponentScore: 0,
						opponentStatus: "LOST",
					},
					status: "DONE",
				},
				{
					matchId: 2,
					roundId: 1,
					nextMatchId: 4,
					nextLoserMatchId: 3,
					opponent1: {
						opponentId: 3,
						opponentScore: 3,
						opponentStatus: "WON",
					},
					opponent2: {
						opponentId: 4,
						opponentScore: 2,
						opponentStatus: "LOST",
					},
					status: "DONE",
				},
				{
					matchId: 4,
					roundId: 2,
					opponent1: {
						opponentId: 1,
						opponentScore: 1,
						opponentStatus: "LOST",
					},
					opponent2: {
						opponentId: 3,
						opponentScore: 3,
						opponentStatus: "WON",
					},
					status: "DONE",
				},
			],
			lower: [
				{
					matchId: 3,
					roundId: 1,
					nextMatchId: 5,
					opponent1: {
						opponentId: 2,
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
					matchId: 5,
					roundId: 2,
					opponent1: {
						opponentId: 1,
						opponentScore: 2,
						opponentStatus: "WON",
					},
					opponent2: {
						opponentId: 4,
						opponentScore: 0,
						opponentStatus: "LOST",
					},
					status: "DONE",
				},
			],
		},
		entrants: [
			{
				entrantId: 1,
				entrantName: "Titan Warriors",
			},
			{
				entrantId: 2,
				entrantName: "Vortex Vipers",
			},
			{
				entrantId: 3,
				entrantName: "Sky Knights",
			},
			{
				entrantId: 4,
				entrantName: "Ice Giants",
			},
		],
	};
</script>

<DoubleEliminationBracket {data} />
