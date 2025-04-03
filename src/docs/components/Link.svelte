<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	export let rel: HTMLAnchorElement["rel"] | undefined = undefined;
	export let title: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	$: isCurrent =
		$page.url.pathname === href ||
		(!href.startsWith("http") && $page.url.pathname.endsWith(href));

	$: isHashLink = href.startsWith("#");

	function handleHashLink(e: MouseEvent) {
		e.preventDefault();

		const element = document.querySelector(href);

		if (element) {
			window.scrollTo({
				top:
					element.getBoundingClientRect().top +
					window.pageYOffset -
					10,
				behavior: "smooth",
			});
		}
	}
</script>

<a
	{title}
	{rel}
	class={className}
	data-current={isCurrent ? "" : undefined}
	target={href.startsWith("http") ? "_blank" : undefined}
	{href}
	on:click={isHashLink ? handleHashLink : undefined}
>
	<slot></slot>
</a>
