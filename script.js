document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const descripDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-msg");
  const API_KEY = "36f7d87787eea79888cb615402fb2ab5";

  doTask = async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error. because server/database is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  };

  getWeatherBtn.addEventListener("click", doTask);
  cityInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      doTask();
    }
  });

  const fetchWeatherData = async (city) => {
    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("city not found!");
    }
    const content = await response.json();
    return content;
  };

  displayWeatherData = (data) => {
    //Display
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    tempDisplay.textContent = `Temperature: ${main.temp}°C`;
    feelsLike.textContent = `feels like: ${main.feels_like}°C`;
    descripDisplay.textContent = `Weather: ${weather[0].description}`;

    // unlock the display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  };

  showError = () => {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  };
});
