const apiKey = 'e7a96ab21fmsh0bea5582f6b212dp141604jsn5958d8f4ec30';
const apiHost = 'weather-by-api-ninjas.p.rapidapi.com';

const fetchWeatherData = async (city) => {
    const url = `https://${apiHost}/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        return {
            city: city,
            temp: result.temp,
            feels_like: result.feels_like,
            humidity: result.humidity,
            min_temp: result.min_temp,
            max_temp: result.max_temp,
            wind_speed: result.wind_speed,
            wind_degrees: result.wind_degrees,
            sunrise: result.sunrise,
            sunset: result.sunset
        };
    } catch (error) {
        console.error(`Error fetching data for ${city}: ${error.message}`);
        return null;
    }
};

const getWeather = async (city) => {
    const weatherData = await fetchWeatherData(city);

    if (weatherData) {
        document.getElementById('cityName').textContent = weatherData.city;
        document.getElementById('temp').textContent = weatherData.temp;
        document.getElementById('temp2').textContent = weatherData.temp;
        document.getElementById('feels_like').textContent = weatherData.feels_like;
        document.getElementById('humidity').textContent = weatherData.humidity;
        document.getElementById('humidity2').textContent = weatherData.humidity;
        document.getElementById('min_temp').textContent = weatherData.min_temp;
        document.getElementById('max_temp').textContent = weatherData.max_temp;
        document.getElementById('wind_speed').textContent = weatherData.wind_speed;
        document.getElementById('wind_speed2').textContent = weatherData.wind_speed;
        document.getElementById('wind_degrees').textContent = weatherData.wind_degrees;
        document.getElementById('sunrise').textContent = weatherData.sunrise;
        document.getElementById('sunset').textContent = weatherData.sunset;
    }
};

const displayWeatherData = async () => {
    const weatherDataContainer = document.getElementById('weatherData');
    const cities = ['India', 'Hyderabad','Mumbai', 'Lucknow', 'Kolkata', 'America'];

    for (const city of cities) {
        const data = await fetchWeatherData(city);

        if (data) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.city}</td>
                <td>${data.temp}</td>
                <td>${data.feels_like}</td>
                <td>${data.humidity}</td>
                <td>${data.min_temp}</td>
                <td>${data.max_temp}</td>
                <td>${data.wind_speed}</td>
                <td>${data.wind_degrees}</td>
                <td>${data.sunrise}</td>
                <td>${data.sunset}</td>
            `;
            weatherDataContainer.appendChild(row);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const cityInput = document.getElementById('city');
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const cityName = cityInput.value.trim();
        
        if (cityName !== '') {
            getWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });

    displayWeatherData();
	getWeather('Delhi');

});