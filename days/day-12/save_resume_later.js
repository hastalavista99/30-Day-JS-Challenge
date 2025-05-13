// Exercise: Build a system for saving form progress and resuming later

function saveFormProgress(formId) {
  const form = document.getElementById(formId);
  const data = serializeForm(form);
  localStorage.setItem(`form-${formId}`, data);
}

function resumeFormProgress(formId) {
  const form = document.getElementById(formId);
  const saved = localStorage.getItem(`form-${formId}`);
  if (saved) deserializeForm(form, saved);
}

// Auto-save example:
const form = document.getElementById('myForm');
form.addEventListener('input', () => saveFormProgress('myForm'));
window.addEventListener('DOMContentLoaded', () => resumeFormProgress('myForm'));
