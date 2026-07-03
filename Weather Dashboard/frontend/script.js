// API Configuration
const API_KEY = "e598d48f7d96709e90bea45db43c3fae";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const AIR_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

// DOM Elements
const cityInput = document.getElementById("cityInput");
const citySelect = document.getElementById("citySelect");
const searchBtn = document.getElementById("searchBtn");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");

// Hero Section
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const weatherDescription = document.getElementById("weatherDescription");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");

// Conditions Section
const humidityValue = document.getElementById("humidityValue");
const aqiValue = document.getElementById("aqiValue");
const aqiStatus = document.getElementById("aqiStatus");
const uvValue = document.getElementById("uvValue");
const uvLevel = document.getElementById("uvLevel");
const visibilityValue = document.getElementById("visibilityValue");
const pressureValue = document.getElementById("pressureValue");

// Hourly Forecast
const hourlyForecast = document.getElementById("hourlyForecast");

// Map
const cityMapElement = document.getElementById("cityMap");

// City Locations for Map
const CITY_LOCATIONS = [
  { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "New Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
];

let cityMap;
let cityMapInitialized = false;

// Weather Emoji Function
function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id > 800) return "☁️";
  return "🌤️";
}

// AQI Info
function getAQIInfo(aqi) {
  if (aqi === 1) return { text: "Good", color: "green" };
  if (aqi === 2) return { text: "Fair", color: "yellow" };
  if (aqi === 3) return { text: "Moderate", color: "orange" };
  if (aqi === 4) return { text: "Poor", color: "red" };
  return { text: "Very Poor", color: "red" };
}

// UV Info
function getUVInfo(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

// Loading Functions
function showLoading() {
  loadingState.hidden = false;
  errorState.hidden = true;
}

function hideLoading() {
  loadingState.hidden = true;
}

function showError(message = "City Not Found") {
  errorState.hidden = false;
  errorState.textContent = message;
}

// Render Hourly Forecast
function renderHourlyForecast(list) {
  if (!hourlyForecast) return;
  
  hourlyForecast.innerHTML = "";
  list.slice(0, 12).forEach((item) => {
    const box = document.createElement("div");
    box.className = "hourly-item";
    const time = new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const rain = item.rain ? item.rain["3h"] || 0 : 0;
    box.innerHTML = `
      <div class="hourly-time">${time}</div>
      <div class="hourly-icon">${getWeatherEmoji(item.weather[0].id)}</div>
      <div class="hourly-temp">${Math.round(item.main.temp)}°</div>
      <div class="hourly-rain">${rain > 0 ? rain.toFixed(1) + "mm" : ""}</div>
    `;
    hourlyForecast.appendChild(box);
  });
}

// Initialize Map
function initCityMap() {
  if (!cityMapElement || typeof L === "undefined" || cityMapInitialized) return;

  try {
    cityMap = L.map(cityMapElement, {
      center: [20.5, 78.5],
      zoom: 5,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(cityMap);

    CITY_LOCATIONS.forEach((city) => {
      const marker = L.marker([city.lat, city.lon]).addTo(cityMap);
      marker.bindPopup(`<strong>${city.name}</strong><br>Click to load weather`).on("click", () => {
        cityInput.value = "";
        citySelect.value = city.name;
        fetchWeather(city.name);
      });
    });

    cityMapInitialized = true;
  } catch (error) {
    console.error("Map initialization error:", error);
  }

  // Fallback: ensure Register button opens modal even if listener wasn't attached
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.id === 'registerBtn') {
      const modal = document.getElementById('registerModal');
      if (modal) {
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        const first = document.getElementById('regName'); if (first) first.focus();
      }
    }
  });
}

// Refresh Map Size
function refreshCityMap() {
  if (cityMapInitialized && cityMap) {
    setTimeout(() => cityMap.invalidateSize(), 150);
  }
}

