const express = require('express');
const mongoose = require('mongoose');
const { Weather, DailySummary } = require('./schema'); // Import your schemas
const cron = require('node-cron');
const axios = require('axios');

// MongoDB Connection
mongoose.connect('mongodb+srv://test-user-fYikrmxbpHz7C098:fYikrmxbpHz7C098@diffcitiesweaether.j5ntj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define cities
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const apiKey = '6dfb39af888eac1147fb6dce6f3aab0a';

// Function to fetch weather data for each city
async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const weatherData = response.data;
        console.log(weatherData);
        return {
            city_name: city,
            timestamp: new Date(),
            temperature_celsius: weatherData.main.temp - 273.15,  // Convert to Celsius
            feels_like_celsius: weatherData.main.feels_like - 273.15,  // Convert to Celsius
            weather_condition: weatherData.weather[0].main,
        };

    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return null;
    }
}

// Function to store or update weather data
async function storeWeatherData(data) {
    // Find the existing weather data for the city
    let weather = await Weather.findOne({ city_name: data.city_name });

    if (!weather) {
        // If no data exists for the city, create a new document
        weather = new Weather({
            city_name: data.city_name,
            timestamp: new Date(),
            temperature_celsius: data.temperature_celsius,
            feels_like_celsius: data.feels_like_celsius,
            weather_condition: data.weather_condition,
            max_temperature: data.temperature_celsius,
            min_temperature: data.temperature_celsius,
            dominant_weather_condition: data.weather_condition,
            weather_condition_count: { [data.weather_condition]: 1 }, // Track frequency of weather conditions
            threshold_breach_count: 0,
            alertFlag: false, // Initialize alert flag as false
        });
    } else {
        // If data exists, update the document
        weather.temperature_celsius = data.temperature_celsius;
        weather.feels_like_celsius = data.feels_like_celsius;
        weather.timestamp = new Date(); // Update timestamp

        // Update max and min temperature
        weather.max_temperature = Math.max(weather.max_temperature, data.temperature_celsius);
        weather.min_temperature = Math.min(weather.min_temperature, data.temperature_celsius);

        // Update the dominant weather condition based on frequency
        const condition = data.weather_condition;
        console.log(`Weather condition for ${data.city_name}:`,condition);
        console.log("weather", weather.weather_condition_count.get('Mist'));
        console.log("weather map", weather.weather_condition_count);
        if (weather.weather_condition_count.has(condition)) {
            weather.weather_condition_count.set(condition, (weather.weather_condition_count.get(condition) + 1) % 24);
        } else {
            weather.weather_condition_count.set(condition, 1);
        }

        // Check if weather_condition_count is not empty
        const countObject = Object.fromEntries(weather.weather_condition_count);

        // Find the most frequent weather condition
        if (Object.keys(countObject).length > 0) {
            const dominantCondition = Object.keys(countObject).reduce((prev, curr) =>
                countObject[curr] > countObject[prev] ? curr : prev
            );

            // Set the dominant weather condition
            weather.dominant_weather_condition = dominantCondition;
        } else {
            weather.dominant_weather_condition = null; // or any default value you want to set
        }


        // Check for threshold breach (example: temperature > 35°C)
        const thresholdTemperature = weather.alert_threshold?.temperature || 35; // Default threshold of 35°C
        const consecutiveUpdatesRequired = 2; // Trigger alert after 2 consecutive breaches

        if (data.temperature_celsius > thresholdTemperature) {
            weather.threshold_breach_count += 1;

            // If the threshold has been breached for two consecutive updates, trigger an alert
            if (weather.threshold_breach_count >= consecutiveUpdatesRequired) {
                weather.alertFlag = true; // Set alert flag to true
                console.log(`ALERT: Temperature in ${data.city_name} has exceeded ${thresholdTemperature}°C for two consecutive updates!`);
                // Optionally, you can send an email or another type of notification here
            }
        } else {
            // Reset the breach count if the temperature goes below the threshold
            weather.threshold_breach_count = 0;
            weather.alertFlag = false; // Reset the alert flag
        }
    }

    // Save the document (either a new one or the updated one)
    await weather.save();
}

// Cron job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather data...');
    for (const city of cities) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            await storeWeatherData(weatherData);  // Store or update the data in MongoDB
        }
    }
});


