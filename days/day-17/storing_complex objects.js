// Exercise: Implement a system for storing and retrieving complex objects

const user = {
    name: "Jackson",
    age: 29,
    preferences: {
        theme: "dark",
        notifications: true
    }
};

// Save complex object
StorageAPI.set("userProfile", user);

// Retrieve it
const savedUser = StorageAPI.get("userProfile");
console.log(savedUser.preferences.theme); // "dark"
console.log(savedUser.age); // 29
console.log(savedUser.name); // "Jackson"
console.log(savedUser.preferences.notifications); // true