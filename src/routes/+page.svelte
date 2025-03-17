<script lang="ts">
	// import CopyButton from "$components/CopyButton.svelte";
	import SingleEliminationBracket from "$lib/brackets/single-elimination/SingleEliminationBracket.svelte";
	import { singleElimTwo } from "$mock-data";
</script>

<main class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-clip">
	<section class="flex flex-col items-center z-10">
		<div class="mt-4">
			<h1
				class="inline-flex items-center gap-3 text-2xl md:text-5xl lg:text-6xl"
			>
				<span class="flex w-fit items-center text-[#f96743]">
					Svelte
				</span> Tournament Brackets
			</h1>
		</div>
		<!-- <CopyButton class="mt-6" /> -->
	</section>
	<svg class="absolute h-screen w-full stroke-neutral-200 dark:stroke-neutral-800" stroke-dasharray="5">
		<defs>
			<pattern id="block" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
				<path d="M100 200V.5M.5 .5H200"></path>
			</pattern>
		</defs>
		<rect width="100%" height="100%" stroke-width="0" fill="url(#block)"></rect>
	</svg>
	<div class="absolute h-full overflow-y-clip overflow-x-visible flex mx-auto top-16">
		<SingleEliminationBracket 
			class="fill-transparent overflow-visible"
			data={singleElimTwo}
			bracketConfig={{
				showRoundHeaders: false,
				matchStyle: { width: 200, height: 64 },
				roundHeaderStyle: { height: 48, width: 200 },
			}}
		/>
	</div>
	<div class="absolute bg-gradient-to-b from-transparent to-background w-full h-full">
	</div>
</main>
