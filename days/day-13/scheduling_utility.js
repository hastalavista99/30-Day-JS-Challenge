// Exercise: Build a scheduling utility that works with business days/hours

function isBusinessHour(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = d.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
}

function nextBusinessDay(date = new Date()) {
  const d = new Date(date);
  do {
    d.setDate(d.getDate() + 1);
  } while (d.getDay() === 0 || d.getDay() === 6);
  return d;
}

// Usage
console.log('Is business hour:', isBusinessHour());
console.log('Next business day:', formatDate(nextBusinessDay(), 'short'));
