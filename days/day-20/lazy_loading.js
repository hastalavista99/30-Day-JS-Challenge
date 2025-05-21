// Exercise: Build a lazy loading utility for images and content

function lazyLoadImages() {
  const images = document.querySelectorAll("img.lazy");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}

document.addEventListener("DOMContentLoaded", lazyLoadImages);
