// Exercise: Create functions that measure and report on performance

function measurePerformance(fn, label = 'Function') {
  const t0 = performance.now();
  const result = fn();
  const t1 = performance.now();
  console.log(`${label} took ${(t1 - t0).toFixed(2)}ms`);
  return result;
}

// Example
measurePerformance(() => {
  let sum = 0;
  for (let i = 0; i < 1e6; i++) sum += i;
});
// Example with label
measurePerformance(() => {
  let sum = 0;
  for (let i = 0; i < 1e6; i++) sum += i;
}, 'Sum Calculation');
// Example with async function
async function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async operation completed');
    }, 1000);
  });
}
measurePerformance(async () => {
  const result = await asyncFunction();
  console.log(result);
}
, 'Async Function');
