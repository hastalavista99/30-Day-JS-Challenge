// Exercise: Create a utility that manages and cleans up event listeners
// // ensuring they are removed when no longer needed


function createEventManager() {
    const listeners = [];

    return {
        add(target, type, handler, options) {
            target.addEventListener(type, handler, options);
            listeners.push({ target, type, handler });
        },
        removeAll() {
            listeners.forEach(({ target, type, handler }) => {
                target.removeEventListener(type, handler);
            });
            listeners.length = 0;
        }
    };
}

// Example usage:
const manager = createEventManager();
const handleClick = () => console.log('Clicked!');
manager.add(document.body, 'click', handleClick);

// Later cleanup:
// manager.removeAll();
// This will remove all event listeners added through the manager