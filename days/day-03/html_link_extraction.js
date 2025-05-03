// Exercise: Write a function that extracts all links from a HTML string


function extractLinks(htmlString, options = {}) {
    if (typeof htmlString !== 'string' || htmlString.trim() === '') {
        return { all: [], anchor: [], image: [], script: [], link: [], other: [] };
    }

    // Default options
    const defaultOptions = {
        includeRelative: true, // Include relative URLs
        uniqueOnly: true,      // Only return unique URLs
        categorize: true,      // Categorize links by element type
        normalizeUrls: true,   // Normalize URLs (remove fragments, etc.)
        baseUrl: null          // Base URL for resolving relative URLs
    };

    // Merge options with defaults
    const settings = {
        ...defaultOptions,
        ...options
    };

    // Regular expressions for different link types
    const linkPatterns = {
        // a tags with href attributes
        anchor: /<a\s+(?:[^>]*?\s+)?href=(['"])(.*?)\1/gi,
        // img tags with src attributes
        image: /<img\s+(?:[^>]*?\s+)?src=(['"])(.*?)\1/gi,
        // script tags with src attributes
        script: /<script\s+(?:[^>]*?\s+)?src=(['"])(.*?)\1/gi,
        // link tags with href attributes
        link: /<link\s+(?:[^>]*?\s+)?href=(['"])(.*?)\1/gi,
        // Any other tag with href or src attribute
        other: /<(?!a|img|script|link)([a-z]+)\s+(?:[^>]*?\s+)?(?:href|src)=(['"])(.*?)\2/gi
    };

    // Result containers
    const result = {
        all: [],
        anchor: [],
        image: [],
        script: [],
        link: [],
        other: []
    };

    // Extract links by type
    for (const [type, pattern] of Object.entries(linkPatterns)) {
        let match;
        pattern.lastIndex = 0; // Reset regex state

        while ((match = pattern.exec(htmlString)) !== null) {
            let url = match[2]; // URL is in the 2nd capture group for most patterns

            // Skip empty URLs
            if (!url || url.trim() === '') continue;

            // Skip non-relative URLs if includeRelative is false
            if (!settings.includeRelative && isRelativeUrl(url)) continue;

            // Normalize URLs if option is enabled
            if (settings.normalizeUrls) {
                url = normalizeUrl(url);
            }

            // Resolve relative URLs if base URL is provided
            if (settings.baseUrl && isRelativeUrl(url)) {
                url = resolveRelativeUrl(url, settings.baseUrl);
            }

            // Add to category-specific array
            if (!settings.uniqueOnly || !result[type].includes(url)) {
                result[type].push(url);
            }

            // Add to "all" array
            if (!settings.uniqueOnly || !result.all.includes(url)) {
                result.all.push(url);
            }
        }
    }

    return settings.categorize ? result : result.all;
}


function isRelativeUrl(url) {
    // URLs starting with http://, https://, //, or data: are not relative
    return !(/^(https?:\/\/|\/\/|data:|mailto:|tel:)/i.test(url));
}


function normalizeUrl(url) {
    // Remove fragment
    url = url.split('#')[0];

    // Remove trailing slash if not the only slash in the URL
    if (url.length > 1 && url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    return url;
}


function resolveRelativeUrl(relativeUrl, baseUrl) {
    try {
        // Use URL API if available
        if (typeof URL === 'function') {
            return new URL(relativeUrl, baseUrl).href;
        }

        // Simple fallback for environments without URL API
        if (relativeUrl.startsWith('/')) {
            // Absolute path
            const parsedBase = baseUrl.match(/^(https?:\/\/[^\/]+)/i);
            return parsedBase ? `${parsedBase[1]}${relativeUrl}` : relativeUrl;
        } else {
            // Relative path
            let base = baseUrl;
            // Remove trailing filename if base URL appears to be a file
            if (!base.endsWith('/') && base.includes('/')) {
                base = base.substring(0, base.lastIndexOf('/') + 1);
            }
            return `${base}${relativeUrl}`;
        }
    } catch (e) {
        // If URL resolution fails, return the original URL
        return relativeUrl;
    }
}

// Usage examples
const htmlExample = `
<!DOCTYPE html>
<html>
    <head>
        <title>Link Example</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="icon" href="https://example.com/favicon.ico">
        <script src="https://cdn.example.com/script.js"></script>
    </head>
    <body>
        <header>
            <a href="https://example.com">Example Site</a>
            <a href="/about">About</a>
        </header>
        <main>
            <img src="image.jpg" alt="An image">
            <img src="https://example.com/logo.png" alt="Logo">
            <a href="#section">Jump to section</a>
            <iframe src="https://maps.example.com"></iframe>
        </main>
        <footer>
            <a href="mailto:info@example.com">Contact</a>
        </footer>
    </body>
</html>
`;

console.log("Basic extraction (all links):");
console.log(extractLinks(htmlExample));

console.log("\nOnly unique, external links:");
console.log(extractLinks(htmlExample, {
    includeRelative: false,
    uniqueOnly: true
}));

console.log("\nJust a flat array of all links:");
console.log(extractLinks(htmlExample, {
    categorize: false
}));

console.log("\nResolving relative URLs:");
console.log(extractLinks(htmlExample, {
    baseUrl: "https://example.com/path/"
}));
