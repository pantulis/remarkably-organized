<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import WeekPage from '../WeekPage.svelte';

	let { settings = {} as PlannerSettings } = $props();
</script>

{#each settings.weeks as week (week.id)}
	<WeekPage {settings} {week} />
{/each}
