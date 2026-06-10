<script lang="ts">
	let {
		baseId = '' as string,
		totalPages = 1 as number,
		current = 1 as number,
		firstLabel = 'Summary' as string,
	} = $props();

	// Page 1 lives at #{baseId}; pages 2..N live at #{baseId}-pg{n}.
	const restPages = $derived(
		new Array(Math.max(0, totalPages - 1)).fill(0).map((_, i) => i + 2),
	);
</script>

{#if totalPages > 1}
	<nav class="page-nav">
		<a href="#{baseId}" class:active={current === 1}>{firstLabel}</a>
		{#each restPages as n (n)}
			<a href="#{baseId}-pg{n}" class:active={current === n}>{n}</a>
		{/each}
	</nav>
{/if}

<style lang="scss">
	.page-nav {
		position: absolute;
		bottom: 0;
		left: var(--sidenav-width);
		right: 0;
		height: 2.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		z-index: 2;
		a {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 1.75rem;
			height: 1.6rem;
			padding: 0 0.6rem;
			border-radius: 999px;
			border: solid 1px var(--outline-high, var(--outline));
			color: var(--text-low);
			text-decoration: none;
			font-size: 0.8em;
			font-weight: var(--font-weight-light);
			line-height: 1;
			&.active {
				background-color: var(--text);
				border-color: var(--text);
				color: var(--bg);
				font-weight: var(--font-weight-bold);
			}
		}
	}
	:global(main.side-nav-right) .page-nav {
		left: 0;
		right: var(--sidenav-width);
	}
</style>
