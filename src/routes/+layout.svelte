<script lang="ts">
	import { dev } from '$app/environment';
	import '$lib/styles/global.scss';
</script>

<svelte:head>
	<title>Remarkably Organized</title>
	{#if !dev}
		<script
			data-name="BMC-Widget"
			data-cfasync="false"
			src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
			data-id="brianschwabauer"
			data-description="Support Brian Schwabauer on Buy me a coffee!"
			data-message="Hi! This planner is built on Brian Schwabauer's open-source project. If you like this project, consider buying Brian a coffee! He'd appreciate it!"
			data-color="#5F7FFF"
			data-position="left"
			data-x_margin="12"
			data-y_margin="12"></script>
	{/if}
</svelte:head>
<slot />

<style lang="scss">
	:global(body > *:not(#root)) {
		@media print {
			display: none !important;
		}
	}
</style>
