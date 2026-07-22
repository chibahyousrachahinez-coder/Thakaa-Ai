import React, { useState } from 'react';
import { Mail, X, CheckCircle2 } from 'lucide-react';
import { Storage, showToast } from '../utils/storage';

interface EmailPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Optional placeholder for external email service (e.g., Formspree endpoint)
// e.g. const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id';
const FORMSPREE_ENDPOINT = '';

export const EmailPopupModal: React.FC<EmailPopupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has already dismissed or subscribed previously
  const hasSeen = localStorage.getItem('newsletter_dismissed');
  if (hasSeen === 'true' || !isOpen) return null;

  const handleDismiss = () => {
    localStorage.setItem('newsletter_dismissed', 'true');
    onClose();
  };

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      const errText = 'Please enter a valid email address.';
      setErrorMsg(errText);
      showToast(errText, 'error');
      return;
    }

    const cleanEmail = email.trim();
    setIsLoading(true);

    try {
      // 1. Store subscribed email in localStorage under 'newsletter_subscribers' array
      const rawExisting = localStorage.getItem('newsletter_subscribers');
      const existingList = rawExisting ? JSON.parse(rawExisting) : [];
      const subscriberEntry = {
        email: cleanEmail,
        date: new Date().toISOString(),
        source: 'popup'
      };
      existingList.push(subscriberEntry);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(existingList));

      // Also update internal Storage utility for admin dashboard compatibility
      Storage.push('newsletterSubscribers', subscriberEntry);

      // 2. Formspree / External API Endpoint integration placeholder
      if (FORMSPREE_ENDPOINT) {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email: cleanEmail, source: 'popup' })
        }).catch((err) => console.warn('Formspree integration warning:', err));
      }

      // 3. Set success state & mark newsletter as dismissed
      setIsSubscribed(true);
      localStorage.setItem('newsletter_dismissed', 'true');
      showToast('Thank you for subscribing!');

      // Automatically close the modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Subscription error:', err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="email-popup-overlay active" id="emailPopupOverlay" onClick={handleDismiss} />
      <div className="email-popup active" id="emailPopup">
        <button className="close-popup" onClick={handleDismiss} aria-label="Close email popup">
          <X className="w-4 h-4" />
        </button>

        {isSubscribed ? (
          <div className="py-4 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2 animate-bounce" />
            <h4 className="text-lg font-bold mb-1">Thank you for subscribing!</h4>
            <p className="text-xs text-secondary max-w-xs">
              You are now subscribed to receive software release reports and benchmark summaries.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <Mail className="w-8 h-8 text-primary mb-2 mx-auto" />
            <h4>Weekly AI Intelligence Brief</h4>
            <p>Subscribe to receive software release reports and benchmark summaries</p>
            <input
              type="email"
              id="popupEmail"
              placeholder="work@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              disabled={isLoading}
            />
            {errorMsg && (
              <p className="text-xs text-rose-500 mt-1 mb-2 text-center">{errorMsg}</p>
            )}
            <div className="popup-btns">
              <button type="submit" className="btn-yes" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Subscribe'}
              </button>
              <button type="button" className="btn-no" onClick={handleDismiss} disabled={isLoading}>
                Dismiss
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

