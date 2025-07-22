import type { Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$docs/paraglide/runtime";

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};
