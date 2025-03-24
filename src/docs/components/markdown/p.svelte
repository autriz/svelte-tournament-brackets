<script lang="ts">
	import { cn } from "$lib/internal/utils";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<p class={cn("text-muted-foreground", className)}><slot /></p>
