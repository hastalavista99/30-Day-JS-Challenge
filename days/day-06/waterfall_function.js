// Exercise: Create a waterfall function that runs async functions in sequence

/**
 * Waterfall - Runs an array of async functions in sequence, passing the result of each to the next
 * 
 * This is my implementation of a waterfall pattern for async functions.
 * It's similar to how libraries like async.js handle sequential operations,
 * but built from scratch to better understand the concepts.
 * 
 * @param {Array<Function>} functions - Array of async functions to execute in sequence
 * @param {*} initialValue - Initial value to pass to the first function
 * @returns {Promise<*>} - Final result after all functions complete
 */
async function waterfall(functions, initialValue) {
    // First, let's validate our inputs
    if (!Array.isArray(functions)) {
      throw new TypeError('First argument must be an array of functions');
    }
    
    if (functions.length === 0) {
      return initialValue; // No functions to run, just return the initial value
    }
    
    // Check that we actually have functions in our array
    for (let i = 0; i < functions.length; i++) {
      if (typeof functions[i] !== 'function') {
        throw new TypeError(`Item at index ${i} is not a function`);
      }
    }
    
    // Now let's run our functions in sequence
    // I initially tried using Array.reduce() for this, but found that handling
    // async functions in reduce can be confusing, so I went with a more explicit approach
    let result = initialValue;
    
    for (const fn of functions) {
      try {
        // Wait for each function to complete before moving to the next
        // Each function receives the result of the previous function
        result = await fn(result);
      } catch (error) {
        // If any function in our sequence fails, we'll stop and propagate the error
        throw error;
      }
    }
    
    return result;
  }
  
  // Let's test our waterfall implementation with some example functions
  async function test() {
    try {
      // Some example async functions that build on each other's results
      const fetchUser = async (userId) => {
        console.log(`Fetching user with ID: ${userId}`);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { id: userId, name: 'Jane Doe', permissions: ['read'] };
      };
      
      const checkPermissions = async (user) => {
        console.log(`Checking permissions for user: ${user.name}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!user.permissions.includes('read')) {
          throw new Error('User does not have required permissions');
        }
        
        return {
          ...user,
          hasAccess: true
        };
      };
      
      const loadUserData = async (user) => {
        console.log(`Loading data for user: ${user.name}`);
        await new Promise(resolve => setTimeout(resolve, 700));
        
        return {
          ...user,
          data: ['file1.txt', 'file2.jpg', 'document.pdf']
        };
      };
      
      // Now let's run these in sequence with our waterfall function
      console.log('Starting waterfall execution...');
      const result = await waterfall([
        fetchUser,
        checkPermissions,
        loadUserData
      ], 123); // Starting with user ID 123
      
      console.log('Final result:', result);
      
      // Let's also try a case that should fail
      try {
        const failingTest = await waterfall([
          () => ({ name: 'John', permissions: [] }), // User without permissions
          checkPermissions, // This should throw an error
          loadUserData
        ]);
      } catch (error) {
        console.log('Expected error caught:', error.message);
      }
      
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  
  // Run the test!
  // test();
  
  // Here's a simpler example that's easier to trace through
  async function simpleTest() {
    const functions = [
      x => {
        console.log(`Step 1: Starting with ${x}`);
        return x + 10;
      },
      x => {
        console.log(`Step 2: Got ${x}, doubling it`);
        return x * 2;
      },
      x => {
        console.log(`Step 3: Got ${x}, adding 5`);
        return x + 5;
      }
    ];
    
    const result = await waterfall(functions, 5);
    console.log(`Final result: ${result}`); // Should output 35: ((5 + 10) * 2) + 5
  }
  
  // Uncomment to run simple test
  // simpleTest();
  
  module.exports = { waterfall };
  
  /*
   * Notes to self about what I learned from this:
   * 
   * 1. The key insight is that each function must wait for the previous to complete
   *    before starting, which is why we need to use "await" for each function call.
   * 
   * 2. I initially tried using Array.reduce() for this pattern:
   *    return functions.reduce(async (promiseAcc, fn) => {
   *      const acc = await promiseAcc;
   *      return fn(acc);
   *    }, Promise.resolve(initialValue));
   *    But this gets confusing with async/await semantics. The simple for loop is clearer.
   * 
   * 3. Error handling is important - any error in the chain should stop the whole process.
   * 
   * 4. Type checking inputs helps catch bugs early.
   * 
   * 5. This pattern is useful for situations where each step depends on the result of the
   *    previous step, unlike Promise.all() which runs everything concurrently.
   */