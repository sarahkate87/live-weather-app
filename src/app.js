function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
}

let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
