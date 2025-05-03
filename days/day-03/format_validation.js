// Exercise: Implement a function that validates different formats (email, phone, URL)


function validateFormat(value, format, options = {}) {
    // Return false if value is not a string or is empty
    if (typeof value !== 'string' || value.trim() === '') {
        return false;
    }

    // Default options
    const defaultOptions = {
        phone: {
            allowInternational: true,
            format: 'international', // Can be 'international', 'us', or 'kenyan'
        },
        url: {
            requireProtocol: true,
        },
    };

    // Merge options with defaults
    const settings = {
        ...defaultOptions,
        ...options,
    };

    // Validation patterns
    switch (format.toLowerCase()) {
        case 'email':
            // RFC 5322 compliant email regex that handles most valid email formats
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(value);

        case 'phone':
            let phoneRegex;
            if (settings.phone.allowInternational) {
                // International phone format (with optional country code)
                phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?(?:\d{3})\)?[- ]?(?:\d{3})[- ]?(?:\d{4})$/;
            } else {
                // US phone format (10 digits, various formats)
                phoneRegex = /^\(?(?:\d{3})\)?[- ]?(?:\d{3})[- ]?(?:\d{4})$/;
            }
            return phoneRegex.test(value);

        case 'url':
            let urlRegex;
            if (settings.url.requireProtocol) {
                // URL with protocol required (http:// or https://)
                urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            } else {
                // URL with optional protocol
                urlRegex = /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)?$/;
            }
            return urlRegex.test(value);

        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

// Usage examples
function runExamples() {
    console.log('Email validation:');
    console.log('user@example.com:', validateFormat('user@example.com', 'email')); // true
    console.log('invalid-email.com:', validateFormat('invalid-email.com', 'email')); // false

    console.log('\nPhone validation:');
    console.log('(123) 456-7890:', validateFormat('(123) 456-7890', 'phone')); // true
    console.log('+1-123-456-7890:', validateFormat('+1-123-456-7890', 'phone')); // true
    console.log('123-456-789:', validateFormat('123-456-789', 'phone')); // false

    // US-only phone validation
    console.log('US only - +1-123-456-7890:', validateFormat('+1-123-456-7890', 'phone', {
        phone: { allowInternational: false }
    })); // false

    // Kenyan phone validation
    console.log('\nKenyan phone validation:');
    console.log('+254 712 345 678:', validateFormat('+254 712 345 678', 'phone', {
        phone: { format: 'kenyan' }
    })); // true
    console.log('0712 345 678:', validateFormat('0712 345 678', 'phone', {
        phone: { format: 'kenyan' }
    })); // true
    console.log('254712345678:', validateFormat('254712345678', 'phone', {
        phone: { format: 'kenyan' }
    })); // true

    console.log('\nURL validation:');
    console.log('https://example.com:', validateFormat('https://example.com', 'url')); // true
    console.log('example.com:', validateFormat('example.com', 'url', {
        url: { requireProtocol: false }
    })); // true
    console.log('example.com with protocol required:', validateFormat('example.com', 'url')); // false
}

// Export the function for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = validateFormat;
}


runExamples();