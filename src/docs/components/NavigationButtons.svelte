<script lang="ts">
	import Link from "$docs/components/Link.svelte";
</script>

<div class="w-full grow overflow-y-auto px-4 pt-5">
	<div
		class="border-b border-dashed border-neutral-300 pb-2 dark:border-neutral-700"
	>
		<span class="mb-2 text-xs font-medium text-muted-foreground">
			Basics
		</span>
		<ul class="space-y-1">
			<li>
				<Link
					href="/docs/getting-started"
					class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                    transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                    hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                    dark:text-neutral-300 dark:hover:bg-neutral-700 
                    dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
				>
					Getting Started
				</Link>
			</li>
			<li>
				<Link
					href="/docs/customizable-components"
					class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                    transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                    hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                    dark:text-neutral-300 dark:hover:bg-neutral-700 
                    dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
				>
					Customizable Components
				</Link>
			</li>
			<li>
				<Link
					href="/docs/extendable-data"
					class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                    transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                    hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                    dark:text-neutral-300 dark:hover:bg-neutral-700 
                    dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
				>
					Extendable Data
				</Link>
			</li>
		</ul>
	</div>
	<div
		class="border-b border-dashed border-neutral-300 py-2 dark:border-neutral-700"
	>
		<span class="mb-2 text-xs font-medium text-muted-foreground">
			Components
		</span>
		<ul class="space-y-1">
			<Link
				href="/docs/single-elimination-bracket"
				class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                dark:text-neutral-300 dark:hover:bg-neutral-700 
                dark:hover:text-white dark:data-[current]:bg-neutral-700 
                dark:data-[current]:text-white"
			>
				Single Elimination Bracket
			</Link>
			<Link
				href="/docs/double-elimination-bracket"
				class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                dark:text-neutral-300 dark:hover:bg-neutral-700 
                dark:hover:text-white dark:data-[current]:bg-neutral-700 
                dark:data-[current]:text-white"
			>
				Double Elimination Bracket
			</Link>
		</ul>
	</div>
	<div class="py-2">
		<span class="mb-2 text-xs font-medium text-muted-foreground">
			Examples
		</span>
		<ul class="space-y-1">
			<li>
				<Link
					href="/docs/examples/default"
					class="flex rounded-md px-2 py-1 text-[13px] text-neutral-800 
                    transition-colors [transition-duration:100ms] hover:bg-neutral-200 
                    hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
                    dark:text-neutral-300 dark:hover:bg-neutral-700 
                    dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
				>
					Default
				</Link>
			</li>
		</ul>
	</div>
</div>
