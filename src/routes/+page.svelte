<script lang="ts">
	import { SVGViewer } from "svelte-svg-viewer";
	import {
		DoubleEliminationBracket,
		SingleEliminationBracket,
	} from "$lib/index.js";
	import type { PageData } from "./$types.js";

	export let data: PageData;

	let toggled: boolean = true;

	let singleElimData = data.singleElimination;
	let doubleElimData = data.doubleElimination;

	let height: number;
	let width: number;
</script>

<div class="flex h-fit w-screen flex-col bg-black text-white">
	<!-- <BracketViewer bind:data={data}>
        <div slot="round" let:round>{round.roundName}</div>
        <div 
            class="bg-green-800 w-fit h-fit"
            slot="match" 
            let:match
        >
            <div>
                {#if match.opponent1}
                    <p>
                        {data.entrants.find((entrant) => entrant.entrantID === match.opponent1?.opponentID)?.entrantName}
                    </p>
                {/if}
            </div>
            <div>
                {#if match.opponent2}
                    <p>
                        {data.entrants.find((entrant) => entrant.entrantID === match.opponent2?.opponentID)?.entrantName}
                    </p>
                {/if}
            </div>
        </div>
    </BracketViewer> -->
	<!-- <div class="h-full w-full p-4">
		<h1>Single Elimination Bracket in SVGViewer</h1>
		<button
			on:click={() => {
				toggled = !toggled;
			}}>Toggle</button
		>
		{#if toggled}
			<div class="bg-[#0b0d13] p-2">
				<SVGViewer
					height={height > 800 ? 800 : height}
					width={width > 800 ? 800 : width}
					class="m-4"
					defaultLockToBoundaries={true}
					maxScale={5.0}
				>
					<SingleEliminationBracket
						class="fill-[#0b0d13]"
						data={singleElimData}
						bind:height
						bind:width
					/>
				</SVGViewer>
			</div>
		{/if}
	</div> -->
	<div class="p-4">
		<SingleEliminationBracket
			onMatchClick={console.log}
			class="fill-[#0b0d13]"
			data={singleElimData}
		/>
	</div>
	<div class="p-4">
		<DoubleEliminationBracket
			onMatchClick={console.log}
			class="fill-[#0b0d13]"
			data={doubleElimData}
		/>
	</div>
</div>
