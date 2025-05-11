// Exercise: Build a session storage utility with automatic cleanup

const sessionStore = {
    set(key, value) {
        const data = {
            value,
            created: Date.now(),
        };
        sessionStorage.setItem(key, JSON.stringify(data));
    },

    get(key, maxAgeMs = 300000) {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;

        const { value, created } = JSON.parse(raw);
        if (Date.now() - created > maxAgeMs) {
            sessionStorage.removeItem(key);
            return null;
        }

        return value;
    },

    clearOld(maxAgeMs = 300000) {
        Object.keys(sessionStorage).forEach(key => {
            this.get(key, maxAgeMs); // Will auto-remove if expired
        });
    },
};

// Example usage:
sessionStore.set('sessionToken', 'abc123');
console.log(sessionStore.get('sessionToken')); // 'abc123'