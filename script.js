const apiKey = "1b4acdddd8b3cd74f1f88664ba7b41e2"; // Replace with your OpenWeather API key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMessage = document.getElementById("errorMessage");

    if (!city) {
        showError("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                showError("City not found. Try again!");
                return;
            }

            document.getElementById("cityName").innerText = `Weather in ${data.name}`;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("condition").innerText = `Condition: ${data.weather[0].description}`;
            
            updateWeatherIcon(data.weather[0].main);
            changeBackground(data.weather[0].main);

            weatherInfo.classList.remove("hidden");
            errorMessage.classList.add("hidden");
        })
        .catch(error => {
            showError("Error fetching weather data");
            console.error(error);
        });
}

function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = message;
    errorMessage.classList.remove("hidden");
}

function updateWeatherIcon(weatherCondition) {
    const weatherIcon = document.getElementById("weatherIcon");
    const iconClasses = {
        "Clear": "fas fa-sun",
        "Clouds": "fas fa-cloud",
        "Rain": "fas fa-cloud-showers-heavy",
        "Snow": "fas fa-snowflake",
        "Thunderstorm": "fas fa-bolt",
        "Drizzle": "fas fa-cloud-rain",
        "Mist": "fas fa-smog"
    };

    weatherIcon.className = iconClasses[weatherCondition] || "fas fa-cloud";
}

function changeBackground(weatherCondition) {
    const body = document.body;
    const backgrounds = {
        "Clear": "linear-gradient(to right, #f7b733, #fc4a1a)",
        "Clouds": "linear-gradient(to right, #bdc3c7, #2c3e50)",
        "Rain": "linear-gradient(to right, #4a90e2, #000)",
        "Snow": "linear-gradient(to right, #a0e6ff, #dff9fb)",
        "Thunderstorm": "linear-gradient(to right, #3a3a3a, #000)",
        "Drizzle": "linear-gradient(to right, #74ebd5, #ACB6E5)",
        "Mist": "linear-gradient(to right, #B0BEC5, #78909C)"
    };

    body.style.background = backgrounds[weatherCondition] || "linear-gradient(to right, #00c6ff, #0072ff)";
}

