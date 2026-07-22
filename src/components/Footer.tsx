import React from 'react';

interface FooterProps {
  onNavigateSubmit: () => void;
  onNavigateStack: () => void;
  onNavigateQuiz: () => void;
  onNavigateLegal: (type: 'privacy' | 'terms' | 'contact' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSubmit,
  onNavigateStack,
  onNavigateQuiz,
  onNavigateLegal
}) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand flex items-center gap-2 cursor-pointer" onClick={() => onNavigateLegal('about')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="none" className="flex-shrink-0">
              <rect x="2" y="4" width="28" height="7" rx="3.5" fill="#2563EB"/>
              <rect x="12" y="13" width="8" height="15" rx="3.5" fill="currentColor"/>
            </svg>
            <span className="font-bold text-lg tracking-tight">Thakaa AI</span>
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLegal('about'); }}>About Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLegal('privacy'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLegal('terms'); }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLegal('contact'); }}>Contact</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateSubmit(); }}>Submit Software</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateStack(); }}>AI Stacks</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateQuiz(); }}>Tool Finder</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Thakaa AI Directory & Benchmark Index. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
