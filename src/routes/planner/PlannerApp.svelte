<script lang="ts">
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import SettingsIcon from '~icons/fa/cog';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';
	import CoverPage from './CoverPage.svelte';
	import HelpModal from './HelpModal.svelte';
	import { browser } from '$app/environment';
	import { fonts, fontCategories, getGoogleFontURL } from '../fonts/fonts';
	import Toast from '$lib/components/Toast.svelte';
	import type { PlannerSettings } from '$lib';
	import type { TemplateDef } from './templates/registry';

	let { template, settings }: { template: TemplateDef; settings: PlannerSettings } =
		$props();

	const TemplateSettings = $derived(template.Settings);
	const TemplateRender = $derived(template.Render);
	const Help = $derived(template.Help);

	const font = $derived(fonts.find((f) => f.name === settings.design.font) ?? fonts[0]);
	const googleFontURL = $derived(
		getGoogleFontURL([
			settings.design.font,
			settings.coverPage.font,
			settings.topNav.font,
			settings.sideNav.font,
		]),
	);
	const googleFontImport = $derived(
		googleFontURL ? `@import url("${googleFontURL}");` : '',
	);

	const monthValue = $derived(
		`${settings.date.start.getUTCFullYear()}-${String(
			settings.date.start.getUTCMonth() + 1,
		).padStart(2, '0')}`,
	);

	// The document title doubles as the default filename when printing to PDF.
	const pdfTitle = $derived(
		`${template.docName} ${settings.date.start.toLocaleString('default', {
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC',
		})}`,
	);

	// A clean, control-free view (no settings panel or gear) for previews/screenshots.
	const cleanView = page.url.searchParams.get('menu') === '0';
	let showHelp = $state(page.url.searchParams.get('help') !== '0');
	let showMenu = $state(!cleanView);
	let showAdvancedSettings = $state(false);
	let enableHighResolution = $state(page.url.searchParams.has('highres'));
	let loadPages = $state(
		page.url.searchParams.get('help') === '0' &&
			(browser || page.url.searchParams.get('load') === '1'),
	);

	let settingsUrlInitialized = false;
	$effect(() => {
		const url = new URL(document.location.href);
		if (settings.edits) {
			url.searchParams.set('settings', JSON.stringify(settings.edits));
			replaceState(url, {});
		} else if (settingsUrlInitialized) {
			url.searchParams.delete('settings');
			replaceState(url, {});
		}
		settingsUrlInitialized = true;
	});
	$effect(() => {
		const url = new URL(document.location.href);
		if (enableHighResolution && !url.searchParams.has('highres')) {
			url.searchParams.set('highres', '');
			replaceState(url, {});
		}
		if (!enableHighResolution && url.searchParams.has('highres')) {
			url.searchParams.delete('highres');
			replaceState(url, {});
		}
	});

	function onMonthChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.value) return;
		const [year, month] = target.value.split('-').map((v) => +v);
		if (!year || !month) return;
		const start = new Date(Date.UTC(year, month - 1, 1));
		const end = new Date(Date.UTC(year, month, 0));
		if (
			start.getTime() !== settings.date.start.getTime() ||
			end.getTime() !== settings.date.end.getTime()
		) {
			settings.date.start = start;
			settings.date.end = end;
		}
	}

	function onHelpClose() {
		showHelp = false;
		const url = new URL(document.location.href);
		url.searchParams.set('help', '0');
		replaceState(url, {});
		setTimeout(() => (loadPages = true), 180);
	}

	// Update the page printing resolution
	$effect(() => {
		let element = document.getElementById('page-resolution-style');
		if (!element) {
			element = document.createElement('style');
			element.id = 'page-resolution-style';
			document.head.appendChild(element);
		}
		element.innerHTML = `@page {${
			enableHighResolution ? 'size: 1404px 1872px;' : 'size: 702px 936px;'
		}margin: 0;}`;
	});
</script>

