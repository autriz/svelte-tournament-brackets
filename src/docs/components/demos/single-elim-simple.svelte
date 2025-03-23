<script lang="ts">
	import {
		SingleEliminationBracket,
		type SingleEliminationProps,
	} from "$lib";

	const data: SingleEliminationProps = {
		rounds: [
			{
				roundId: 1,
				roundName: "Semifinals",
			},
			{
				roundId: 2,
				roundName: "Final",
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
				roundId: 2,
				entrant1: {
					entrantId: 2,
				},
				entrant2: {
					entrantId: 3,
				},
				status: "PENDING",
			},
		],
		entrants: [
			{
				entrantId: 1,
				entrantName: "Mario",
			},
			{
				entrantId: 2,
				entrantName: "Luigi",
			},
			{
				entrantId: 3,
				entrantName: "Zelda",
			},
			{
				entrantId: 4,
				entrantName: "Link",
			},
		],
	};
</script>

<SingleEliminationBracket {data} />
