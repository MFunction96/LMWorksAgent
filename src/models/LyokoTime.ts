import {formatNumber} from "../Utils/CommonUtils";

export class LyokoTime {
	separator: string;
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;

	public static readonly parse = (year: number, month: number, day: number, hour: number, minute: number, second: number, separator: string): LyokoTime =>{
		const lyokoTime = new LyokoTime();
		lyokoTime.year = year;
		lyokoTime.month = month;
		lyokoTime.day = day;
		lyokoTime.hour = hour;
		lyokoTime.minute = minute;
		lyokoTime.second = second;
		lyokoTime.separator = separator;
		return lyokoTime;
	};

	public constructor() {
		this.separator = "/";
		this.year = -1;
		this.month = -1;
		this.day = -1;
		this.hour = -1;
		this.minute = -1;
		this.second = -1;
	}



	public clone(): LyokoTime {
		const lyokoTime = new LyokoTime();
		lyokoTime.year = this.year;
		lyokoTime.month = this.month;
		lyokoTime.day = this.day;
		lyokoTime.hour = this.hour;
		lyokoTime.minute = this.minute;
		lyokoTime.second = this.second;
		lyokoTime.separator = this.separator;
		return lyokoTime;
	}
}

export function getLyokoWeek(lyokoTime: LyokoTime): number {
	return (lyokoTime.day + 2 * lyokoTime.month + 3 * (lyokoTime.month + 1) / 5 + lyokoTime.year + lyokoTime.year / 4 - lyokoTime.year / 100 + lyokoTime.year / 400) % 7;
}

export function getLyokoDate(lyokoTime: LyokoTime): string {
	return `${formatNumber(lyokoTime.year,4)}${lyokoTime.separator}${formatNumber(lyokoTime.month,2)}${lyokoTime.separator}${formatNumber(lyokoTime.day,2)}`;
}

export function getLyokoTime(lyokoTime: LyokoTime): string {
	return `${formatNumber(lyokoTime.hour,2)}:${formatNumber(lyokoTime.minute,2)}:${formatNumber(lyokoTime.second,2)}`;
}

export function toDate(lyokoTime: LyokoTime): Date {
	return new Date(lyokoTime.year, lyokoTime.month, lyokoTime.day, lyokoTime.hour, lyokoTime.minute, lyokoTime.second);
}
