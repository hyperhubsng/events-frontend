import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(num: number): string | number {
	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
	}
	if (num >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
	}
	return num;
}

export function formatTimeUTC(dateInput: string | Date): string {
	const date = new Date(dateInput);
	const hours = date.getUTCHours().toString().padStart(2, '0');
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');
	const seconds = date.getUTCSeconds().toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}
