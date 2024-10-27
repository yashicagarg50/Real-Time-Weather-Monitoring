const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Weather } = require('./schema');

require('./weatherService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Add this route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Weather API!');
});

// MongoDB connection
mongoose.connect('mongodb+srv://test-user-fYikrmxbpHz7C098:fYikrmxbpHz7C098@diffcitiesweaether.j5ntj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Route to fetch weather data for a specific city
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;

    try {
        // Find weather data for the requested city in MongoDB
        const weatherData = await Weather.findOne({ city_name: city });

        if (weatherData) {
            res.json(weatherData);
        } else {
            res.status(404).json({ message: 'Weather data for this city not found' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
