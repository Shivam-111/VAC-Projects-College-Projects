import logo from './logo.svg';
import './App.css';

function App() {
  
return (

<div> 


    <header class="navbar">
    <div class="logo">
      <span class="logo-icon">🌦️</span>
      <span class="logo-text">Weather Intelligence Dashboard</span>
    </div>

    <div class="search-box">
      <select id="citySelect" aria-label="Choose a city">
        <option value="Nagpur">Nagpur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="New Delhi">New Delhi</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Chennai">Chennai</option>
      </select>
      <input
        type="text"
        id="cityInput"
        placeholder="Or type a city"
        aria-label="Enter city name"
      />
      <button id="searchBtn">Search</button>
      <button type="button" class="auth-btn" id="loginOpenBtn">Login</button>
      <button type="button" class="auth-btn secondary" id="registerOpenBtn">Register</button>
    </div>
  </header>

  <main class="dashboard">
    <section class="hero-card" id="heroCard">
      <div class="hero-left">
        <div class="hero-city" id="cityName">Nagpur</div>
        <div class="hero-weather">
          <div class="hero-icon" id="weatherIcon">🌤️</div>
          <div class="hero-temp" id="temperature">32°C</div>
        </div>
        <div class="hero-meta">
          <p id="feelsLike">Feels Like 35°C</p>
          <p id="weatherDescription">Clear Sky</p>
        </div>
        <div class="hero-author">
          <p class="author-name">shivam s dipte</p>
          <p class="author-usn">USN CS25D021</p>
        </div>
      </div>
    </section>

    <section class="map-card">
      <div class="map-header">
        <h2>Select City on Map</h2>
        <p>Click a marker to load the weather for that city.</p>
      </div>
      <div id="cityMap" class="map-container"></div>
    </section>

    <section class="card summary-card">
      <div class="summary-grid">
        <div class="mini-card">
          <div class="mini-title">Visibility</div>
          <strong id="summaryVisibilityValue">8 km</strong>
          <p>Good</p>
        </div>
        <div class="mini-card">
          <div class="mini-title">Pressure</div>
          <strong id="summaryPressureValue">1008 mb</strong>
          <p>Rising</p>
        </div>
        <div class="mini-card">
          <div class="mini-title">Air Quality</div>
          <strong id="summaryAqiValue">45</strong>
          <p id="summaryAqiStatus">Good</p>
        </div>
        <div class="mini-card">
          <div class="mini-title">UV Index</div>
          <strong id="summaryUvValue">4</strong>
          <p id="summaryUvLevel">Moderate</p>
        </div>
      </div>
    </section>

    <section class="loading" id="loadingState" hidden>
      <p>Loading... ⏳</p>
    </section>

    <section class="message" id="errorState" hidden>
      <p>City Not Found</p>
    </section>

    <section class="weather-grid">
      <article class="card">
        <h2>Current Weather</h2>
        <div class="stats-grid">
          <div class="stat"><span>Temperature</span><strong id="tempValue">32°C</strong></div>
          <div class="stat"><span>Humidity</span><strong id="humidityValue">70%</strong></div>
          <div class="stat"><span>Pressure</span><strong id="pressureValue">1008 hPa</strong></div>
          <div class="stat"><span>Wind Speed</span><strong id="windValue">12 km/h</strong></div>
          <div class="stat"><span>Visibility</span><strong id="visibilityValue">8 km</strong></div>
          <div class="stat"><span>Cloud %</span><strong id="cloudValue">30%</strong></div>
          <div class="stat"><span>Rain %</span><strong id="rainValue">20%</strong></div>
        </div>
      </article>

      <article class="card">
        <h2>Sunrise & Sunset</h2>
        <div class="sun-grid">
          <div class="sun-item">
            <span>🌅 Sunrise</span>
            <strong id="sunriseValue">6:01 AM</strong>
          </div>
          <div class="sun-item">
            <span>🌇 Sunset</span>
            <strong id="sunsetValue">6:49 PM</strong>
          </div>
        </div>
      </article>

      <article class="card">
        <h2>Air Quality</h2>
        <div class="aqi-box">
          <strong id="aqiStatus">Good</strong>
          <p>AQI : <span id="aqiValue">45</span></p>
        </div>
      </article>

      <article class="card">
        <h2>UV Index</h2>
        <div class="uv-box">
          <strong id="uvValue">4</strong>
          <p id="uvLevel">Moderate</p>
        </div>
      </article>
    </section>

    <section class="card forecast-card">
      <h2>Hourly Forecast</h2>
      <div class="horizontal-scroll" id="hourlyForecast">
        <div class="forecast-item">
          <p>10 AM</p>
          <strong>31°</strong>
          <span>☀️</span>
        </div>
        <div class="forecast-item">
          <p>11 AM</p>
          <strong>32°</strong>
          <span>☀️</span>
        </div>
        <div class="forecast-item">
          <p>12 PM</p>
          <strong>33°</strong>
          <span>☀️</span>
        </div>
      </div>
    </section>

    <section class="card forecast-card">
      <h2>Weekly Forecast</h2>
      <div class="weekly-list" id="weeklyForecast">
        <div class="weekly-item">
          <span>Monday</span>
          <strong>31°</strong>
          <span>☀️</span>
        </div>
        <div class="weekly-item">
          <span>Tuesday</span>
          <strong>29°</strong>
          <span>🌧️</span>
        </div>
        <div class="weekly-item">
          <span>Wednesday</span>
          <strong>30°</strong>
          <span>☁️</span>
        </div>
        <div class="weekly-item">
          <span>Thursday</span>
          <strong>33°</strong>
          <span>☀️</span>
        </div>
        <div class="weekly-item">
          <span>Friday</span>
          <strong>35°</strong>
          <span>☀️</span>
        </div>
      </div>
    </section>

    <section class="card compare-card">
      <h2>Compare Cities</h2>
      <div class="compare-grid" id="cityCompare">
        <div class="compare-item">
          <h3>Nagpur</h3>
          <p>32°C</p>
          <span>Humidity 70%</span>
        </div>
        <div class="compare-item">
          <h3>Mumbai</h3>
          <p>28°C</p>
          <span>Humidity 85%</span>
        </div>
        <div class="compare-item">
          <h3>Delhi</h3>
          <p>40°C</p>
          <span>Humidity 20%</span>
        </div>
      </div>
    </section>

    <section class="card alert-card">
      <h2>Weather Alerts</h2>
      <div class="alert-list" id="weatherAlerts">
        <div class="alert warning">⚠️ Heat Wave Alert</div>
        <div class="alert warning">⚠️ Strong Wind</div>
        <div class="alert info">⚠️ Heavy Rain Carry Umbrella</div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>Weather Intelligence Dashboard</p>
  </footer>

  <div class="auth-modal hidden" id="authModal">
    <div class="auth-backdrop" id="authBackdrop"></div>
    <div class="auth-dialog">
      <div class="auth-header">
        <div>
          <h2 id="authTitle">Login</h2>
          <p class="auth-subtitle">Access your personalized weather dashboard.</p>
        </div>
        <button class="close-btn" id="closeAuth">×</button>
      </div>

      <div class="auth-tabs">
        <button type="button" class="tab active" id="loginTab">Login</button>
        <button type="button" class="tab" id="registerTab">Register</button>
      </div>

      <div class="auth-body">
        <form id="loginForm" class="auth-form active">
          <label>Email</label>
          <input type="email" id="loginEmail" placeholder="you@example.com" required />
          <label>Password</label>
          <input type="password" id="loginPassword" placeholder="••••••••" required />
          <button type="submit" class="auth-submit">Login</button>
          <p class="auth-message" id="loginMessage"></p>
        </form>

        <form id="registerForm" class="auth-form">
          <label>Name</label>
          <input type="text" id="registerName" placeholder="Your name" required />
          <label>Email</label>
          <input type="email" id="registerEmail" placeholder="you@example.com" required />
          <label>Password</label>
          <input type="password" id="registerPassword" placeholder="••••••••" required />
          <label>Confirm Password</label>
          <input type="password" id="registerConfirm" placeholder="••••••••" required />
          <button type="submit" class="auth-submit">Create account</button>
          <p class="auth-message" id="registerMessage"></p>
        </form>
      </div>
    </div>
  </div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="script.js"></script>


</div>


  );
}

export default App;











// practice =============================================================================================


// App.jsx (useState)
// import { useState } from "restart";
// function App(){
//   const [count, setCount] = useState(0);
//   return(
//     <div>
//       <h1>{count}</h1>
//       <button onClick={
//         () => setCount(count+1)
//       }>increses</button>
//     </div>
//   )
// }















