<script lang="ts">
	import { cn } from "$lib/internal/utils";
	import { List } from "lucide-svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { crossfade } from "svelte/transition";

	type TocItem = {
		title: string;
		level: number;
		active: boolean;
	};

	const store = writable({ items: new Map<string, TocItem>() });
	const [send, receive] = crossfade({ duration: 150 });
	let observer: IntersectionObserver;

	onMount(() => {
		observer =
			observer ??
			new IntersectionObserver((entries) => {
				for (const entry of entries) {
					const heading = $store.items.get(entry.target.id);

					if (heading) {
						heading.active = entry.isIntersecting;
					}

					$store = {
						items: $store.items,
					};
				}
			});

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
					title: heading.innerText,
					level: Number(heading.tagName[1]),
					active: false,
				}),
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
				class="list-none border-l border-muted text-sm leading-4 text-muted-foreground"
			>
				{#each $store.items.entries() as [id, { title, level, active }]}
					<li class="relative mt-0">
						<a
							class={cn(
								"inline-block py-[0.3125rem] pl-5 data-[active]:text-white",
								level === 3 && "pl-10",
								level === 4 && "pl-[3.75rem]",
							)}
							href={id ? `#${id}` : undefined}
							data-active={active ? "" : undefined}
						>
							{title}
						</a>
						{#if active}
							<div
								in:send={{ key: "toc" }}
								out:receive={{ key: "toc" }}
								class="transitiona-all absolute left-0 top-0 h-full w-px bg-white"
							></div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
