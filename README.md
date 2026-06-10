# Remarkably Organized — Meeting & Task Planners

A web app for generating customizable, hyperlinked PDF planners for e-ink tablets like the
reMarkable 2. Configure a planner in the browser, watch a live preview, then print to PDF and
load it onto your tablet.

![Remarkably Organized Planner](./static/remarkably-organized-cover-photo.jpg)

> **This is a fork.** It is a derivative of the excellent open-source
> [**Remarkably Organized**](https://github.com/brianschwabauer/remarkably-organized) project
> by **Brian Schwabauer**, reshaped into a focused, month-based meeting-notes and task planner.
> The original is MIT licensed (see [`LICENSE`](./LICENSE)); that license and copyright are
> retained here. If you find this useful, consider
> [buying Brian a coffee](https://www.buymeacoffee.com/brianschwabauer).

## What this fork does

Pick a month, choose a template, and the app generates a fully hyperlinked PDF. The current
settings are stored in the URL, so any configuration can be shared just by copying the link.

From the home page, **Start Creating** opens a chooser with two templates, each on its own
route with its own "how to use" dialog and settings:

### Monthly Meeting Planner — `/planner`

- One **index page per week** of the chosen month, labeled with the workdays (Mon–Fri) and
  the abbreviated month.
- Each week lists meetings in a table: **Date · Client · Meeting · Notes-link**.
- Every meeting links to its own section: a **summary page** (Attendees / Topics / Action
  Points) followed by lined **note pages**.
- A sidebar with week tabs, breadcrumbs, and bottom **navigation pills** to move between a
  meeting's pages. Configurable meetings-per-week and note-pages-per-meeting.

### Task List — `/tasks`

- A month-scoped, numbered **task index**: **☐ · Due · Category · Task · Notes-link** rows.
- Each task links to its own configurable number of **note pages**.
- The index **auto-paginates** (30 tasks per page). When there are many pages, the sidebar
  switches to a **two-level navigation**: the current group of 10 pages expands into
  individual pills while other groups collapse into range pills (e.g. `11-20`). This scales
  to roughly **2,400 tasks**.

### Other changes from upstream

- **Font selection**: a curated catalog of free Google Fonts (Inter, Lato, Poppins,
  Merriweather, JetBrains Mono, and more), grouped by category in the picker.
- The exported PDF's **default filename** reflects the template and month (e.g.
  `Meeting Notes June 2026`).
- A **pluggable template architecture** (`src/routes/planner/templates/`) makes it
  straightforward to add new template types.
- Removed the upstream year / quarter / day / month-calendar views, collections, habit
  trackers, and the ICS calendar import to keep the app focused on these two use cases.

## Exporting to PDF

Use Chrome's built-in **print-to-PDF**. Make sure **"Background Graphics"** is enabled.

![Remarkably Organized Print Instructions](./static/remarkably-organized-print-instructions.jpg)

Large planners (e.g. thousands of task pages) can require a fair amount of memory in Chrome to
render — a more powerful machine helps.

## Development

Built with **SvelteKit** (Svelte 5) + **Vite**, styled with SCSS. Uses
[pnpm](https://pnpm.io).

```bash
pnpm i
pnpm run dev      # http://localhost:5173
```

Other scripts:

```bash
pnpm run build    # production build
pnpm run check    # svelte-check type checking
pnpm run format   # prettier
```

## Deployment

A live version is deployed on Vercel at:

**<https://remarkable-weekly-meeting-notes.vercel.app>**

Configured for **Vercel** via `@sveltejs/adapter-vercel` (functions pinned to the
`nodejs20.x` runtime in `svelte.config.js`). Deploy with the Vercel CLI:

```bash
npx vercel deploy --prod
```
