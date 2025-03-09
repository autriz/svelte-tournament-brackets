<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	export let label: string | undefined = undefined;
</script>

<a
	aria-label={label}
	class="px-2 py-1 text-lg transition-colors data-[current]:text-[#f96743]"
	data-current={$page.url.pathname === href ? "" : undefined}
	{href}
>
	<slot></slot>
</a>
