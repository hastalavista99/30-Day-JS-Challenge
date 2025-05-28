// 1. Analyze code for issues (e.g., unused vars, bad practices)
function analyzeCode(code) {
  const issues = [];
  if (/var\s+\w+/.test(code))
    issues.push("Avoid 'var'. Use 'let' or 'const' instead.");
  if (code.includes("==") && !code.includes("==="))
    issues.push("Use '===' for strict comparison.");
  if (code.match(/\bconsole\.log\b/g)?.length > 3)
    issues.push("Too many console.log calls.");
  return issues.length ? issues.join("\n") : "No major issues found.";
}

const exampleCode = `
      var count = 0;
      if (count == '0') {
        console.log("Equal");
      }
      console.log("Still debugging...");
      console.log("More logs");
    `;

document.getElementById("analysis").textContent = analyzeCode(exampleCode);

// 2. Performance Measurement
function measure(fn, label = "Execution time") {
  const start = performance.now();
  fn();
  const end = performance.now();
  return `${label}: ${(end - start).toFixed(3)}ms`;
}

const heavy = () => {
  let sum = 0;
  for (let i = 0; i < 1_000_000; i++) sum += i;
  return sum;
};

document.getElementById("performance").textContent = measure(heavy);

// 3. Simple Code Formatter (trims, normalizes spacing)
function formatCode() {
  const input = document.getElementById("codeInput").value;
  const formatted = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line)
    .map((line) => line.replace(/\s{2,}/g, " "))
    .join("\n");
  document.getElementById("formattedCode").textContent = formatted;
}

// 4. Refactor Common Patterns
function refactorCode(code) {
  return code
    .replace(
      /\.forEach\((\w+)\s*=>\s*\{(.*?)\}\);/gs,
      "for (const $1 of array) {$2}"
    )
    .replace(/==/g, "===")
    .replace(/\bvar\b/g, "let");
}

const oldCode = `
      var items = [1, 2, 3];
      items.forEach(item => {
        if (item == 2) {
          console.log("Match");
        }
      });
    `;

document.getElementById("refactor").textContent = refactorCode(oldCode);
