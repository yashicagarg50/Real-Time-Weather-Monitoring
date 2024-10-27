# 🌦 Real-Time Weather Monitoring & Forecasting System

A high-performance web application delivering real-time weather updates and forecasts for major metropolitan cities, built on the MERN stack. This project emphasizes data efficiency and seamless user experience, making it perfect for providing accurate, timely weather information for busy city environments.

## 🌟 Key Features
- **Real-Time Weather Data**: Retrieve current weather data and 3-hour interval forecasts for selected cities, powered by the OpenWeatherMap API.
- **Optimized Data Storage**: MongoDB is configured to store only 6 core weather documents, which are updated every 5 minutes rather than duplicated. This ensures efficient use of storage while keeping the data up-to-date.
- **Automated Data Refresh**: Weather data refreshes automatically every 5 minutes for continuous real-time accuracy.
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

