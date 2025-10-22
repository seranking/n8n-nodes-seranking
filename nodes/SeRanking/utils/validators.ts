export function validateDomain(domain: string): string {
	if (!domain || domain.trim() === '') {
		throw new Error('Domain cannot be empty');
	}
	
	// Remove protocol and www
	let cleaned = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
	// Remove trailing slash
	cleaned = cleaned.replace(/\/$/, '');
	// Remove path and query params
	cleaned = cleaned.split('/')[0].split('?')[0];
	
	// Basic domain validation
	const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	
	if (!domainRegex.test(cleaned)) {
		throw new Error(`Invalid domain format: "${domain}". Please enter a valid domain like "example.com"`);
	}
	
	// Check for common invalid domains
	const invalidDomains = ['localhost', '127.0.0.1', '0.0.0.0', 'example.com', 'test.com', 'invalid.com'];
	if (invalidDomains.includes(cleaned.toLowerCase())) {
		throw new Error(`Please enter a real domain, not "${cleaned}"`);
	}
	
	return cleaned;
}

export function validateSource(source: string): string {
	if (!source || source.trim() === '') {
		throw new Error('Source (country code) cannot be empty');
	}
	
	const cleaned = source.toLowerCase().trim();
	
	// Alpha-2 country code validation (2 letters)
	if (!/^[a-z]{2}$/.test(cleaned)) {
		throw new Error(`Invalid source code: "${source}". Use Alpha-2 country codes like: us, uk, de, fr, es, it, ca, au, pl`);
	}
	
	return cleaned;
}

export function validateDateFormat(date: string): boolean {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	return regex.test(date);
}

export function parseKeywords(input: string): string[] {
	if (!input || input.trim() === '') {
		throw new Error('Keywords cannot be empty');
	}
	
	const keywords = input
		.split(/[,\n]/)
		.map(k => k.trim())
		.filter(k => k.length > 0);
	
	if (keywords.length === 0) {
		throw new Error('Please provide at least one keyword');
	}
	
	if (keywords.length > 700) {
		throw new Error(`Too many keywords (${keywords.length}). Maximum is 700 per request`);
	}
	
	return keywords;
}