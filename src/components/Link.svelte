<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	export let title: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	$: isCurrent =
		$page.url.pathname === href ||
		(!href.startsWith("http") && $page.url.pathname.endsWith(href));
</script>

<a
	{title}
	class={className}
	data-current={isCurrent ? "" : undefined}
	target={href.startsWith("http") ? "_blank" : undefined}
	{href}
>
	<slot></slot>
</a>
