// Exercise: Write a function that optimizes heavy calculations

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args.join("-");
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Example: Fibonacci
const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // Fast after first call
