<script lang="ts">
	import GithubMark from "$components/GithubMark.svelte";
	import Link from "$components/Link.svelte";
	import ThemeToggleButton from "$components/ThemeToggleButton.svelte";
	import clsx from "clsx";
	import { ArrowUp } from "lucide-svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let onTop = true;

	onMount(() => {
		const observer = new IntersectionObserver((entry) => {
			onTop = entry[0].isIntersecting;
		}, {
			rootMargin: "0px 0px 0px",
			root: null,
			threshold: 0
		});

		observer.observe(document.getElementsByTagName("h1")[0]);

		return () => {
			observer.disconnect();
		}
	});
</script>
<div class="xl:mx-auto lg:grid grid-cols-[240px_1fr] flex xl:max-w-[1360px]">
	<div></div>
	<nav class="w-[240px] h-screen bg-foreground/[2%] fixed pt-5 pb-4 hidden lg:flex flex-col border-x border-dashed border-neutral-300 dark:border-neutral-700">
		<div class="px-4">
			<div class="pb-3.5 font-semibold border-b border-dashed border-neutral-300 dark:border-neutral-700">
				<a class="flex gap-1" href="/">
					<p class="text-[#f96743]">Svelte</p>
					<span><p>Tournament Brackets</p></span>
				</a>
			</div>
		</div>
		<div class="grow overflow-y-auto pt-5 px-4 w-full">
			<div class="pb-2 border-b border-neutral-300 dark:border-neutral-700 border-dashed">
				<span class="text-xs text-muted-foreground mb-2 font-medium">Basics</span>
				<ul class="space-y-1">
					<li>
						<Link 
							href="getting-started" 
							class="flex text-sm px-2 py-1 rounded-md dark:text-neutral-300 
							dark:hover:text-white dark:data-[current]:text-white text-neutral-800 
							hover:text-black data-[current]:text-black dark:hover:bg-neutral-700 
							dark:data-[current]:bg-neutral-700 hover:bg-neutral-200 
							data-[current]:bg-neutral-200 transition-colors [transition-duration:100ms]"
						>
							Getting Started
						</Link>
					</li>
					<li>
						<Link 
							href="api" 
							class="flex text-sm px-2 py-1 rounded-md dark:text-neutral-300 
							dark:hover:text-white dark:data-[current]:text-white text-neutral-800 
							hover:text-black data-[current]:text-black dark:hover:bg-neutral-700 
							dark:data-[current]:bg-neutral-700 hover:bg-neutral-200 
							data-[current]:bg-neutral-200 transition-colors [transition-duration:100ms]"
						>
							API
						</Link>
					</li>
				</ul>
			</div>
			<div class="pt-2">
				<span class="text-xs text-muted-foreground mb-2 font-medium">Advanced usage</span>
				<ul class="space-y-1">
					<li>
						<Link 
							href="bring-your-own-design" 
							class="flex text-sm px-2 py-1 rounded-md dark:text-neutral-300 
							dark:hover:text-white dark:data-[current]:text-white text-neutral-800 
							hover:text-black data-[current]:text-black dark:hover:bg-neutral-700 
							dark:data-[current]:bg-neutral-700 hover:bg-neutral-200 
							data-[current]:bg-neutral-200 transition-colors [transition-duration:100ms]"
						>
							Bring Your Own Design
						</Link>
					</li>
					<li>
						<Link 
							href="extendable-data" 
							class="flex text-sm px-2 py-1 rounded-md dark:text-neutral-300 
							dark:hover:text-white dark:data-[current]:text-white text-neutral-800 
							hover:text-black data-[current]:text-black dark:hover:bg-neutral-700 
							dark:data-[current]:bg-neutral-700 hover:bg-neutral-200 
							data-[current]:bg-neutral-200 transition-colors [transition-duration:100ms]"
						>
							Extendable Data
						</Link>
					</li>
				</ul>
			</div>
			<div>
				<span class="text-xs text-muted-foreground mb-2 font-medium">Examples</span>
				<ul class="space-y-1">
					<li class="flex text-sm px-2 py-1 w-full rounded-md hover:bg-neutral-700">TODO!</li>
				</ul>
			</div>
		</div>
		<div class="px-4">
			<div class="pt-3 flex flex-row justify-between border-t border-dashed 
				border-neutral-300 dark:border-neutral-700"
			>
				<ThemeToggleButton class="hover:bg-foreground/10 transition-colors cursor-default size-8 border border-muted [&_svg]:size-4"/>
				<Link 
					href="https://github.com/autriz/svelte-tournament-brackets" 
					title="Go to GitHub page" 
					class="relative inline-flex items-center justify-center px-2 
					py-1 rounded-md border border-muted size-8 hover:bg-foreground/10 transition-colors"
				>
					<GithubMark class="size-6" />
				</Link>
			</div>
		</div>
	</nav>
	<div class="self-center flex lg:ml-8 lg:py-16 gap-4">
		<main class="mx-auto max-w-[672px] w-full">
			<slot></slot>
		</main>
		<aside class="lg:w-[240px] h-px hidden lg:block">
			<!-- TODO: TOC -->
		</aside>
	</div>
</div>
{#if !onTop}
	<button 
		transition:fade={{ duration: 100 }} 
		class="fixed bottom-0 right-0 mr-10 mb-10 px-3 py-3 rounded-md 
			border border-muted border-dashed hover:border-muted-foreground
			hover:border-solid transition-all text-muted-foreground
			hover:text-primary"
		title="Go to the top"
		on:click={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}
	>
		<ArrowUp class="size-6"></ArrowUp>
	</button>
{/if}