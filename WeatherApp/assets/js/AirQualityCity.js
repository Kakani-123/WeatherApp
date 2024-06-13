const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    const url = `https://air-quality.p.rapidapi.com/history/airquality?city=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e7a96ab21fmsh0bea5582f6b212dp141604jsn5958d8f4ec30',
            'x-rapidapi-host': 'air-quality.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();

        if (result.data && result.data.length > 0) {
            let readings = result.data[0];
            aqiResult.textContent = readings.aqi !== undefined ? readings.aqi : 'N/A';
            coResult.textContent = readings.co !== undefined ? readings.co : 'N/A';
            no2Result.textContent = readings.no2 !== undefined ? readings.no2 : 'N/A';
            pm2Result.textContent = readings.pm2 !== undefined ? readings.pm2 : 'N/A';
            o3Result.textContent = readings.o3 !== undefined ? readings.o3 : 'N/A';
            pm10Result.textContent = readings.pm10 !== undefined ? readings.pm10 : 'N/A';
            so2Result.textContent = readings.so2 !== undefined ? readings.so2 : 'N/A';
            resultContainer.style.display = 'block';
        } else {
            console.error('No data available for the given city.');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});
