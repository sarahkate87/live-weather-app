// Toggle Units
function toggleUnits(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahreinheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);

  let highTempElement = document.querySelector("#high-temp");
  let highTemperature = (celsiusHighTemperature * 9) / 5 + 32;
  highTempElement.innerHTML = Math.round(highTemperature);

  let lowTempElement = document.querySelector("#low-temp");
  let lowTemperature = (celsiusLowTemperature * 9) / 5 + 32;
  lowTempElement.innerHTML = Math.round(lowTemperature);

  let unit = document.querySelector("#unit-switch-value");
  let currentUnit = document.querySelector("#degrees");
  if (unit.innerHTML === "°F") {
    unit.innerHTML = "°C";
    currentUnit.innerHTML = "°F";
  } else {
    unit.innerHTML = "°F";
    currentUnit.innerHTML = "°C";
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    highTempElement.innerHTML = Math.round(celsiusHighTemperature);
    lowTempElement.innerHTML = Math.round(celsiusLowTemperature);
  }
}

let degreeUnits = document.querySelector("#toggle-units");
degreeUnits.addEventListener("click", toggleUnits);

function resetUnits(event) {
  event.preventDefault();
  let unit = document.querySelector("#unit-switch-value");
  let currentUnit = document.querySelector("#degrees");
  if (unit.innerHTML === "°C") {
    unit.innerHTML = "°F";
    currentUnit.innerHTML = "°C";
  }
}

// Time & Date
function formatDate(timestamp) {
  let localOffset = timestamp.getTimezoneOffset() * 60 * 1000;
  let targetOffset = localTimezone * 1000;
  let targetTime = timestamp.getTime() + localOffset + targetOffset;
  let localDate = new Date(targetTime);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[localDate.getDay()];
  let dayNum = localDate.getDate();
  let month = months[localDate.getMonth()];
  return `${day} ${dayNum} ${month}`;
}

function formatTime(timestamp) {
  let localOffset = timestamp.getTimezoneOffset() * 60 * 1000;
  let targetOffset = localTimezone * 1000;
  let targetTime = timestamp.getTime() + localOffset + targetOffset;
  let localTime = new Date(targetTime);

  let hours = localTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = localTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-5 row-cols-lg-5 g-2 g-lg-3">`;
  let days = ["Thur", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col p-2 weather-forecast">
                    <div class="forecast-day">${day}</div>
                    <img
                      src="images/sun-cloud.svg"
                      alt=""
                      width="60"
                      class="forecast-img"
                    />
                    <div class="forecast-temps">
                      <span class="forecast-max-temp">18°</span>
                      <span class="forecast-min-temp">12°</span>
                    </div>
                  </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Temperature & Data Display
function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusHighTemperature = response.data.main.temp_max;
  celsiusLowTemperature = response.data.main.temp_min;
  localTimezone = response.data.timezone;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(new Date());
  document.querySelector("#time").innerHTML = formatTime(new Date());
  document.querySelector("#high-temp").innerHTML = Math.round(
    celsiusHighTemperature
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    celsiusLowTemperature
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#sunrise").innerHTML = formatTime(
    new Date(response.data.sys.sunrise * 1000)
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    new Date(response.data.sys.sunset * 1000)
  );
}

// Search Form
function searchCity(city) {
  let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault(resetUnits(event));
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#update-search");
searchForm.addEventListener("submit", handleSearch);

// Geolocation
function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(geoApiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault(resetUnits(event));
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#geolocate");
currentLocation.addEventListener("click", getCurrentLocation);

// Global
let celsiusTemperature = null;
let localTimezone = null;

searchCity("London");
displayForecast();
