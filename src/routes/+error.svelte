<script lang="ts">
	import { page } from "$app/stores";
	import { m } from "$docs/paraglide/messages";

	const getStatusMessage = (statusCode: number) => {
		switch (statusCode) {
			case 404:
				return m.errorNotFound();
			case 500:
			default:
				return m.errorInternal();
		}
	};
</script>

<svelte:head>
	<title>{$page.status}: {getStatusMessage($page.status)}</title>
</svelte:head>

<main
	class="m-auto flex h-screen w-screen flex-col items-center justify-center gap-2"
>
	<div class="flex flex-row items-center">
		<div class="h-fit w-fit overflow-clip pr-4">
			<h1 class="transition-rtl text-4xl">{$page.status}</h1>
		</div>
		<div class="h-full w-px bg-foreground"></div>
		<div class="pl-4">
			<p class="text-3xl">{getStatusMessage($page.status)}</p>
			<a class="mt-1 text-xl text-[#f96743]" href="/docs"
				>{m.goToDocs()}</a
			>
		</div>
	</div>
</main>

<style>
	:global(.transition-rtl) {
		animation: 600ms cubic-bezier(0.215, 0.61, 0.355, 1) forwards slide-rtl;
	}

	@keyframes slide-rtl {
		0% {
			transform: translateX(200%);
		}
		100% {
			transform: translateX(0%);
		}
	}
</style>
