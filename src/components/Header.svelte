<script lang="ts">
	import Link from "./Link.svelte";
	import ThemeToggleButton from "./ThemeToggleButton.svelte";
	import GithubMark from "./GithubMark.svelte";
</script>

<header
	class="fixed flex w-full flex-row items-center justify-center
    gap-3 bg-background/10 py-3 px-6 text-foreground backdrop-blur"
>
	<nav class="grow flex flex-row justify-center gap-3">
		<Link href="/">Home</Link>
		<Link href="/designs">Designs</Link>
		<Link href="/test">Test</Link>
	</nav>
	<div class=" flex flex-row gap-3">
		<ThemeToggleButton />
		<Link href="#" label="Go to GitHub page"><GithubMark class="size-7" /></Link>
	</div>
</header>
