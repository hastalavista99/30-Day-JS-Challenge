// Exercise: Write functions for smooth animations without libraries

function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';
    let last = performance.now();

    function step(now) {
        const delta = now - last;
        element.style.opacity = +element.style.opacity + delta / duration;
        last = now;
        if (+element.style.opacity < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Example:
const box = document.createElement('div');
box.textContent = 'Fading in...';
box.style.cssText = 'width:200px; height:100px; background:#4ade80; display:none; text-align:center; padding:1rem;';
document.body.appendChild(box);
fadeIn(box);
// This will fade in the box element over 500 milliseconds.