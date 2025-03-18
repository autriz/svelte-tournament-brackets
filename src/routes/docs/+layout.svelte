<script lang="ts">
	import { page } from "$app/stores";
	import GithubMark from "$components/GithubMark.svelte";
	import Link from "$components/Link.svelte";
	import ThemeToggleButton from "$components/ThemeToggleButton.svelte";
	import { ArrowUp } from "lucide-svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let onTop = true;

	$: {
		$page.url.pathname;
		updateObserver();
	}

	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entry) => {
				onTop = entry[0].isIntersecting;
			},
			{
				rootMargin: "0px 0px 0px",
				root: null,
				threshold: 0,
			},
		);

		observer.observe(document.getElementsByTagName("h1")[0]);

		return () => {
			observer.disconnect();
		};
	});

	function updateObserver() {
		observer?.disconnect();
		observer?.observe(document.getElementsByTagName("h1")[0]);
	}
</script>

<div class="flex grid-cols-[240px_1fr] lg:grid xl:mx-auto xl:max-w-[1360px]">
	<div></div>
	<nav
		class="fixed hidden h-screen w-[240px] flex-col border-x border-dashed
			border-neutral-300 bg-foreground/[2%] pb-4 pt-5 dark:border-neutral-700 lg:flex"
	>
		<div class="px-4">
			<div
				class="border-b border-dashed border-neutral-300 pb-3.5 font-semibold dark:border-neutral-700"
			>
				<a class="flex gap-1" href="/">
					<p class="text-[#f96743]">Svelte</p>
					<span><p>Tournament Brackets</p></span>
				</a>
			</div>
		</div>
		<div class="w-full grow overflow-y-auto px-4 pt-5">
			<div
				class="border-b border-dashed border-neutral-300 pb-2 dark:border-neutral-700"
			>
				<span class="mb-2 text-xs font-medium text-muted-foreground"
					>Basics</span
				>
				<ul class="space-y-1">
					<li>
						<Link
							href="getting-started"
							class="flex rounded-md px-2 py-1 text-sm text-neutral-800 
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
							href="api"
							class="flex rounded-md px-2 py-1 text-sm text-neutral-800 
							transition-colors [transition-duration:100ms] hover:bg-neutral-200 
							hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
							dark:text-neutral-300 dark:hover:bg-neutral-700 
							dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
						>
							API
						</Link>
					</li>
				</ul>
			</div>
			<div class="pt-2">
				<span class="mb-2 text-xs font-medium text-muted-foreground"
					>Advanced usage</span
				>
				<ul class="space-y-1">
					<li>
						<Link
							href="bring-your-own-design"
							class="flex rounded-md px-2 py-1 text-sm text-neutral-800 
							transition-colors [transition-duration:100ms] hover:bg-neutral-200 
							hover:text-black data-[current]:bg-neutral-200 data-[current]:text-black 
							dark:text-neutral-300 dark:hover:bg-neutral-700 
							dark:hover:text-white dark:data-[current]:bg-neutral-700 dark:data-[current]:text-white"
						>
							Bring Your Own Design
						</Link>
					</li>
					<li>
						<Link
							href="extendable-data"
							class="flex rounded-md px-2 py-1 text-sm text-neutral-800 
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
			<div>
				<span class="mb-2 text-xs font-medium text-muted-foreground"
					>Examples</span
				>
				<ul class="space-y-1">
					<li
						class="flex w-full rounded-md px-2 py-1 text-sm hover:bg-neutral-700"
					>
						TODO!
					</li>
				</ul>
			</div>
		</div>
		<div class="px-4">
			<div
				class="flex flex-row justify-between border-t border-dashed border-neutral-300
				pt-3 dark:border-neutral-700"
			>
				<ThemeToggleButton
					class="size-8 cursor-default border border-muted transition-colors hover:bg-foreground/10 [&_svg]:size-4"
				/>
				<Link
					href="https://github.com/autriz/svelte-tournament-brackets"
					title="Go to GitHub page"
					class="relative inline-flex size-8 items-center justify-center 
					rounded-md border border-muted px-2 py-1 transition-colors hover:bg-foreground/10"
				>
					<GithubMark class="size-6" />
				</Link>
			</div>
		</div>
	</nav>
	<div class="flex gap-4 self-center lg:ml-8 lg:py-16">
		<main class="mx-auto w-full max-w-[672px]">
			<slot></slot>
		</main>
		<aside class="hidden h-px lg:block lg:w-[240px]">
			<!-- TODO: TOC -->
		</aside>
	</div>
</div>
{#if !onTop}
	<button
		transition:fade={{ duration: 100 }}
		class="fixed bottom-0 right-0 mb-10 mr-10 rounded-md border border-dashed
			border-muted px-3 py-3 text-muted-foreground
			transition-all hover:border-solid hover:border-muted-foreground
			hover:text-primary"
		title="Go to the top"
		on:click={() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}}
	>
		<ArrowUp class="size-6"></ArrowUp>
	</button>
{/if}
