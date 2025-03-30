<script lang="ts">
	import { cn } from "$docs/utils/cn";
	import { List } from "lucide-svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { crossfade } from "svelte/transition";

	type TocItem = {
		id: string;
		title: string;
		level: number;
		element: HTMLElement;
		active: boolean;
	};

	const store = writable({
		items: new Map<string, TocItem>(),
		activeItem: undefined as TocItem | undefined,
	});
	const [send, receive] = crossfade({ duration: 150 });
	let observer: IntersectionObserver;

	function updateActiveItem() {
		let activeItem: TocItem | undefined = undefined;

		for (const item of $store.items.values()) {
			if (item.active) {
				activeItem = item;
				break;
			}
		}

		$store = {
			items: $store.items,
			activeItem: activeItem,
		};
	}

	function tocClick(e: MouseEvent & { currentTarget: HTMLElement }) {
		e.preventDefault();

		const href = e.currentTarget.getAttribute("href")!;
		const element = document.querySelector(href);

		if (element) {
			window.scrollTo({
				top:
					element.getBoundingClientRect().top +
					window.pageYOffset -
					10,
				behavior: "smooth",
			});
		}
	}

	onMount(() => {
		observer =
			observer ??
			new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						const heading = $store.items.get(entry.target.id);

						if (heading) {
							heading.active = entry.isIntersecting;
						}

						updateActiveItem();
					}
				},
				{
					rootMargin: "20px 0px 0px 0px",
					threshold: 1,
				},
			);

		const headings = document.querySelectorAll<HTMLElement>("h2, h3, h4");

		for (const heading of headings) {
			if (heading.attributes.getNamedItem("data-toc-exclude")) {
				continue;
			}

			let id = heading.innerText.toLowerCase().replaceAll(/ +/g, "-");

			if ($store.items.has(id)) {
				let number = 1;

				while ($store.items.has(`${id}-${number}`)) {
					number++;
				}

				id = `${id}-${number}`;
			}

			heading.id = id;

			$store = {
				items: $store.items.set(heading.id, {
					id,
					title: heading.innerText,
					level: Number(heading.tagName[1]),
					element: heading,
					active: false,
				}),
				activeItem: undefined,
			};

			observer.observe(heading);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="sticky top-0 h-fit w-[240px] self-start overflow-hidden pt-6">
	<div class="flex flex-row items-center gap-3 text-sm text-muted-foreground">
		<List class="size-4 shrink-0" />
		<p>On this page</p>
	</div>
	<div class="mt-2">
		{#if $store.items.size}
			<ul
				class="list-none border-l border-dashed border-muted-foreground text-sm leading-4 text-muted-foreground"
			>
				{#each $store.items.values() as { id, title, level }}
					{@const isActive = $store.activeItem?.id === id}
					<li class="relative mt-0">
						<a
							class={cn(
								"inline-block py-[0.3125rem] pl-5 transition-colors hover:text-foreground/80 data-[active]:text-foreground",
								level === 3 && "pl-[2.5rem]",
								level === 4 && "pl-[3.75rem]",
								level === 5 && "pl-[5rem]",
							)}
							href={id ? `#${id}` : undefined}
							data-active={isActive ? "" : undefined}
							on:click={tocClick}
						>
							{title}
						</a>
						{#if isActive}
							<div
								in:send={{ key: "toc" }}
								out:receive={{ key: "toc" }}
								class="absolute -left-[0.0625rem] top-0 h-full w-px bg-foreground"
							></div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
