/**
 * Formats a JavaScript Date object into a readable full date string.
 *
 * @param date - A Date object representing the date to format.
 * @returns A string representing the formatted date in "Weekday, Month Day, Year" format.
 *
 * @example
 * formatDateMeeting(new Date('2025-07-14')); // "Monday, July 14, 2025"
 */

export const formatDateMeeting = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Formats a JavaScript Date object into a 12-hour clock time string.
 *
 * @param date - A Date object representing the time to format.
 * @returns A string representing the time in "h:mm AM/PM" format.
 *
 * @example
 * formatTimeMeeting(new Date('2025-07-14T14:30:00')); // "2:30 PM"
 */

export const formatTimeMeeting = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

/**
 * Formats a duration in minutes into a human-readable string.
 *
 * @param minutes - The total duration in minutes.
 * @returns A string formatted as "Xh Ym" if hours are present, otherwise "Ym".
 *
 * @example
 * formatDurationMeeting(90); // "1h 30m"
 * formatDurationMeeting(45); // "45m"
 */

export const formatDurationMeeting = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
};