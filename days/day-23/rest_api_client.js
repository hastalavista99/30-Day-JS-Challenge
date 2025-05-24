// Exercise: Day 23: API Integration
// 1. Create a REST API client with standard CRUD operations
// 2. Implement authentication and session management
// 3. Build utilities for handling different response formats
// 4. Write functions for offline support and synchronization

// REST API Client with standard CRUD operations
class ApiClient {
    constructor(baseURL, headers = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        };
    }

    async request(method, endpoint, body = null) {
        const options = {
            method,
            headers: this.defaultHeaders,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, options);
        const contentType = response.headers.get("content-type");

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        if (contentType.includes("application/json")) return response.json();
        if (contentType.includes("text/")) return response.text();
        return response;
    }

    get(endpoint) {
        return this.request("GET", endpoint);
    }

    post(endpoint, data) {
        return this.request("POST", endpoint, data);
    }

    put(endpoint, data) {
        return this.request("PUT", endpoint, data);
    }

    delete(endpoint) {
        return this.request("DELETE", endpoint);
    }
}

// Authentication and Session Management
class AuthService {
    constructor(apiClient) {
        this.api = apiClient;
        this.tokenKey = "auth_token";
    }

    async login(credentials) {
        const { token } = await this.api.post("/auth/login", credentials);
        localStorage.setItem(this.tokenKey, token);
        this.api.defaultHeaders.Authorization = `Bearer ${token}`;
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        delete this.api.defaultHeaders.Authorization;
    }

    loadToken() {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
            this.api.defaultHeaders.Authorization = `Bearer ${token}`;
        }
    }
}

// Handling different response formats
function parseApiResponse(response) {
    if (typeof response === "string") {
        try {
            return JSON.parse(response);
        } catch {
            return { message: response };
        }
    }
    return response;
}

// Offline support and synchronization
class OfflineSync {
    constructor(storageKey = "offlineQueue") {
        this.storageKey = storageKey;
        this.queue = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    }

    queueRequest(method, endpoint, data) {
        this.queue.push({ method, endpoint, data });
        localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    }

    async sync(apiClient) {
        const failed = [];
        for (const req of this.queue) {
            try {
                await apiClient.request(req.method, req.endpoint, req.data);
            } catch (e) {
                failed.push(req);
            }
        }
        this.queue = failed;
        localStorage.setItem(this.storageKey, JSON.stringify(failed));
    }
}

// Example usage
const api = new ApiClient("https://example.com/api");
const auth = new AuthService(api);
const offlineSync = new OfflineSync();

auth.loadToken();

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        try {
            await auth.login({ username, password });
            alert("Login successful!");
        } catch (err) {
            alert("Login failed: " + err.message);
        }
    });

    window.addEventListener("online", () => {
        offlineSync.sync(api);
    });
});

/* HTML Example:
<form id="loginForm">
  <input name="username" placeholder="Username" required />
  <input name="password" placeholder="Password" type="password" required />
  <button type="submit">Login</button>
</form>
*/

