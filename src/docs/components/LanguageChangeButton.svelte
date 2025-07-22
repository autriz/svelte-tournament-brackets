<script lang="ts">
	import { cn } from "$docs/utils/cn";
	import { setLocale, getLocale } from "$docs/paraglide/runtime";
	import { Languages } from "lucide-svelte";
	import { fly } from "svelte/transition";
	import { Popover } from "bits-ui";
	import { m } from "$docs/paraglide/messages";

	let className: string | undefined = undefined;
	export { className as class };

	const languages = [
		{ locale: "ru", text: "Русский", title: "Сменить язык на Русский" },
		{ locale: "en", text: "English", title: "Change language to English" },
	] as const;

	let locale = getLocale();
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			"relative inline-flex size-10 z-10 items-center justify-center rounded-md p-[0.4375rem] \
			text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
			className,
		)}
		title={m.changeLanguage()}
	>
		<div class="flex size-full items-center justify-center">
			<Languages class="size-7 self-center"></Languages>
		</div>
	</Popover.Trigger>
	<Popover.Content
		side="right"
		sideOffset={4}
		transition={fly}
		transitionConfig={{ duration: 200, x: -30 }}
		class="flex flex-row gap-3 rounded-md border 
		border-neutral-300 bg-background px-2 py-0.5 
		dark:border-neutral-700"
	>
		{#each languages as language}
			<Popover.Close
				class="p-0.5 size-5 transition-colors hover:!bg-foreground/30 data-[active]:bg-foreground/20"
				data-active={language.locale === locale ? "" : undefined}
				on:click={() => setLocale(language.locale)}
			>
				<img
					class="w-4 h-3"
					src="/{language.locale}.svg"
					loading="eager"
					alt={language.text}
					title={language.title}
				/>
			</Popover.Close>
		{/each}
	</Popover.Content>
</Popover.Root>
