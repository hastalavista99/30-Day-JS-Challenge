const API_KEY = 'YOUR_API_KEY'; // Replace with OpenWeatherMap key
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const forecast = document.getElementById('forecast');
const favorites = document.getElementById('favorites');
const errorMsg = document.getElementById('errorMsg');

const getWeatherData = async (city) => {
  try {
    errorMsg.classList.add('hidden');
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error('City not found');

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    renderWeather(currentData, forecastData);
    saveFavorite(city);
  } catch (err) {
    showError(err.message);
  }
};

const renderWeather = (current, forecastData) => {
  weatherDisplay.classList.remove('hidden');
  cityName.textContent = current.name;
  description.textContent = current.weather[0].description;
  temperature.textContent = `${current.main.temp}°C`;

  // Display next 4 time slots (approx every 3 hrs)
  forecast.innerHTML = '';
  forecastData.list.slice(0, 4).forEach(item => {
    const div = document.createElement('div');
    div.className = 'bg-blue-100 rounded p-2 text-center';
    div.innerHTML = `
      <p class="text-sm">${new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p>${item.main.temp}°C</p>
      <p class="text-xs">${item.weather[0].main}</p>
    `;
    forecast.appendChild(div);
  });
};

const showError = (msg) => {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
};

const saveFavorite = (city) => {
  let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favoritesList.includes(city)) {
    favoritesList.push(city);
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    renderFavorites();
  }
};

const renderFavorites = () => {
  favorites.innerHTML = '';
  const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesList.forEach(city => {
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.className = 'bg-gray-200 px-3 py-1 rounded';
    btn.onclick = () => getWeatherData(city);
    favorites.appendChild(btn);
  });
};

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (city) getWeatherData(city);
};

renderFavorites();
