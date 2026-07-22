import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, ArrowUpRight } from 'lucide-react';
import { STACK_BUNDLES } from '../data/thakaaData';
import { Storage } from '../utils/storage';
import { ToolLogo } from './ToolLogo';

export const StackBuilderSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelectStack = (type: string) => {
    setSelectedRole(type);
  };

  const handleReset = () => {
    setSelectedRole(null);
  };

  const handleTrackClick = (affiliate: string, url: string) => {
    Storage.push('affiliateClicks', {
      toolId: `${affiliate}-stack`,
      url,
      timestamp: new Date().toISOString(),
      source: 'stack-builder',
      userAgent: navigator.userAgent.slice(0, 50)
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Thakaa = (window as any).Thakaa || {};
      (window as any).Thakaa.selectStack = (type: string) => handleSelectStack(type);
      (window as any).Thakaa.resetStack = () => handleReset();
      (window as any).Thakaa.showStackBuilder = () => {
        const el = document.getElementById('stackBuilder');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  }, []);

  const currentBundle = selectedRole ? STACK_BUNDLES[selectedRole] : null;

  return (
    <section className="stack-builder" id="stackBuilder">
      <div className="container">
        <div className="section-title-wrap">
          <Layers className="w-6 h-6 text-primary inline mr-2" />
          <h2>AI Software Stack Architect</h2>
        </div>
        <p>Pre-configured tool combinations tailored to specific professional roles</p>
        
        <div id="stackContent">
          {!currentBundle ? (
            <>
              <div className="stack-question">Select your primary role:</div>
              <div className="stack-options">
                <button className="stack-option" onClick={() => handleSelectStack('creator')}>Content Creator</button>
                <button className="stack-option" onClick={() => handleSelectStack('developer')}>Software Developer</button>
                <button className="stack-option" onClick={() => handleSelectStack('marketer')}>Growth Marketer</button>
                <button className="stack-option" onClick={() => handleSelectStack('business')}>Business Operations</button>
                <button className="stack-option" onClick={() => handleSelectStack('student')}>Academic Research</button>
              </div>
            </>
          ) : (
            <>
              <div className="stack-question">{currentBundle.name}</div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{currentBundle.desc}</p>
            </>
          )}
        </div>

        <div className={`stack-result ${currentBundle ? 'active' : ''}`} id="stackResult">
          {currentBundle && (
            <>
              <div className="stack-bundle">
                <h4>Recommended Stack Architecture</h4>
                {currentBundle.tools.map((t, index) => (
                  <div key={index} className="stack-tool-item">
                    <ToolLogo name={t.name} domain={t.domain} size={32} />
                    <div className="st-info">
                      <div className="st-name">{t.name}</div>
                      <div className="st-desc">{t.desc}</div>
                    </div>
                    <span className="st-price">{t.price}</span>
                  </div>
                ))}
                <div className="stack-total">
                  <span className="total-label">Estimated Monthly Investment</span>
                  <span className="total-value">{currentBundle.total}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {currentBundle.tools.map((t, index) => (
                  <button
                    key={index}
                    className="btn btn-primary"
                    style={{ flex: 1, minWidth: '140px', justifyContent: 'center' }}
                    onClick={() => handleTrackClick(t.affiliate, t.url)}
                  >
                    Open {t.name} <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                ))}
              </div>

              <div className="stack-affiliate-note">
                {currentBundle.savings}
              </div>

              <button className="quiz-restart inline-flex items-center gap-1.5" onClick={handleReset} style={{ marginTop: '20px' }}>
                <RotateCcw className="w-4 h-4 text-secondary" /> Change Role Selection
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
