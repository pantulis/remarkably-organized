<script lang="ts">
	const sections = [
		{ name: 'Attendees', lines: 5, todo: false },
		{ name: 'Topics', lines: 8, todo: false },
		{ name: 'Action Points', lines: 8, todo: true },
	];
</script>

<div class="meeting-summary">
	{#each sections as section (section.name)}
		<section style:--lines={section.lines}>
			<h3>{section.name}</h3>
			<div class="lines">
				{#each new Array(section.lines) as _, i (i)}
					<div class="line" class:todo={section.todo}>
						{#if section.todo}☐{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style lang="scss">
	.meeting-summary {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0.25rem 1.5rem 1rem;
		gap: 0.5rem;
	}
	section {
		display: flex;
		flex-direction: column;
		flex: var(--lines);
		min-height: 0;
		h3 {
			margin: 0 0 0.15rem;
			font-size: 0.8em;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--text-low);
			font-weight: var(--font-weight-bold);
		}
		.lines {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.line {
			flex: 1;
			border-bottom: solid 1px var(--outline);
			display: flex;
			align-items: center;
			font-weight: var(--font-weight-light);
			&.todo {
				font-size: 1.05em;
			}
		}
	}
</style>
