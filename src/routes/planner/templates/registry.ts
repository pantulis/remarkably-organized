import type { Component } from 'svelte';
import type { PlannerSettings } from '$lib';
import MeetingNotesTemplate from './MeetingNotesTemplate.svelte';
import MeetingNotesSettings from './MeetingNotesSettings.svelte';
import MeetingNotesHelp from './MeetingNotesHelp.svelte';
import TaskIndexTemplate from './TaskIndexTemplate.svelte';
import TaskIndexSettings from './TaskIndexSettings.svelte';
import TaskIndexHelp from './TaskIndexHelp.svelte';

/** The set of available planner templates (one per route). */
export type TemplateId = 'meeting-notes' | 'task-index';

export interface TemplateDef {
	/** Stable id for the template */
	id: TemplateId;
	/** User-facing name (used in the chooser, help title, etc.) */
	name: string;
	/** Prefix used for the document title / default PDF filename */
	docName: string;
	/** The settings-panel fragment for this template */
	Settings: Component<{ settings: PlannerSettings }>;
	/** The component that renders all of this template's pages */
	Render: Component<{ settings: PlannerSettings }>;
	/** The "how to use" body shown in the help modal */
	Help: Component;
	/** The first internal anchor, used by the cover's "Open Planner" link */
	firstAnchor: (settings: PlannerSettings) => string;
}

export const meetingNotes: TemplateDef = {
	id: 'meeting-notes',
	name: 'Monthly Meeting Planner',
	docName: 'Meeting Notes',
	Settings: MeetingNotesSettings,
	Render: MeetingNotesTemplate,
	Help: MeetingNotesHelp,
	firstAnchor: (settings) => (settings.weeks.length ? `#${settings.weeks[0].id}` : ''),
};

export const taskIndex: TemplateDef = {
	id: 'task-index',
	name: 'Monthly Task List',
	docName: 'Tasks',
	Settings: TaskIndexSettings,
	Render: TaskIndexTemplate,
	Help: TaskIndexHelp,
	firstAnchor: () => '#tasks',
};

export const templates: TemplateDef[] = [meetingNotes, taskIndex];

export function getTemplate(id: TemplateId): TemplateDef {
	return templates.find((t) => t.id === id) ?? templates[0];
}
