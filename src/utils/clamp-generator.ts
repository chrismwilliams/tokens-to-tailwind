import defaultViewport from "../design-tokens/viewport.json" with {
	type: "json",
};

type Viewport = Omit<typeof defaultViewport, "description">;

/**
 * Generates a clamp function for tailwind
 *
@param {Array<{ name: string; min: number; max: number }>} tokens - Array of tokens containing name, min, and max values.
 * @param {Viewport} [viewport=defaultViewport] - Optional viewport sizes containing min and max values. Default is min: 320, max: 1280.
 * @returns {Array<{ name: string; value: string }>} Array of objects containing name of token and generated CSS clamp value.
 */
function clampGenerator(
	tokens: Array<{ name: string; min: number; max: number }>,
	viewport: Viewport = defaultViewport,
): Array<{ name: string; value: string }> {
	const rootSize = 16;

	return tokens.map(({ name, min, max }) => {
		if (min === max) {
			return { name, value: `${min / rootSize}rem` };
		}

		// Convert the min and max sizes to rems
		const minSize = min / rootSize;
		const maxSize = max / rootSize;

		// Convert the pixel viewport sizes into rems
		const minViewport = viewport.min / rootSize;
		const maxViewport = viewport.max / rootSize;

		// Slope and intersection allow us to have a fluid value but also keep that sensible
		const slope = (maxSize - minSize) / (maxViewport - minViewport);
		const intersection = -1 * minViewport * slope + minSize;

		return {
			name,
			value: `clamp(${minSize}rem, ${intersection.toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw, ${maxSize}rem)`,
		};
	});
}

export { clampGenerator };
