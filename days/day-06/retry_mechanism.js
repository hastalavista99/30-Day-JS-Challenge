// Exercise: Implement a retry mechanism for a function that might fail

/**
 * Executes a function with retry capabilities
 * @param {Function} fn - The function to execute
 * @param {Object} options - Configuration options
 * @param {number} [options.maxRetries=3] - Maximum number of retry attempts
 * @param {number} [options.retryDelay=1000] - Delay between retries in milliseconds
 * @param {boolean} [options.exponentialBackoff=true] - Whether to use exponential backoff
 * @param {Function} [options.onRetry] - Function called on each retry with attempt number and error
 * @param {Function} [options.shouldRetry] - Function to determine if retry should happen based on error
 * @returns {Promise} - A promise that resolves with the function result or rejects after all retries
 */
async function withRetry(fn, options = {}) {
    const {
        maxRetries = 3,
        retryDelay = 1000,
        exponentialBackoff = true,
        onRetry = null,
        shouldRetry = () => true
    } = options;

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // Execute the function
            return await fn();
        } catch (error) {
            lastError = error;

            // Check if we should retry
            if (attempt >= maxRetries || !shouldRetry(error)) {
                break;
            }

            // Calculate delay (with exponential backoff if enabled)
            const delay = exponentialBackoff
                ? retryDelay * Math.pow(2, attempt)
                : retryDelay;

            // Notify about retry if callback provided
            if (onRetry) {
                onRetry(attempt + 1, error);
            }

            // Wait before next attempt
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // If we got here, all retries failed
    throw lastError;
}

// Example usage:
async function exampleUsage() {
    try {
        // Simple usage with default options
        const result1 = await withRetry(async () => {
            // Potentially failing function here
            const response = await fetch('https://api.example.com/data');
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        });

        // Advanced usage with all options
        const result2 = await withRetry(
            async () => {
                // Potentially failing function here
                return await someUnreliableFunction();
            },
            {
                maxRetries: 5,
                retryDelay: 500,
                exponentialBackoff: true,
                onRetry: (attempt, error) => {
                    console.log(`Retry attempt ${attempt} after error: ${error.message}`);
                },
                shouldRetry: (error) => {
                    // Only retry for specific errors, like network issues
                    return error.name === 'NetworkError' || error.message.includes('timeout');
                }
            }
        );

        console.log('Succeeded after retries if necessary');
    } catch (error) {
        console.error('All retry attempts failed:', error);
    }
}

// For Node.js or browser environments
async function someUnreliableFunction() {
    // Simulate a function that fails sometimes
    if (Math.random() < 0.7) {
        throw new Error('Random failure');
    }
    return 'Success!';
}

// Demo that actually runs
async function runDemo() {
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < 10; i++) {
        console.log(`--- Test run ${i + 1} ---`);
        try {
            const result = await withRetry(
                async () => {
                    // This will fail 70% of the time
                    if (Math.random() < 0.7) {
                        console.log('  Function failed, will retry if attempts remain');
                        throw new Error('Random failure');
                    }
                    return 'Operation succeeded!';
                },
                {
                    maxRetries: 3,
                    retryDelay: 300,
                    onRetry: (attempt, error) => {
                        console.log(`  Retry attempt ${attempt} after error: ${error.message}`);
                    }
                }
            );
            console.log(`  Final result: ${result}`);
            successCount++;
        } catch (error) {
            console.log(`  All retries failed: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\nSummary: ${successCount} successes, ${failCount} failures after all retries`);
}

// Uncomment to run the demo
// runDemo();