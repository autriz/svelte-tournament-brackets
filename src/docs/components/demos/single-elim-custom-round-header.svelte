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
				roundId: 2,
				opponent1: {
					opponentId: 2,
				},
				opponent2: {
					opponentId: 3,
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

<SingleEliminationBracket {data}>
    <div slot="header" let:round>{round.roundName}</div>
</SingleEliminationBracket>

<style>
    div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: red;
        border-radius: 8px;
        color: white;
    }
</style>
