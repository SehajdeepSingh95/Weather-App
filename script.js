const inputText = document.querySelector(".searchBox");
const submit = document.querySelector(".submit");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const error = document.querySelector("#error");
const weatherIcon = document.querySelector(".weatherIcon");
const weatherContainer = document.querySelector(".weatherContainer");

//API KEY is not mine, it is taken from GeekforGeeks's website
//You can get your own API key from OpenWeatherMap's website

const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";

weatherContainer.style.display = "none";

submit.addEventListener("click", () => {
    const cityname = inputText.value.trim();
    if (cityname) fetchWeatherData(cityname);
    inputText.value = "";
});

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cityname = inputText.value.trim();
        if (cityname) fetchWeatherData(cityname);
        inputText.value = "";
    }
});

const fetchWeatherData = async (cityname) => {
    try {
        const data = await fetch(`${URL}${cityname}&appid=${API_KEY}&units=metric`);
        const response = await data.json();

        if (response.cod != 200) {
            error.classList.remove("hidden");
            error.textContent = "City not found. Please try again...";
            weatherContainer.style.display = "none";
            return;
        }

        city.textContent = response.name;
        temp.textContent = `${Math.round(response.main.temp)}°C`;
        description.textContent = response.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        weatherIcon.alt = response.weather[0].description;
        weatherContainer.style.display = "block";
        error.textContent = "";
    } catch (err) {
        error.classList.remove("hidden");
        error.textContent = "Network error. Please try again later...";
        weatherContainer.style.display = "none";
    }
};
