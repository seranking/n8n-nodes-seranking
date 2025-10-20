export function validateDomain(domain: string): string {
	// Remove protocol and www
	let cleaned = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
	// Remove trailing slash
	cleaned = cleaned.replace(/\/$/, '');
	return cleaned;
}

export function validateDateFormat(date: string): boolean {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	return regex.test(date);
}

export function parseKeywords(input: string): string[] {
	return input
		.split(',')
		.map(k => k.trim())
		.filter(k => k.length > 0);
}