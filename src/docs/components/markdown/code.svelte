<script lang="ts">
	import { cn } from "$lib/internal/utils";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<code
	class={cn(
		"rounded-sm border border-border bg-background px-1 py-0.5 text-foreground",
		className,
	)}
>
	<slot />
</code>
