export type FontCategory =
	| 'Sans Serif'
	| 'Serif'
	| 'Slab Serif'
	| 'Monospace'
	| 'Display'
	| 'Handwriting';

export interface Font {
	/** The Google Fonts family name */
	name: string;
	/** A normalization multiplier so different fonts render at a comparable size */
	size: number;
	/** The font-weight used for bold/heading text */
	boldWeight: number;
	/** The font-weight used for normal/body text */
	normalWeight: number;
	/** The font-weight used for light/secondary text */
	lightWeight: number;
	/** The category used to group the font in the picker */
	category: FontCategory;
}

/** The order categories are displayed in the font picker */
export const fontCategories: FontCategory[] = [
	'Sans Serif',
	'Serif',
	'Slab Serif',
	'Monospace',
	'Handwriting',
	'Display',
];

/**
 * The catalog of selectable fonts. Every font is a free, open-source family
 * served by Google Fonts (SIL Open Font License or Apache License 2.0), so they
 * are all free for personal and commercial use.
 */
export const fonts: Font[] = [
	// --- Sans Serif ---
	{
		name: 'Inter',
		size: 0.8,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Lato',
		size: 0.86,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Manrope',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Montserrat',
		size: 0.77,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Nunito',
		size: 0.8,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Open Sans',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Oswald',
		size: 0.92,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Poppins',
		size: 0.75,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Quicksand',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Sans Serif',
	},
	{
		name: 'Raleway',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Roboto',
		size: 0.82,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Roboto Condensed',
		size: 0.93,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Rubik',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Source Sans 3',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},
	{
		name: 'Work Sans',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Sans Serif',
	},

	// --- Serif ---
	{
		name: 'Crimson Text',
		size: 0.92,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'DM Serif Display',
		size: 0.85,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'EB Garamond',
		size: 0.92,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'Libre Baskerville',
		size: 0.76,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'Lora',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'Merriweather',
		size: 0.78,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Serif',
	},
	{
		name: 'Playfair Display',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'PT Serif',
		size: 0.84,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Serif',
	},
	{
		name: 'Source Serif 4',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Serif',
	},

	// --- Slab Serif ---
	{
		name: 'Arvo',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Slab Serif',
	},
	{
		name: 'Bitter',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Slab Serif',
	},
	{
		name: 'Roboto Slab',
		size: 0.8,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Slab Serif',
	},
	{
		name: 'Zilla Slab',
		size: 0.84,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Slab Serif',
	},

	// --- Monospace ---
	{
		name: 'IBM Plex Mono',
		size: 0.8,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Monospace',
	},
	{
		name: 'Inconsolata',
		size: 0.86,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Monospace',
	},
	{
		name: 'JetBrains Mono',
		size: 0.8,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Monospace',
	},
	{
		name: 'Space Mono',
		size: 0.82,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Monospace',
	},

	// --- Handwriting ---
	{
		name: 'Architects Daughter',
		size: 0.9,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Caveat',
		size: 1.13,
		boldWeight: 700,
		normalWeight: 700,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Caveat Brush',
		size: 1.07,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Dancing Script',
		size: 1,
		boldWeight: 600,
		normalWeight: 600,
		lightWeight: 600,
		category: 'Handwriting',
	},
	{
		name: 'Gloria Hallelujah',
		size: 0.82,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Indie Flower',
		size: 0.93,
		boldWeight: 600,
		normalWeight: 600,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Just Another Hand',
		size: 1.4,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Kalam',
		size: 0.92,
		boldWeight: 700,
		normalWeight: 400,
		lightWeight: 300,
		category: 'Handwriting',
	},
	{
		name: 'Pacifico',
		size: 0.87,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Patrick Hand',
		size: 1,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Permanent Marker',
		size: 0.83,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Rancho',
		size: 1.15,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Satisfy',
		size: 1,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Handwriting',
	},
	{
		name: 'Shadows Into Light Two',
		size: 1,
		boldWeight: 600,
		normalWeight: 600,
		lightWeight: 400,
		category: 'Handwriting',
	},

	// --- Display ---
	{
		name: 'Abril Fatface',
		size: 0.82,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
	{
		name: 'Acme',
		size: 0.92,
		boldWeight: 800,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
	{
		name: 'Anton',
		size: 0.88,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
	{
		name: 'Bebas Neue',
		size: 1.15,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
	{
		name: 'Lilita One',
		size: 0.85,
		boldWeight: 400,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
	{
		name: 'Lobster',
		size: 0.92,
		boldWeight: 600,
		normalWeight: 400,
		lightWeight: 400,
		category: 'Display',
	},
];

export function getGoogleFontURL(fonts: string[]) {
	return `https://fonts.googleapis.com/css2?display=swap&${new URLSearchParams(
		Array.from(
			new Set(
				fonts.map((font) => ['family', `${font}:wght@100;200;300;400;500;600;700`]),
			),
		),
	).toString()}`;
}

export function getFontInfo(fontName: string) {
	return fonts.find((font) => font.name === fontName);
}
