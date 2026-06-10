const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Curated Movie Dataset mapped to moods
const MOVIES_DATABASE = {
  happy: [
    {
      id: 1,
      title: "La La Land",
      genre: "Romance, Comedy, Musical",
      rating: 8.0,
      year: 2016,
      duration: "128 min",
      synopsis: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Prime Video",
      trailer: "https://www.youtube.com/watch?v=0pdqf4P9MB8"
    },
    {
      id: 2,
      title: "The Grand Budapest Hotel",
      genre: "Comedy, Drama",
      rating: 8.1,
      year: 2014,
      duration: "99 min",
      synopsis: "A writer relates his adventures at a renowned European resort hotel between the first and second World Wars with a concierge who is wrongly framed for murder.",
      poster: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=300&auto=format&fit=crop",
      streamOn: "Disney+ / Hulu",
      trailer: "https://www.youtube.com/watch?v=1Fg5iWmQjwk"
    },
    {
      id: 3,
      title: "Spider-Man: Into the Spider-Verse",
      genre: "Animation, Action, Adventure",
      rating: 8.4,
      year: 2018,
      duration: "117 min",
      synopsis: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=300&auto=format&fit=crop",
      streamOn: "Sony Liv / Prime Video",
      trailer: "https://www.youtube.com/watch?v=g4Hbz2jLxvQ"
    },
    {
      id: 4,
      title: "The Intouchables",
      genre: "Biography, Comedy, Drama",
      rating: 8.5,
      year: 2011,
      duration: "112 min",
      synopsis: "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
      poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&auto=format&fit=crop",
      streamOn: "Apple TV / Prime Video",
      trailer: "https://www.youtube.com/watch?v=34WIbmXEK98"
    }
  ],
  sad: [
    {
      id: 5,
      title: "Amélie",
      genre: "Comedy, Romance",
      rating: 8.3,
      year: 2001,
      duration: "122 min",
      synopsis: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
      poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=300&auto=format&fit=crop",
      streamOn: "Hulu / Prime Video",
      trailer: "https://www.youtube.com/watch?v=HUECWi5pX7o"
    },
    {
      id: 6,
      title: "Inside Out",
      genre: "Animation, Adventure, Comedy",
      rating: 8.1,
      year: 2015,
      duration: "95 min",
      synopsis: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city.",
      poster: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=300&auto=format&fit=crop",
      streamOn: "Disney+",
      trailer: "https://www.youtube.com/watch?v=yRUAzGQ3KOk"
    },
    {
      id: 7,
      title: "Good Will Hunting",
      genre: "Drama, Romance",
      rating: 8.3,
      year: 1997,
      duration: "126 min",
      synopsis: "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist in order to find direction in his life.",
      poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=300&auto=format&fit=crop",
      streamOn: "Max / Prime Video",
      trailer: "https://www.youtube.com/watch?v=PaZVjZOjiYc"
    },
    {
      id: 8,
      title: "Paddington 2",
      genre: "Adventure, Comedy, Family",
      rating: 7.8,
      year: 2017,
      duration: "103 min",
      synopsis: "Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy's 100th birthday.",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Apple TV",
      trailer: "https://www.youtube.com/watch?v=52x5HJ9H8DM"
    }
  ],
  stressed: [
    {
      id: 9,
      title: "My Neighbor Totoro",
      genre: "Animation, Family, Fantasy",
      rating: 8.1,
      year: 1988,
      duration: "86 min",
      synopsis: "When two young girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
      poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Max",
      trailer: "https://www.youtube.com/watch?v=92a7Hj0ijLs"
    },
    {
      id: 10,
      title: "Chef",
      genre: "Adventure, Comedy, Drama",
      rating: 7.3,
      year: 2014,
      duration: "117 min",
      synopsis: "A head chef quits his restaurant job and buys a food truck in an effort to reclaim his creative promise, while piecing back together his estranged family.",
      poster: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop",
      streamOn: "Prime Video / Starz",
      trailer: "https://www.youtube.com/watch?v=wgFws3Ao1F0"
    },
    {
      id: 11,
      title: "The Secret Life of Walter Mitty",
      genre: "Adventure, Comedy, Drama",
      rating: 7.3,
      year: 2013,
      duration: "114 min",
      synopsis: "When both he and a colleague are about to lose their jobs, Walter takes action by embarking on an adventure more extraordinary than anything he could have ever imagined.",
      poster: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=300&auto=format&fit=crop",
      streamOn: "Hulu",
      trailer: "https://www.youtube.com/watch?v=QD6cy4PBQPI"
    }
  ],
  bored: [
    {
      id: 12,
      title: "Inception",
      genre: "Action, Sci-Fi, Adventure",
      rating: 8.8,
      year: 2010,
      duration: "148 min",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Apple TV",
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
    },
    {
      id: 13,
      title: "Knives Out",
      genre: "Comedy, Mystery, Thriller",
      rating: 7.9,
      year: 2019,
      duration: "130 min",
      synopsis: "A detective investigates the death of a patriarch of an eccentric, combative family.",
      poster: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Prime Video",
      trailer: "https://www.youtube.com/watch?v=qGqiHJTsRkQ"
    },
    {
      id: 14,
      title: "Everything Everywhere All at Once",
      genre: "Action, Adventure, Comedy, Sci-Fi",
      rating: 8.0,
      year: 2022,
      duration: "139 min",
      synopsis: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=300&auto=format&fit=crop",
      streamOn: "Prime Video / Showtime",
      trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g"
    }
  ],
  angry: [
    {
      id: 15,
      title: "Whiplash",
      genre: "Drama, Music",
      rating: 8.5,
      year: 2014,
      duration: "106 min",
      synopsis: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Prime Video",
      trailer: "https://www.youtube.com/watch?v=7d_jQyG8DQY"
    },
    {
      id: 16,
      title: "Mad Max: Fury Road",
      genre: "Action, Sci-Fi, Adventure",
      rating: 8.1,
      year: 2015,
      duration: "120 min",
      synopsis: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=300&auto=format&fit=crop",
      streamOn: "Max / Prime Video",
      trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8"
    }
  ],
  energetic: [
    {
      id: 17,
      title: "Top Gun: Maverick",
      genre: "Action, Drama",
      rating: 8.3,
      year: 2022,
      duration: "130 min",
      synopsis: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
      poster: "https://images.unsplash.com/photo-1519074069444-1ba4e6664104?q=80&w=300&auto=format&fit=crop",
      streamOn: "Prime Video / Paramount+",
      trailer: "https://www.youtube.com/watch?v=giXcoYmT0_4"
    },
    {
      id: 18,
      title: "Baby Driver",
      genre: "Action, Crime, Drama",
      rating: 7.6,
      year: 2017,
      duration: "113 min",
      synopsis: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
      poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix",
      trailer: "https://www.youtube.com/watch?v=z2z857RSfhk"
    }
  ],
  tired: [
    {
      id: 19,
      title: "Spirited Away",
      genre: "Animation, Adventure, Family",
      rating: 8.6,
      year: 2001,
      duration: "125 min",
      synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop",
      streamOn: "Netflix / Max",
      trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk"
    },
    {
      id: 20,
      title: "The Princess Bride",
      genre: "Adventure, Family, Fantasy",
      rating: 8.0,
      year: 1987,
      duration: "98 min",
      synopsis: "A bedridden boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop",
      streamOn: "Disney+ / Apple TV",
      trailer: "https://www.youtube.com/watch?v=WNNUcHRSRFM"
    }
  ]
};

