import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Film, MapPin, Compass, Search, Navigation, ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';

function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mood = searchParams.get('mood') || 'happy';
  
  // Core recommendation state
  const [movies, setMovies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [places, setPlaces] = useState([]);
  
  // Geospatial state (defaulting to New York coordinates initially)
  const [lat, setLat] = useState(40.7128);
  const [lon, setLon] = useState(-74.0060);
  const [citySearch, setCitySearch] = useState('');
  const [currentLocationName, setCurrentLocationName] = useState('New York, USA');
  const [placeType, setPlaceType] = useState('park'); // 'park' or 'gym'
  
  // UI states
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [mapError, setMapError] = useState('');

  // Leaflet refs
  const leafletMap = useRef(null);
  const markersGroup = useRef(null);

  // Emojis for page styling
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    stressed: '😫',
    bored: '🥱',
    angry: '😡',
    energetic: '⚡',
    tired: '😴'
  };

  // Fetch movies and activities based on selected mood
  useEffect(() => {
    setLoadingMovies(true);
    // Fetch Movies
    fetch(`/api/movies?mood=${mood}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.recommendations || []);
        setLoadingMovies(false);
      })
      .catch(err => {
        console.error("Error fetching movies", err);
        setLoadingMovies(false);
      });

    // Fetch Activities
    fetch(`/api/activities?mood=${mood}`)
      .then(res => res.json())
      .then(data => {
        setActivities(data.suggestions || []);
      })
      .catch(err => console.error("Error fetching activities", err));
  }, [mood]);

  // Request browser geolocation on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setCurrentLocationName("Your Browser Geolocation");
        },
        (error) => {
          console.log("Geolocation blocked or failed. Using default location (New York).");
        }
      );
    }
  }, []);

  // Fetch nearest places based on coordinates and place type (park vs gym)
  useEffect(() => {
    setLoadingPlaces(true);
    setMapError('');
    fetch(`/api/places?lat=${lat}&lon=${lon}&type=${placeType}`)
      .then(res => res.json())
      .then(data => {
        setPlaces(data.places || []);
        setLoadingPlaces(false);
      })
      .catch(err => {
        console.error("Error fetching places", err);
        setMapError("Failed to fetch nearby locations. Using offline database fallback.");
        setLoadingPlaces(false);
      });
  }, [lat, lon, placeType]);

  // Initialize and update the Leaflet map
  useEffect(() => {
    // If map container does not exist yet, skip
    if (!document.getElementById('leaflet-map')) return;

    if (!leafletMap.current) {
      leafletMap.current = L.map('leaflet-map').setView([lat, lon], 13);
      
      // Load OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMap.current);

      markersGroup.current = L.layerGroup().addTo(leafletMap.current);
    } else {
      leafletMap.current.setView([lat, lon], 13);
    }

    // Clear old markers
    markersGroup.current.clearLayers();

    // Custom Icon for User's Current Location (Red marker)
    const userIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add user marker
    L.marker([lat, lon], { icon: userIcon })
      .addTo(markersGroup.current)
      .bindPopup(`<b>Your Selected Location</b><br/>${currentLocationName}`)
      .openPopup();

    // Markers for nearest places (Blue for gym, Green for park)
    const markerColor = placeType === 'gym' ? 'blue' : 'green';
    const placeIcon = L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    places.forEach(place => {
      L.marker([place.lat, place.lon], { icon: placeIcon })
        .addTo(markersGroup.current)
        .bindPopup(`
          <div class="map-popup-bubble">
            <strong>${place.name}</strong><br/>
            <span class="rating">⭐ ${place.rating}</span><br/>
            <span class="address">📍 ${place.address}</span><br/>
            <span class="distance">${place.distance} away</span>
          </div>
        `);
    });

    // Auto resize map when map size changes
    setTimeout(() => {
      leafletMap.current.invalidateSize();
    }, 200);

  }, [lat, lon, places, placeType, currentLocationName]);

  // Handle searching by city name
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (!citySearch.trim()) return;

    setLoadingPlaces(true);
    fetch(`/api/search-city?city=${encodeURIComponent(citySearch)}`)
      .then(res => res.json())
      .then(data => {
        setLat(data.lat);
        setLon(data.lon);
        setCurrentLocationName(data.city);
        setCitySearch('');
      })
      .catch(err => {
        console.error("City search failed", err);
        setLoadingPlaces(false);
      });
  };

  // Trigger browser location manually
  const triggerBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setCurrentLocationName("Your Browser Geolocation");
      });
    }
  };

  return (
    <div className="container fade-in">
      {/* Header section */}
      <div className="dashboard-header">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Selection
        </button>
        <div className="mood-banner">
          <span className="mood-banner-emoji">{moodEmojis[mood]}</span>
          <div>
            <h2>You feel: <span className="mood-name-highlight">{mood.toUpperCase()}</span></h2>
            <p>Here are custom recommendations curated just for you.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Movies */}
        <div className="dashboard-column">
          <div className="section-title">
            <Film size={22} className="title-icon" />
            <h3>Mood-Matching Movies</h3>
          </div>
          
          {loadingMovies ? (
            <div className="loading-spinner">Loading movies...</div>
          ) : (
            <div className="movies-grid">
              {movies.map(movie => (
                <div key={movie.id} className="movie-card glass-card">
                  <div className="movie-image" style={{ backgroundImage: `url(${movie.poster})` }}>
                    <div className="movie-badge">{movie.rating}</div>
                  </div>
                  <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <div className="movie-meta">
                      <span>{movie.year}</span> • <span>{movie.duration}</span>
                    </div>
                    <div className="movie-genre">{movie.genre}</div>
                    <p className="movie-synopsis">{movie.synopsis}</p>
                    <div className="movie-footer">
                      <span className="movie-stream">📺 {movie.streamOn}</span>
                      <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="trailer-btn">
                        Watch Trailer
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Activities & Map */}
        <div className="dashboard-column">
          <div className="section-title">
            <Compass size={22} className="title-icon" />
            <h3>Energy-Balanced Activities</h3>
          </div>

          <div className="activities-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-card glass-card">
                <div className={`activity-category-indicator ${activity.category}`}>
                  {activity.category.toUpperCase()}
                </div>
                <div className="activity-details">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map and Geospatial Section */}
          <div className="map-section glass-card">
            <div className="map-title-row">
              <div className="map-section-title">
                <MapPin size={20} className="title-icon" style={{ color: '#06b6d4' }} />
                <h4>Nearest Parks & Gyms</h4>
              </div>
              <span className="location-name-badge">{currentLocationName}</span>
            </div>

            <p className="map-instruction">
              Enhance your mood by going outside. Explore your surroundings below:
            </p>

            {/* Map Search & Control Row */}
            <div className="map-controls">
              <form onSubmit={handleCitySearch} className="map-search-form">
                <input
                  type="text"
                  placeholder="Enter city (e.g. London)"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
                <button type="submit" className="search-icon-btn">
                  <Search size={18} />
                </button>
              </form>
              
              <button className="location-gps-btn" onClick={triggerBrowserLocation} title="Use My Location">
                <Navigation size={18} />
              </button>
            </div>

            {/* Park / Gym Selector Tabs */}
            <div className="map-tabs">
              <button 
                className={`map-tab ${placeType === 'park' ? 'active' : ''}`}
                onClick={() => setPlaceType('park')}
              >
                🌲 Nearest Parks
              </button>
              <button 
                className={`map-tab ${placeType === 'gym' ? 'active' : ''}`}
                onClick={() => setPlaceType('gym')}
              >
                💪 Nearest Gyms
              </button>
            </div>

            {/* Interactive Leaflet Map Container */}
            <div id="leaflet-map" className="map-container"></div>
            {mapError && <p className="map-error-text">{mapError}</p>}

            {/* Places Results List */}
            <div className="places-list">
              <h5>Locations Found ({places.length})</h5>
              {loadingPlaces ? (
                <div className="places-loading">Searching local directory...</div>
              ) : (
                <div className="places-scroll-container">
                  {places.map(place => (
                    <div key={place.id} className="place-item">
                      <div className="place-item-header">
                        <h6>{place.name}</h6>
                        <span className="place-distance-label">{place.distance}</span>
                      </div>
                      <div className="place-item-footer">
                        <span>⭐ {place.rating} Rating</span>
                        <span>{place.address}</span>
                      </div>
                    </div>
                  ))}
                  {places.length === 0 && (
                    <div className="no-places-msg">No nearby {placeType}s found in a 5km radius.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
