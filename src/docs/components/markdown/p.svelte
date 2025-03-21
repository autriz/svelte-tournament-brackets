<script lang="ts">
	import clsx from "clsx";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<p class={clsx("text-muted-foreground", className)}><slot /></p>
