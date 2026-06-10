<script lang="ts">
	import { PlannerSettings } from '$lib';
	import { getFontInfo } from '../fonts/fonts';

	interface Tab {
		/** The main (large) label, e.g. a day-of-month or a number */
		label: string | number;
		/** An optional small label shown above/before the main one, e.g. a month */
		sublabel?: string;
		href: string;
		active?: boolean;
		/** Render with a smaller font (used for grouped range pills like "11-20") */
		compact?: boolean;
	}

	let { settings = {} as PlannerSettings, tabs = [] as Tab[] } = $props();
</script>

{#if !settings.sideNav.disable}
	<nav
		class:right={!settings.sideNav.leftSide}
		style:font-family="'{settings.sideNav.font}'"
		style:font-size="{getFontInfo(settings.sideNav.font)?.size || 1}rem">
		{#if tabs.length}
			<ol class="tabs">
				{#each tabs as tab (tab.href)}
					<li class="tab" class:compact={tab.compact}>
						<a href={tab.href} class:active={tab.active}>
							{#if tab.sublabel}<small>{tab.sublabel}</small>{/if}
							{tab.label}
						</a>
					</li>
				{/each}
			</ol>
		{/if}
		<div class="spacer"></div>
	</nav>
{/if}

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: var(--sidenav-width);
		padding: var(--sidenav-width) 0 0;
		background-color: var(--nav-bg);
		&.right {
			left: auto;
			right: 0;
		}
	}
	.spacer {
		flex: 1;
	}
	ol {
		list-style: none;
		padding: 0;
		width: 100%;
		margin: 0;
	}
	ol.tabs {
		// Offset the list by two row heights (each row is 0.75rem top + 0.75rem
		// bottom padding + 1.3rem line-height = 2.8rem) so the first tab starts lower.
		padding-top: 5.6rem;
	}
	ol.tabs > li {
		padding: 0 0 0 2px;
		margin: 0;
		width: 100%;
		&.tab {
			a {
				font-size: 1.25em;
				line-height: 1.3rem;
			}
			small {
				color: currentColor;
				line-height: 1.3rem;
				font-size: 0.6em;
				margin-right: 0.15em;
			}
		}
		&.tab.compact a {
			font-size: 0.62em;
			letter-spacing: -0.02em;
			padding: 0.55rem 0;
		}
		a {
			--radius: 10px;
			text-decoration: none;
			width: 100%;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
			padding: 0.75rem 0;
			color: var(--text-low);
			font-size: 1.1em;
			line-height: 1.5rem;
			position: relative;
			border-radius: var(--radius);
			&.active {
				background-color: var(--bg);
				color: var(--text-high);
			}
		}
		a.active {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			box-shadow: 1px 0 var(--bg);
			z-index: 1;
			&::before,
			&::after {
				content: '';
				height: calc(2 * var(--radius));
				width: var(--radius);
				position: absolute;
			}
			&::before {
				right: 0;
				top: calc(-2 * var(--radius));
				border-top-right-radius: 0;
				border-bottom-right-radius: var(--radius);
				box-shadow: var(--bg) 1px var(--radius) 0px 0px;
			}
			&::after {
				right: 0;
				bottom: calc(-2 * var(--radius));
				border-top-left-radius: 0;
				border-top-right-radius: var(--radius);
				box-shadow: var(--bg) 1px calc(-1 * var(--radius)) 0px 0px;
			}
		}
	}
	nav.right ol.tabs > li {
		padding: 0 2px 0 0;
		a.active {
			border-top-right-radius: var(--radius);
			border-bottom-right-radius: var(--radius);
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			box-shadow: -1px 0 var(--bg);
			&::before {
				right: unset;
				top: calc(-2 * var(--radius));
				left: 0;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: var(--radius);
				box-shadow: var(--bg) -1px var(--radius) 0px 0px;
			}
			&::after {
				right: unset;
				left: 0;
				bottom: calc(-2 * var(--radius));
				border-top-right-radius: 0;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
				border-top-left-radius: var(--radius);
				box-shadow: var(--bg) -1px calc(-1 * var(--radius)) 0px 0px;
			}
		}
	}
</style>
