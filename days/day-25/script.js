  // 1. Global Error Handling
    window.addEventListener("error", (event) => {
      Logger.error("Global Error", event.message, event.filename, event.lineno);
    });

    window.addEventListener("unhandledrejection", (event) => {
      Logger.error("Unhandled Promise", event.reason);
    });

    // 2. Custom Error Types
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
    }

    class NetworkError extends Error {
      constructor(message) {
        super(message);
        this.name = "NetworkError";
      }
    }

    // 3. Logging Utility
    const Logger = (() => {
      const logs = [];

      function log(level, ...args) {
        const timestamp = new Date().toISOString();
        const message = `[${level}] ${timestamp}: ${args.join(" ")}`;
        console[level === "error" ? "error" : "log"](message);
        logs.push(message);
      }

      return {
        info: (...args) => log("info", ...args),
        warn: (...args) => log("warn", ...args),
        error: (...args) => log("error", ...args),
        getLogs: () => [...logs],
        clear: () => logs.length = 0,
      };
    })();

    // 4. Debug Utilities
    function debugVars(obj) {
      Logger.info("Debug State:", JSON.stringify(obj, null, 2));
    }

    function simulateError() {
      throw new Error("This is a simulated error");
    }

    function simulateValidationError() {
      throw new ValidationError("Invalid input data");
    }

    // DOM
    const output = document.getElementById("output");

    document.getElementById("triggerError").addEventListener("click", () => {
      try {
        simulateError();
      } catch (e) {
        Logger.error(e.name, e.message);
      }
    });

    document.getElementById("triggerCustomError").addEventListener("click", () => {
      try {
        simulateValidationError();
      } catch (e) {
        if (e instanceof ValidationError) {
          Logger.warn("Caught a ValidationError:", e.message);
        } else {
          Logger.error("Unknown error", e.message);
        }
      }
    });

    document.getElementById("viewLogs").addEventListener("click", () => {
      output.textContent = Logger.getLogs().join("\n");
    });

    // Example debug
    debugVars({ user: "jackson", status: "active", features: ["debug", "log"] });