<script>
	import GithubMark from "./GithubMark.svelte";
	import Link from "./Link.svelte";
	import ThemeToggleButton from "./ThemeToggleButton.svelte";
</script>

<header
	class="fixed z-10 mx-auto w-screen
	bg-gradient-to-b from-background/10 to-transparent to-50% px-20 py-3
	text-foreground backdrop-blur sm:px-36"
>
	<div
		class="flex-cols mx-auto flex w-full max-w-[1920px]
		grid-cols-[1fr_max-content_1fr] gap-3 sm:grid"
	>
		<div></div>
		<nav class="flex grow flex-row justify-center gap-3">
			<Link
				href="/"
				class="px-2 py-1 text-lg transition-colors data-[current]:text-[#f96743]"
			>
				Home
			</Link>
			<Link
				class="px-2 py-1 text-lg transition-colors data-[current]:text-[#f96743]"
				href="/docs"
			>
				Docs
			</Link>
		</nav>
		<div class="flex flex-row justify-end gap-3">
			<ThemeToggleButton
				class="relative inline-flex size-10 cursor-default items-center 
				justify-center rounded-md px-2 py-1 transition-colors hover:bg-foreground/10"
			/>
			<Link
				href="https://github.com/autriz/svelte-tournament-brackets"
				title="Go to GitHub page"
				class="relative inline-flex size-10 items-center justify-center
				rounded-md px-2 py-1 transition-colors hover:bg-foreground/10"
			>
				<GithubMark class="size-5" />
			</Link>
		</div>
	</div>
</header>
