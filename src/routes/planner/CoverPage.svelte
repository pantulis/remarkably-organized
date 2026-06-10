<script lang="ts">
	import { intersect, type PlannerSettings } from '$lib';
	import { getFontInfo } from '../fonts/fonts';

	let { settings = {} as PlannerSettings, plannerLink = '' as string } = $props();

	const monthName = $derived(
		settings.date.start.toLocaleString('default', { month: 'long', timeZone: 'UTC' }),
	);
	const year = $derived(settings.date.start.getUTCFullYear());
</script>

<article
	class:dark={settings.coverPage.darkBackground}
	use:intersect={{ rootMargin: '1000px 0px 1000px 0px' }}>
	<header>
		{#if settings.coverPage.title}
			<h1
				class="title"
				style:font-family="'{settings.coverPage.font}'"
				style:font-size="{(getFontInfo(settings.coverPage.font)?.size || 1) * 5}rem"
				style:font-weight={getFontInfo(settings.coverPage.font)?.boldWeight || 400}>
				{settings.coverPage.title}
			</h1>
		{:else}
			<h1
				style:font-family="'{settings.coverPage.font}'"
				style:font-size="{(getFontInfo(settings.coverPage.font)?.size || 1) * 7}rem"
				style:font-weight={getFontInfo(settings.coverPage.font)?.boldWeight || 400}>
				<small>{monthName}</small>
				{year}
			</h1>
		{/if}
		{#if plannerLink}
			<div class="links">
				<a href={plannerLink}>Open Planner</a>
			</div>
		{/if}
	</header>
	{#if settings.coverPage.name || settings.coverPage.email}
		<footer>
			{settings.coverPage.name}
			<small>{settings.coverPage.email}</small>
		</footer>
	{/if}
</article>

<style lang="scss">
	header {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0 0 2rem 0;
	}
	article {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		&.dark {
			background-color: #3d3d3d;
			color: #ccc;
			h1 {
				color: white;
			}
			.links a {
				color: #ccc;
			}
		}
	}
	.links {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2rem auto 0;
		flex-wrap: wrap;
		max-width: 80%;
		a {
			display: flex;
			border-radius: 10px;
			text-decoration: none;
			padding: 1rem 0.75rem;
			font-weight: var(--font-weight-bold);
			font-size: 1.5em;
		}
	}
	h1 {
		line-height: 100%;
		text-align: center;
		margin: 0;
		padding: 0 2rem;
		text-wrap: balance;
		display: flex;
		flex-direction: column;
		align-items: center;
		small {
			line-height: 100%;
			font-size: 0.35em;
		}
	}
	footer {
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 1.4em;
		small {
			opacity: 0.8;
			color: currentColor;
		}
	}
</style>
