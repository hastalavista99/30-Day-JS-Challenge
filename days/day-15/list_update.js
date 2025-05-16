// Exercise: Build a utility that efficiently updates lists of elements

function updateList(container, items) {
    container.innerHTML = ''; // Clear efficiently

    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
    });

    container.appendChild(fragment);
}

// Example:
const ul = document.createElement('ul');
document.body.appendChild(ul);

updateList(ul, ['Learn JS', 'Write Code', 'Ship Projects']);
// This will create a list in the document body with the items provided.