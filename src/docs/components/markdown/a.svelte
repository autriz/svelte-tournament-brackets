<script lang="ts">
	import Link from "$components/Link.svelte";
	import { cn } from "$docs/utils/cn";

	export let href: string;
	export let rel: HTMLAnchorElement["rel"] | undefined = undefined;

	let className: string | undefined = undefined;
	export { className as class };
</script>

<Link
	{href}
	{rel}
	class={cn(
		"underline underline-offset-4 transition-colors hover:text-foreground",
		className,
	)}
>
	<slot />
</Link>