// Activity Suggestions mapped to moods
const ACTIVITIES_DATABASE = {
  happy: [
    { id: 1, title: "Outdoor Picnic", category: "park", description: "Enjoy the sunny weather, pack a basket of your favorite snacks, and head to the nearest green lawn." },
    { id: 2, title: "Outdoor Photography Walk", category: "park", description: "Grab your phone or camera and capture the vibrant colors of nature, trees, and sky." },
    { id: 3, title: "Dynamic Cardio Session", category: "gym", description: "Capitalize on your positive energy with a high-tempo run, cycling, or energetic Zumba class at the gym." }
  ],
  sad: [
    { id: 4, title: "Mindfulness Park Walk", category: "park", description: "Take a slow, gentle walk amidst greenery, breathing in the fresh air to naturally elevate your endorphins." },
    { id: 5, title: "Nature Journaling", category: "park", description: "Sit on a quiet park bench and jot down a few positive affirmations or sketches of the natural surroundings." },
    { id: 6, title: "Light Gym Stretch", category: "gym", description: "Do some gentle mobilization and dynamic stretching on a gym mat to relieve body tension and raise mood." }
  ],
  stressed: [
    { id: 7, title: "Barefoot Grass Walk (Grounding)", category: "park", description: "Find a clean patch of grass and walk barefoot for a few minutes. It is a highly-recommended grounding technique." },
    { id: 8, title: "Deep Breathing Session", category: "park", description: "Sit quietly under a large tree and practice 4-7-8 breathing for 5 minutes to trigger your relaxation response." },
    { id: 9, title: "Soothing Yoga / Foam Rolling", category: "gym", description: "Go to a fitness center studio for some slow-paced yoga, stretching, or release tension using a foam roller." }
  ],
  bored: [
    { id: 10, title: "Frisbee or Badminton", category: "park", description: "Get active by playing a quick game of frisbee, catch, or badminton in an open field." },
    { id: 11, title: "Interval Jogging Challenge", category: "park", description: "Break the monotony! Try a new running trail or do 30-second sprinting intervals in the park." },
    { id: 12, title: "Try a New Gym Class", category: "gym", description: "Attend a high-intensity group class, try kickboxing, or learn to use a piece of strength equipment you haven't used before." }
  ],
  angry: [
    { id: 13, title: "Power Running", category: "park", description: "Run at a high pace around the park trail to vent out extra adrenaline and convert anger into aerobic accomplishments." },
    { id: 14, title: "Heavy Weight Training", category: "gym", description: "Use the strength training area of the gym to push heavy weights, safely channeling your frustration into a powerful workout." },
    { id: 15, title: "Punching Bag Drill", category: "gym", description: "Put on boxing gloves at the gym and practice punches on a heavy bag to physically release stress." }
  ],
  energetic: [
    { id: 16, title: "Calisthenics Workout", category: "park", description: "Use the park bars for pull-ups, dips, and push-ups to enjoy a bodyweight training session in the fresh air." },
    { id: 17, title: "High-Intensity Circuit Training", category: "gym", description: "Do a full body circuit with kettlebells, battle ropes, and plyometric boxes to maximize your high-energy level." },
    { id: 18, title: "Core Power Work", category: "gym", description: "Tackle a demanding core and stability workout at the fitness center to build strength." }
  ],
  tired: [
    { id: 19, title: "Relaxing bench reading", category: "park", description: "Find a shaded bench in the park, feel the gentle breeze, and read a chapter of your favorite book." },
    { id: 20, title: "Gentle Walk", category: "park", description: "Walk at a leisurely, relaxed pace just to stretch your legs without exhausting yourself." },
    { id: 21, title: "Steam Bath or Sauna", category: "gym", description: "Visit the spa/sauna section of a local health club to relax sore muscles and sweat out toxins." }
  ]
};

