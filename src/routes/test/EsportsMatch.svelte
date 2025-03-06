<script lang="ts">
	import { Shield, Trophy } from "lucide-svelte";
</script>

<div class="w-full uppercase rounded-lg overflow-hidden border border-red-500/30 bg-gradient-to-br from-slate-950 to-red-950 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]">
	<div class="bg-gradient-to-r from-red-800 to-red-600 px-3 py-2 text-sm font-bold flex justify-between items-center">
		<div class="flex items-center gap-2">
		<Trophy class="h-4 w-4 text-yellow-300" />
		<span>Quarterfinal</span>
		</div>
		<span class="bg-black/30 px-2 py-0.5 rounded text-xs">Match 2</span>
	</div>
	<div class="p-0">
		<div class="flex justify-between items-center p-3 bg-red-500/10 border-b border-red-500/20">
		<div class="flex items-center gap-2">
			<Shield class="h-5 w-5 text-red-500" />
			<div>
			<div class="flex flex-col">
				<span class="font-bold text-white">Team Alpha</span>
				<span class="text-xs text-red-400">Winner</span>
			</div>
			</div>
		</div>
		<div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-gradient-to-br from-red-600 to-red-800 text-white border border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
			3
		</div>
		</div>

		<div class="flex justify-between items-center p-3">
		<div class="flex items-center gap-2">
			<Shield class="h-5 w-5 text-slate-600" />
			<div>
			<div class="flex flex-col">
				<span class="font-bold text-slate-300">Team Bravo</span>
				<span class="text-xs text-slate-500">Eliminated</span>
			</div>
			</div>
		</div>
		<div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-slate-800 text-slate-300 border border-slate-700">
			1
		</div>
		</div>
	</div>
	</div>