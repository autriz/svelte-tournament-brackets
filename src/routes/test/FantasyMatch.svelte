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
	import { Calendar, Crown, Sparkles, Trophy } from "lucide-svelte";

	export let match: Match;
	export let entrant1: Entrant | null = null;
	export let entrant2: Entrant | null = null;

	$: hasEnded = match.entrant1?.entrantStatus && match.entrant1?.entrantStatus;
	$: isTopWon = match.entrant1?.entrantStatus === "WON";
	$: isBottomWon = match.entrant2?.entrantStatus === "WON";
</script>

<button 
	class="w-full max-w-xs cursor-default"
>
	<div class="relative">
	<div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg blur-xl"></div>
	<div class="relative bg-gradient-to-br rounded-md from-slate-900 
		to-purple-950 text-white border border-purple-500/30 
		overflow-hidden shadow-xl"
	>
		<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
			from-purple-500/20 to-pink-500/20 rounded-full -translate-y-1/2 
			translate-x-1/2 blur-2xl"
		></div>
		<div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br 
		from-blue-500/20 to-purple-500/20 rounded-full translate-y-1/2 
		-translate-x-1/2 blur-2xl"
		></div>

		<div class="px-3 py-1.5 border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-2">
					<Sparkles class="h-4 w-4 text-purple-400" />
					<span class="text-sm font-medium text-purple-200">Round {match.roundId}</span>
				</div>
				<span class="bg-purple-500/20 hover:bg-purple-500/20 
					text-purple-300 text-sm border border-purple-500/30 
					px-1 rounded-md"
				>
					Match {match.matchId}
				</span>
			</div>
		</div>

		<div class="px-4 py-1.5 space-y-2 backdrop-blur-sm">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-full bg-gradient-to-br from-purple-600 
						to-pink-600 flex items-center justify-center text-xs font-bold 
						shadow-lg border border-purple-400/30"
					>
						A
					</div>
					<span class={clsx([
						"flex items-center flex-row gap-2 font-bold text-md", 
						isTopWon ? "text-purple-100" : "text-purple-200/70"
						])}
					>
						<p>{entrant1?.entrantName || ""}</p>
						{#if hasEnded && isTopWon}
							<Crown class="h-4 w-4 text-amber-400" />
						{/if}
					</span>
				</div>
				<div class={clsx(["text-xl font-bold", isTopWon ? "text-purple-100" : "text-purple-300/70"])}>
					{#if match.entrant1 && entrant1}
						{match.entrant1.entrantScore ?? 0}
					{/if}
				</div>
			</div>

			<div class="flex items-center justify-center">
				<div class="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-full bg-gradient-to-br from-slate-700 
						to-purple-900 flex items-center justify-center text-xs font-bold 
						shadow-lg border border-purple-400/30"
					>
						B
					</div>
					<span class={clsx([
						"flex items-center flex-row gap-2 font-bold text-md", 
						isBottomWon ? "text-purple-100" : "text-purple-200/70"
						])}
					>
						<p>{entrant2?.entrantName || ""}</p>
						{#if hasEnded && isBottomWon}
							<Crown class="h-4 w-4 text-amber-400" />
						{/if}
					</span>
				</div>
				<div class={clsx(["text-xl font-bold", isBottomWon ? "text-purple-100" : "text-purple-300/70"])}>
					{#if match.entrant2 && entrant2}
						{match.entrant2.entrantScore ?? 0}
					{/if}
				</div>
			</div>
		</div>

		<div class="px-3 py-1.5 border-t border-purple-500/20 bg-black/20 
			backdrop-blur-sm flex justify-between items-center">
			<div class="text-xs text-purple-300/70 flex items-center gap-1">
				<Calendar class="h-3 w-3" />
				<span>05-03-2025</span>
			</div>
		</div>
	</div>
	</div>
</button>
