import type { PageTemplate } from '$lib';

/** The note-page background styles offered for template note pages. */
export const notePageTemplates: { name: string; value: PageTemplate }[] = [
	{ name: 'Lined', value: 'lined' },
	{ name: 'Dotted Grid', value: 'dotted' },
	{ name: 'Grid', value: 'grid' },
	{ name: 'Blank', value: 'blank' },
];
