<script lang="ts">
	import { cn } from "$lib/internal/utils";

	export let href: string;

	let className: string | undefined = undefined;
	export { className as class };
</script>

<a
	{...$$restProps}
	{href}
	class={cn(
		"underline underline-offset-1 transition-colors hover:text-foreground",
		className,
	)}
>
	<slot />
</a>
