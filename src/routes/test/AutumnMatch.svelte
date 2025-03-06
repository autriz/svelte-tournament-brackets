<script lang="ts">
	import { Wind } from "lucide-svelte";
</script>

<div class="w-full rounded-lg overflow-hidden border border-red-300 bg-gradient-to-b from-red-50 to-amber-50 shadow-md">
	<div class="bg-gradient-to-r from-red-600 to-amber-500 px-3 py-1.5 text-sm font-medium flex justify-between items-center text-white">
		<div class="flex items-center gap-2">
		<Wind class="h-4 w-4 text-white" />
		<span>Quarterfinal</span>
		</div>
		<span class="bg-red-700/30 px-2 py-0.5 rounded-full text-xs">Match 2</span>
	</div>
	<div class="p-0">
		<div class="flex justify-between items-center p-3 bg-red-50 border-b border-red-100">
		<div class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium shadow-sm">
			1
			</div>
			<div>
			<div class="font-medium text-red-800">Team Alpha</div>
			<div class="text-xs text-red-600 flex items-center gap-1">
				<Wind class="h-3 w-3" />
				<span>Autumn Champion</span>
			</div>
			</div>
		</div>
		<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-red-500 text-white shadow-sm">
			3
		</div>
		</div>

		<div class="flex justify-between items-center p-3">
		<div class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-medium">
			8
			</div>
			<div>
			<div class="text-red-700">Team Bravo</div>
			<div class="text-xs text-red-500">Blown Away</div>
			</div>
		</div>
		<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-red-100 text-red-600 border border-red-200">
			1
		</div>
		</div>
	</div>
	</div>