<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h2
	class={cn(
		"mb-3 mt-10 text-[24px] font-semibold tracking-tight text-primary lg:mb-4",
		className,
	)}
	{...$$restProps}
>
	<slot />
</h2>
