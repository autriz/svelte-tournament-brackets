import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$docs/paraglide/server";

function preload({
	type,
	path,
}: {
	type: "js" | "css" | "font" | "asset";
	path: string;
}): boolean {
	if (type === "js" || type === "css" || type === "font") return true;
	return false;
}

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(
		event.request,
		({ request: localizedRequest, locale }) => {
			event.request = localizedRequest;
			return resolve(event, {
				transformPageChunk: ({ html }) => {
					return html.replace("%lang%", locale);
				},
				preload,
			});
		},
	);

export const handle: Handle = paraglideHandle;
