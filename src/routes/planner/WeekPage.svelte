<script lang="ts">
	import { PlannerSettings, intersect, type Week } from '$lib';
	import Page from '$lib/components/Page.svelte';
	import MeetingIndex from '$lib/components/MeetingIndex.svelte';
	import MeetingSummary from '$lib/components/MeetingSummary.svelte';
	import PageNav from '$lib/components/PageNav.svelte';
	import SideNav from './SideNav.svelte';
	import TopNav from './TopNav.svelte';

	let { week = {} as Week, settings = {} as PlannerSettings } = $props();

	const meetingsPerWeek = $derived(Math.max(1, settings.weekPage.meetingsPerWeek || 1));
	// The summary page counts as the first note page for each meeting.
	const extraNotePages = $derived(
		Math.max(0, (settings.weekPage.notePagesPerMeeting || 1) - 1),
	);

	// A label for a week's date span, e.g. "1-7 Jun" (or "29 Jun - 5 Jul").
	function rangeLabel(w: Week) {
		const startDay = w.start.getUTCDate();
		const endDay = w.end.getUTCDate();
		const startMonth = w.start.toLocaleString('default', {
			month: 'short',
			timeZone: 'UTC',
		});
		const endMonth = w.end.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
		return startMonth === endMonth
			? `${startDay}-${endDay} ${startMonth}`
			: `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
	}
	const weekRange = $derived(rangeLabel(week));

	// One sidebar tab per week of the month.
	const weekTabs = $derived(
		settings.weeks.map((w) => ({
			href: `#${w.id}`,
			active: w.id === week.id,
			sublabel: settings.weekPage.useWeekNumbersInSideNav
				? 'WK'
				: w.start.toLocaleString('default', { month: 'short', timeZone: 'UTC' }),
			label: settings.weekPage.useWeekNumbersInSideNav
				? settings.weekPage.useWeekSinceYear
					? w.weekSinceYear
					: w.weekSinceMonth
				: w.start.getUTCDate(),
		})),
	);
</script>

<article id={week.id} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
	<SideNav {settings} tabs={weekTabs} />
	<TopNav {settings} breadcrumbs={[{ name: `Week ${weekRange}`, href: `#${week.id}` }]} />
	<MeetingIndex {week} {settings} />
</article>

{#each new Array(meetingsPerWeek) as _, m (m)}
	{@const meetingId = `${week.id}-m${m + 1}`}
	<article
		id={meetingId}
		class="meeting"
		use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
		<SideNav {settings} tabs={weekTabs} />
		<TopNav
			{settings}
			breadcrumbs={[
				{ name: `WK ${weekRange}`, href: `#${week.id}` },
				{ name: `Meeting ${m + 1}`, href: `#${meetingId}` },
			]} />
		<MeetingSummary />
		<PageNav
			baseId={meetingId}
			totalPages={settings.weekPage.notePagesPerMeeting}
			current={1} />
	</article>
	{#each new Array(extraNotePages) as _, p (p)}
		<article
			id="{meetingId}-pg{p + 2}"
			class="meeting"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
			<SideNav {settings} tabs={weekTabs} />
			<TopNav
				{settings}
				breadcrumbs={[
					{ name: `WK ${weekRange}`, href: `#${week.id}` },
					{ name: `Meeting ${m + 1}`, href: `#${meetingId}` },
					{ name: `Page ${p + 2}`, href: `#${meetingId}-pg${p + 2}` },
				]} />
			<Page display={settings.weekPage.notePagesTemplate} {settings} timeframe={week} />
			<PageNav
				baseId={meetingId}
				totalPages={settings.weekPage.notePagesPerMeeting}
				current={p + 2} />
		</article>
	{/each}
{/each}

<style lang="scss">
	article {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-left: var(--sidenav-width);
		padding-top: var(--topnav-height);
	}
	/* Reserve room at the bottom for the meeting navigation pills. */
	article.meeting {
		padding-bottom: 2.75rem;
	}
	:global(main.side-nav-right) article {
		padding-right: var(--sidenav-width);
		padding-left: 0;
	}
</style>
