// Exercise:  Write a function that handles file uploads with preview

function handleFileUpload(inputId, previewContainerId) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(previewContainerId);

  input.addEventListener('change', () => {
    container.innerHTML = '';
    [...input.files].forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.style.maxWidth = '100px';
          container.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        const div = document.createElement('div');
        div.textContent = file.name;
        container.appendChild(div);
      }
    });
  });
}
