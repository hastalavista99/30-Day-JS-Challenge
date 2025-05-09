// Exercise: Implement a utility that retries a Promise-based operation with exponential backoff

/**
 * Retry a Promise-returning function with exponential delay.
 * @param {Function} fn - The async function to retry.
 * @param {number} attempts - Max retry attempts.
 * @param {number} baseDelay - Initial delay in ms.
 */
async function retryWithBackoff(fn, attempts = 3, baseDelay = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      const wait = baseDelay * 2 ** i;
      await new Promise((res) => setTimeout(res, wait));
    }
  }
}

// Example: Simulate flaky fetch
const flakyFetch = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Success!") : reject("Temporary error.");
  });
};

retryWithBackoff(flakyFetch, 4).then(console.log).catch(console.error);
