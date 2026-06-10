import { getFirstDayOfWeek, getUTCDate, objectDiff, getWeek } from '$lib';
import type { PageTemplate } from './collection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepPartial<T> = T extends { [key: string]: any }
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

export interface Timeframe {
	/** A unique identifier for this timeframe used for linking to its page */
	id: string;

	/** The first day of the timeframe */
	start: Date;

	/** The last day of the timeframe */
	end: Date;

	/** The start of the timeframe rounded down to the nearest start of week */
	weekStart: Date;

	/** The user-displayable short name of the timeframe */
	nameShort: string;

	/** The user-displayable long name of the timeframe */
	nameLong: string;

	/** The year this timeframe references */
	year?: number;

	/** The 1-indexed quarter */
	quarter?: number;

	/** The 1-indexed month (January is '1') */
	month?: number;

	/** The 1-indexed week from the start of the year */
	weekSinceYear?: number;

	/** The 1-indexed week from the start of the month */
	weekSinceMonth?: number;

	/** The year that this day's week should be considered a part of */
	weekYear?: number;

	/** The month that this day's week should be considered a part of */
	weekMonth?: number;

	/** The quarter that this day's week should be considered a part of */
	weekQuarter?: number;
}

export interface Year
	extends Omit<Timeframe, 'quarter' | 'month' | 'weekSinceYear' | 'weekSinceMonth'> {
	/** The year this timeframe references */
	year: number;
}

export interface Month extends Year {
	/** The 1-indexed quarter */
	quarter: number;

	/** The 1-indexed month (January is '1') */
	month: number;
}

export interface Week extends Month {
	/** The 1-indexed week from the start of the year */
	weekSinceYear: number;

	/** The 1-indexed week from the start of the month */
	weekSinceMonth: number;
}

export class PlannerSettings {
	private initialSettings: ReturnType<PlannerSettings['serialize']> | undefined =
		undefined;

	/** Settings for changing the overall design of the planner */
	readonly design = new (class DesignSettings {
		aspectRatio = $state(0.75);
		width = $state(702);
		font = $state('Roboto');
		fontDisplay = $state('Bebas Neue');
		colorText = $state('#424242');
		colorLines = $state('#e2e2e2');
		colorDots = $state('#454545');
	})();

