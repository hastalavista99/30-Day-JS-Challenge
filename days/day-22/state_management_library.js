// Exercise: State Management Library
// 1. Create a simple state management library
function createState(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => ({ ...state }),
    setState: (updates) => {
      const prevState = { ...state };
      state = { ...state, ...updates };
      listeners.forEach((fn) => fn(state, prevState));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

// 2. Implement functions to track state changes
function logStateChanges(stateManager) {
  stateManager.subscribe((newState, oldState) => {
    console.log("State changed:", { oldState, newState });
  });
}

// 3. Build a utility that connects state to DOM updates
function bindTextContent(stateManager, key, element) {
  element.textContent = stateManager.getState()[key];
  stateManager.subscribe((state) => {
    element.textContent = state[key];
  });
}

// 4. Write a system for persisting state
function persistState(stateManager, storageKey = "appState") {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    stateManager.setState(JSON.parse(saved));
  }
  stateManager.subscribe((state) => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  });
}

// Example usage:
const appState = createState({ count: 0 });
logStateChanges(appState);
persistState(appState);

document.addEventListener("DOMContentLoaded", () => {
  const countDisplay = document.getElementById("count");
  const incrementBtn = document.getElementById("increment");

  bindTextContent(appState, "count", countDisplay);

  incrementBtn.addEventListener("click", () => {
    const { count } = appState.getState();
    appState.setState({ count: count + 1 });
  });
});