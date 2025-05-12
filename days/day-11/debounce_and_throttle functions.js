// Exercise: Build debounce and throttle functions for event handlers

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Example:
window.addEventListener('resize', debounce(() => console.log('Debounced resize'), 300));
window.addEventListener('scroll', throttle(() => console.log('Throttled scroll'), 200));
