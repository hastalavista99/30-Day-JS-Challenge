// Exercise: Write a function that runs multiple Promises with a concurrency limit

/**
 * Runs an array of async tasks with a concurrency cap.
 * @param {Function[]} taskFns - Array of functions returning Promises.
 * @param {number} limit - Max number of concurrent tasks.
 * @returns {Promise<any[]>} - Resolves with results in order.
 */
function runWithConcurrencyLimit(taskFns, limit = 2) {
  const results = [];
  let index = 0;
  let active = 0;

  return new Promise((resolve, reject) => {
    function launchNext() {
      if (index >= taskFns.length && active === 0) {
        return resolve(results);
      }

      while (active < limit && index < taskFns.length) {
        const currentIndex = index++;
        const task = taskFns[currentIndex];
        active++;

        task()
          .then((result) => (results[currentIndex] = result))
          .catch(reject)
          .finally(() => {
            active--;
            launchNext();
          });
      }
    }

    launchNext();
  });
}

// Example: Simulate async tasks with delay
const createTask = (id, delay) => () =>
  new Promise((res) => setTimeout(() => res(`Task ${id} complete`), delay));

const tasks = [
  createTask(1, 1000),
  createTask(2, 500),
  createTask(3, 800),
  createTask(4, 300),
];

runWithConcurrencyLimit(tasks, 2).then(console.log).catch(console.error);
