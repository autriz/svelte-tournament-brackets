<script lang="ts">
	import { Tabs } from "bits-ui";
	import { crossfade } from "svelte/transition";

	export let tabs: string[];

	const [send, receive] = crossfade({ duration: 150 });

	let active: string = tabs[0];
</script>

<Tabs.Root bind:value={active} class="my-5 flex flex-col">
	{#if tabs.length > 1}
		{#if $$slots.list}
			<slot name="list" {tabs} {active} />
		{:else}
			<Tabs.List
				class="flex flex-row gap-3 border-b border-dashed
				border-neutral-200 px-4 pb-2 text-sm text-muted-foreground
				dark:border-neutral-800"
			>
				{#each tabs as tab}
					<Tabs.Trigger
						class="relative font-semibold transition-colors hover:text-primary data-[state=active]:text-primary"
						value={tab}
					>
						{tab}
						{#if tab === active}
							<div
								in:send={{ key: "tab" }}
								out:receive={{ key: "tab" }}
								class="absolute -bottom-[0.5625rem] h-px w-full bg-primary"
							></div>
						{/if}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
		{/if}
		<div class="mt-4">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</Tabs.Root>
