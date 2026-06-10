import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    console.log("Contact form submission:", { name, email, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container fade-in" style={{ maxWidth: '600px' }}>
      <div className="glass-card" style={{ marginTop: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Contact Us
        </h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '30px', fontSize: '0.95rem' }}>
          Have feedback or questions? Reach out to Mr. Prabhav Srivastav and the team!
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', fontSize: '24px', marginBottom: '20px' }}>
              ✓
            </div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Message Sent!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thank you for reaching out. We will get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: '20px', padding: '8px 20px', borderRadius: 'var(--radius-sm)' }}>
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend}>
            <div className="form-group">
              <label htmlFor="name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} style={{ color: 'var(--text-muted)' }} /> Name
              </label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--text-muted)' }} /> Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} style={{ color: 'var(--text-muted)' }} /> Message
              </label>
              <textarea 
                id="message" 
                rows={5} 
                placeholder="How can we help you?" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              <Send size={16} /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;