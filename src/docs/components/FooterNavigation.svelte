<script lang="ts">
	import { m } from "$docs/paraglide/messages";
	import { ChevronLeft, ChevronRight } from "lucide-svelte";

	type Link = { href: string; title: string };

	export let previous: Link | undefined = undefined;
	export let next: Link | undefined = undefined;
</script>

<div
	class="mb-4 mt-8 flex flex-col justify-between gap-4 border-t border-dashed
	border-neutral-200 px-8 py-6 dark:border-neutral-800 sm:flex-row sm:gap-0"
>
	{#if previous}
		<a
			class="group flex flex-row-reverse items-end justify-center sm:mr-auto sm:justify-normal"
			href={previous.href}
		>
			<div class="flex flex-col text-start">
				<span class="text-[13px] text-muted-foreground"
					>{m.previousPage()}</span
				>
				<span class="text-[14px] font-medium">{previous.title}</span>
			</div>
			<ChevronLeft
				class="mr-1 text-muted-foreground transition-all group-hover:-translate-x-0.5 group-hover:text-foreground"
			/>
		</a>
	{/if}
	{#if next}
		<a
			class="group flex items-end justify-center sm:ml-auto sm:justify-normal"
			href={next.href}
		>
			<div class="flex flex-col text-end">
				<span class="text-[13px] text-muted-foreground"
					>{m.nextPage()}</span
				>
				<span class="text-[14px] font-medium">{next.title}</span>
			</div>
			<ChevronRight
				class="ml-1 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
			/>
		</a>
	{/if}
</div>
