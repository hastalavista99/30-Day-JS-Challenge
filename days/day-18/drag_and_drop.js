// Exercise: Implement drag and drop functionality for elements

const dropzone = document.getElementById("dropzone");
const draggable = document.getElementById("draggable");

draggable.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", "Dragged Element");
});

dropzone.addEventListener("dragover", e => {
  e.preventDefault(); // Allow drop
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.textContent = e.dataTransfer.getData("text/plain");
});
