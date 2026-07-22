import React, { useState } from 'react';

interface ToolLogoProps {
  name: string;
  domain?: string;
  url?: string;
  size?: number;
  className?: string;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({
  name,
  domain,
  url,
  size = 40,
  className = ''
}) => {
  const [stage, setStage] = useState<'clearbit' | 'favicon' | 'fallback'>('clearbit');

  const extractDomain = (): string | null => {
    if (domain) return domain;
    if (url) {
      try {
        const parsed = new URL(url);
        return parsed.hostname.replace(/^www\./, '');
      } catch {
        return null;
      }
    }
    return null;
  };

  const parsedDomain = extractDomain();

  if (!parsedDomain || stage === 'fallback') {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    return (
      <div
        className={`tool-logo-fallback ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '10px',
          background: 'var(--border)',
          color: 'var(--text)',
          fontWeight: 700,
          fontSize: `${Math.max(12, size * 0.38)}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
        aria-label={`${name} logo`}
      >
        {initials}
      </div>
    );
  }

  if (stage === 'clearbit') {
    return (
      <img
        src={`https://logo.clearbit.com/${parsedDomain}`}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`tool-logo-img ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '10px',
          objectFit: 'contain',
          backgroundColor: 'var(--card)',
          padding: '4px',
          border: '1px solid var(--border)',
          flexShrink: 0
        }}
        loading="lazy"
        onError={() => setStage('favicon')}
      />
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${parsedDomain}&sz=128`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`tool-logo-img ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '10px',
        objectFit: 'contain',
        backgroundColor: 'var(--card)',
        padding: '4px',
        border: '1px solid var(--border)',
        flexShrink: 0
      }}
      loading="lazy"
      onError={() => setStage('fallback')}
    />
  );
};
