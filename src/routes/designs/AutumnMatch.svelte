<script lang="ts">
	import { Wind } from "lucide-svelte";
</script>

<div
	class="w-full cursor-default overflow-hidden rounded-lg border border-red-300 bg-gradient-to-b from-red-50 to-amber-50 shadow-md"
>
	<div
		class="flex items-center justify-between bg-gradient-to-r from-red-600 to-amber-500 px-3 py-1.5 text-sm font-medium text-white"
	>
		<div class="flex items-center gap-2">
			<Wind class="h-4 w-4 text-white" />
			<span>Quarterfinal</span>
		</div>
		<span class="rounded-full bg-red-700/30 px-2 py-0.5 text-xs"
			>Match 2</span
		>
	</div>
	<div class="p-0">
		<div
			class="flex items-center justify-between border-b border-red-100 bg-red-50 p-3"
		>
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white shadow-sm"
				>
					1
				</div>
				<div>
					<div class="font-medium text-red-800">Team Alpha</div>
					<div class="flex items-center gap-1 text-xs text-red-600">
						<Wind class="h-3 w-3" />
						<span>Autumn Champion</span>
					</div>
				</div>
			</div>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white shadow-sm"
			>
				3
			</div>
		</div>

		<div class="flex items-center justify-between p-3">
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600"
				>
					8
				</div>
				<div>
					<div class="text-red-700">Team Bravo</div>
					<div class="text-xs text-red-500">Blown Away</div>
				</div>
			</div>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-red-100 font-bold text-red-600"
			>
				1
			</div>
		</div>
	</div>
</div>
