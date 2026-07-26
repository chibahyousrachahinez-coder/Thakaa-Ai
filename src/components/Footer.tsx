import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigateSubmit?: () => void;
  onNavigateStack?: () => void;
  onNavigateQuiz?: () => void;
  onNavigateLegal?: (type: 'privacy' | 'terms' | 'contact' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <Link to="/about" className="footer-brand flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="none" className="flex-shrink-0">
              <rect x="2" y="4" width="28" height="7" rx="3.5" fill="#2563EB"/>
              <rect x="12" y="13" width="8" height="15" rx="3.5" fill="currentColor"/>
            </svg>
            <span className="font-bold text-lg tracking-tight">Thakaa AI</span>
          </Link>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/submit">Submit Software</Link>
            <Link to="/stack/developer">AI Stacks</Link>
            <Link to="/quiz">Tool Finder</Link>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Thakaa AI Directory & Benchmark Index. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

