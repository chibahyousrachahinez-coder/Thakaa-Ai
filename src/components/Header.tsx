import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, PlusCircle } from 'lucide-react';
import { Storage } from '../utils/storage';

const ADMIN_EMAILS = [
  "chibahyousrachaihnez@gmail.com",
  "chibahyousrachahinez@gmail.com"
];

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate?: (section: string) => void;
  onOpenPublishModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onOpenPublishModal }) => {
  const navigate = useNavigate();

  const userEmail = Storage.get<string>('adminUserEmail', 'chibahyousrachaihnez@gmail.com');
  const isAuthorizedAdmin = ADMIN_EMAILS.some(
    (e) => e.toLowerCase() === userEmail.trim().toLowerCase()
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" className="flex-shrink-0">
              <rect x="2" y="4" width="28" height="7" rx="3.5" fill="#2563EB"/>
              <rect x="12" y="13" width="8" height="15" rx="3.5" fill="currentColor"/>
            </svg>
            <span className="font-bold text-xl tracking-tight">Thakaa AI</span>
          </Link>
          <nav className="nav">
            <Link to="/">Directory</Link>
            <Link to="/category/writing">Categories</Link>
            <Link to="/comparisons">Comparisons</Link>
            <Link to="/stack/developer">Niche Stacks</Link>
            <Link to="/quiz">Tool Finder</Link>
          </nav>
          <div className="header-actions">
            {isAuthorizedAdmin && onOpenPublishModal && (
              <button
                onClick={onOpenPublishModal}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all"
                title="Admin Publishing Workflow"
              >
                <PlusCircle className="w-4 h-4" /> + Write Article / Add Tool
              </button>
            )}
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              title="Toggle theme"
              aria-label="Toggle between dark and light mode"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('newsletter');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="btn btn-primary"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


