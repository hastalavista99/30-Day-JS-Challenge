// Exercise:  Implement a form validation library with different validation rules

const Validators = {
  required: (value) => !!value || "This field is required.",
  minLength: (len) => (value) =>
    value.length >= len || `Minimum length is ${len}`,
  email: (value) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Invalid email",
};

function validateField(value, rules) {
  for (const rule of rules) {
    const result = typeof rule === "function" ? rule(value) : true;
    if (result !== true) return result;
  }
  return true;
}

// Usage
const result = validateField("hello", [
  Validators.required,
  Validators.minLength(6),
]);
if (result !== true) console.log(result); // "Minimum length is 6"
