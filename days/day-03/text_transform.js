// Exercise: Build a utility that transforms text between camelCase, PascalCase, snake_case, and kebab-case


function transformCase(text, targetCase) {
    if (typeof text !== 'string' || text.trim() === '') {
        return '';
    }

    // First, convert to a standard format (array of words)
    const words = splitIntoWords(text);

    // Then transform to the target case
    switch (targetCase.toLowerCase()) {
        case 'camel':
            return toCamelCase(words);
        case 'snake':
            return toSnakeCase(words);
        case 'kebab':
            return toKebabCase(words);
        case 'pascal':
            return toPascalCase(words);
        default:
            throw new Error(`Unsupported case type: ${targetCase}`);
    }
}

// Splits a string into an array of words regardless of its original case

function splitIntoWords(text) {
    // Handle different input formats

    // Check for snake_case
    if (text.includes('_')) {
        return text.split('_').filter(word => word.length > 0);
    }

    // Check for kebab-case
    if (text.includes('-')) {
        return text.split('-').filter(word => word.length > 0);
    }

    // Handle camelCase and PascalCase
    if (/[A-Z]/.test(text)) {
        // Insert a space before each capital letter that's preceded by a lowercase letter
        const spaced = text.replace(/([a-z])([A-Z])/g, '$1 $2');
        return spaced.split(' ').filter(word => word.length > 0);
    }

    // If no special case is detected, just return the text as a single word
    return [text];
}

function toCamelCase(words) {
    if (words.length === 0) return '';

    return words.map((word, index) => {
        // Convert to lowercase
        const lowerWord = word.toLowerCase();
        // Capitalize first letter for all words except the first one
        return index === 0
            ? lowerWord
            : lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    }).join('');
}


function toSnakeCase(words) {
    return words.map(word => word.toLowerCase()).join('_');
}


function toKebabCase(words) {
    return words.map(word => word.toLowerCase()).join('-');
}


function toPascalCase(words) {
    return words.map(word => {
        const lowerWord = word.toLowerCase();
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    }).join('');
}


function detectCase(text) {
    if (typeof text !== 'string' || text.trim() === '') {
        return 'unknown';
    }

    if (text.includes('_')) {
        return 'snake';
    }

    if (text.includes('-')) {
        return 'kebab';
    }

    if (/^[a-z]/.test(text) && /[A-Z]/.test(text)) {
        return 'camel';
    }

    if (/^[A-Z]/.test(text) && /[a-z]/.test(text)) {
        return 'pascal';
    }

    return 'unknown';
}


const examples = [
    'helloWorld',          // camelCase
    'hello_world',         // snake_case
    'hello-world',         // kebab-case
    'HelloWorld',          // PascalCase
    'getUserByIdAndName',  // camelCase complex example
    'get_user_by_id_and_name', // snake_case complex example
    'get-user-by-id-and-name', // kebab-case complex example
    'GetUserByIdAndName'   // PascalCase complex example
];

console.log('Case Transformer Examples:');

examples.forEach(example => {
    const detectedCase = detectCase(example);
    console.log(`\nOriginal text: "${example}" (${detectedCase} case)`);

    console.log(`- To camelCase: "${transformCase(example, 'camel')}"`);
    console.log(`- To snake_case: "${transformCase(example, 'snake')}"`);
    console.log(`- To kebab-case: "${transformCase(example, 'kebab')}"`);
    console.log(`- To PascalCase: "${transformCase(example, 'pascal')}"`);
});
