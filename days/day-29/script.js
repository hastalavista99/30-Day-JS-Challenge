// Exercise: Day 29: Practical Algorithms
// 1. Implement a search algorithm for filtering data
// 2. Create a sorting utility with multiple strategies
// 3. Build a simple autocomplete/suggestion engine
// 4. Write a utility for finding patterns in data

const data = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Guava",
  "Kiwi",
  "Lemon",
  "Mango",
];

// 1. Search Filter
function filterData() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = data.filter((item) => item.toLowerCase().includes(query));
  document.getElementById("searchResults").innerHTML = filtered
    .map((item) => `<li>${item}</li>`)
    .join("");
}

// 2. Sorting Utility
function sortData() {
  const order = document.getElementById("sortOption").value;
  const sorted = [...data].sort((a, b) => {
    return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  });
  document.getElementById("sortedList").innerHTML = sorted
    .map((item) => `<li>${item}</li>`)
    .join("");
}

// 3. Autocomplete/Suggestions
function showSuggestions() {
  const input = document
    .getElementById("autocompleteInput")
    .value.toLowerCase();
  const suggestions = data.filter((item) =>
    item.toLowerCase().startsWith(input)
  );
  document.getElementById("suggestionsList").innerHTML = suggestions
    .map((s) => `<li>${s}</li>`)
    .join("");
}

// 4. Pattern Matching
function findPattern() {
  const pattern = document.getElementById("patternInput").value;
  const regex = new RegExp(pattern, "gi");
  const matches = data.filter((item) => item.match(regex));
  document.getElementById("patternOutput").textContent = matches.length
    ? matches.join(", ")
    : "No matches";
}

// Initialize
sortData();
filterData();
