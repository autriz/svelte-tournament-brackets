<script lang="ts">
	import {
		SingleEliminationBracket,
		type SingleEliminationProps,
	} from "$lib";

	const data: SingleEliminationProps = {
		rounds: [
			{
				id: 1,
				name: "Semifinals",
			},
			{
				id: 2,
				name: "Final",
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
				roundId: 2,
				opponent1: {
					id: 2,
				},
				opponent2: {
					id: 3,
				},
				status: "PENDING",
			},
		],
		entrants: [
			{
				id: 1,
				name: "Mario",
			},
			{
				id: 2,
				name: "Luigi",
			},
			{
				id: 3,
				name: "Zelda",
			},
			{
				id: 4,
				name: "Link",
			},
		],
	};
</script>

<SingleEliminationBracket {data} class="fill-transparent" />
