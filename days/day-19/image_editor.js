// Exercise:  Build a simple image editor with filters


const canvasImg = document.getElementById('imageCanvas');
const ctxImg = canvasImg.getContext('2d');

document.getElementById('upload').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = () => ctxImg.drawImage(img, 0, 0, canvasImg.width, canvasImg.height);
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function applyGrayscale() {
  const imgData = ctxImg.getImageData(0, 0, canvasImg.width, canvasImg.height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  ctxImg.putImageData(imgData, 0, 0);
}
