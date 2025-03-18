<script lang="ts">
	import clsx from "clsx";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<h1
	class={clsx(
		"border-b border-muted pb-10 text-[32px] font-semibold text-primary",
		className,
	)}
	{...$$restProps}
>
	<slot />
</h1>