// API: Get movies based on mood
app.get('/api/movies', (req, res) => {
  const mood = (req.query.mood || '').toLowerCase();
  const movies = MOVIES_DATABASE[mood] || MOVIES_DATABASE['happy'];
  res.json({ mood, recommendations: movies });
});

// API: Get activities based on mood
app.get('/api/activities', (req, res) => {
  const mood = (req.query.mood || '').toLowerCase();
  const activities = ACTIVITIES_DATABASE[mood] || ACTIVITIES_DATABASE['happy'];
  res.json({ mood, suggestions: activities });
});

// Helper to generate mock places when APIs fail or return empty sets
function generateMockPlaces(lat, lon, type) {
  const isGym = type === 'gym';
  const prefix = isGym ? 'Gym / Fitness Center' : 'Park / Green Space';
  const places = [];

  const names = isGym 
    ? ["Gold's Fitness Hub", "Iron & Steel Gym", "Pulse Core Wellness", "Anytime Athletics", "Elite Body Conditioning", "Flex Power Center"]
    : ["Centennial Oak Park", "Serene Valley Botanical Garden", "Riverbend Meadow Park", "Pinecrest Community Park", "Whispering Woods Reserve", "Green Canopy Recreation Ground"];

  for (let i = 0; i < 5; i++) {
    // Generate slightly random coordinates within a 2km radius
    const latOffset = (Math.random() - 0.5) * 0.03;
    const lonOffset = (Math.random() - 0.5) * 0.03;
    const itemLat = parseFloat(lat) + latOffset;
    const itemLon = parseFloat(lon) + lonOffset;
    const dist = (Math.sqrt(latOffset*latOffset + lonOffset*lonOffset) * 111.3).toFixed(2); // in km

    places.push({
      id: `mock-${type}-${i}`,
      name: names[i % names.length],
      lat: itemLat,
      lon: itemLon,
      distance: `${dist} km`,
      rating: (4.0 + Math.random() * 1.0).toFixed(1),
      address: `${100 + i * 23} Main St, Near Central Avenue`,
      type: type
    });
  }
  return places;
}

