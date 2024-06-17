import slugify from "slugify";

/**
 * Converts an array of tokens to a Tailwind-compatible object.
 *
 * @template T
 * @param {Array<{ name: string; value: T }>} tokens - Array of tokens containing name and value.
 * @returns {Record<string, T>} Object with slugified names as keys and the original values.
 */
function tokensToTailwind<T>(
	tokens: Array<{ name: string; value: T }>,
): Record<string, T> {
	const nameSlug = (text: string) => slugify(text, { lower: true });
	const response: Record<string, T> = {};

	for (const { name, value } of tokens) {
		response[nameSlug(name)] = value;
	}

	return response;
}

export { tokensToTailwind };
