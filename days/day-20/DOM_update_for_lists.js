// Exercise: Implement efficient DOM updates for large lists

function renderListEfficiently(data) {
  const ul = document.getElementById("list");
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  ul.innerHTML = ""; // Clear existing
  ul.appendChild(fragment);
}

// Example
const bigData = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
renderListEfficiently(bigData);
