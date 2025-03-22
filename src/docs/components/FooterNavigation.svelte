<script lang="ts">
	import { ChevronLeft, ChevronRight } from "lucide-svelte";

	export let previous: {
		title: string;
		href: string;
	} | undefined = undefined;
	export let next: {
		title: string;
		href: string;
	} | undefined = undefined;
</script>

<div class="border-t border-dashed mt-8 flex justify-between py-3 px-8 border-neutral-300 dark:border-neutral-700">
	{#if previous}
		<a class="items-end flex flex-row-reverse mr-auto group" href={previous.href}>
			<div class="flex flex-col text-start">
				<span class="text-[14px] text-muted-foreground">Previous page</span>
				<span class="text-[15px] font-medium">{previous.title}</span>
			</div>
			<ChevronLeft class="mr-1 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all" />
		</a>
	{/if}
	{#if next}
		<a class="items-end flex ml-auto group" href={next.href}>
			<div class="flex flex-col text-end">
				<span class="text-[14px] text-muted-foreground">Next page</span>
				<span class="text-[15px] font-medium">{next.title}</span>
			</div>
			<ChevronRight class="ml-1 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
		</a>
	{/if}
</div>