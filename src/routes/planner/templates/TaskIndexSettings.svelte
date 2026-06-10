<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { notePageTemplates } from './note-templates';

	let { settings = {} as PlannerSettings } = $props();
</script>

<h3>Tasks</h3>
<fieldset>
	<label for="tasksPerMonth">Tasks per Month</label>
	<input
		type="number"
		id="tasksPerMonth"
		min="1"
		max="2400"
		step="1"
		bind:value={settings.taskIndex.tasksPerMonth} />
</fieldset>
<fieldset>
	<label for="notePagesPerTask">Note Pages per Task</label>
	<input
		type="number"
		id="notePagesPerTask"
		min="1"
		step="1"
		bind:value={settings.taskIndex.notePagesPerTask} />
</fieldset>
<fieldset>
	<label for="taskNotePagesTemplate">Note Page Style</label>
	<select id="taskNotePagesTemplate" bind:value={settings.taskIndex.notePagesTemplate}>
		{#each notePageTemplates as template (template.value)}
			<option value={template.value}>{template.name}</option>
		{/each}
	</select>
</fieldset>
