<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h1
	class={cn("mb-3 text-[32px] font-semibold text-primary", className)}
	{...$$restProps}
>
	<slot />
</h1>
