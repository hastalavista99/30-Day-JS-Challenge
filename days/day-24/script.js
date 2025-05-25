// Day 24: Modular JavaScript
// 1. Create a module system for organizing code
// 2. Implement a plugin architecture for extending functionality
// 3. Build a utility that dynamically loads code when needed
// 4. Write functions that manage dependencies between modules

// Module System
    const ModuleSystem = (() => {
      const modules = {};
      const cache = {};

      return {
        define: (name, deps, factory) => {
          modules[name] = { deps, factory };
        },
        require: (name) => {
          if (cache[name]) return cache[name];
          if (!modules[name]) throw new Error(`Module ${name} not defined`);
          const { deps, factory } = modules[name];
          const resolvedDeps = deps.map(dep => ModuleSystem.require(dep));
          const module = factory(...resolvedDeps);
          cache[name] = module;
          return module;
        },
      };
    })();

    // Plugin System
    function createPluginSystem() {
      const plugins = [];
      return {
        register(plugin) {
          if (typeof plugin.install === "function") {
            plugin.install(this);
            plugins.push(plugin);
          }
        },
        plugins,
      };
    }

    const LoggerPlugin = {
      install(app) {
        app.log = (msg) => {
          console.log("[App Log]", msg);
          document.getElementById("output").textContent += "[App Log] " + msg + "\n";
        };
      },
    };

    // Dynamic loader
    function loadScript(url, globalVar) {
      return new Promise((resolve, reject) => {
        if (window[globalVar]) return resolve(window[globalVar]);
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve(window[globalVar]);
        script.onerror = () => reject(new Error("Script load failed"));
        document.head.appendChild(script);
      });
    }

    // Define modules
    ModuleSystem.define("math", [], () => ({
      add: (a, b) => a + b,
      multiply: (a, b) => a * b,
    }));

    ModuleSystem.define("calculator", ["math"], (math) => ({
      compute: (x, y) => ({
        sum: math.add(x, y),
        product: math.multiply(x, y),
      }),
    }));

    // Use modules
    const calc = ModuleSystem.require("calculator");
    document.getElementById("output").textContent +=
      "Calculator: " + JSON.stringify(calc.compute(3, 7)) + "\n";

    // Plugin example
    const app = createPluginSystem();
    app.register(LoggerPlugin);
    app.log("Plugin system initialized");

    // Load lodash on button click
    document.getElementById("load-lodash").addEventListener("click", () => {
      loadScript("https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js", "_")
        .then((_) => {
          const result = _.chunk([1, 2, 3, 4, 5, 6], 2);
          app.log("Lodash loaded: " + JSON.stringify(result));
        })
        .catch((err) => app.log("Error loading script: " + err.message));
    });