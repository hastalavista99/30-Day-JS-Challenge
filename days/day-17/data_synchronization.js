// Exercise: Write a function that synchronizes data across browser tabs

// Listen for updates
window.addEventListener("storage", e => {
    if (e.key === "sharedData") {
        const data = JSON.parse(e.newValue);
        console.log("Data updated in another tab:", data);
    }
});

// Simulate update
function syncDataAcrossTabs(data) {
    localStorage.setItem("sharedData", JSON.stringify(data));
}

// Example usage
syncDataAcrossTabs({ counter: 42 });
// This will trigger the storage event in other tabs
// and log the updated data
