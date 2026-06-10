/**
 * The page template used for note/meeting pages.
 * 'blank' - An empty page
 * 'grid' - A grid printed on the page
 * 'dotted' - A grid of dots printed on the page
 * 'lined' - Horizontal ruled lines
 * 'numbered' - Numbered lines
 * 'todo' - Lines with a checkbox
 */
export type PageTemplate =
	| 'blank'
	| 'grid'
	| 'grid-small'
	| 'grid-large'
	| 'dotted'
	| 'dotted-small'
	| 'dotted-large'
	| 'lined'
	| 'lined-small'
	| 'lined-large'
	| 'numbered'
	| 'numbered-small'
	| 'numbered-large'
	| 'todo'
	| 'todo-small'
	| 'todo-large';
