<script lang="ts">
	import { page } from "$app/stores";
	import FooterNavigation from "$components/FooterNavigation.svelte";
	import NavigationButtons from "$components/NavigationButtons.svelte";
	import TableOfContents from "$components/TableOfContents.svelte";
	import {
		getPageNeighbors,
		isPageName,
		pageDescriptionMap,
		pageNameMap,
	} from "$docs/utils";
	import { ArrowUp, Menu } from "lucide-svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { Drawer } from "vaul-svelte";
	import { m } from "$docs/paraglide/messages";
	import Meta from "$components/Meta.svelte";

	let onTop = true;
	let pageMeta = getCurrentPageMeta();

	$: {
		$page.url.pathname;
		updateObserver();
		pageMeta = getCurrentPageMeta();
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

	function getCurrentPageMeta() {
		const key = $page.url.href.split("/").at(-1)!;
		if (isPageName(key)) {
			return {
				title: pageNameMap[key],
				description: pageDescriptionMap[key],
			};
		}

		return {
			title: m.defaultTitle(),
			description: m.defaultDescription(),
		};
	}
</script>

<Meta title={pageMeta.title} description={pageMeta.description} />

<div class="flex grid-cols-[240px_1fr] lg:grid xl:mx-auto xl:max-w-[1420px]">
	<div></div>
	<nav
		class="fixed hidden h-screen w-[240px] flex-col border-x border-dashed
			border-neutral-200 bg-foreground/[2%] pb-4 pt-5 dark:border-neutral-800 lg:flex"
	>
		<div
			class="border-b border-dashed border-neutral-200 px-4 pb-3.5 text-[15px] font-semibold dark:border-neutral-800"
		>
			<a class="flex gap-1" href="/">
				<p class="text-[#f96743]">Svelte</p>
				<p>Tournament Brackets</p>
			</a>
		</div>
		<NavigationButtons />
	</nav>
	<div class="flex w-full gap-4 px-4 lg:px-8 lg:py-16 lg:pl-0">
		<div
			class="absolute left-0 top-0 flex h-fit w-full justify-between border-b border-dashed border-neutral-300 dark:border-neutral-700 lg:hidden"
		>
			<a class="flex items-center pl-2" href="/">
				<p>Tournament Brackets</p>
			</a>
			<Drawer.Root direction="right" openFocus={null}>
				<Drawer.Trigger class="p-2" aria-label={m.showNavigation()}>
					<Menu class="size-6 text-foreground" />
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Content
						class="fixed bottom-0 right-0 top-0 z-50 flex outline-none"
					>
						<div
							class="my-1 mr-1 flex w-[240px] max-w-[450px] grow
							flex-col rounded-md bg-background pb-4"
						>
							<NavigationButtons />
						</div>
					</Drawer.Content>
					<Drawer.Overlay class="fixed inset-0 z-10 bg-black/40" />
				</Drawer.Portal>
			</Drawer.Root>
		</div>
		<main class="mx-auto mt-10 w-full max-w-[672px] lg:mt-0">
			<slot></slot>
			<FooterNavigation
				{...getPageNeighbors($page.url.href.split("/").at(-1))}
			/>
		</main>
		<aside class="hidden xl:ml-8 xl:block xl:max-w-[240px]">
			{#key $page}
				<TableOfContents />
			{/key}
		</aside>
	</div>
</div>
{#if !onTop}
	<button
		transition:fade={{ duration: 100 }}
		class="fixed bottom-0 right-0 hidden rounded-md border border-dashed border-muted px-3 py-3
			text-muted-foreground transition-all hover:border-solid hover:border-muted-foreground
			hover:text-primary sm:mb-10 sm:mr-10 sm:block"
		title="Go to the top"
		on:click={() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}}
	>
		<ArrowUp class="size-6"></ArrowUp>
	</button>
{/if}
