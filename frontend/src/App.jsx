import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TimeAndLocation from './components/TimeAndLocation';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';

function App() {
  const [weatherData, setWeatherData] = useState(null); // State to hold weather data
  const [city, setCity] = useState('Delhi'); // Default city

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${cityName}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch weather data on city change and at regular intervals
  useEffect(() => {
    // Fetch weather data immediately when the component mounts
    fetchWeather(city);

    // Set up an interval to fetch weather data every 5 minutes
    const intervalId = setInterval(() => {
      fetchWeather(city);
    }, 300000); // 300000 ms = 5 minutes

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [city]); // Re-run effect if the city changes

  // Call this function when a city is clicked
  const handleCityChange = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName); // Fetch weather for the selected city
  };

  return (
    <div>
      <div
        className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-cover bg-center h-fit shadow-xl shadow-gray-400"
        style={{
          backgroundImage: `url('src/assets/edited.png')`,
        }}
      >
        <Navbar onCityChange={handleCityChange} />
        <TimeAndLocation city={city} />
        {weatherData ? (
          <WeatherDetails weather={weatherData} />
        ) : (
          <p className="text-center mt-6 text-white">Loading weather data🔃🔃🔃</p>
        )}
        <Forecast/>
      </div>
      <div>
        {/* Footer Section */}
        <footer className="text-center mt-6 text-black">
          <p>
            <span className='ml-2'> Made by Anushka </span>
            <a
              href="https://github.com/anushka81/Real-Time-Weather-Monitoring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              <strong>GitHub</strong>
            </a>
          </p>
        </footer>
      </div>
    </div>

  );
}

export default App;
