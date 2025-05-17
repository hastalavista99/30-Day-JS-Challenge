// Exercise: Build a modal/dialog component with animations

const modal = document.getElementById("modal");
document.getElementById("open-modal").onclick = () => modal.classList.remove("hidden");
document.getElementById("close-modal").onclick = () => modal.classList.add("hidden");