// API: Get nearest places (OSM Overpass Integration with Mock Fallback)
app.get('/api/places', async (req, res) => {
  const { lat, lon, type } = req.query;

  if (!lat || !lon || !type) {
    return res.status(400).json({ error: "Missing required parameters: lat, lon, type" });
  }

  const isGym = type.toLowerCase() === 'gym';
  const osmQueryType = isGym ? 'fitness_centre' : 'park';

  // Overpass QL: search within 5000m around lat,lon for amenity=gym/leisure=fitness_centre or leisure=park
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const query = `
    [out:json][timeout:10];
    (
      node["leisure"="${osmQueryType}"](around:5000, ${lat}, ${lon});
      way["leisure"="${osmQueryType}"](around:5000, ${lat}, ${lon});
      node["amenity"="${isGym ? 'gym' : 'park'}"](around:5000, ${lat}, ${lon});
    );
    out center 15;
  `;

  try {
    const response = await axios.post(overpassUrl, `data=${encodeURIComponent(query)}`, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'PAIX-MoodSpace-Recommender/1.0'
      }
    });

    if (response.data && response.data.elements && response.data.elements.length > 0) {
      const places = response.data.elements.map((el, index) => {
        const itemLat = el.lat || (el.center && el.center.lat);
        const itemLon = el.lon || (el.center && el.center.lon);
        
        // Calculate rough distance
        const latOffset = itemLat - lat;
        const lonOffset = itemLon - lon;
        const dist = (Math.sqrt(latOffset*latOffset + lonOffset*lonOffset) * 111.3).toFixed(2);

        return {
          id: el.id || `osm-${index}`,
          name: (el.tags && el.tags.name) || `${isGym ? 'Active Fitness' : 'Community Green Space'} #${index + 1}`,
          lat: itemLat,
          lon: itemLon,
          distance: `${dist} km`,
          rating: (4.0 + (el.id % 10) / 10).toFixed(1), // Realistic ratings derived from ID
          address: (el.tags && el.tags['addr:street']) 
            ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}` 
            : `Located within ${dist} km range`,
          type: type
        };
      });
      return res.json({ source: "osm", places });
    } else {
      // Return mock data if OSM returned 0 elements
      const mockPlaces = generateMockPlaces(lat, lon, type);
      return res.json({ source: "mock-empty", places: mockPlaces });
    }
  } catch (error) {
    console.error("OSM Overpass API error, falling back to mocks:", error.message);
    const mockPlaces = generateMockPlaces(lat, lon, type);
    return res.json({ source: "mock-fallback", places: mockPlaces });
  }
});

// API: Search city and get coordinates (Nominatim OSM Geocoding)
app.get('/api/search-city', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "Missing city query parameter" });
  }

  try {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
    const response = await axios.get(geocodeUrl, {
      headers: {
        'User-Agent': 'PAIX-MoodSpace-Recommender/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon, display_name } = response.data[0];
      return res.json({
        city: display_name,
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      });
    } else {
      // Default to a fallback coordinate if city search yields nothing (e.g. New York)
      return res.json({
        city: `${city} (Not found, defaulting to New York)`,
        lat: 40.7128,
        lon: -74.0060,
        isDefault: true
      });
    }
  } catch (error) {
    console.error("Geocoding failed, falling back:", error.message);
    // Fallback to New York
    return res.json({
      city: `${city} (Connection issue, defaulting to New York)`,
      lat: 40.7128,
      lon: -74.0060,
      isDefault: true
    });
  }
});

// In-memory User database (resets on server restart, ideal for local workspace testing)
const USERS_DATABASE = [];

// API: User Signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Missing required fields: name, email, password" });
  }

  const userExists = USERS_DATABASE.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (userExists) {
    return res.status(400).json({ success: false, error: "An account with this email already exists" });
  }

  const newUser = { name, email, password };
  USERS_DATABASE.push(newUser);
  console.log("New user registered:", { name, email });

  res.json({
    success: true,
    user: { name, email }
  });
});

// API: User Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Missing email or password" });
  }

  const user = USERS_DATABASE.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(400).json({ success: false, error: "Invalid email or password" });
  }

  res.json({
    success: true,
    user: { name: user.name, email: user.email }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
