import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Storage, showToast } from '../utils/storage';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const cleanEmail = email.trim();
    const entry = {
      email: cleanEmail,
      date: new Date().toISOString(),
      source: 'footer'
    };

    // Store in localStorage 'newsletter_subscribers' array
    const rawExisting = localStorage.getItem('newsletter_subscribers');
    const existingList = rawExisting ? JSON.parse(rawExisting) : [];
    existingList.push(entry);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(existingList));

    // Also update Storage utility
    Storage.push('newsletterSubscribers', entry);
    localStorage.setItem('newsletter_dismissed', 'true');

    setIsSuccess(true);
    setEmail('');
    showToast('Subscribed to the weekly brief.');
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
        <h3>Weekly AI Intelligence Brief</h3>
        <p>Curated software releases, benchmark reports, and pricing updates delivered every Monday.</p>
        <div className="newsletter-form">
          <input
            type="email"
            id="newsletterEmail"
            placeholder="Enter business email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        <div className={`newsletter-success ${isSuccess ? 'visible' : ''}`} id="newsletterSuccess">
          <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" /> Subscription confirmed. Thank you.
        </div>
      </div>
    </section>
  );
};
