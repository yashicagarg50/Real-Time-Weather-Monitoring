import React, { useState } from 'react';
import {
    UilTemperature,
    UilWind,
    UilSun,
} from "@iconscout/react-unicons";

function WeatherDetails({ weather }) {
    const [unit, setUnit] = useState('metric');

    const convertTemperature = (tempInCelsius) => {
        let convertedTemp = tempInCelsius;
        if (unit === 'imperial') {
            convertedTemp = (tempInCelsius * 9 / 5) + 32; // Fahrenheit
        } else if (unit === 'kelvin') {
            convertedTemp = tempInCelsius + 273.15; // Kelvin
        }
        // Truncate to 2 decimal places
        return parseFloat(convertedTemp.toFixed(2));
    };
    
    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
    };

    // Mapping weather conditions to icons
    const weatherIconMap = {
        "Clear": "http://openweathermap.org/img/wn/01d@2x.png",
        "Cloudy": "http://openweathermap.org/img/wn/02d@2x.png",
        "Rain": "http://openweathermap.org/img/wn/09d@2x.png",
        "Mist": "http://openweathermap.org/img/wn/50d@2x.png",
        "Haze": "http://openweathermap.org/img/wn/50d@2x.png",
        "Snow": "http://openweathermap.org/img/wn/13d@2x.png",
        "Thunderstorm": "http://openweathermap.org/img/wn/11d@2x.png",
        "Fog": "http://openweathermap.org/img/wn/50d@2x.png",
    };

    const weatherIcon = weatherIconMap[weather.weather_condition] || ""; // Fallback to empty string if no match

    // Extract frequency from weather_condition_count
    const frequency = weather.weather_condition_count[weather.dominant_weather_condition] || 0;

    return (
        <div>
            <div className="flex justify-center items-center py-6 text-xl text-cyan-300">
                <p>{weather.weather_condition}</p>
            </div>

            <div className="flex flex-row items-center justify-center text-white py-3">
                {weatherIcon && <img src={weatherIcon} alt={weather.weather_condition} className="w-20" />}
                <p className="text-5xl"> {convertTemperature(weather.temperature_celsius)}°{unit === 'metric' ? 'C' : unit === 'imperial' ? 'F' : 'K'}</p>
            </div>

            <div className="flex justify-center items-center py-6 text-xl text-white">
                Weather Highlights:
            </div>

            <div className="flex flex-col justify-between space-y-4 text-white items-center">
                <div className="flex flex-row items-center justify-between w-full text-xl text-white font-extralight">
                    <div className="flex items-center">
                        <UilTemperature size={30} className="mr-2" />
                        Maximum temperature:
                        <span className="font-medium ml-1">{convertTemperature(weather.max_temperature)}°{unit === 'metric' ? 'C' : unit === 'imperial' ? 'F' : 'K'}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full text-xl text-white font-extralight">
                    <div className="flex items-center">
                        <UilTemperature size={30} className="mr-2" />
                        Minimum temperature:
                        <span className="font-medium ml-1">{convertTemperature(weather.min_temperature)}°{unit === 'metric' ? 'C' : unit === 'imperial' ? 'F' : 'K'}</span>
                    </div>
                </div>
                
                <div className="flex flex-row items-center justify-between w-full text-xl text-white font-extralight">
                    <div className="flex items-center">
                        <UilTemperature size={30} className="mr-2" />
                        Aggregate temperature:
                        <span className="font-medium ml-1">{convertTemperature(weather.temperature_celsius)}°{unit === 'metric' ? 'C' : unit === 'imperial' ? 'F' : 'K'}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full text-xl text-white font-extralight">
                    <div className="flex items-center">
                        <UilWind size={30} className="mr-2" />
                        Dominant weather condition:
                        <span className="font-medium ml-1">{weather.dominant_weather_condition} (Frequency: {frequency})</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-full text-xl text-white font-extralight py-4">
                    <p className="text-white">
                        "{weather.dominant_weather_condition}" was the dominant weather condition for the day, occurring "{frequency}" times according to the recorded data, indicating that it was the most frequent weather pattern observed.
                    </p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4 py-4">
                <button onClick={() => handleUnitChange('metric')} className={`text-xl ${unit === 'metric' ? 'font-bold' : 'font-light'} text-white`}>°C</button>
                <button onClick={() => handleUnitChange('imperial')} className={`text-xl ${unit === 'imperial' ? 'font-bold' : 'font-light'} text-white`}>°F</button>
                <button onClick={() => handleUnitChange('kelvin')} className={`text-xl ${unit === 'kelvin' ? 'font-bold' : 'font-light'} text-white`}>K</button>
            </div>

            <div className="flex justify-center items-center">
                <button
                    className="py-6 text-xl text-white transform transition duration-300 hover:scale-105"
                    onClick={() => window.open("https://openweathermap.org/", "_blank")}
                >
                    <div className="flex items-center">
                        <UilSun size={25} className="mr-2" />
                        Browse Full Weather Archive
                    </div>
                </button>
            </div>
        </div>
    );
}

export default WeatherDetails;
