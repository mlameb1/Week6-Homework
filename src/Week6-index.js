let currentDate = new Date();
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");

let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let year = currentDate.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[currentDate.getMonth()];

h3.innerHTML = `${day}, ${date} ${month} ${year}`;

h4.innerHTML = `${hours}:${minutes}`;

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#win");
  let temperature = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  h1.innerHTML = `${response.data.name} currently ${temperature}°C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let form1 = document.querySelector("#search-form");
form1.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(retrievePosition);

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentBut = document.querySelector("#currentlocation");
currentBut.addEventListener("click", searchCurrentLocation);
