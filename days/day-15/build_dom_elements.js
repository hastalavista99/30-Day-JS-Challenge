// Exercise: Create a function that builds DOM elements from JavaScript objects

function createElementFromObject(obj) {
    const el = document.createElement(obj.tag || 'div');

    // Set attributes
    if (obj.attrs) {
        for (const [key, value] of Object.entries(obj.attrs)) {
            el.setAttribute(key, value);
        }
    }

    // Add text
    if (obj.text) {
        el.textContent = obj.text;
    }

    // Add children recursively
    if (obj.children) {
        obj.children.forEach(child => el.appendChild(createElementFromObject(child)));
    }

    return el;
}

// Example:
const structure = {
    tag: 'section',
    attrs: { class: 'card', id: 'card1' },
    children: [
        { tag: 'h2', text: 'Hello DOM' },
        { tag: 'p', text: 'This was generated from a JS object.' }
    ]
};

document.body.appendChild(createElementFromObject(structure));
