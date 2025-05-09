// Exercise: Create a function that converts a callback-based function to return a Promise

/**
 * Converts a callback-style function to a Promise-based one.
 * @param {Function} callbackFn - A function that uses (err, result) style callback.
 * @returns {Function} - A version that returns a Promise.
 */
function promisify(callbackFn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      callbackFn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

// Example: Convert fs.readFile to Promise version
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

readFileAsync("example.txt", "utf8")
  .then((data) => console.log("File contents:", data))
  .catch((err) => console.error("Failed to read:", err));
