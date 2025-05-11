// Exercise: Create a localStorage wrapper with expiry time
// This wrapper will allow you to set, get, and remove items from localStorage
// with an expiry time. If the item is expired, it should be removed from localStorage
// and return null when trying to get it.
// The wrapper should have the following methods:
// - set(key, value, ttl): Sets the value in localStorage with a key and an expiry time (ttl in milliseconds).
// - get(key): Gets the value from localStorage. If the item is expired, it should return null.
// - remove(key): Removes the item from localStorage.
// The wrapper should handle JSON.stringify and JSON.parse automatically.
// The wrapper should also handle the case when localStorage is full and throw an error.
// The wrapper should also handle the case when the key does not exist in localStorage and return null.
// The wrapper should also handle the case when the value is not serializable and throw an error.

const storageWithExpiry = {
    set(key, value, ttl) {
        const item = {
            value,
            expiry: Date.now() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    get(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    },

    remove(key) {
        localStorage.removeItem(key);
    },
};

// Example usage:
storageWithExpiry.set('userData', { name: 'Alice' }, 5000);
