<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h3
	class={cn(
		"mb-2 mt-8 text-[16px] font-semibold text-primary lg:mb-3",
		className,
	)}
>
	<slot />
</h3>
