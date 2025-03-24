<script lang="ts" generics="Entrant extends BaseEntrant = BaseEntrant">
	import type { BaseEntrant, Opponent } from "$lib";
	import { cn } from "$lib/internal/utils";

    /** Entrant data snippet */
    export let entrant: Entrant | undefined;
    /** Entrant data of the match */
    export let opponent: Opponent | undefined;
    export let entrantIdx: number | undefined;
    export let placeholder: string;
    export let side: "top" | "bottom";
    export let isHovered: boolean;
    export let hasEnded: boolean;
    export let onEnter: (id: Entrant["entrantId"]) => void;
    export let onLeave: () => void;

    const isValidNumber = (value: unknown): value is number => Number.isInteger(value);

	$: hasWon = opponent?.opponentStatus === "WON";
</script>

<div
    class={cn("box-border flex grow items-center border \
        dark:border-neutral-600 border-neutral-400 transition-colors \
        dark:hover:!border-neutral-400 hover:!border-neutral-600 \
        data-[disabled]:opacity-80 data-[disabled]:select-none \
        data-[disabled]:cursor-auto data-[hovered]:dark:!border-neutral-400 \
        data-[hovered]:!border-neutral-600", side === "top" ? "rounded-t-sm" : "rounded-b-sm")}
    data-disabled={opponent ? undefined : true}
    aria-disabled={opponent ? undefined : true}
    data-hovered={isHovered ? true : undefined}
    on:pointerenter={() => opponent ? onEnter(opponent.opponentId) : undefined}
    on:pointerleave={() => onLeave()}
>
    <span
        class="pointer-events-none flex h-full w-[24px] items-center justify-center 
        text-center text-xs text-gray-500"
    >
        {#if opponent && entrant && isValidNumber(entrantIdx)}
            {entrantIdx + 1}
        {/if}
    </span>
    <span class="grow pl-2 text-sm text-foreground">
        {#if opponent && entrant}
            {entrant.entrantName}
        {:else}
            {placeholder}
        {/if}
    </span>
    <span
        class={cn(["flex h-full w-[38px] items-center justify-center self-end dark:bg-neutral-800 bg-neutral-200 text-center text-xs",
            hasEnded ? hasWon ? `text-green-400` : `text-red-400` : undefined,
            side === "top" ? "rounded-tr-sm" : "rounded-br-sm"
        ])}
    >
        {#if opponent && entrant}
            {#if hasEnded}
                {opponent.opponentStatus}
            {:else}
                {opponent.opponentScore ?? 0}
            {/if}
        {/if}
    </span>
</div>