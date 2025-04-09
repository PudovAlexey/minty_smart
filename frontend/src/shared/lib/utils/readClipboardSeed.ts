export async function readClipboardSeed(value: number) {
	const text = await navigator.clipboard.readText()

	if (!text) return []

	const phrases = text
		.replace(';', ' ')
		.replace(/\d+\s/, ' ')
		.replace(/\n/g, ' ')
		.replace(/\s+/g, ' ')
		.replace(/[0-9]/g, ' ')
		.replaceAll('.', ' ')
		.replaceAll(')', ' ')
		.replaceAll(',', ' ')
		.trim()
		.split(' ')
		.filter(Boolean)

	if (phrases.length === value) return phrases

	return []
}
