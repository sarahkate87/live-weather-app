function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let day = days[date.getDay()];
  let dayNum = date.getDate();
  let month = months[date.getMonth()];
  return `${day} ${dayNum} ${month}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusHighTemperature = response.data.main.temp_max;
  celsiusLowTemperature = response.data.main.temp_min;
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
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
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
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
}

function searchCity(city) {
  let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#update-search");
searchForm.addEventListener("submit", handleSearch);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(geoApiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#geolocate");
currentLocation.addEventListener("click", getCurrentLocation);

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

let celsiusTemperature = null;

let degreeUnits = document.querySelector("#toggle-units");
degreeUnits.addEventListener("click", toggleUnits);

searchCity("London");
