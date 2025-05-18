// Exercise: Build a utility for managing storage quotas and cleanup

function checkStorageQuota(type = 'local') {
    const engine = type === 'local' ? localStorage : sessionStorage;
    let used = 0;

    for (let key in engine) {
        if (engine.hasOwnProperty(key)) {
            used += ((key.length + engine[key].length) * 2);
        }
    }

    return {
        usedKB: (used / 1024).toFixed(2),
        limitKB: 5120, // Approximate localStorage limit
        cleanup(thresholdKB = 4500) {
            if (used / 1024 > thresholdKB) {
                engine.clear();
                return true;
            }
            return false;
        }
    };
}
