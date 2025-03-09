<script lang="ts">
	import { Shield, Trophy } from "lucide-svelte";
</script>

<div
	class="w-full cursor-default overflow-hidden rounded-lg border border-red-500/30 bg-gradient-to-br from-slate-950 to-red-950 uppercase text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]"
>
	<div
		class="flex items-center justify-between bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm font-bold"
	>
		<div class="flex items-center gap-2">
			<Trophy class="h-4 w-4 text-yellow-300" />
			<span>Quarterfinal</span>
		</div>
		<span class="rounded bg-black/30 px-2 py-0.5 text-xs">Match 2</span>
	</div>
	<div class="p-0">
		<div
			class="flex items-center justify-between border-b border-red-500/20 bg-red-500/10 p-3"
		>
			<div class="flex items-center gap-2">
				<Shield class="h-5 w-5 text-red-500" />
				<div>
					<div class="flex flex-col">
						<span class="font-bold text-white">Team Alpha</span>
						<span class="text-xs text-red-400">Winner</span>
					</div>
				</div>
			</div>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/50 bg-gradient-to-br from-red-600 to-red-800 text-xl font-bold text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
			>
				3
			</div>
		</div>

		<div class="flex items-center justify-between p-3">
			<div class="flex items-center gap-2">
				<Shield class="h-5 w-5 text-slate-600" />
				<div>
					<div class="flex flex-col">
						<span class="font-bold text-slate-300">Team Bravo</span>
						<span class="text-xs text-slate-500">Eliminated</span>
					</div>
				</div>
			</div>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-xl font-bold text-slate-300"
			>
				1
			</div>
		</div>
	</div>
</div>
