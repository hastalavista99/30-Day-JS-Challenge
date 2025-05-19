// Exercise: Create a utility that uses the Geolocation API with fallbacks

function getLocation(successCallback, errorCallback) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, () => {
      errorCallback("Location access denied or unavailable.");
    });
  } else {
    errorCallback("Geolocation is not supported by this browser.");
  }
}

// Example usage
getLocation(
  (position) => console.log("Latitude:", position.coords.latitude),
  (err) => console.warn(err)
);
