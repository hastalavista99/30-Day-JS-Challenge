/**
 * Fetches and transforms API data.
 * @param {string} url - API endpoint.
 * @param {Function} transformer - Function to shape the data.
 */
async function fetchAndTransform(url, transformer) {
    const raw = await fetchWithTimeout(url);
    return transformer(raw);
}

// Example transformer: Map posts to titles only
fetchAndTransform('https://jsonplaceholder.typicode.com/posts', posts =>
    posts.map(post => ({ id: post.id, title: post.title }))
).then(console.log);