	/** Settings for changing the month covered by the planner */
	readonly date = new (class DateSettings {
		private defaultStart = new Date(
			Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1),
		);
		private defaultEnd = new Date(
			Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0),
		);
		timezoneOffset = $state(new Date().getTimezoneOffset() / 60);
		start = $state(this.defaultStart);
		end = $state(this.defaultEnd);
		today = $state(new Date(new Date().setUTCHours(0, 0, 0, 0)));
		startWeekOnSunday = $state(false);
	})();

	/** Settings for changing the side navigation bar display */
	readonly sideNav = new (class SideNavSettings {
		disable = $state(false);
		width = $state(52);
		leftSide = $state(true);
		font = $state('Bebas Neue');
	})();

	/** Settings for changing the top navigation bar display */
	readonly topNav = new (class TopNavSettings {
		disable = $state(false);
		height = $state(45);
		font = $state('Bebas Neue');
	})();

	/** Settings for changing the cover page display */
	readonly coverPage = new (class CoverPageSettings {
		disable = $state(false);
		name = $state('');
		email = $state('');
		title = $state('');
		darkBackground = $state(true);
		font = $state('Bebas Neue');
	})();

	/** Settings for changing how the weekly meeting pages should work */
	readonly weekPage = new (class WeekPageSettings {
		/** The number of meetings listed on each week's index page */
		meetingsPerWeek = $state(20);
		/** The number of note pages generated for each meeting (incl. the summary) */
		notePagesPerMeeting = $state(4);
		/** The page template used for the note pages following each meeting summary */
		notePagesTemplate = $state('lined' as PageTemplate);
		/** Whether to show week numbers (rather than dates) in the side nav */
		useWeekNumbersInSideNav = $state(false);
		/** Whether week numbers should be counted from the start of the year */
		useWeekSinceYear = $state(true);
	})();

	/** Settings for the Task Index template */
	readonly taskIndex = new (class TaskIndexSettings {
		/** The total number of tasks to track for the month */
		tasksPerMonth = $state(30);
		/** The number of note pages generated for each task */
		notePagesPerTask = $state(1);
		/** The page template used for each task's note pages */
		notePagesTemplate = $state('lined' as PageTemplate);
	})();

	/** The computed list of years within the start/end timeframe in this.date */
	readonly years = $derived(
		Array.from(
			{ length: this.date.end.getUTCFullYear() - this.date.start.getUTCFullYear() + 1 },
			(_, i) => {
				const numYears =
					this.date.end.getUTCFullYear() - this.date.start.getUTCFullYear() + 1;
				const year = this.date.start.getUTCFullYear() + i;
				const firstDayOfYear = new Date(`${year}-01-01`);
				const lastDayOfYear = new Date(`${year}-12-31`);
				const start = i === 0 ? new Date(this.date.start.getTime()) : firstDayOfYear;
				const end =
					i === numYears - 1 ? new Date(this.date.end.getTime()) : lastDayOfYear;
				const weekStart = new Date(
					getFirstDayOfWeek(
						Date.UTC(start.getUTCFullYear()),
						this.date.startWeekOnSunday,
					),
				);
				return {
					id: `${year}`,
					year,
					start,
					end,
					weekStart,
					nameShort: year.toString().slice(-2),
					nameLong: year.toString(),
				} as Year;
			},
		),
	);

	/** The computed list of months within the start/end timeframe in this.date */
	readonly months = $derived(
		this.years.reduce((acc, year) => {
			const startMonth = year.start.getUTCMonth() + 1;
			const endMonth = year.end.getUTCMonth() + 1;
			for (let month = startMonth; month <= endMonth; month++) {
				const start = getUTCDate(year.start.getUTCFullYear(), month - 1);
				const end = getUTCDate(year.start.getUTCFullYear(), month, 0);
				const quarter = Math.floor((month - 1) / 3) + 1;
				acc.push({
					id: `${year.year}-${month}`,
					year: year.year,
					quarter,
					month,
					start,
					end,
					weekStart: new Date(getFirstDayOfWeek(start, this.date.startWeekOnSunday)),
					nameShort: start.toLocaleDateString('default', {
						timeZone: 'UTC',
						month: 'short',
					}),
					nameLong: start.toLocaleDateString('default', {
						timeZone: 'UTC',
						month: 'long',
					}),
				});
			}
			return acc;
		}, [] as Month[]),
	);

	/** The computed list of weeks within the start/end timeframe in this.date */
	readonly weeks = $derived(
		this.years.reduce((acc, year) => {
			const firstWeekDayOfTimeframe = getFirstDayOfWeek(
				year.start,
				this.date.startWeekOnSunday,
			);
			const numWeeks =
				Math.floor((year.end.getTime() - firstWeekDayOfTimeframe) / 604800000) + 1;
			for (let i = 0; i < numWeeks; i++) {
				const week = getWeek(
					firstWeekDayOfTimeframe + i * 604800000,
					this.date.startWeekOnSunday,
				);
				const prevWeek = acc[acc.length - 1];
				if (
					!prevWeek ||
					prevWeek.year !== week.year ||
					prevWeek.weekSinceYear !== week.weekSinceYear
				) {
					acc.push(week);
				}
			}
			return acc;
		}, [] as Week[]),
	);

	/** A computed diff object of the settings that have been changed by the user */
	readonly edits = $derived(
		!this.initialSettings
			? {}
			: objectDiff({
					prev: this.initialSettings,
					next: this.serialize(),
					enableDeepDiff: true,
				}).diff,
	);

	constructor(
		initialState:
			| DeepPartial<ReturnType<PlannerSettings['serialize']>>
			| undefined = undefined,
	) {
		this.initialSettings = this.serialize();
		this.deserialize(initialState);
	}

	/** Serializes the data into a valid JSON format */
	private serialize() {
		return {
			design: {
				aspectRatio: this.design.aspectRatio,
				width: this.design.width,
				font: this.design.font,
				fontDisplay: this.design.fontDisplay,
				colorText: this.design.colorText,
				colorLines: this.design.colorLines,
				colorDots: this.design.colorDots,
			},
			date: {
				timezoneOffset: this.date.timezoneOffset,
				start: this.date.start.getTime(),
				end: this.date.end.getTime(),
				today: this.date.today.getTime(),
				startWeekOnSunday: this.date.startWeekOnSunday,
			},
			sideNav: {
				disable: this.sideNav.disable,
				width: this.sideNav.width,
				leftSide: this.sideNav.leftSide,
				font: this.sideNav.font,
			},
			topNav: {
				disable: this.topNav.disable,
				height: this.topNav.height,
				font: this.topNav.font,
			},
			coverPage: {
				disable: this.coverPage.disable,
				title: this.coverPage.title,
				name: this.coverPage.name,
				email: this.coverPage.email,
				darkBackground: this.coverPage.darkBackground,
				font: this.coverPage.font,
			},
			weekPage: {
				meetingsPerWeek: this.weekPage.meetingsPerWeek,
				notePagesPerMeeting: this.weekPage.notePagesPerMeeting,
				notePagesTemplate: this.weekPage.notePagesTemplate,
				useWeekNumbersInSideNav: this.weekPage.useWeekNumbersInSideNav,
				useWeekSinceYear: this.weekPage.useWeekSinceYear,
			},
			taskIndex: {
				tasksPerMonth: this.taskIndex.tasksPerMonth,
				notePagesPerTask: this.taskIndex.notePagesPerTask,
				notePagesTemplate: this.taskIndex.notePagesTemplate,
			},
		};
	}

	/** Initializes the settings state from a serialized JSON state */
	private deserialize(
		state: DeepPartial<ReturnType<PlannerSettings['serialize']>> | undefined = undefined,
	) {
		// Design Settings
		if (state?.design?.aspectRatio !== undefined)
			this.design.aspectRatio = state.design.aspectRatio;
		if (state?.design?.width !== undefined) this.design.width = state.design.width;
		if (state?.design?.font !== undefined) this.design.font = state.design.font;
		if (state?.design?.fontDisplay !== undefined)
			this.design.fontDisplay = state.design.fontDisplay;
		if (state?.design?.colorText !== undefined)
			this.design.colorText = state.design.colorText;
		if (state?.design?.colorLines !== undefined)
			this.design.colorLines = state.design.colorLines;
		if (state?.design?.colorDots !== undefined)
			this.design.colorDots = state.design.colorDots;

		// Date Settings
		if (state?.date?.timezoneOffset !== undefined)
			this.date.timezoneOffset = state.date.timezoneOffset;
		if (state?.date?.start !== undefined) this.date.start = new Date(state.date.start);
		if (state?.date?.end !== undefined) this.date.end = new Date(state.date.end);
		if (state?.date?.today !== undefined) this.date.today = new Date(state.date.today);
		if (state?.date?.startWeekOnSunday !== undefined)
			this.date.startWeekOnSunday = state.date.startWeekOnSunday;

		// Side Nav Settings
		if (state?.sideNav?.disable !== undefined)
			this.sideNav.disable = state.sideNav.disable;
		if (state?.sideNav?.width !== undefined) this.sideNav.width = state.sideNav.width;
		if (state?.sideNav?.leftSide !== undefined)
			this.sideNav.leftSide = state.sideNav.leftSide;
		if (state?.sideNav?.font !== undefined) this.sideNav.font = state.sideNav.font;
		if (!state?.sideNav?.font && state?.design?.fontDisplay)
			this.sideNav.font = state.design.fontDisplay;

		// Top Nav Settings
		if (state?.topNav?.disable !== undefined) this.topNav.disable = state.topNav.disable;
		if (state?.topNav?.height !== undefined) this.topNav.height = state.topNav.height;
		if (state?.topNav?.font !== undefined) this.topNav.font = state.topNav.font;
		if (!state?.topNav?.font && state?.design?.fontDisplay)
			this.topNav.font = state.design.fontDisplay;

		// Cover Page Settings
		if (state?.coverPage?.disable !== undefined)
			this.coverPage.disable = state.coverPage.disable;
		if (state?.coverPage?.title !== undefined)
			this.coverPage.title = state.coverPage.title;
		if (state?.coverPage?.name !== undefined) this.coverPage.name = state.coverPage.name;
		if (state?.coverPage?.email !== undefined)
			this.coverPage.email = state.coverPage.email;
		if (state?.coverPage?.darkBackground !== undefined)
			this.coverPage.darkBackground = state.coverPage.darkBackground;
		if (state?.coverPage?.font !== undefined) this.coverPage.font = state.coverPage.font;
		if (!state?.coverPage?.font && state?.design?.fontDisplay)
			this.coverPage.font = state.design.fontDisplay;

		// Week Page Settings
		if (state?.weekPage?.meetingsPerWeek !== undefined)
			this.weekPage.meetingsPerWeek = state.weekPage.meetingsPerWeek;
		if (state?.weekPage?.notePagesPerMeeting !== undefined)
			this.weekPage.notePagesPerMeeting = state.weekPage.notePagesPerMeeting;
		if (state?.weekPage?.notePagesTemplate !== undefined)
			this.weekPage.notePagesTemplate = state.weekPage.notePagesTemplate;
		if (state?.weekPage?.useWeekNumbersInSideNav !== undefined)
			this.weekPage.useWeekNumbersInSideNav = state.weekPage.useWeekNumbersInSideNav;
		if (state?.weekPage?.useWeekSinceYear !== undefined)
			this.weekPage.useWeekSinceYear = state.weekPage.useWeekSinceYear;

		// Task Index Settings
		if (state?.taskIndex?.tasksPerMonth !== undefined)
			this.taskIndex.tasksPerMonth = state.taskIndex.tasksPerMonth;
		if (state?.taskIndex?.notePagesPerTask !== undefined)
			this.taskIndex.notePagesPerTask = state.taskIndex.notePagesPerTask;
		if (state?.taskIndex?.notePagesTemplate !== undefined)
			this.taskIndex.notePagesTemplate = state.taskIndex.notePagesTemplate;
	}
}
