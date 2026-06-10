<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { notePageTemplates } from './note-templates';

	let { settings = {} as PlannerSettings } = $props();
</script>

<h3>Meetings</h3>
<fieldset>
	<label for="meetingsPerWeek">Meetings per Week</label>
	<input
		type="number"
		id="meetingsPerWeek"
		min="1"
		max="180"
		step="1"
		bind:value={settings.weekPage.meetingsPerWeek} />
</fieldset>
<fieldset>
	<label for="notePagesPerMeeting">Note Pages per Meeting</label>
	<input
		type="number"
		id="notePagesPerMeeting"
		min="1"
		step="1"
		bind:value={settings.weekPage.notePagesPerMeeting} />
</fieldset>
<fieldset>
	<label for="meetingNotePagesTemplate">Note Page Style</label>
	<select id="meetingNotePagesTemplate" bind:value={settings.weekPage.notePagesTemplate}>
		{#each notePageTemplates as template (template.value)}
			<option value={template.value}>{template.name}</option>
		{/each}
	</select>
</fieldset>
<div class="checkbox">
	<input
		type="checkbox"
		bind:checked={settings.weekPage.useWeekNumbersInSideNav}
		id="useWeekNumbersInSideNav" />
	<label for="useWeekNumbersInSideNav">Show week numbers in side bar</label>
</div>
