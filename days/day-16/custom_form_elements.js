// Exercise: Write a custom form elements with validation

document.getElementById("custom-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const email = this.email.value.trim();

    if (!username || !email) {
        return document.getElementById("form-msg").textContent = "All fields are required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return document.getElementById("form-msg").textContent = "Enter a valid email.";
    }

    document.getElementById("form-msg").textContent = "Form submitted successfully!";
});
