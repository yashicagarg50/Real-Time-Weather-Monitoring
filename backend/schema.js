const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb+srv://test-user-fYikrmxbpHz7C098:fYikrmxbpHz7C098@diffcitiesweaether.j5ntj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Schema for storing real-time weather updates with additional fields
const weatherSchema = new mongoose.Schema({
    city_name: { type: String, required: true },
    timestamp: { type: Date, required: true },
    temperature_celsius: { type: Number, required: true },
    feels_like_celsius: { type: Number, required: true },
    weather_condition: { type: String, required: true },
    max_temperature: { type: Number },        // Maximum temperature recorded
    min_temperature: { type: Number },        // Minimum temperature recorded
    dominant_weather_condition: { type: String },  // Most frequent weather condition
    weather_condition_count: {                // Track frequency of weather conditions
        type: Map,
        of: Number,
        default: {}
    },
    alertFlag: { type: Boolean, default: false }, // Flag to indicate if an alert was triggered
    threshold_breach_count: { type: Number, default: 0 }, // Count consecutive breaches
    alert_threshold: {                         // Threshold for temperature or other conditions
        temperature: { type: Number, default: 25 },  // Example threshold: 35°C
        condition: { type: String }               // Optional: specific weather condition (e.g., "Rain")
    }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = { Weather };
