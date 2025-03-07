<script lang="ts">
	import {
		DoubleEliminationBracket,
		SingleEliminationBracket,
	} from "$lib/index.js";
	import { singleElimOne, singleElimThree, singleElimTwo, doubleElimOne } from "../mock-data/index.js";

	let toggled: boolean = true;

	const singleElimMockData = [singleElimOne, singleElimTwo, singleElimThree];
	const doubleElimMockData = [doubleElimOne];

	let height: number;
	let width: number;

	let headerAlign = "center";
	let matchAlign = "center";
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex flex-col">
		<div class="flex flex-row gap-3">
			<label for="header-align">Round header alignment</label>
			<select id="header-align" class="dark:bg-black dark:text-white bg-white text-black" bind:value={headerAlign}>
				<option value="start">Start</option>
				<option value="center">Center</option>
				<option value="end">End</option>
			</select>
		</div>
		<div class="flex flex-row gap-3">
			<label for="match-align">Match alignment</label>
			<select id="match-align" class="dark:bg-black dark:text-white bg-white text-black" bind:value={matchAlign}>
				<option value="start">Start</option>
				<option value="center">Center</option>
				<option value="end">End</option>
			</select>
		</div>
	</div>
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

	<h1 class="text-4xl">Single Elimination Brackets</h1>
	{#each singleElimMockData as data, dataIdx}
		<div class="mb-4">
			<h2 class="text-3xl">{dataIdx + 1}</h2>
			<SingleEliminationBracket
				onMatchClick={console.log}
				class="fill-[#0b0d13]"
				{data}
				bracketConfig={{ matchStyle: { width: 200, height: 64 }, roundHeaderStyle: { height: 48, width: 200 } }}
			/>
		</div>
	{/each}
	<h1 class="text-4xl">Double Elimination Brackets</h1>
	{#each doubleElimMockData as data, dataIdx}
		<div class="mb-4">
			<h2 class="text-3xl">{dataIdx + 1}</h2>
			<DoubleEliminationBracket
				onMatchClick={console.log}
				class="fill-[#0b0d13]"
				{data}
				bracketConfig={{ matchStyle: { width: 200, height: 64 }, roundHeaderStyle: { height: 48, width: 200 }, bracketGap: 100 }}
			/>
		</div>
	{/each}
</div>
