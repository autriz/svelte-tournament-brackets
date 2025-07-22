<script lang="ts">
	import { pageSectionMap, pageNameMap } from "$docs/utils";
	import Link from "$docs/components/Link.svelte";
	import ThemeToggleButton from "./ThemeToggleButton.svelte";
	import LanguageChangeButton from "./LanguageChangeButton.svelte";
	import GithubLink from "./GithubLink.svelte";

	const classes =
		"flex rounded-md px-2 py-1 text-[13px] text-neutral-800 \
transition-colors [transition-duration:100ms] hover:bg-neutral-200 \
data-[current]:bg-neutral-200 data-[current]:text-black \
dark:text-neutral-300 dark:hover:bg-neutral-700 \
dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white";
</script>

<div class="w-full grow overflow-y-auto px-4 pt-5">
	{#each Object.values(pageSectionMap) as section}
		<div
			class="border-b border-dashed border-neutral-200 py-2 first:pt-0 last:border-b-0 dark:border-neutral-800"
		>
			<span class="mb-2 text-xs font-medium text-muted-foreground">
				{section.title}
			</span>
			<ul class="space-y-1">
				{#each section.links as link}
					<li>
						<Link href="/docs/{link}" class={classes}>
							{pageNameMap[link]}
						</Link>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
<div class="px-4">
	<div
		class="flex flex-row justify-between border-t border-dashed border-neutral-200
		pt-3 dark:border-neutral-800"
	>
		<div class="flex flex-row gap-3">
			<ThemeToggleButton
				class="size-7 cursor-default border border-neutral-300 p-1 
				text-neutral-600 transition-colors hover:cursor-pointer 
				hover:bg-foreground/10 hover:text-neutral-900 dark:border-neutral-700 
				dark:text-neutral-400 dark:hover:text-neutral-100 
				[&_svg]:size-4"
			/>
			<LanguageChangeButton
				class="size-7 cursor-default border border-neutral-300 p-1 
				transition-colors hover:cursor-pointer hover:bg-foreground/10 
				dark:border-neutral-700 [&_svg]:size-4"
			/>
		</div>
		<GithubLink />
	</div>
</div>
