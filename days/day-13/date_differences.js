// Exercise: Implement functions to calculate date differences in various units

function dateDiff(date1, date2, unit = 'days') {
  const ms = Math.abs(new Date(date1) - new Date(date2));
  const conversions = {
    seconds: ms / 1000,
    minutes: ms / (1000 * 60),
    hours: ms / (1000 * 60 * 60),
    days: ms / (1000 * 60 * 60 * 24),
    weeks: ms / (1000 * 60 * 60 * 24 * 7),
  };
  return Math.floor(conversions[unit]);
}

// Example
console.log(dateDiff('2025-05-01', '2025-05-13', 'days')); // 12
