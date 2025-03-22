export type CopyResult = "copied" | "failed";

export function copyToClipboard(data: string): CopyResult {
	if (navigator.clipboard) {
		try {
			navigator.clipboard.writeText(data);
			return "copied";
		} catch (err) {
			console.error(
				"Failed to copy code: Writing to the clipboard is not allowed",
			);
			return "failed";
		}
	} else {
		console.error(
			"Failed to copy code: Clipboard API is not available in not secure contexts",
		);
		return "failed";
	}
}
