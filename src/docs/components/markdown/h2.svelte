<script lang="ts">
	import clsx from "clsx";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h2
	class={clsx(
		"mb-3 mt-8 text-[24px] font-semibold text-primary lg:mb-4",
		className,
	)}
	{...$$restProps}
>
	<slot />
</h2>
