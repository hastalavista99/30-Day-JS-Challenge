// Exercise: Implement a simple template rendering system

function renderTemplate(template, data) {
    return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] ?? '');
}

// Example:
const tmpl = '<h1>Hello, {{ name }}!</h1><p>Age: {{ age }}</p>';
const output = renderTemplate(tmpl, { name: 'Jackson', age: 28 });

document.body.innerHTML += output;
// This will render:
// <h1>Hello, Jackson!</h1><p>Age: 28</p>