<script lang="ts">
	import SingleEliminationBracket from "$lib/brackets/single-elimination/SingleEliminationBracket.svelte";
	import { singleElimTwo } from "$docs/mock-data";
	import Link from "$components/Link.svelte";
	import { ArrowRight } from "lucide-svelte";
	import { m } from "$docs/paraglide/messages";
</script>

<main
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-clip"
>
	<section class="z-10 flex flex-col items-center">
		<div class="mt-4">
			<h1
				class="inline-flex items-center gap-2 text-2xl tracking-tight md:text-5xl lg:gap-3 lg:text-6xl"
			>
				<span class="text-[#f96743]">Svelte</span>
				<span>Tournament Brackets</span>
			</h1>
		</div>
		<Link
			class="group mt-6 flex flex-row items-center gap-2 rounded-md bg-muted px-4 py-2 
				tracking-tight text-black/80 transition-colors hover:text-black 
				dark:text-white/80 dark:hover:text-white"
			href="/docs"
		>
			<span class="text-sm">{m.goToDocs()}</span>
			<ArrowRight
				class="size-6 transition-transform group-hover:translate-x-0.5"
			/>
		</Link>
	</section>
	<svg
		class="absolute h-screen w-full stroke-neutral-200 dark:stroke-neutral-800"
		stroke-dasharray="5"
	>
		<defs>
			<pattern
				id="block"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M100 200V.5M.5 .5H200"></path>
			</pattern>
		</defs>
		<rect width="100%" height="100%" stroke-width="0" fill="url(#block)"
		></rect>
	</svg>
	<div
		class="absolute top-16 mx-auto flex h-full overflow-x-hidden overflow-y-clip"
	>
		<SingleEliminationBracket
			class="overflow-visible fill-transparent"
			data={singleElimTwo}
			config={{
				showRoundHeaders: false,
				matchStyle: { width: 200, height: 64 },
				roundHeaderStyle: { height: 48, width: 200 },
			}}
		/>
	</div>
	<div
		class="absolute h-full w-full bg-gradient-to-b from-transparent to-background"
	></div>
</main>
