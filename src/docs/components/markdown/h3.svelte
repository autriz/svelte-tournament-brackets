<script lang="ts">
	import clsx from "clsx";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h3
	class={clsx(
		"mb-2 mt-8 text-[16px] font-semibold text-primary lg:mb-3",
		className,
	)}
>
	<slot />
</h3>
