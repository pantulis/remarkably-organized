<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let {
		settings = {} as PlannerSettings,
		start = 0 as number,
		count = 0 as number,
	} = $props();

	const monthShort = $derived(
		settings.date.start.toLocaleString('default', { month: 'short', timeZone: 'UTC' }),
	);
	// The 1-based task numbers shown on this index page.
	const tasks = $derived(
		new Array(Math.max(0, count)).fill(0).map((_, i) => start + i + 1),
	);
</script>

<div class="task-index">
	<header>
		<div class="month">{monthShort}</div>
		<div class="title">Tasks</div>
		{#if tasks.length}
			<div class="range">{tasks[0]}–{tasks[tasks.length - 1]}</div>
		{/if}
	</header>

	<div class="rows">
		<div class="row labels">
			<span class="check"></span>
			<span class="due">Due</span>
			<span class="category">Category</span>
			<span class="task">Task</span>
			<span class="link">Notes</span>
		</div>
		{#each tasks as n (n)}
			<div class="row">
				<span class="check">☐</span>
				<span class="due"></span>
				<span class="category"></span>
				<span class="task"></span>
				<a class="link" href="#task-{n}">{n}&nbsp;›</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.task-index {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0 1.5rem 1rem;
	}
	header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.25rem 0 0.75rem;
		.month {
			font-size: 2.2em;
			line-height: 1;
			font-weight: var(--font-weight-bold);
			text-transform: uppercase;
			color: var(--text-high, var(--text));
		}
		.title {
			font-size: 1.3em;
			font-weight: var(--font-weight-light);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--text-low);
		}
		.range {
			margin-left: auto;
			font-size: 1em;
			font-weight: var(--font-weight-light);
			color: var(--text-low);
		}
	}
	.rows {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.row {
		flex: 1;
		display: flex;
		align-items: stretch;
		border-bottom: solid 1px var(--outline);
		font-weight: var(--font-weight-light);
		font-size: 0.95em;
		span,
		a {
			display: flex;
			align-items: center;
			padding: 0 0.5rem;
		}
		.check {
			width: 1.75rem;
			justify-content: center;
			font-size: 1.1em;
		}
		.due {
			width: 5rem;
			border-left: solid 1px var(--outline);
		}
		.category {
			width: 7rem;
			border-left: solid 1px var(--outline);
		}
		.task {
			flex: 1;
			border-left: solid 1px var(--outline);
		}
		.link {
			width: 3rem;
			justify-content: flex-end;
			border-left: solid 1px var(--outline);
			color: var(--text-low);
			text-decoration: none;
			white-space: nowrap;
		}
	}
	.row.labels {
		flex: 0 0 auto;
		border-bottom: solid 1px var(--outline-high, var(--outline));
		font-size: 0.7em;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-low);
		.check,
		.due,
		.category,
		.task,
		.link {
			padding-top: 0.15rem;
			padding-bottom: 0.15rem;
		}
	}
</style>
