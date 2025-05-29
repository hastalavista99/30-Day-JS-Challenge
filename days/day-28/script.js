// Exercise: Day 28: Security Best Practices
// 1. Create a function that sanitizes user input
// 2. Implement a content security policy helper
// 3. Build utilities for secure data storage
// 4. Write functions that prevent common security issues

 // 1. Sanitize input to remove dangerous tags/scripts
    function sanitizeInput(input) {
      const div = document.createElement("div");
      div.innerText = input; // prevents injection
      return div.innerHTML;
    }

    function sanitizeAndShow() {
      const input = document.getElementById("userInput").value;
      const sanitized = sanitizeInput(input);
      document.getElementById("sanitizedOutput").textContent = sanitized;
    }

    // 2. Secure storage: basic example with encoding
    function storeSecureData() {
      const key = document.getElementById("secureKey").value;
      const value = document.getElementById("secureValue").value;
      if (key && value) {
        const encoded = btoa(unescape(encodeURIComponent(value))); // basic encoding
        localStorage.setItem(key, encoded);
        document.getElementById("storageStatus").textContent = "Data securely stored.";
      } else {
        document.getElementById("storageStatus").textContent = "Missing key or value.";
      }
    }

    // 3. XSS prevention demonstration
    function simulateXSS() {
      const input = `<img src="x" onerror="alert('Hacked')">`;
      const div = document.getElementById("xssDemo");

      // Unsafe (don't do this): div.innerHTML = input;
      // Safe:
      div.innerText = input; // Escaped and safe to show
    }

    // 4. Content Security Policy is declared in <head>