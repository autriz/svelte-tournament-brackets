<script
	lang="ts"
	generics="
		Entrant extends BaseEntrant = BaseEntrant,
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>,
	"
>
	import type {
		BaseMatch,
		BaseEntrant,
		BaseMatchEntrant,
	} from "$lib/internal/types";
	import clsx from "clsx";

	export let match: Match;
	export let entrant1: Entrant | null = null;
	export let entrant2: Entrant | null = null;

	$: hasEnded = match.entrant1?.entrantStatus && match.entrant1?.entrantStatus;
	$: isTopWon = match.entrant1?.entrantStatus === "WON";
	$: isBottomWon = match.entrant2?.entrantStatus === "WON";
</script>

<button
	class="w-full max-w-xs overflow-hidden rounded-xl border 
		border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 
		text-white shadow-lg backdrop-blur-md cursor-default"
>
	<div
		class="border-b text-start border-white/10 bg-white/5 px-4 py-2 
			text-xs text-white/70 backdrop-blur-md"
	>
		06-03-2025
	</div>

	<div class="space-y-1 p-3">
		<div
			class="flex items-center justify-between rounded-lg px-3 
				py-2 backdrop-blur-sm transition-colors hover:bg-white/5"
		>
			<span class="text-sm font-medium">{entrant1?.entrantName || ""}</span>
			<div
				class={clsx([
					"rounded-full px-2 h-[20px] py-0.5 text-xs ring-1",
					isTopWon 
						? "bg-white/10 text-emerald-400 ring-emerald-400/30" 
						: "bg-white/5 text-white/50 ring-white/10"
				])}
			>
				{#if match.entrant1 && entrant1}
					{#if hasEnded}
						{match.entrant1.entrantStatus}
					{:else}
						{match.entrant1.entrantScore ?? 0}
					{/if}
				{/if}
			</div>
		</div>

		<div
			class="flex items-center justify-between rounded-lg px-3 
				py-2 backdrop-blur-sm transition-colors hover:bg-white/5"
		>
			<span class="text-sm font-medium">{entrant2?.entrantName || ""}</span>
			<div
				class={clsx([
					"rounded-full px-2 h-[20px] py-0.5 text-xs ring-1",
					isBottomWon 
						? "bg-white/10 text-emerald-400 ring-emerald-400/30" 
						: "bg-white/5 text-white/50 ring-white/10"
				])}
			>
				{#if match.entrant2 && entrant2}
					{#if hasEnded}
						{match.entrant2.entrantStatus}
					{:else}
						{match.entrant2.entrantScore ?? 0}
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<div
		class="border-t text-start border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50 backdrop-blur-md"
	>
		Round {match.roundId} - Match {match.matchId}
	</div>
</button>
