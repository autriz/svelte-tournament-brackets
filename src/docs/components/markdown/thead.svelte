<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<thead class={cn("[&>tr]:!border-none", className)}>
	<slot />
</thead>
