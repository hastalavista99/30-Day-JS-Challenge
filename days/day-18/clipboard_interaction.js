// Exercise: Clipboard Interaction

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Clipboard write failed:", err);
  }
};

const pasteText = async () => {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Pasted from clipboard:", text);
    return text;
  } catch (err) {
    console.error("Clipboard read failed:", err);
  }
};

// Usage:
// copyText("Hello, world!");
// pasteText();
