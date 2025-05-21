// Exercise: Write functions that use the Notification API appropriately

function notifyUser(title, options = {}) {
  if (!("Notification" in window)) {
    console.warn("Notifications are not supported.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, options);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, options);
      }
    });
  }
}

// Example
notifyUser("Reminder!", {
  body: "You’ve got tasks to complete.",
  icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png"
});
