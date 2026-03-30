// your code goes here
const API_KEY = 'affb8f39b23fb787a467af8a045faeab';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const errorEl = document.getElementById('error');
  const weatherEl = document.getElementById('weatherInfo');

  if (!city) return;

  errorEl.classList.add('hidden');
  weatherEl.classList.add('hidden');

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;

    weatherEl.classList.remove('hidden');
  } catch {
    errorEl.classList.remove('hidden');
  }
}

document.getElementById('cityInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') getWeather();
});
