/**
 * Syncs API data with localStorage, using cache if available.
 * @param {string} key - Storage key.
 * @param {string} url - API endpoint.
 * @param {number} ttl - Freshness duration in ms.
 */
async function syncToLocalStorage(key, url, ttl = 60000) {
    const existing = localStorage.getItem(key);
    const now = Date.now();

    if (existing) {
        const { data, timestamp } = JSON.parse(existing);
        if (now - timestamp < ttl) return data;
    }

    const freshData = await fetchWithTimeout(url);
    localStorage.setItem(key, JSON.stringify({ data: freshData, timestamp: now }));
    return freshData;
}

// Example:
syncToLocalStorage('posts', 'https://jsonplaceholder.typicode.com/posts')
    .then(console.log)
    .catch(console.error);
