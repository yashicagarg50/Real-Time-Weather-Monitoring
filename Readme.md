# 🌦 Real-Time Weather Monitoring & Forecasting System

A web application delivering real-time weather updates and forecasts for major metropolitan cities, built on the MERN stack. This project emphasizes data efficiency and seamless user experience, making it perfect for providing accurate, timely weather information for busy city environments.

## 🌟 Key Features
- **Optimized Data Storage**: MongoDB is configured to store only 6 core weather documents, which are updated every 5 minutes rather than storing new documents. This ensures efficient use of storage while keeping the data up-to-date.
- **Automated Data Refresh**: Weather data refreshes automatically every 5 minutes for continuous real-time accuracy.
- **Alert**: Alerts are given when temperature increases the threshold temp.
- **User-Friendly Interface**: A responsive front-end that allows users to search by city for instant weather insights.

---

## 🚀 Project Demo
Check out the project in action: [YouTube Demo Video](https://youtu.be/DfRpss9XWuE)

---

## 🛠️ Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (for local database setup; MongoDB Atlas for cloud)
- **Git** (for cloning the repository)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YourGitHubUsername/weather-forecast-app.git
   cd weather-forecast-app

2. **Install Dependencies**:
   ```bash
   npm install

3. **Configure Environment Variables**: Create a `.env` file in the root directory and set your MongoDB connection URI and OpenWeatherMap API key:   
   ```env
   MONGODB_URI=your_mongodb_connection_uri
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   
4. **Run the Application**:
   ```bash
   npm run dev
Your application will be live at `http://localhost:5174`.

5. **Run the Node Application**:
   ```bash
   node server.js 
   
---

## 📁 Project Structure

- **server.js**: Main server file, handles API routes and application logic.
- **weatherService.js**: A service that periodically fetches and updates weather data from the OpenWeatherMap API.
- **schema.js**: Defines Mongoose schema for efficient data storage and updates.

---

## 🔄 API Functionality

- **Fetch Weather by City**: `/api/weather/:city` - Retrieves current weather data for the specified city.

### Data Handling & Optimization

To conserve database resources, only 6 weather documents are stored at any time, each representing a time slot throughout the day. Every 5 minutes, the system updates the relevant documents to keep the data fresh without cluttering MongoDB.

---

## 🧩 Future Enhancements
- **Extended Forecasting**: Provide weekly and monthly weather trends.
- **Custom Alerts**: Allow users to set up notifications for severe weather alerts.
- **Data Visualization**: Interactive charts for hourly and daily weather trends.

---

## 💬 Contact
For questions or feedback, feel free to reach out at anniegirdhar08@gmail.com.



