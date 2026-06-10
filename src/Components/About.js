import React from 'react';
import { Brain, Globe, Compass } from 'lucide-react';

function About() {
  return (
    <div className="container fade-in" style={{ maxWidth: '800px' }}>
      <div className="glass-card" style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', textAlign: 'center', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          About PAIX
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '30px', textAlign: 'justify' }}>
          PAIX, founded by <strong>Mr. Prabhav Srivastav</strong>, is an innovative company dedicated to revolutionizing 
          education and lifestyle planning through cutting-edge artificial intelligence technology. The company's core focus is 
          on creating and suggesting personalized paths tailored to individual users' unique needs, preferences, and mental states.
        </p>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '35px', textAlign: 'justify' }}>
          By leveraging advanced AI algorithms, PAIX analyzes users' feelings, strengths, and goals to suggest custom educational, 
          leisure, and health options. Through its intelligent platform, PAIX aims to democratize access to quality personalization, 
          empower individuals to reach their full potential, and transform traditional decision-making landscapes into adaptive and 
          supportive environments.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <Brain size={32} style={{ color: '#a855f7', marginBottom: '10px' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>AI Personalization</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tailored results based on cognitive mood mapping.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Compass size={32} style={{ color: '#06b6d4', marginBottom: '10px' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>Location Intelligence</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Dynamic OpenStreetMap integration for physical spots.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Globe size={32} style={{ color: '#ec4899', marginBottom: '10px' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>Open Data Ecosystem</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Free, key-less API integrations built on open standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;