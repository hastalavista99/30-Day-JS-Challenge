// Exercise:   Create a function that serializes and deserializes form data


function serializeForm(formElement) {
  const data = new FormData(formElement);
  const obj = {};
  for (let [key, value] of data.entries()) {
    obj[key] = value;
  }
  return JSON.stringify(obj);
}

function deserializeForm(formElement, json) {
  const data = JSON.parse(json);
  for (let key in data) {
    const field = formElement.elements[key];
    if (field) field.value = data[key];
  }
}
