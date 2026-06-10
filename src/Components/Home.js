import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Frown, Compass, Zap, BatteryLow, Flame, AlertCircle } from 'lucide-react';
import './Home.css'; // Let's keep a dedicated CSS for some local layout parameters

function Home() {
  const [customText, setCustomText] = useState('');
  const navigate = useNavigate();

  const presets = [
    { key: 'happy', emoji: '😊', label: 'Happy', desc: 'Feeling good and optimistic', color: 'rgba(34, 197, 94, 0.15)', borderColor: '#22c55e', icon: Smile },
    { key: 'sad', emoji: '😢', label: 'Sad', desc: 'Down, reflective, or seeking comfort', color: 'rgba(59, 130, 246, 0.15)', borderColor: '#3b82f6', icon: Frown },
    { key: 'stressed', emoji: '😫', label: 'Stressed', desc: 'Overwhelmed and needing calm', color: 'rgba(236, 72, 153, 0.15)', borderColor: '#ec4899', icon: AlertCircle },
    { key: 'bored', emoji: '🥱', label: 'Bored', desc: 'Looking for a spark or adventure', color: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b', icon: Compass },
    { key: 'angry', emoji: '😡', label: 'Angry', desc: 'Frustrated or having high energy to vent', color: 'rgba(239, 68, 68, 0.15)', borderColor: '#ef4444', icon: Flame },
    { key: 'energetic', emoji: '⚡', label: 'Energetic', desc: 'Active, focused, and ready to move', color: 'rgba(168, 85, 247, 0.15)', borderColor: '#a855f7', icon: Zap },
    { key: 'tired', emoji: '😴', label: 'Tired', desc: 'Exhausted and needing low-key rest', color: 'rgba(100, 116, 139, 0.15)', borderColor: '#64748b', icon: BatteryLow }
  ];

  const handlePresetSelect = (moodKey) => {
    navigate(`/dashboard?mood=${moodKey}`);
  };

  const analyzeCustomMood = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const text = customText.toLowerCase();
    let detectedMood = 'happy'; // Default fallback

    // Simple keyword matching rules
    if (text.includes('tired') || text.includes('exhausted') || text.includes('sleepy') || text.includes('lazy') || text.includes('fatigue') || text.includes('drain')) {
      detectedMood = 'tired';
    } else if (text.includes('stress') || text.includes('anxious') || text.includes('worry') || text.includes('overwhelm') || text.includes('busy') || text.includes('headache') || text.includes('tension')) {
      detectedMood = 'stressed';
    } else if (text.includes('sad') || text.includes('cry') || text.includes('lonely') || text.includes('hurt') || text.includes('depress') || text.includes('bad') || text.includes('sorrow')) {
      detectedMood = 'sad';
    } else if (text.includes('angry') || text.includes('mad') || text.includes('frustrat') || text.includes('irritat') || text.includes('annoy') || text.includes('hate') || text.includes('furi')) {
      detectedMood = 'angry';
    } else if (text.includes('bore') || text.includes('nothing') || text.includes('slow') || text.includes('dull') || text.includes('indifferent')) {
      detectedMood = 'bored';
    } else if (text.includes('energetic') || text.includes('active') || text.includes('pump') || text.includes('excit') || text.includes('hype') || text.includes('gym') || text.includes('sport')) {
      detectedMood = 'energetic';
    } else if (text.includes('happy') || text.includes('good') || text.includes('great') || text.includes('awesome') || text.includes('love') || text.includes('glad')) {
      detectedMood = 'happy';
    }

    navigate(`/dashboard?mood=${detectedMood}`);
  };

  return (
    <div className="container fade-in">
      <div className="home-hero">
        <h1 className="hero-title">How are you feeling today?</h1>
        <p className="hero-subtitle">
          PAIX MoodSpace suggests the perfect movies to match or shift your mood, paired with nearby physical activities (like parks and gyms) to match your physical energy.
        </p>
      </div>

      <div className="mood-grid">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <div 
              key={preset.key} 
              className="mood-card glass-card"
              style={{
                '--hover-border': preset.borderColor,
                background: `linear-gradient(180deg, ${preset.color} 0%, rgba(15, 17, 26, 0.7) 100%)`
              }}
              onClick={() => handlePresetSelect(preset.key)}
            >
              <div className="mood-emoji-container">
                <span className="mood-emoji">{preset.emoji}</span>
              </div>
              <h3 className="mood-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Icon size={20} style={{ color: preset.borderColor }} />
                <span>{preset.label}</span>
              </h3>
              <p className="mood-desc">{preset.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="custom-input-section glass-card">
        <h3>Describe how your day went...</h3>
        <p className="section-desc">Our intelligent algorithm will evaluate your text to recommend the ideal entertainment and fitness balance.</p>
        
        <form onSubmit={analyzeCustomMood}>
          <textarea
            placeholder="E.g., It was a super busy and stressful day at work, feeling like I need to wind down..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            required
          />
          <button type="submit" className="btn-primary">
            Analyze & Recommend
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;