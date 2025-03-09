<div
	class="w-full max-w-xs cursor-default overflow-hidden rounded-none border-2 border-amber-500 bg-zinc-900 font-mono text-white"
>
	<div
		class="bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black"
	>
		06-03-2025
	</div>

	<div class="space-y-0 p-2">
		<div
			class="group flex items-center justify-between border-b border-zinc-700 px-2 py-1.5"
		>
			<div class="flex items-center gap-1">
				<span class="text-xs text-amber-500">{">"}</span>
				<span class="text-sm text-amber-100">Team Alpha</span>
				<span class="group-hover:animate-pulse-cursor">_</span>
			</div>
			<span class={`text-xs font-bold text-green-400`}> WON </span>
		</div>

		<div class="group flex items-center justify-between px-2 py-1.5">
			<div class="flex items-center gap-1">
				<span class="text-xs text-amber-500">{">"}</span>
				<span class="text-sm text-amber-100">Team Bravo</span>
				<span class="group-hover:animate-pulse-cursor">_</span>
			</div>
			<span class={`text-xs font-bold text-red-400`}> LOST </span>
		</div>
	</div>

	<div
		class="bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black"
	>
		Round 1 - Match 2
	</div>
</div>

<style>
	@keyframes pulse-cursor {
		50% {
			opacity: 0;
		}
	}

	.group:hover .group-hover\:animate-pulse-cursor {
		animation: pulse-cursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
