<script lang="ts">
	import { page } from '$app/state';
	import { fade, scale } from 'svelte/transition';

	let showChooser = $state(false);

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') showChooser = false;
	}
</script>

<svelte:window on:keyup={handleKeyup} />

<main>
	<section>
		<h1>
			<small>Remarkably Organized</small>
			Planners
		</h1>
		<p>
			Create custom meeting-notes and task planners for e-ink tablets like the Remarkable
			2.
		</p>
		<button class="cta" onclick={() => (showChooser = true)}>Start Creating</button>
		<p class="attribution">
			Based on the open-source
			<a
				href="https://github.com/brianschwabauer/remarkably-organized"
				target="_blank"
				rel="noopener noreferrer">
				Remarkably Organized
			</a>
			project by Brian Schwabauer.
		</p>
	</section>
	<section>
		<img
			src="/remarkably-organized-meeting-index.jpg?url"
			alt="Remarkably Organized - Weekly Meeting Notes Index" />
	</section>
</main>

{#if showChooser}
	<div class="chooser" role="dialog" aria-modal="true" aria-label="Choose a planner type">
		<button
			class="chooser-bg"
			aria-label="Close"
			onclick={() => (showChooser = false)}
			transition:fade={{ duration: 150 }}>
		</button>
		<div class="chooser-card" transition:scale={{ duration: 150 }}>
			<h2>What do you want to create?</h2>
			<div class="choices">
				<a class="choice" href="/planner{page.url.search}">
					<span class="name">Monthly Meeting Planner</span>
					<span class="desc">
						One index page per week, each meeting linked to its own summary and note
						pages.
					</span>
				</a>
				<a class="choice" href="/tasks{page.url.search}">
					<span class="name">Task List</span>
					<span class="desc">
						A monthly index of tasks, each linked to its own note pages.
					</span>
				</a>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	main {
		min-height: 100vh;
		background-color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		background-image: linear-gradient(
			180deg,
			hsl(227deg 87% 9%) 0%,
			hsl(217deg 83% 16%) 29%,
			hsl(208deg 80% 24%) 46%,
			hsl(197deg 76% 31%) 60%,
			hsl(188deg 72% 38%) 74%,
			hsl(178deg 68% 45%) 87%,
			hsl(168deg 64% 52%) 100%
		);
		@include desktop {
			background-image: linear-gradient(
				60deg,
				hsl(227deg 87% 9%) 0%,
				hsl(217deg 83% 16%) 29%,
				hsl(208deg 80% 24%) 46%,
				hsl(197deg 76% 31%) 60%,
				hsl(188deg 72% 38%) 74%,
				hsl(178deg 68% 45%) 87%,
				hsl(168deg 64% 52%) 100%
			); // https://www.joshwcomeau.com/gradient-generator?colors=030c2c|37d3b4&angle=180&colorMode=hsl&precision=5&easingCurve=0.2413793103448276|1.0002020474137931|0.6853448275862069|0.40106411637931033
		}
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: calc(100% - 2rem);
		max-width: 1200px;
		padding: 1rem 0 0;
		@include tablet {
			padding: 2rem 1rem;
		}
		@include desktop {
			width: 50%;
		}
	}

	h1 {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1;
		font-size: 5rem;
		margin: 2rem 0 0;
		@include tablet {
			font-size: 8rem;
		}
		@include desktop {
			margin: 0;
		}
		small {
			line-height: 1;
			font-size: 1.5rem;
			color: white;
			opacity: 0.65;
			@include tablet {
				font-size: 2rem;
			}
		}
	}

	img {
		max-width: min(100%, 900px);
		max-height: 90vh;
		border-radius: 20px;
		object-fit: contain;
		box-shadow: var(--shadow-5);
	}

	.cta {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eeeeee;
		color: black;
		border: none;
		cursor: pointer;
		border-radius: 999px;
		padding: 1rem 2rem;
		font-size: 1.5rem;
		&:hover {
			background-color: white;
		}
		margin: 2rem 0 0;
		@include tablet {
			margin: 3rem 0 2rem;
		}
	}
	.chooser {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.chooser-bg {
		position: absolute;
		inset: 0;
		border: none;
		padding: 0;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.6);
		@supports (backdrop-filter: blur(8px)) {
			background-color: rgba(0, 0, 0, 0.35);
			backdrop-filter: blur(8px);
		}
	}
	.chooser-card {
		position: relative;
		z-index: 1;
		background-color: white;
		border-radius: 24px;
		padding: 2rem;
		width: 100%;
		max-width: 640px;
		box-shadow: var(--shadow-5);
		h2 {
			margin: 0 0 1.5rem;
			text-align: center;
			font-size: 1.75rem;
			color: #222;
		}
	}
	.choices {
		display: grid;
		gap: 1rem;
		@include tablet {
			grid-template-columns: 1fr 1fr;
		}
	}
	.choice {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-decoration: none;
		text-align: left;
		padding: 1.25rem;
		border-radius: 16px;
		border: solid 2px #e2e2e2;
		background-color: #fafafa;
		color: #222;
		transition:
			border-color 0.12s,
			background-color 0.12s;
		&:hover {
			border-color: #333;
			background-color: #fff;
		}
		.name {
			font-size: 1.2rem;
			font-weight: 700;
		}
		.desc {
			font-size: 0.95rem;
			opacity: 0.75;
			line-height: 1.3;
		}
	}
	.attribution {
		max-width: 450px;
		color: white;
		opacity: 0.7;
		text-align: center;
		font-size: 0.95rem;
		margin: 0.5rem auto 1.5rem;
		a {
			color: white;
			text-decoration: underline;
			&:hover {
				opacity: 0.85;
			}
		}
	}
	p {
		max-width: 450px;
		color: white;
		opacity: 0.8;
		text-align: center;
		font-size: 1.2rem;
		margin: 1rem auto 0;
		@include tablet {
			font-size: 1.5rem;
			margin: 1rem auto 0;
		}
	}
</style>
