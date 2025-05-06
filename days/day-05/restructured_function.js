// Exercise: Refactor a complex function to use destructuring and default parameters

// Original complex function
function processUserData(userId, firstName, lastName, email, age, isActive,
    preferences, address, role, createdAt) {
    if (userId === undefined) {
        throw new Error('userId is required');
    }

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'User';
    email = email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    age = age || 18;
    isActive = isActive !== undefined ? isActive : true;

    const userPreferences = {
        theme: 'light',
        notifications: true,
        language: 'en'
    };

    if (preferences) {
        if (preferences.theme) userPreferences.theme = preferences.theme;
        if (preferences.notifications !== undefined) userPreferences.notifications = preferences.notifications;
        if (preferences.language) userPreferences.language = preferences.language;
    }

    const userAddress = address || { city: 'Unknown', country: 'Unknown' };
    const userRole = role || 'user';
    const userCreatedAt = createdAt || new Date();

    return {
        id: userId,
        name: `${firstName} ${lastName}`,
        email: email,
        age: age,
        isActive: isActive,
        preferences: userPreferences,
        address: userAddress,
        role: userRole,
        createdAt: userCreatedAt,
        lastUpdated: new Date()
    };
}

// Refactored function using destructuring and default parameters
function processUserData({
    userId,
    firstName = 'Anonymous',
    lastName = 'User',
    email,
    age = 18,
    isActive = true,
    preferences = {},
    address = { city: 'Unknown', country: 'Unknown' },
    role = 'user',
    createdAt = new Date()
} = {}) {
    if (!userId) {
        throw new Error('userId is required');
    }

    // Generate default email if not provided
    const userEmail = email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    // Merge default preferences with provided preferences
    const userPreferences = {
        theme: 'light',
        notifications: true,
        language: 'en',
        ...preferences
    };

    return {
        id: userId,
        name: `${firstName} ${lastName}`,
        email: userEmail,
        age,
        isActive,
        preferences: userPreferences,
        address,
        role,
        createdAt,
        lastUpdated: new Date()
    };
}



// Call the function like below

// Example usage of the refactored function
const user = processUserData({
    userId: '12345',
    firstName: 'John',
    lastName: 'Doe',
    preferences: {
        theme: 'dark'
    }
});