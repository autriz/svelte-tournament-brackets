<script lang="ts">
	import { m } from "$docs/paraglide/messages";
	import { cn } from "$docs/utils/cn";
	import { List } from "lucide-svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { crossfade } from "svelte/transition";
	import { sineInOut } from "svelte/easing";

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
	const [send, receive] = crossfade({ duration: 150, easing: sineInOut });
	let observer: IntersectionObserver;

	function updateActiveItem() {
		let activeItemId: string | undefined = undefined;

		for (const item of $store.items.values()) {
			if (item.active) {
				activeItemId = item.id;
				break;
			}
		}

		if (!activeItemId) {
			if (!$store.activeItem) {
				selectClosestItem();
			}

			return;
		}

		const newActiveItem = $store.items.get(activeItemId)!;

		setItem(newActiveItem);
	}

	function selectClosestItem() {
		const screenY = window.scrollY;

		const selectedItem = $store.items
			.values()
			.reduce((prev, curr) =>
				Math.abs(curr.element.offsetTop - screenY) <
				Math.abs(prev.element.offsetTop - screenY)
					? curr
					: prev,
			);

		$store.items.get(selectedItem.id)!.active = true;

		setItem(selectedItem);
	}

	function setItem(selectedItem: TocItem) {
		$store = {
			items: $store.items,
			activeItem: selectedItem,
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
					100,
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
					rootMargin: "-10% 0% -35% 0px",
					threshold: 1,
				},
			);

		const headings = Array.from(
			document.querySelectorAll<HTMLElement>(
				"h2:not([data-toc-exclude]), h3:not([data-toc-exclude]), h4:not([data-toc-exclude])",
			),
		);

		for (const heading of headings) {
			let id = heading.innerText.toLowerCase().replaceAll(/ +/g, "-");

			if ($store.items.has(id)) {
				let number = 1;

				while ($store.items.has(`${id}-${number}`)) {
					number++;
				}

				id = `${id}-${number}`;
			}

			heading.id = id;

			$store.items.set(heading.id, {
				id,
				title: heading.innerText,
				level: Number(heading.tagName[1]),
				element: heading,
				active: false,
			});

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
		<p>{m.onThisPage()}</p>
	</div>
	<div class="mt-2">
		{#if $store.items.size}
			<ul
				class="list-none border-l border-dashed border-muted text-sm leading-4 text-muted-foreground"
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
								class="absolute -left-0.5 top-0 h-full w-[3px] rounded-full bg-foreground"
							></div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
