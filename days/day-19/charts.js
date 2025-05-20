// Exercise: Create a function that draws charts from data

function drawBarChart(ctx, data) {
  const width = 30;
  const gap = 10;
  const maxHeight = Math.max(...data);
  
  data.forEach((value, i) => {
    const x = i * (width + gap);
    const height = (value / maxHeight) * 150;
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(x, 200 - height, width, height);
  });
}

const canvas = document.getElementById('barChart');
const ctx = canvas.getContext('2d');
drawBarChart(ctx, [12, 28, 18, 35, 25]);
