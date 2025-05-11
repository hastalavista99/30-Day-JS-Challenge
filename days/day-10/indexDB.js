// Exercise: Create a simple client-side database using IndexedDB

function createDB(dbName = 'AppDB', storeName = 'items') {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = e => {
            const db = e.target.result;
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function addItem(db, storeName, data) {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.add(data);
    return tx.complete;
}

// Example usage:
(async () => {
    const db = await createDB();
    await addItem(db, 'items', { name: 'Todo Item', createdAt: Date.now() });
})();
