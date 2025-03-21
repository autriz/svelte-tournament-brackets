<script
	lang="ts"
	generics="
		Entrant extends BaseEntrant = BaseEntrant,
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	"
>
	import clsx from "clsx";
	import type {
		BaseMatch,
		BaseEntrant,
		BaseMatchEntrant,
	} from "$lib/internal/types";

	export let match: Match;
	export let indices: { 
		entrant1: number | undefined; 
		entrant2: number | undefined; 
		round: number; 
		match: number; 
	};
	export let entrant1: Entrant | null = null;
	export let entrant2: Entrant | null = null;

	export let entrant1Placeholder: string = "";
	export let entrant2Placeholder: string = "";

	export let isTopHovered: boolean;
	export let isBottomHovered: boolean;

	export let onEnter: (entrantId: MatchEntrant["entrantId"]) => void;
	export let onLeave: () => void;
	export let onMatchClick: ((match: Match) => void) | undefined;

	const isValidNumber = (value: unknown): value is number => Number.isInteger(value);

	$: hasEnded = match.entrant1?.entrantStatus && match.entrant1?.entrantStatus;
	$: isTopWon = match.entrant1?.entrantStatus === "WON";
	$: isBottomWon = match.entrant2?.entrantStatus === "WON";
</script>

<button
	class="grid h-full text-start w-full overflow-visible grid-flow-row grid-rows-2 rounded-sm dark:bg-neutral-900 bg-neutral-100 shadow-md dark:shadow-none shadow-black/30"
	on:click={() => onMatchClick?.(match)}
>
	<div
		class={clsx([
			"box-border flex grow items-center rounded-t-sm border dark:border-neutral-600 border-neutral-400 \
			transition-colors dark:hover:!border-neutral-400 hover:!border-neutral-600 data-[disabled]:opacity-80 \
			data-[disabled]:select-none data-[disabled]:cursor-auto",
			match.entrant1 && `id-${match.entrant1.entrantId} data-[hovered]:dark:!border-neutral-400 data-[hovered]:!border-neutral-600`
		])}
		data-disabled={match.entrant1 ? undefined : true}
		aria-disabled={match.entrant1 ? undefined : true}
		data-hovered={isTopHovered ? true : undefined}
		on:pointerenter={() => match.entrant1 ? onEnter(match.entrant1.entrantId) : undefined}
		on:pointerleave={() => onLeave()}
	>
		<span
			class="pointer-events-none flex h-full w-[24px] items-center justify-center 
			text-center text-xs text-gray-500"
		>
			{#if match.entrant1 && entrant1 && isValidNumber(indices.entrant1)}
				{indices.entrant1 + 1}
			{/if}
		</span>
		<span class="grow pl-2 text-sm text-foreground">
			{#if match.entrant1 && entrant1}
				{entrant1.entrantName}
			{:else}
				{entrant1Placeholder}
			{/if}
		</span>
		<span
			class={clsx(["flex h-full w-[38px] rounded-tr-sm items-center justify-center self-end dark:bg-neutral-800 bg-neutral-200 text-center text-xs",
				hasEnded ? isTopWon ? `text-green-400` : `text-red-400` : undefined
			])}
		>
			{#if match.entrant1 && entrant1}
				{#if hasEnded}
					{match.entrant1.entrantStatus}
				{:else}
					{match.entrant1.entrantScore ?? 0}
				{/if}
			{/if}
		</span>
	</div>
	<div
		class={clsx([
			"box-border flex grow items-center rounded-b-sm border dark:border-neutral-600 border-neutral-400 \
			transition-colors dark:hover:!border-neutral-400 hover:!border-neutral-600 data-[disabled]:opacity-80 \
			data-[disabled]:select-none data-[disabled]:cursor-auto",
			match.entrant2 && `id-${match.entrant2.entrantId} data-[hovered]:dark:!border-neutral-400 data-[hovered]:!border-neutral-600`
		])}
		data-disabled={match.entrant2 ? undefined : true}
		aria-disabled={match.entrant2 ? undefined : true}
		data-hovered={isBottomHovered ? true : undefined}
		on:pointerenter={() => match.entrant2 ? onEnter(match.entrant2.entrantId) : undefined}
		on:pointerleave={() => onLeave()}
	>
		<span
			class="pointer-events-none flex h-full w-[24px] items-center justify-center 
			text-center text-xs text-gray-500"
		>
			{#if match.entrant2 && entrant2 && isValidNumber(indices.entrant2)}
				{indices.entrant2 + 1}
			{/if}
		</span>
		<span class="grow pl-2 text-sm text-foreground">
			{#if match.entrant2 && entrant2}
				{entrant2.entrantName}
			{:else}
				{entrant2Placeholder}
			{/if}
		</span>
		<span
			class={clsx(["flex h-full w-[38px] rounded-br-sm items-center justify-center self-end dark:bg-neutral-800 bg-neutral-200 text-center text-xs",
				hasEnded ? isBottomWon ? `text-green-400` : `text-red-400` : undefined
			])}
		>
			{#if match.entrant2 && entrant2}
				{#if hasEnded}
					{match.entrant2.entrantStatus}
				{:else}
					{match.entrant2.entrantScore ?? 0}
				{/if}
			{/if}
		</span>
	</div>
</button>
