<script lang="ts">
	import CopyButton from "$components/CopyButton.svelte";
	import {
		DoubleEliminationBracket,
		SingleEliminationBracket,
		type SingleEliminationProps,
	} from "$lib/index.js";
	import {
		singleElimOne,
		singleElimThree,
		singleElimTwo,
		doubleElimOne,
	} from "$mock-data/index.js";
	import { SvelteLogo } from "../../images";
	import FantasyMatch from "./FantasyMatch.svelte";
	import GlassmorphismMatch from "./GlassmorphismMatch.svelte";

	let toggled: boolean = true;

	const singleElimMockData = [singleElimOne, singleElimTwo, singleElimThree];
	const doubleElimMockData = [doubleElimOne];

	let height: number;
	let width: number;

	let headerAlign = "center";
	let matchAlign = "center";

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

<div class="flex h-full w-full flex-col">
	<!-- <div class="flex flex-col">
		<div class="flex flex-row gap-3">
			<label for="header-align">Round header alignment</label>
			<select
				id="header-align"
				class="bg-white text-black dark:bg-black dark:text-white"
				bind:value={headerAlign}
			>
				<option value="start">Start</option>
				<option value="center">Center</option>
				<option value="end">End</option>
			</select>
		</div>
		<div class="flex flex-row gap-3">
			<label for="match-align">Match alignment</label>
			<select
				id="match-align"
				class="bg-white text-black dark:bg-black dark:text-white"
				bind:value={matchAlign}
			>
				<option value="start">Start</option>
				<option value="center">Center</option>
				<option value="end">End</option>
			</select>
		</div>
	</div> -->
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

	<!-- <h1 class="text-4xl">Single Elimination Brackets</h1>
	{#each singleElimMockData as data, dataIdx}
		<div class="mb-4">
			<h2 class="text-3xl">{dataIdx + 1}</h2>
			<SingleEliminationBracket
				onMatchClick={console.log}
				class="fill-[#0b0d13]"
				{data}
				bracketConfig={{
					matchStyle: { width: 200, height: 64 },
					roundHeaderStyle: { height: 48, width: 200 },
				}}
			/>
		</div>
	{/each} -->
	<!-- <h1 class="text-4xl">Double Elimination Brackets</h1>
	{#each doubleElimMockData as data, dataIdx}
		<div class="mb-4">
			<h2 class="text-3xl">{dataIdx + 1}</h2>
			<DoubleEliminationBracket
				onMatchClick={console.log}
				class="fill-[#0b0d13]"
				{data}
				bracketConfig={{
					matchStyle: { width: 200, height: 64 },
					roundHeaderStyle: { height: 48, width: 200 },
					bracketGap: 100,
				}}
			/>
		</div>
	{/each} -->
</div>

<div class="relative flex flex-col overflow-clip h-[calc(100vh-3.75rem)] 
	w-[100vw] items-center justify-center"
>
	<div class="absolute antialiased bottom-[25vh] 
		right-[-20%] lg:left-[2.5%] lg:bottom-[2.5%]"
		style="transform: perspective(3200px) rotateX(3deg) rotateY(-32deg) rotate(1deg) skew(-5deg);"
	>
		<div class="[transition:_.3s] [transform-style:_preserve-3d]"
		>
			<SingleEliminationBracket
				class="fill-transparent overflow-visible select-none"
				{data}
				bracketConfig={{
					matchStyle: { width: 320, height: 159 },
					roundHeaderStyle: { height: 48, width: 200 },
					roundGap: 100,
					showRoundHeaders: false,
					bracketGap: 100,
				}}
			>
				<div 
					slot="match" 
					class="w-full h-full" 
					let:match 
					let:entrant1
					let:entrant2
				>
					<FantasyMatch 
						{match}
						{entrant1}
						{entrant2}
					/>
				</div>
			</SingleEliminationBracket>
		</div>
	</div>
	<div class="z-10 flex flex-col items-center justify-center">
		<div class="my-4">
			<h1
				class="inline-flex items-center gap-3 text-2xl md:text-5xl lg:text-6xl"
			>
				<span class="flex w-fit items-center text-[#f96743]">
					<img
						class="size-10 md:size-20 self-center"
						src={SvelteLogo}
						alt="S"
					/>velte
				</span> Tournament Brackets
			</h1>
		</div>
		<CopyButton class="mt-6 w-fit" />
	</div>
	<div class="absolute [perspective:_1000px] scale-90 
		antialiased top-0 right-0 hidden lg:block"
	>
		<div class="[transition:_.3s] [transform:_rotateY(-35deg)] 
			[transform-style:_preserve-3d]"
		>
			<SingleEliminationBracket
				class="fill-transparent overflow-visible select-none"
				{data}
				bracketConfig={{
					matchStyle: { width: 320, height: 159 },
					roundHeaderStyle: { height: 48, width: 200 },
					roundGap: 100,
					showRoundHeaders: false,
					bracketGap: 100,
				}}
			>
				<div 
					slot="match" 
					class="w-full h-full" 
					let:match 
					let:entrant1
					let:entrant2
				>
					<GlassmorphismMatch 
						{match}
						{entrant1}
						{entrant2}
					/>
				</div>
			</SingleEliminationBracket>
		</div>
	</div>
</div>