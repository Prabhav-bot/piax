# PAIX MoodSpace 🎬🌲💪

PAIX MoodSpace is a modern full-stack web application designed to recommend movies and suggest local activities tailored to a user's current mood. It integrates an interactive map that displays the nearest parks and gyms based on the user's physical location or city search.

---

## 🌟 Features

- **Mood Classification Engine**: Click preset mood cards (Happy, Sad, Stressed, Bored, Angry, Energetic, Tired) or type in a custom text description of your day. The engine parses the text and automatically maps it to your current mental state.
- **Tailored Movie Recommendations**: Curated movie grids matching your mood. Each card lists synopsis, rating, year, runtime, streaming availability, and a direct trailer link.
- **Energy-Balanced Activity Lists**: Physical activities recommended to balance your mood (e.g. mindfulness walks when stressed, heavy weightlifting when angry).
- **Interactive Spot Mapping**: Standard Leaflet map displaying your location.
  - Toggle between **🌲 Nearest Parks** and **💪 Nearest Gyms**.
  - Type in any city name (e.g., Paris, Delhi, New York) to geocode coordinates and fetch local spots.
  - Real-time geospatial search using the **OpenStreetMap Overpass** and **Nominatim** APIs.
  - Resilient mock fallbacks if APIs rate-limit, keeping markers active anywhere in the world.
- **Workable User Authentication**: Features a togglable Sign In/Sign Up card with client-side confirmations, connected directly to in-memory registration endpoints on the server.

---

## 🛠️ Technical Stack

- **Frontend**: React (React Router, Lucide Icons, Leaflet CSS/Map container, Custom CSS Glassmorphic design).
- **Backend**: Node.js & Express (Axios geospatial query drivers, CORS controllers, JSON parsing middleware).

---

## 🚀 Getting Started

### 📦 Installation

To set up the project locally:

1. **Install Frontend Dependencies** (in the root folder):
   ```bash
   npm install
   ```

2. **Install Backend Dependencies** (in the `/backend` folder):
   ```bash
   cd backend
   ```
   ```bash
   npm install
   ```

### 🏃 Running the Application

To run the full-stack system, launch the backend and frontend servers:

1. **Start Express Backend Server** (Port `5000`):
   ```bash
   cd backend
   ```
   ```bash
   npm start
   ```

2. **Start React Frontend Server** (Port `3000`):
   Open a separate terminal in the project root:
   ```bash
   npm start
   ```

3. Open your browser and navigate to **[http://localhost:3000/piax](http://localhost:3000/piax)**.
