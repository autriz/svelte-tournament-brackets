<script lang="ts">
	import AutumnMatch from "./AutumnMatch.svelte";
	import ChalkboardMatch from "./ChalkboardMatch.svelte";
	import EsportsMatch from "./EsportsMatch.svelte";
	import FantasyMatch from "./FantasyMatch.svelte";
	import GlassmorphismMatch from "./GlassmorphismMatch.svelte";
	import RetroMatch from "./RetroMatch.svelte";

	const designs = [ AutumnMatch, ChalkboardMatch, FantasyMatch, EsportsMatch, RetroMatch, GlassmorphismMatch ];
	const rowCount = designs.length / 3;
	const rows: any[] = [];
	
	for (let i = 0; i < rowCount; i++) {
		rows.push(designs.slice(i * 3, (i + 1) * 3));
	}
</script>

<div class="m-auto mt-[17%] w-fit h-fit flex-col flex gap-3">
	{#each rows as row}
		<div class="flex flex-row gap-3">
			{#each row as design}
				<div class="w-[350px] flex justify-center items-center">
					<svelte:component this={design}></svelte:component>
				</div>
			{/each}
		</div>
	{/each}
</div>