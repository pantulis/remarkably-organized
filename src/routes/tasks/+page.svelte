<script lang="ts">
	import PlannerApp from '../planner/PlannerApp.svelte';
	import { taskIndex } from '../planner/templates/registry';

	let { data } = $props();
</script>

<PlannerApp template={taskIndex} settings={data.settings} />
