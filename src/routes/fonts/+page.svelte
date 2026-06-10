<script lang="ts">
	import { fonts, fontCategories } from './fonts';

	const sampleText = new Date().toLocaleDateString('default', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	const selectedFontsQuery = $derived(
		new URLSearchParams(
			fonts.map((font) => ['family', `${font.name}:wght@100;200;300;400;500;600;700`]),
		).toString(),
	);
	const googleFontURL = $derived(
		`https://fonts.googleapis.com/css2?display=swap&${selectedFontsQuery}`,
	);
	const googleFontImport = $derived(
		googleFontURL ? `@import url("${googleFontURL}");` : '',
	);
</script>

<svelte:head>
	{#if googleFontImport}
		{@html `<style type="text/css">${googleFontImport}</style>`}
	{/if}
</svelte:head>

{#each fontCategories as category (category)}
	<h2 class="category">{category}</h2>
	{#each fonts.filter((f) => f.category === category) as font (font.name)}
		<div class="font">
			<div class="font-name">{font.name}</div>
			<div
				class="font-display"
				style:font-family={font.name}
				style:font-size="{font.size}em">
				<span style="font-weight:{font.boldWeight}">{sampleText}</span>
				<span style="font-weight:{font.normalWeight}">{sampleText}</span>
				<span style="font-weight:{font.lightWeight}">{sampleText}</span>
			</div>
		</div>
	{/each}
{/each}

<style lang="scss">
	:global(body) {
		background-color: white;
	}
	.category {
		margin: 2rem 0 0.5rem 2rem;
		font-family: system-ui, sans-serif;
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #888;
	}
	.font {
		font-size: 2rem;
		margin: 0.75rem 0 0 2rem;
	}
	.font-name {
		font-family: system-ui, sans-serif;
		font-size: 0.7rem;
		color: #aaa;
		margin-bottom: 0.1rem;
	}
	.font-display {
		display: flex;
		gap: 0 3rem;
		flex-wrap: wrap;
	}
</style>
