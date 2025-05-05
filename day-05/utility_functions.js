// Exercise: Create a set of utility functions using arrow functions and template literals

/**
 * A collection of utility functions using arrow functions and template literals
 */

// String utilities
const formatName = (firstName, lastName) => `${firstName} ${lastName}`;

const capitalize = (str) =>
    str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : '';

const truncate = (str, maxLength = 30) =>
    str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;

const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/&/g, '-and-')   // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -

// Array utilities
const chunk = (array, size = 1) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const uniq = (array) => [...new Set(array)];

const groupBy = (array, key) =>
    array.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        result[groupKey] = result[groupKey] || [];
        result[groupKey].push(item);
        return result;
    }, {});

// Number utilities
const round = (number, decimals = 0) =>
    Number(`${Math.round(`${number}e${decimals}`)}e-${decimals}`);

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const formatCurrency = (amount, currency = 'USD', locale = 'en-US') =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

// Object utilities
const pick = (object, keys) =>
    keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});

const omit = (object, keys) => {
    const result = { ...object };
    keys.forEach(key => delete result[key]);
    return result;
};

const renameKeys = (obj, keysMap) =>
    Object.keys(obj).reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
    }), {});

// Date utilities
const formatDate = (date, format = 'YYYY-MM-DD') => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const hours = `0${d.getHours()}`.slice(-2);
    const minutes = `0${d.getMinutes()}`.slice(-2);
    const seconds = `0${d.getSeconds()}`.slice(-2);

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

const daysAgo = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const diffTime = Math.abs(now - givenDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
};

const timeFromNow = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const diffTime = Math.abs(now - givenDate);
    const diffSecs = Math.floor(diffTime / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} second${diffSecs !== 1 ? 's' : ''} ago`;
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;

    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
};

// DOM utilities (for browser environments)
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);

const hide = (element) => element.style.display = 'none';
const show = (element) => element.style.display = '';

// Function utilities
const debounce = (func, wait = 300) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const throttle = (func, limit = 300) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Async utilities
const retry = async (fn, maxRetries = 3, delay = 1000) => {
    let retries = 0;

    const attempt = async () => {
        try {
            return await fn();
        } catch (error) {
            if (retries >= maxRetries) throw error;
            retries++;

            // Wait for specified delay before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
            return attempt();
        }
    };

    return attempt();
};

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// Validation utilities
const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

// Export all utilities
export {
    // String utilities
    formatName,
    capitalize,
    truncate,
    slugify,

    // Array utilities
    chunk,
    uniq,
    groupBy,

    // Number utilities
    round,
    random,
    formatCurrency,

    // Object utilities
    pick,
    omit,
    renameKeys,

    // Date utilities
    formatDate,
    daysAgo,
    timeFromNow,

    // DOM utilities
    $,
    $$,
    addClass,
    removeClass,
    toggleClass,
    hide,
    show,

    // Function utilities
    debounce,
    throttle,
    pipe,
    compose,

    // Async utilities
    retry,
    memoize,

    // Validation utilities
    isEmail,
    isURL,
    isStrongPassword
};