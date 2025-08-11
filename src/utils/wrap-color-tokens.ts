type ColorFunctionOptions = {
	/**
	 * CSS color function name (e.g. "oklch", "lch", "rgb", "hsl").
	 * Defaults to "oklch".
	 */
	colorFunction?: string;

	/**
	 * Alpha channel placeholder or value.
	 * Use "/ <alpha-value>" for Tailwind opacity utilities.
	 * Use "" or null to omit alpha entirely.
	 * Defaults to "/ <alpha-value>".
	 */
	colorFunctionAlphaValue?: string | null;
};

const defaultColorFunctionOptions: Required<ColorFunctionOptions> = {
	colorFunction: "oklch",
	colorFunctionAlphaValue: null, // No alpha by default
};

/**
 * Wraps design token values in a CSS color function with a CSS variable,
 * while preserving raw CSS keywords (e.g. `transparent`, `inherit`).
 *
 * @param colorTokens - Record of token names to raw color values (e.g., OKLCH values without function)
 * @param colorFunctionOptions - Optional overrides for color function and alpha placeholder
 * @returns A record with each color token wrapped for Tailwind CSS
 *
 * @example
 * ```ts
 * wrapColorTokens(
 *   { black: '0.2781 0.0296 256.85', transparent: 'transparent' }
 * )
 * // => { black: 'oklch(var(--color-black))', transparent: 'transparent' }
 *
 * wrapColorTokens(
 *   { black: '0.2781 0.0296 256.85' },
 *   { colorFunctionAlphaValue: '/ <alpha-value>' }
 * )
 * // => { black: 'oklch(var(--color-black) / <alpha-value>)' }
 * ```
 */
export const wrapColorTokens = <T extends Record<string, string>>(
	colorTokens: T,
	colorFunctionOptions = {},
): { [K in keyof T]: string } => {
	const isRawCssKeyword = (value: string) =>
		["transparent", "inherit", "currentColor", "initial", "unset"].includes(
			value,
		);

	const { colorFunction, colorFunctionAlphaValue } = {
		...defaultColorFunctionOptions,
		...colorFunctionOptions,
	};

	const result: Record<string, string> = {};

	for (const [key, value] of Object.entries(colorTokens)) {
		result[key] = isRawCssKeyword(value)
			? value
			: `${colorFunction}(var(--color-${key})${colorFunctionAlphaValue ?? ""})`;
	}
	return result;
};
