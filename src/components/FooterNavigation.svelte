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
				<span class="text-[20px]">{previous.title}</span>
			</div>
			<ChevronLeft class="mr-3 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all" />
		</a>
	{/if}
	{#if next}
		<a class="items-end flex ml-auto group" href={next.href}>
			<div class="flex flex-col text-end">
				<span class="text-[14px] text-muted-foreground">Next page</span>
				<span class="text-[20px]">{next.title}</span>
			</div>
			<ChevronRight class="ml-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
		</a>
	{/if}
</div>