// Fetch Weather Data
async function fetchWeather(city) {
  showLoading();
  errorState.hidden = true;

  try {
    // Fetch current weather
    const weatherRes = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!weatherRes.ok) {
      throw new Error("City not found");
    }

    const weatherData = await weatherRes.json();

    // Fetch forecast
    const forecastRes = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!forecastRes.ok) {
      throw new Error("Forecast not available");
    }

    const forecastData = await forecastRes.json();

    // Fetch air quality
    const { coord } = weatherData;
    let airData = null;
    
    try {
      const airRes = await fetch(
        `${AIR_URL}?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
      );
      if (airRes.ok) {
        airData = await airRes.json();
      }
    } catch (error) {
      console.warn("Air quality data not available");
    }

    updateUI(weatherData, forecastData, airData);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    showError(error.message || "Unable to fetch weather");
  } finally {
    hideLoading();
  }
}

// Update UI with Weather Data
function updateUI(weatherData, forecastData, airData) {
  console.log("Updating UI with:", weatherData);
  
  // Update hero section
  cityName.textContent = weatherData.name;
  temperature.textContent = Math.round(weatherData.main.temp) + "°";
  tempMax.textContent = Math.round(weatherData.main.temp_max) + "°";
  tempMin.textContent = Math.round(weatherData.main.temp_min) + "°";
  
  weatherIcon.textContent = getWeatherEmoji(weatherData.weather[0].id);
  weatherDescription.textContent = weatherData.weather[0].main;
  feelsLike.textContent = `Feels Like ${Math.round(weatherData.main.feels_like)}°`;

  // Update conditions
  humidityValue.textContent = weatherData.main.humidity + "%";
  pressureValue.textContent = weatherData.main.pressure + " mb";
  visibilityValue.textContent = (weatherData.visibility / 1000).toFixed(1) + " km";

  // Update AQI
  if (airData && airData.list && airData.list[0]) {
    const aqi = airData.list[0].main.aqi;
    aqiValue.textContent = aqi;
    const aqiInfo = getAQIInfo(aqi);
    aqiStatus.textContent = aqiInfo.text;
  }

  // Update UV Index (mock data - OpenWeatherMap free tier doesn't include UV)
  uvValue.textContent = "5";
  uvLevel.textContent = "Moderate";

  // Render hourly forecast
  if (forecastData.list) {
    renderHourlyForecast(forecastData.list);
  }

  refreshCityMap();
}

// Global registration handler (ensures form won't trigger navigation)
function handleRegistration(e) {
  if (e && e.preventDefault) e.preventDefault();
  const registerMessage = document.getElementById("registerMessage");
  const nameEl = document.getElementById("regName");
  const emailEl = document.getElementById("regEmail");
  const passwordEl = document.getElementById("regPassword");
  const confirmEl = document.getElementById("regConfirm");
  const cityEl = document.getElementById("regCity");
  if (!nameEl || !emailEl || !passwordEl || !confirmEl) return false;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim().toLowerCase();
  const password = passwordEl.value;
  const confirm = confirmEl.value;
  const city = cityEl ? cityEl.value : "";

  if (!name || !email || !password) {
    if (registerMessage) { registerMessage.textContent = "Please fill required fields."; registerMessage.classList.add('error'); }
    return false;
  }
  if (password.length < 6) {
    if (registerMessage) { registerMessage.textContent = "Password must be at least 6 characters."; registerMessage.classList.add('error'); }
    return false;
  }
  if (password !== confirm) {
    if (registerMessage) { registerMessage.textContent = "Passwords do not match."; registerMessage.classList.add('error'); }
    return false;
  }

  const key = 'weather_users';
  const stored = localStorage.getItem(key);
  let users = stored ? JSON.parse(stored) : [];
  if (users.find(u => u.email === email)) {
    if (registerMessage) { registerMessage.textContent = "An account with this email already exists."; registerMessage.classList.add('error'); }
    return false;
  }

  const user = { id: Date.now(), name, email, password, city, createdAt: new Date().toISOString() };
  users.push(user);
  localStorage.setItem(key, JSON.stringify(users));

  if (registerMessage) { registerMessage.textContent = "Registration successful! You can now search weather."; registerMessage.classList.remove('error'); registerMessage.classList.add('success'); }

  setTimeout(() => {
    const modal = document.getElementById('registerModal');
    if (modal) { modal.hidden = true; modal.setAttribute('aria-hidden','true'); }
    if (document.getElementById('registrationForm')) document.getElementById('registrationForm').reset();
    if (registerMessage) { registerMessage.textContent = ''; registerMessage.className = 'form-message'; }
  }, 1000);

  return false;
}

// Event Listeners
function setupEventListeners() {
  // City selector change
  if (citySelect) {
    citySelect.addEventListener("change", () => {
      const city = citySelect.value;
      if (city) fetchWeather(city);
    });
  }

  // City input enter key
  if (cityInput) {
    cityInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const city = cityInput.value.trim() || citySelect.value;
        if (city) fetchWeather(city);
      }
    });
  }

  // Search button click
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim() || citySelect.value;
      if (city) fetchWeather(city);
    });
  }

  // Registration: open modal
  const registerBtn = document.getElementById("registerBtn");
  const registerModal = document.getElementById("registerModal");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");
  const registerCancel = document.getElementById("registerCancel");
  const registrationForm = document.getElementById("registrationForm");
  const registerMessage = document.getElementById("registerMessage");

  function openRegisterModal() {
    if (!registerModal) return;
    registerModal.hidden = false;
    registerModal.setAttribute("aria-hidden", "false");
    // focus first field
    const first = document.getElementById("regName");
    if (first) first.focus();
  }

  function closeRegisterModal() {
    if (!registerModal) return;
    registerModal.hidden = true;
    registerModal.setAttribute("aria-hidden", "true");
    if (registerMessage) {
      registerMessage.textContent = "";
      registerMessage.className = "form-message";
    }
    if (registrationForm) registrationForm.reset();
  }

  if (registerBtn) registerBtn.addEventListener("click", openRegisterModal);
  if (modalClose) modalClose.addEventListener("click", closeRegisterModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeRegisterModal);
  if (registerCancel) registerCancel.addEventListener("click", closeRegisterModal);

  // Handle registration submit
  if (registrationForm) {
    // Prefer global handler (see handleRegistration) but keep listener as fallback
    registrationForm.addEventListener("submit", (e) => handleRegistration(e));
  }



// Initialize on Page Load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, initializing...");
  initCityMap();
  setupEventListeners();
  
  // Load default city
  const defaultCity = citySelect ? citySelect.value : "Nagpur";
  console.log("Loading default city:", defaultCity);
  fetchWeather(defaultCity);
});
