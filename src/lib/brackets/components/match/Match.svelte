<script lang="ts">
    import clsx from "clsx";
    import type { Match, Entrant } from "$lib/internal/types.js";
	import { getCtx } from "$lib/internal/ctx.js";

    export let match: Match;
    export let entrant1: Entrant | null = null;
    export let entrant2: Entrant | null = null;

    export let isTopHovered: boolean;
    export let isBottomHovered: boolean;

    export let onEnter: (entrantID: number) => void;
    export let onLeave: () => void;

    let {
        onMatchClick
    } = getCtx();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-full h-full bg-gray-900 grid grid-flow-row grid-rows-2 rounded-sm"
    on:click={() => onMatchClick(match)}
>
    <div 
        class={
            clsx(
                "grow box-border rounded-t-sm flex items-center border border-slate-700 transition-colors hover:border-slate-300",
                match.opponent1 && `id-${match.opponent1.opponentId}`
            )
        }
        class:border-slate-300={isTopHovered}

        on:pointerenter={() => onEnter(Number(match.opponent1?.opponentId))}
        on:pointerleave={() => onLeave()}
    >
        <span class="pointer-events-none w-[24px] h-full text-gray-500 text-xs flex justify-center items-center text-center">
            {#if match.opponent1 && entrant1}
                {entrant1.entrantId}
            {/if}
        </span>
        <span class="grow pl-2 text-sm">
            {#if match.opponent1 && entrant1}
                {entrant1.entrantName}
            {/if}
        </span>
        <span class="w-[24px] text-xs h-full self-end flex justify-center items-center text-center">
            {#if match.opponent1 && entrant1}
                {match.opponent1.opponentScore ?? 0}
            {/if}
        </span>
    </div>
    <div 
        class={
            clsx(
                "grow box-border rounded-b-sm flex items-center border border-slate-700 transition-colors hover:border-slate-300",
                match.opponent2 && `id-${match.opponent2.opponentId}`
            )
        }
        class:border-slate-300={isBottomHovered}

        on:pointerenter={() => onEnter(Number(match.opponent2?.opponentId))}
        on:pointerleave={() => onLeave()}
    >
        <span class="pointer-events-none w-[24px] h-full text-gray-500 text-xs flex justify-center items-center text-center">
            {#if match.opponent2 && entrant2}
                {entrant2.entrantId}
            {/if}
        </span>
        <span class="grow pl-2 text-sm">
            {#if match.opponent2 && entrant2}
                {entrant2.entrantName}
            {/if}
        </span>
        <span class="w-[24px] text-xs h-full self-end flex justify-center items-center text-center">
            {#if match.opponent2 && entrant2}
                {match.opponent2.opponentScore ?? 0}
            {/if}
        </span>
    </div>
</div>