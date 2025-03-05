<script lang="ts">
	import clsx from "clsx";
	import type { BaseMatch, BaseEntrant } from "$lib/internal/types.js";
	import { getCtx } from "$lib/internal/ctx.js";

	export let match: BaseMatch;
	export let entrant1: BaseEntrant | null = null;
	export let entrant2: BaseEntrant | null = null;

	export let entrant1Placeholder: string = "";
	export let entrant2Placeholder: string = "";

	export let isTopHovered: boolean;
	export let isBottomHovered: boolean;

	export let onEnter: (entrantID: number) => void;
	export let onLeave: () => void;

	$: hasEnded = match.entrant1?.entrantStatus && match.entrant1?.entrantStatus;
	$: isTopWon = match.entrant1?.entrantStatus === "WON";
	$: isBottomWon = match.entrant2?.entrantStatus === "WON";

	let { onMatchClick } = getCtx();
</script>

<button
	class="grid h-full text-start w-full grid-flow-row grid-rows-2 rounded-sm bg-gray-900"
	on:click={() => onMatchClick?.(match)}
>
	<div
		class={clsx([
			"box-border flex grow items-center rounded-t-sm border border-slate-700 \
			transition-colors hover:border-slate-300 data-[disabled]:opacity-80 \
			data-[disabled]:select-none data-[disabled]:cursor-auto",
			match.entrant1 && `id-${match.entrant1.entrantId} data-[hovered]:border-slate-300`
		])}
		data-disabled={match.entrant1 ? undefined : true}
		aria-disabled={match.entrant1 ? undefined : true}
		data-hovered={isTopHovered ? true : undefined}
		on:pointerenter={() => onEnter(Number(match.entrant1?.entrantId))}
		on:pointerleave={() => onLeave()}
	>
		<span
			class="pointer-events-none flex h-full w-[24px] items-center justify-center 
			text-center text-xs text-gray-500"
		>
			{#if match.entrant1 && entrant1}
				{entrant1.entrantId}
			{/if}
		</span>
		<span class="grow pl-2 text-sm">
			{#if match.entrant1 && entrant1}
				{entrant1.entrantName}
			{:else}
				{entrant1Placeholder}
			{/if}
		</span>
		<span
			class={clsx(["flex h-full w-[24px] items-center justify-center self-end bg-slate-800 text-center text-xs",
				hasEnded ? isTopWon ? `text-green-400` : `text-red-400` : undefined
			])}
		>
			{#if match.entrant1 && entrant1}
				{match.entrant1.entrantScore ?? 0}
			{/if}
		</span>
	</div>
	<div
		class={clsx([
			"box-border flex grow items-center rounded-b-sm border border-slate-700 \
			transition-colors hover:border-slate-300 data-[disabled]:opacity-80 \
			data-[disabled]:select-none data-[disabled]:cursor-auto",
			match.entrant2 && `id-${match.entrant2.entrantId} data-[hovered]:border-slate-300`
		])}
		data-disabled={match.entrant2 ? undefined : true}
		aria-disabled={match.entrant2 ? undefined : true}
		data-hovered={isBottomHovered ? true : undefined}
		on:pointerenter={() => onEnter(Number(match.entrant2?.entrantId))}
		on:pointerleave={() => onLeave()}
	>
		<span
			class="pointer-events-none flex h-full w-[24px] items-center justify-center 
			text-center text-xs text-gray-500"
		>
			{#if match.entrant2 && entrant2}
				{entrant2.entrantId}
			{/if}
		</span>
		<span class="grow pl-2 text-sm">
			{#if match.entrant2 && entrant2}
				{entrant2.entrantName}
			{:else}
				{entrant2Placeholder}
			{/if}
		</span>
		<span
			class={clsx(["flex h-full w-[24px] items-center justify-center self-end bg-slate-800 text-center text-xs",
				hasEnded ? isBottomWon ? `text-green-400` : `text-red-400` : undefined
			])}
		>
			{#if match.entrant2 && entrant2}
				{match.entrant2.entrantScore ?? 0}
			{/if}
		</span>
	</div>
</button>
