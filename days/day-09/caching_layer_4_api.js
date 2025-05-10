const apiCache = new Map();

/**
 * Caches API responses to avoid repeated network calls.
 * @param {string} url - API endpoint.
 * @param {number} ttl - Time to live in milliseconds.
 */
async function cachedFetch(url, ttl = 30000) {
    const cached = apiCache.get(url);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttl) {
        return cached.data;
    }

    const data = await fetchWithTimeout(url);
    apiCache.set(url, { data, timestamp: now });
    return data;
}

// Example:
cachedFetch('https://jsonplaceholder.typicode.com/users')
    .then(console.log)
    .catch(console.error);
