<script lang="ts">
	import { getFirstDayOfWeek, type PlannerSettings, type Week } from '$lib';

	let { week = {} as Week, settings = {} as PlannerSettings } = $props();

	// The Monday of this week (workdays are always Mon–Fri, regardless of the
	// "start week on Sunday" setting which only affects week boundaries).
	const monday = $derived(new Date(getFirstDayOfWeek(week.start, false)));
	const workdays = $derived(
		new Array(5).fill(0).map((_, i) => new Date(monday.getTime() + i * 86400000)),
	);
	const monthShort = $derived(
		monday.toLocaleString('default', { month: 'short', timeZone: 'UTC' }),
	);
	const meetings = $derived(
		new Array(Math.max(1, settings.weekPage.meetingsPerWeek || 1)).fill(0),
	);
</script>

<div class="meeting-index">
	<header>
		<div class="month">{monthShort}</div>
		<ol class="workdays">
			{#each workdays as day (day.getTime())}
				<li>
					<span class="weekday">
						{day.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })}
					</span>
					<span class="date">{day.getUTCDate()}</span>
				</li>
			{/each}
		</ol>
	</header>

	<div class="rows">
		<div class="row labels">
			<span class="date">Date</span>
			<span class="client">Client</span>
			<span class="desc">Meeting</span>
			<span class="link">Notes</span>
		</div>
		{#each meetings as _, i (i)}
			<div class="row">
				<span class="date"></span>
				<span class="client"></span>
				<span class="desc"></span>
				<a class="link" href="#{week.id}-m{i + 1}">{i + 1}&nbsp;›</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.meeting-index {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0 1.5rem 1rem;
	}
	header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 0.25rem 0 0.75rem;
		.month {
			font-family: var(--font-display, inherit);
			font-size: 2.2em;
			line-height: 1;
			font-weight: var(--font-weight-bold);
			text-transform: uppercase;
			color: var(--text-high, var(--text));
		}
		ol.workdays {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			flex: 1;
			justify-content: space-between;
			gap: 0.5rem;
			li {
				display: flex;
				align-items: baseline;
				gap: 0.3rem;
				font-weight: var(--font-weight-light);
				.weekday {
					font-size: 0.8em;
					color: var(--text-low);
				}
				.date {
					font-size: 1.1em;
				}
			}
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
		.date {
			width: 5.5rem;
		}
		.client {
			width: 7rem;
			border-left: solid 1px var(--outline);
		}
		.desc {
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
		.date,
		.client,
		.desc,
		.link {
			padding-top: 0.15rem;
			padding-bottom: 0.15rem;
		}
	}
</style>
