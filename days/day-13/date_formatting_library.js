// Exercise: Create a date formatting library with different presets

const formatDate = (date, preset = "short") => {
  const d = new Date(date);
  const options = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    time: { hour: "2-digit", minute: "2-digit" },
    iso: {}, // Defaults to toISOString()
  };

  return preset === "iso"
    ? d.toISOString()
    : d.toLocaleString("en-US", options[preset]);
};

// Usage
console.log(formatDate(new Date(), "long"));
