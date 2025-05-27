// Exercises: Day 26: Testing Your Code
// 1. Create a simple testing utility for functions
// 2. Implement mocks and stubs for testing
// 3. Build a system for running tests in the browser
// 4. Write test cases for previous challenge solutions

// 1. Simple Testing Utility
function assertEquals(actual, expected, msg = "") {
  if (actual !== expected) {
    throw new Error(`${msg} Expected ${expected}, got ${actual}`);
  }
}

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: "pass" });
  } catch (e) {
    results.push({ name, status: "fail", error: e.message });
  }
}

const results = [];

// 2. Mocks & Stubs
function createMock(fn) {
  const calls = [];
  const mockFn = (...args) => {
    calls.push(args);
    return fn(...args);
  };
  mockFn.calls = calls;
  return mockFn;
}

function stubReturn(value) {
  const stub = () => value;
  stub.isStub = true;
  return stub;
}

// 3. Test Runner
function runTests() {
  document.getElementById("test-results").innerHTML = results
    .map((r) =>
      r.status === "pass"
        ? `<div class="pass">✅ ${r.name}</div>`
        : `<div class="fail">❌ ${r.name}<br><pre>${r.error}</pre></div>`
    )
    .join("");
}

// 4. Test Cases
function add(a, b) {
  return a + b;
}

test("add(2, 3) should be 5", () => {
  assertEquals(add(2, 3), 5);
});

test("add(0, 0) should be 0", () => {
  assertEquals(add(0, 0), 0);
});

test("mock function should track calls", () => {
  const mock = createMock((x) => x * 2);
  mock(5);
  mock(10);
  assertEquals(mock.calls.length, 2);
  assertEquals(mock.calls[0][0], 5);
});

test("stub should always return constant", () => {
  const alwaysOne = stubReturn(1);
  assertEquals(alwaysOne(), 1);
  assertEquals(alwaysOne(), 1);
});

// Simulated bug
test("this test will fail", () => {
  assertEquals(add(2, 2), 5, "Math is wrong");
});

// Run tests on load
runTests();
