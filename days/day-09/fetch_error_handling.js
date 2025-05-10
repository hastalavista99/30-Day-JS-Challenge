/**
 * Fetches data with built-in error handling and timeout control.
 * @param {string} url - API endpoint.
 * @param {number} timeoutMs - Max time before the request is aborted.
 */
async function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return await response.json();
    } catch (error) {
        throw new Error(`Fetch failed: ${error.message}`);
    } finally {
        clearTimeout(timeout);
    }
}

// Example usage:
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1')
    .then(console.log)
    .catch(console.error);
