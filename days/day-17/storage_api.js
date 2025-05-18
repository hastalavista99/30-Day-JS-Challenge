// Exercise: Create a unified storage API that works with different storage types

const StorageAPI = (() => {
    const memory = new Map();

    const engines = {
        local: window.localStorage,
        session: window.sessionStorage,
        memory: {
            getItem: key => memory.get(key),
            setItem: (key, value) => memory.set(key, value),
            removeItem: key => memory.delete(key),
            clear: () => memory.clear()
        }
    };

    return {
        set(key, value, type = 'local') {
            const engine = engines[type];
            engine.setItem(key, JSON.stringify(value));
        },
        get(key, type = 'local') {
            const engine = engines[type];
            const raw = engine.getItem(key);
            try {
                return JSON.parse(raw);
            } catch {
                return raw;
            }
        },
        remove(key, type = 'local') {
            engines[type].removeItem(key);
        },
        clear(type = 'local') {
            engines[type].clear();
        }
    };
})();
