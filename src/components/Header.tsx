import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onNavigate }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo" onClick={() => onNavigate('home')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" className="flex-shrink-0">
              <rect x="2" y="4" width="28" height="7" rx="3.5" fill="#2563EB"/>
              <rect x="12" y="13" width="8" height="15" rx="3.5" fill="currentColor"/>
            </svg>
            <span className="font-bold text-xl tracking-tight">Thakaa AI</span>
          </div>
          <nav className="nav">
            <a onClick={() => onNavigate('tools')}>Directory</a>
            <a onClick={() => onNavigate('categories')}>Categories</a>
            <a onClick={() => onNavigate('comparisons')}>Comparisons</a>
            <a onClick={() => onNavigate('stackBuilder')}>Stacks</a>
            <a onClick={() => onNavigate('quiz')}>Tool Finder</a>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              title="Toggle theme"
              aria-label="Toggle between dark and light mode"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <a href="#newsletter" className="btn btn-primary" onClick={() => onNavigate('newsletter')}>
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

