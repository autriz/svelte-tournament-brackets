<script lang="ts">
	import type { BaseMatch } from "$lib";
	import AutumnMatch from "./AutumnMatch.svelte";
	import ChalkboardMatch from "./ChalkboardMatch.svelte";
	import EsportsMatch from "./EsportsMatch.svelte";
	import FantasyMatch from "./FantasyMatch.svelte";
	import GlassmorphismMatch from "./GlassmorphismMatch.svelte";
	import RetroMatch from "./RetroMatch.svelte";

	const designs = [
		AutumnMatch,
		ChalkboardMatch,
		FantasyMatch,
		EsportsMatch,
		RetroMatch,
		GlassmorphismMatch,
	];
	const rowCount = designs.length / 3;
	const rows: any[] = [];

	for (let i = 0; i < rowCount; i++) {
		rows.push(designs.slice(i * 3, (i + 1) * 3));
	}

	const data: BaseMatch = {
		roundId: 1,
		matchId: 1,
		entrant1: {
			entrantId: 1,
			entrantScore: 3,
			entrantStatus: "WON"
		},
		entrant2: {
			entrantId: 2,
			entrantScore: 0,
			entrantStatus: "LOST"
		},
		status: "FINISHED"
	};
</script>

<div
	class="m-auto mt-[17%] grid h-fit w-fit grid-cols-1 gap-6 min-[720px]:grid-cols-2 lg:grid-cols-3"
>
	{#each rows as row}
		{#each row as design}
			<div class="flex w-[350px] items-center justify-center">
				<svelte:component this={design}></svelte:component>
			</div>
		{/each}
	{/each}
</div>
