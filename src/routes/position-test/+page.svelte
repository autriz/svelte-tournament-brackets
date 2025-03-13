<script lang="ts">
	import type { SingleEliminationProps } from "$lib";
	import SingleEliminationBracket from "$lib/brackets/single-elimination/SingleEliminationBracket.svelte";
	import clsx from "clsx";
	import FantasyMatch from "../test/FantasyMatch.svelte";

    let perspective: number | undefined = 0;
    let rotateY: number | undefined = 0;
    let rotateX: number | undefined = 0;
    let rotateZ: number | undefined = 0;
    let rotate: number | undefined = 0;
    let skew: number | undefined = 0;
    let skewX: number | undefined = 0;
    let skewY: number | undefined = 0;
    let scale: number | undefined = 1;

    let disableBg: boolean = false;

    $: perspectiveStr = perspective && perspective !== 0 ? `perspective(${perspective}px)` : '';
    $: rotateXStr = rotateX && rotateX !== 0 ? `rotateX(${rotateX}deg)` : '';
    $: rotateYStr = rotateY && rotateY !== 0 ? `rotateY(${rotateY}deg)` : '';
    $: rotateZStr = rotateZ && rotateZ !== 0 ? `rotateZ(${rotateZ}deg)` : '';
    $: rotateStr = rotate && rotate !== 0 ? `rotate(${rotate}deg)` : '';
    $: skewStr = skew && skew !== 0 ? `skew(${skew}deg)` : '';
    $: skewXStr = skewX && skewX !== 0 ? `skewX(${skewX}deg)` : '';
    $: skewYStr = skewY && skewY !== 0 ? `skewY(${skewY}deg)` : '';
    $: scaleStr = scale && scale !== 1 ? `scale(${scale})` : '';

    $: style = `transform: ${perspectiveStr} ${rotateXStr} ${rotateYStr} ${rotateZStr} ${rotateStr} ${skewStr} ${skewXStr} ${skewYStr} ${scaleStr};`.replaceAll(/ +/g, ' ');

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

<div class="w-full">
    <div>
        <input id="perspective" bind:value={perspective} type="number" />
        <label for="perspective">Perspective (px)</label>
    </div>
    <div>
        <input id="rotate-x" bind:value={rotateX} type="number" />
        <label for="rotate-x">Rotate X (deg)</label>
    </div>
    <div>
        <input id="rotate-y" bind:value={rotateY} type="number" />
        <label for="rotate-y">Rotate Y (deg)</label>
    </div>
    <div>
        <input id="rotate-z" bind:value={rotateZ} type="number" />
        <label for="rotate-z">Rotate Z (deg)</label>
    </div>
    <div>
        <input id="rotate" bind:value={rotate} type="number" />
        <label for="rotate">Rotate (deg)</label>
    </div>
    <div>
        <input id="skew" bind:value={skew} type="number" />
        <label for="skew">Skew (deg)</label>
    </div>
    <div>
        <input id="skew-x" bind:value={skewX} type="number" />
        <label for="skew-x">Skew X (deg)</label>
    </div>
    <div>
        <input id="skew-y" bind:value={skewY} type="number" />
        <label for="skew-y">Skew Y (deg)</label>
    </div>
    <div>
        <input id="scale" bind:value={scale} type="number" step="0.1" />
        <label for="scale">Scale</label>
    </div>
    <div>
        <input type="checkbox" id="bg" bind:checked={disableBg} />
        <label for="bg">Disable background</label>
    </div>
</div>

<pre>
    {style}
</pre>

<div class="flex flex-col items-center justify-center mt-20">
    <div {style}>
        <div class={clsx(["p-4 rounded-lg shadow-lg", !disableBg && "dark:bg-neutral-900 bg-neutral-100"])}>
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
</div>