<svelte:head>
	<title>{pdfTitle}</title>
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#snippet fontOptions()}
	{#each fontCategories as category (category)}
		<optgroup label={category}>
			{#each fonts.filter((f) => f.category === category) as font (font.name)}
				<option value={font.name}>{font.name}</option>
			{/each}
		</optgroup>
	{/each}
{/snippet}

{#if showHelp}
	<HelpModal title="How to Use the {template.name}" onClose={onHelpClose}>
		<Help />
	</HelpModal>
{/if}

{#if showMenu}
	<div class="menu" transition:slide={{ duration: 200 }}>
		<h2>Settings</h2>
		<form>
			<fieldset>
				<label for="month">Month</label>
				<input type="month" id="month" value={monthValue} onchange={onMonthChange} />
			</fieldset>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={enableHighResolution}
					id="enableHighResolution" />
				<label for="enableHighResolution">Print in high resolution (bigger file)</label>
			</div>

			<h3>Font</h3>
			<fieldset>
				<label for="designFont">Page Font</label>
				<select id="designFont" bind:value={settings.design.font}>
					{@render fontOptions()}
				</select>
			</fieldset>

			<TemplateSettings {settings} />

			{#if showAdvancedSettings}
				<h3>Cover Page</h3>
				<div class="checkbox">
					<input
						type="checkbox"
						bind:checked={settings.coverPage.disable}
						id="disableCoverPage" />
					<label for="disableCoverPage">Disable Cover Page</label>
				</div>
				{#if !settings.coverPage.disable}
					<fieldset>
						<label for="coverPageTitle">Cover Page Title</label>
						<input
							type="text"
							placeholder="Cover Page Title"
							id="coverPageTitle"
							bind:value={settings.coverPage.title} />
					</fieldset>
					<fieldset>
						<label for="name">Contact Name</label>
						<input
							type="text"
							placeholder="Name"
							id="name"
							bind:value={settings.coverPage.name} />
					</fieldset>
					<fieldset>
						<label for="email">Contact Email/Phone</label>
						<input
							type="text"
							placeholder="Contact Email/Phone"
							id="email"
							bind:value={settings.coverPage.email} />
					</fieldset>
					<fieldset>
						<label for="coverPageFont">Font</label>
						<select id="coverPageFont" bind:value={settings.coverPage.font}>
							{@render fontOptions()}
						</select>
					</fieldset>
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.coverPage.darkBackground}
							id="coverPageDarkBackground" />
						<label for="coverPageDarkBackground">Dark Background</label>
					</div>
				{/if}

				<h3>Colors</h3>
				<fieldset>
					<label for="colorText">Text Color</label>
					<input type="color" id="colorText" bind:value={settings.design.colorText} />
				</fieldset>
				<fieldset>
					<label for="colorLines">Lines/Border Color</label>
					<input type="color" id="colorLines" bind:value={settings.design.colorLines} />
				</fieldset>
				<fieldset>
					<label for="colorDots">Dots Color</label>
					<input type="color" id="colorDots" bind:value={settings.design.colorDots} />
				</fieldset>

				<h3>Sidebar Navigation</h3>
				<div class="checkbox">
					<input
						type="checkbox"
						bind:checked={settings.sideNav.disable}
						id="sideNavDisable" />
					<label for="sideNavDisable">Disable Sidebar</label>
				</div>
				{#if !settings.sideNav.disable}
					<div class="checkbox">
						<input
							type="checkbox"
							bind:checked={settings.sideNav.leftSide}
							id="sideNavLeftSide" />
						<label for="sideNavLeftSide">Show Sidebar on Left</label>
					</div>
					<fieldset>
						<label for="sideNavFont">Font</label>
						<select id="sideNavFont" bind:value={settings.sideNav.font}>
							{@render fontOptions()}
						</select>
					</fieldset>
				{/if}

				<h3>Topbar Navigation</h3>
				<div class="checkbox">
					<input
						type="checkbox"
						bind:checked={settings.topNav.disable}
						id="topNavDisable" />
					<label for="topNavDisable">Disable Topbar</label>
				</div>
				{#if !settings.topNav.disable}
					<fieldset>
						<label for="topNavFont">Font</label>
						<select id="topNavFont" bind:value={settings.topNav.font}>
							{@render fontOptions()}
						</select>
					</fieldset>
				{/if}
			{:else}
				<button
					type="button"
					style="margin: 1rem 0;"
					onclick={() => (showAdvancedSettings = true)}>
					Advanced Settings
				</button>
			{/if}
		</form>
		<div class="actions">
			<button class="export" onclick={() => window.print()}>Print to PDF</button>
		</div>
	</div>
{/if}
{#if !cleanView}
	<button onclick={() => (showMenu = !showMenu)} class="menu-trigger">
		<SettingsIcon />
	</button>
{/if}
<Toast />

<main
	style:--doc-width="{702}px"
	style:--doc-height="{702 * (1 / (settings.design.aspectRatio || 1))}px"
	style:--sidenav-width="{settings.sideNav.disable ? 0 : settings.sideNav.width}px"
	style:--topnav-height="{settings.topNav.disable ? 0 : settings.topNav.height}px"
	style:--font="'{font.name}'"
	style:--font-size="{font.size}rem"
	style:--font-weight-bold={font.boldWeight}
	style:--font-weight-normal={font.normalWeight}
	style:--font-weight-light={font.lightWeight}
	style:--text={settings.design.colorText}
	style:--outline={settings.design.colorLines}
	style:--dots-color={settings.design.colorDots}
	style:font-size="{font.size}rem"
	class:side-nav-right={!settings.sideNav.leftSide}
	class:high-res={enableHighResolution}>
	<div id="home"></div>
	{#if !loadPages}
		<article
			style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
			<h1 style="margin-bottom: 2rem;">Loading...</h1>
			<LoadingIcon font-size="3rem" />
		</article>
	{/if}
	{#if !settings.coverPage.disable && loadPages}
		<CoverPage {settings} plannerLink={template.firstAnchor(settings)} />
	{/if}
	{#if loadPages}
		<TemplateRender {settings} />
	{/if}
</main>

<style lang="scss">
	main {
		font-family: var(--font);
		@supports (color: oklch(from var(--text) calc(l - 0.15) c h)) {
			--text-low: oklch(from var(--text) calc(l + 0.2) c h);
			--text-high: oklch(from var(--text) calc(l - 0.15) c h);
			--outline-low: oklch(from var(--outline) calc(l + 0.03) c h);
			--outline-high: oklch(from var(--outline) max(0, calc(l - 0.1)) c h);
		}
	}
	@media screen {
		main {
			overflow-y: auto;
			overflow-x: hidden;
			max-width: 100vw;
			max-height: 100vh;
		}
	}
	:global(main > article) {
		display: block;
		position: relative;
		background-color: var(--bg);
		width: var(--doc-width);
		height: var(--doc-height);
		content-visibility: auto;
		contain-intrinsic-size: 1px var(--doc-height);
	}
	@media print {
		:global(main.high-res > article) {
			transform: scale(2);
			transform-origin: top left;
		}
		:global(main.high-res > article:not(:nth-child(2))) {
			margin-top: calc(var(--doc-height) * 2);
		}
	}

	.menu-trigger {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 10;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 2rem;
		}
	}
	.menu {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		background-color: var(--bg);
		z-index: 10;
		width: 400px;
		max-width: calc(100vw - 2rem);
		max-height: 80vh;
		border-radius: var(--radius-5);
		box-shadow: var(--shadow-4);
		padding: 0 2rem 1rem;
		overflow-y: auto;
		overflow-x: hidden;
		@include tablet {
			right: 2rem;
		}

		@include scrollbar;
		&::-webkit-scrollbar-track-piece:start {
			margin-top: var(--radius-5);
		}
		&::-webkit-scrollbar-track-piece:end {
			margin-bottom: var(--radius-5);
		}
		h2 {
			position: sticky;
			top: 0;
			background-color: var(--bg);
			padding: 2rem 0 1rem;
			color: var(--text);
		}
		// Global so the rules also reach elements rendered by the per-template
		// settings fragments (which are child components).
		:global(h3) {
			position: sticky;
			top: 4rem;
			background-color: var(--bg);
			color: var(--text);
			padding: 1rem 0;
			margin-top: 1rem;
			margin-bottom: -1rem;
		}
		:global(.checkbox) {
			margin: 0 0 0 0.5rem;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0;
	}
	form :global(fieldset) {
		border: none;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	form :global(fieldset label) {
		font-size: 0.75rem;
		font-weight: 300;
		margin: 0 0 0.1rem 0.25rem;
	}
	form :global(fieldset input) {
		width: 100%;
	}
	.actions {
		position: sticky;
		bottom: -1rem;
		background-color: white;
		width: 100%;
		padding: 1rem 0;
	}
	button.export {
		background-color: var(--action);
		color: var(--action-text);
		width: 100%;
		border-radius: 999px;
		padding: 0.75rem 1rem;
		font-size: 1.25rem;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
	}
	@media print {
		.menu,
		.menu-trigger {
			display: none;
		}
	}
</style>
