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
	return `${hours}:${minutes}`;
}

export function addMinutesToTime(time: string, minutesToAdd: number): string {
	const [hours, minutes] = time.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes + minutesToAdd, 0, 0);

	const endHours = String(date.getHours()).padStart(2, '0');
	const endMinutes = String(date.getMinutes()).padStart(2, '0');

	return `${endHours}:${endMinutes}`;
}

export function addOneDaySameTime(start: string): string {
	// Parse the input
	const [datePart, timePart] = start.split(' ');
	const [year, month, day] = datePart.split('-').map(Number);
	const [hours, minutes] = timePart.split(':').map(Number);

	// Create Date object
	const date = new Date(year, month - 1, day, hours, minutes);

	// Add 1 day
	date.setDate(date.getDate() + 1);

	// Format back to yyyy-mm-dd HH:mm
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const HH = String(date.getHours()).padStart(2, '0');
	const MM = String(date.getMinutes()).padStart(2, '0');

	return `${yyyy}-${mm}-${dd} ${HH}:${MM}`;
}
