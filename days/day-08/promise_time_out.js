// Exercise: Build a function that times out a Promise after a specified duration

/**
 * Wrap a Promise and reject it if it takes too long.
 * @param {Promise} task - The original Promise.
 * @param {number} timeoutMs - Timeout duration in ms.
 * @returns {Promise}
 */
function withTimeout(task, timeoutMs) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Promise timed out")), timeoutMs)
  );
  return Promise.race([task, timeout]);
}

// Example:
const slowApi = new Promise((res) => setTimeout(() => res("Done!"), 2000));

withTimeout(slowApi, 1000).then(console.log).catch(console.error); // Will reject due to timeout
