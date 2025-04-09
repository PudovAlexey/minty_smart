const formatDistanceLocale: { [key: string]: string } = {
	lessThanXSeconds: '{{count}}s',
	xSeconds: '{{count}}s',
	halfAMinute: '30s',
	lessThanXMinutes: '{{count}}m',
	xMinutes: '{{count}}m',
	aboutXHours: '{{count}}h',
	xHours: '{{count}}h',
	xDays: '{{count}}d',
	aboutXWeeks: '{{count}}w',
	xWeeks: '{{count}}w',
	aboutXMonths: '{{count}}m',
	xMonths: '{{count}}m',
	aboutXYears: '{{count}}y',
	xYears: '{{count}}y',
	overXYears: '{{count}}y',
	almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: any) {
	const result = formatDistanceLocale[token].replace('{{count}}', count)

	return result
}