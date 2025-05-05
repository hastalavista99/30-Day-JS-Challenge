// Exercise: Convert a function to use rest/spread operators for flexibility

// Original function that takes specific arguments
function combineData(mainData, additionalData1, additionalData2, additionalData3) {
    const result = { ...mainData };

    if (additionalData1) {
        Object.keys(additionalData1).forEach(key => {
            result[key] = additionalData1[key];
        });
    }

    if (additionalData2) {
        Object.keys(additionalData2).forEach(key => {
            result[key] = additionalData2[key];
        });
    }

    if (additionalData3) {
        Object.keys(additionalData3).forEach(key => {
            result[key] = additionalData3[key];
        });
    }

    result.lastUpdated = new Date();
    return result;
}


// Refactored function using rest and spread operators
function combineData(mainData, ...additionalDataSources) {
    // Use spread operator to combine the main data with all additional sources
    const result = {
        ...mainData,
        // Merge all additional data sources in order of priority
        ...additionalDataSources.reduce((merged, source) => ({ ...merged, ...source }), {}),
        // Always add the timestamp at the end to ensure it's not overwritten
        lastUpdated: new Date()
    };

    return result;
}


// call the function like below

// Example usage
const userData = { id: 1, name: "John" };
const preferences = { theme: "dark", fontSize: "large" };
const permissions = { canEdit: true, canDelete: false };
const metrics = { visits: 27, lastActive: "2023-04-15" };
const extraInfo = { department: "Engineering", location: "Remote" };

// Original function could only take up to 3 additional sources
// const combined = combineData(userData, preferences, permissions, metrics); // metrics would be ignored
// Now we can use any number of additional sources
const combined = combineData(userData, preferences, permissions, metrics, extraInfo);