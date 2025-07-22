<script>
	import { m } from "$docs/paraglide/messages";
	import GithubMark from "./GithubMark.svelte";
	import Link from "./Link.svelte";
</script>

<Link
	href="https://github.com/autriz/svelte-tournament-brackets"
	title={m.goToGitHub()}
	class="relative inline-flex size-7 items-center justify-center 
    rounded-md border border-neutral-300 p-1 text-neutral-600 
    transition-colors hover:bg-foreground/10 hover:text-neutral-900 
    dark:border-neutral-700 dark:text-neutral-400 
    dark:hover:text-neutral-100"
>
	<GithubMark class="size-4" />
</Link>
