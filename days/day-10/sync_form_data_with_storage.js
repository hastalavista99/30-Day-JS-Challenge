// Exercise: Write a function that synchronizes form data with storage

function syncFormWithStorage(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Load existing data
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || {};
    Object.entries(savedData).forEach(([key, value]) => {
        const input = form.elements.namedItem(key);
        if (input) input.value = value;
    });

    // Save on change
    form.addEventListener('input', () => {
        const formData = {};
        Array.from(form.elements).forEach(input => {
            if (input.name) formData[input.name] = input.value;
        });
        localStorage.setItem(storageKey, JSON.stringify(formData));
    });
}

// Example usage:
syncFormWithStorage('userForm', 'draftUser');
