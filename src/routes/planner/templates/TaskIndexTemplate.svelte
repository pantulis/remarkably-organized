<script lang="ts">
	import { PlannerSettings, intersect } from '$lib';
	import Page from '$lib/components/Page.svelte';
	import TaskIndex from '$lib/components/TaskIndex.svelte';
	import PageNav from '$lib/components/PageNav.svelte';
	import SideNav from '../SideNav.svelte';
	import TopNav from '../TopNav.svelte';

	let { settings = {} as PlannerSettings } = $props();

	const ROWS_PER_PAGE = 30;
	const PAGES_PER_GROUP = 10;
	// The sidebar holds ~17 pills. In grouped mode that's 10 (the expanded current
	// group) + 7 other group pills = 8 groups → 8 × 10 × 30 = 2400 tasks.
	const MAX_TASKS = 2400;
	const total = $derived(
		Math.min(MAX_TASKS, Math.max(1, settings.taskIndex.tasksPerMonth || 1)),
	);
	const numIndexPages = $derived(Math.ceil(total / ROWS_PER_PAGE));
	const notePages = $derived(Math.max(1, settings.taskIndex.notePagesPerTask || 1));
	const extraNotePages = $derived(notePages - 1);

	const indexAnchor = (k: number) => (k === 0 ? 'tasks' : `tasks-pg${k + 1}`);

	interface IndexTab {
		href: string;
		label: string | number;
		active?: boolean;
		compact?: boolean;
	}

	// Build the sidebar navigation for the index pages. Up to 15 pages get one
	// pill each. Beyond that, collapse into groups of 10: the group containing the
	// current page expands into individual page pills, the others stay as range
	// pills (e.g. "11-20") that jump into that group.
	function buildIndexTabs(pageCount: number, current: number): IndexTab[] {
		if (pageCount <= 1) return [];
		if (pageCount <= 15) {
			return new Array(pageCount).fill(0).map((_, i) => ({
				href: `#${indexAnchor(i)}`,
				label: i + 1,
				active: i === current,
			}));
		}
		const numGroups = Math.ceil(pageCount / PAGES_PER_GROUP);
		const currentGroup = Math.floor(current / PAGES_PER_GROUP);
		const tabs: IndexTab[] = [];
		for (let g = 0; g < numGroups; g++) {
			const startIdx = g * PAGES_PER_GROUP;
			const endIdx = Math.min(startIdx + PAGES_PER_GROUP, pageCount) - 1;
			if (g === currentGroup) {
				for (let i = startIdx; i <= endIdx; i++) {
					tabs.push({ href: `#${indexAnchor(i)}`, label: i + 1, active: i === current });
				}
			} else {
				tabs.push({
					href: `#${indexAnchor(startIdx)}`,
					label: `${startIdx + 1}-${endIdx + 1}`,
					compact: true,
				});
			}
		}
		return tabs;
	}
</script>

{#each new Array(numIndexPages) as _, k (k)}
	{@const pageId = indexAnchor(k)}
	{@const start = k * ROWS_PER_PAGE}
	{@const count = Math.min(ROWS_PER_PAGE, total - start)}
	<article id={pageId} use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
		<SideNav {settings} tabs={buildIndexTabs(numIndexPages, k)} />
		<TopNav
			{settings}
			breadcrumbs={[
				{ name: 'Tasks', href: '#tasks' },
				...(numIndexPages > 1
					? [{ name: `${start + 1}-${start + count}`, href: `#${pageId}` }]
					: []),
			]} />
		<TaskIndex {settings} {start} {count} />
	</article>
{/each}

{#each new Array(total) as _, t (t)}
	{@const taskId = `task-${t + 1}`}
	<article
		id={taskId}
		class="task"
		use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
		<SideNav {settings} tabs={[]} />
		<TopNav
			{settings}
			breadcrumbs={[
				{ name: 'Tasks', href: '#tasks' },
				{ name: `Task ${t + 1}`, href: `#${taskId}` },
			]} />
		<Page display={settings.taskIndex.notePagesTemplate} {settings} />
		<PageNav baseId={taskId} totalPages={notePages} current={1} firstLabel="1" />
	</article>
	{#each new Array(extraNotePages) as _, p (p)}
		<article
			id="{taskId}-pg{p + 2}"
			class="task"
			use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
			<SideNav {settings} tabs={[]} />
			<TopNav
				{settings}
				breadcrumbs={[
					{ name: 'Tasks', href: '#tasks' },
					{ name: `Task ${t + 1}`, href: `#${taskId}` },
					{ name: `Page ${p + 2}`, href: `#${taskId}-pg${p + 2}` },
				]} />
			<Page display={settings.taskIndex.notePagesTemplate} {settings} />
			<PageNav baseId={taskId} totalPages={notePages} current={p + 2} firstLabel="1" />
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
	/* Reserve room at the bottom for the task navigation pills. */
	article.task {
		padding-bottom: 2.75rem;
	}
	:global(main.side-nav-right) article {
		padding-right: var(--sidenav-width);
		padding-left: 0;
	}
</style>
