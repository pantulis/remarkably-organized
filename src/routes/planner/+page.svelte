<script lang="ts">
	import PlannerApp from './PlannerApp.svelte';
	import { meetingNotes } from './templates/registry';

	let { data } = $props();
</script>

<PlannerApp template={meetingNotes} settings={data.settings} />
