import React from 'react';
import { Crown, X, CheckCircle2 } from 'lucide-react';
import { Storage, showToast } from '../utils/storage';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onUnlocked }) => {
  if (!isOpen) return null;

  const handleUnlock = () => {
    const email = prompt('Enter business email to activate directory access:');
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Storage.push('premiumUsers', { email, date: new Date().toISOString() });
      Storage.set('premiumUnlocked', true);
      onUnlocked();
      onClose();
      showToast('Directory features unlocked.');
    } else if (email !== null) {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <div className="premium-modal-overlay active" id="premiumModal">
      <div className="premium-modal">
        <button className="close-x" onClick={onClose} aria-label="Close modal dialog">
          <X className="w-4 h-4" />
        </button>
        <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <h3>Pro Directory Features</h3>
        <p>Unlock structured benchmarks and exportable comparison datasets.</p>
        <ul className="premium-features">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Exportable PDF matrix reports</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Enterprise tool pricing benchmarks</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Weekly software intelligence brief</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Priority tool evaluation queue</li>
        </ul>
        <button className="premium-btn" onClick={handleUnlock}>
          Unlock Features
        </button>
        <button className="premium-skip" onClick={onClose}>
          Dismiss
        </button>
      </div>
    </div>
  );
};
