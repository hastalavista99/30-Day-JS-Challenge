// Exercise: Write a utility that generates downloadable images

function downloadCanvas() {
  const canvas = document.getElementById('signature');
  const link = document.createElement('a');
  link.download = 'signature.png';
  link.href = canvas.toDataURL();
  link.click();
}
