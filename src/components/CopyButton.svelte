<script lang="ts">
	import clsx from "clsx";
	import { AlertCircle, Check, Copy } from "lucide-svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { fly } from "svelte/transition";

	const packageManagerText = {
		npm: "npm install ",
		pnpm: "pnpm install ",
		yarn: "yarn add ",
		bun: "bun install ",
		deno: "deno install npm:",
	};
	let preferredManager: keyof typeof packageManagerText = "pnpm";
	let className: HTMLButtonAttributes["class"] = "";

	enum CopyStatus {
		COPIED,
		FAILED,
	}

	let copyStatus: CopyStatus | null = null;
	let copyTimeout: ReturnType<typeof setTimeout>;

	function copyInstallCommand() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(packageManagerText[preferredManager] + "svelte-tournament-brackets");
			copyStatus = CopyStatus.COPIED;
		} else {
			copyStatus = CopyStatus.FAILED;
		}

		clearTimeout(copyTimeout);

		copyTimeout = setTimeout(() => {
			copyStatus = null;
		}, 2500);
	}

	export { className as class };
</script>

<div
	class={clsx(
		"flex flex-col-reverse md:flex-row gap-2 rounded-lg border border-border bg-neutral-100 px-4 py-2 dark:bg-neutral-900",
		className,
	)}
>
	<select
		class="rounded-lg border focus:border-neutral-100 dark:focus:border-neutral-500 
			outline-none w-fit self-center md:self-auto border-neutral-300 bg-background 
			px-2 py-1 dark:border-neutral-700"
		aria-label="Select package manager"
		bind:value={preferredManager}
		on:change={copyInstallCommand}
	>
		<option>npm</option>
		<option>pnpm</option>
		<option>yarn</option>
		<option>bun</option>
		<option>deno</option>
	</select>
	<button
		class="flex items-center justify-between gap-4 break-keep rounded-md
            px-2 py-1 text-left font-mono text-sm text-foreground transition
            disabled:text-muted-foreground sm:shrink"
		on:click={copyInstallCommand}
	>
		<span
			>{packageManagerText[
				preferredManager
			]}svelte-tournament-brackets</span
		>
		{#if copyStatus === CopyStatus.COPIED}
			<div in:fly={{ y: -4 }}>
				<Check class="inline-block size-4 text-green-600 transition" />
			</div>
		{:else if copyStatus === CopyStatus.FAILED}
			<div in:fly={{ y: -4 }}>
				<AlertCircle
					class="inline-block size-4 text-red-600 transition"
				/>
			</div>
		{:else}
			<div in:fly={{ y: 4 }}>
				<Copy class="inline-block size-4 transition" />
			</div>
		{/if}
	</button>
</div>
