// Exercise: Create a reusable dropdown component

function createDropdown({ containerId, options, placeholder = "Select..." }) {
    const container = document.getElementById(containerId);
    const select = document.createElement("select");

    const defaultOption = document.createElement("option");
    defaultOption.textContent = placeholder;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
    });

    container.appendChild(select);
}

// Usage:
createDropdown({
    containerId: "dropdown-container",
    options: [
        { value: "js", label: "JavaScript" },
        { value: "py", label: "Python" },
        { value: "rb", label: "Ruby" }
    ]
});
