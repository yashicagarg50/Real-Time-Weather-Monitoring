const { Weather, DailySummary } = require('./schema'); // Ensure you import your models

// Function to store or update weather data
async function storeWeatherData(data) {
    // Create a new weather document
    const weather = new Weather(data);
    await weather.save(); // Save the weather data

    // Get today's date in YYYY-MM-DD format
    const dateStr = new Date().toISOString().split('T')[0];  
    let summary = await DailySummary.findOne({ city_name: data.city_name, date: dateStr });

    if (!summary) {
        // Create a new daily summary if it doesn't exist
        summary = new DailySummary({
            city_name: data.city_name,
            date: dateStr,
            average_temperature: data.temperature_celsius,
            max_temperature: data.temperature_celsius,
            min_temperature: data.temperature_celsius,
            dominant_weather_condition: data.weather_condition,
            total_updates: 1,
        });
    } else {
        // Update the existing daily summary
        summary.total_updates += 1;
        summary.average_temperature = ((summary.average_temperature * (summary.total_updates - 1)) + data.temperature_celsius) / summary.total_updates;
        summary.max_temperature = Math.max(summary.max_temperature, data.temperature_celsius);
        summary.min_temperature = Math.min(summary.min_temperature, data.temperature_celsius);

        // Update the dominant weather condition if necessary
        if (summary.dominant_weather_condition !== data.weather_condition) {
            summary.dominant_weather_condition = data.weather_condition;
        }
    }
    
    await summary.save(); // Save the daily summary
}
