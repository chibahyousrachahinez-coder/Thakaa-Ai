import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';

export const ROICalculatorSection: React.FC = () => {
  const [hours, setHours] = useState<number>(10);
  const [rate, setRate] = useState<number>(25);
  const [toolCost, setToolCost] = useState<number>(20);
  const [savePercent, setSavePercent] = useState<number>(50);

  const weeklyTimeSaved = (hours * savePercent / 100).toFixed(1);
  const monthlyTimeValue = Math.round(parseFloat(weeklyTimeSaved) * rate * 4.33);
  const monthlySavings = monthlyTimeValue - toolCost;
  const annualSavings = monthlySavings * 12;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Thakaa = (window as any).Thakaa || {};
      (window as any).Thakaa.calculateROI = () => {
        const h = parseInt((document.getElementById('roiHours') as HTMLInputElement)?.value) || 10;
        const r = parseInt((document.getElementById('roiRate') as HTMLInputElement)?.value) || 25;
        const c = parseInt((document.getElementById('roiToolCost') as HTMLInputElement)?.value) || 20;
        const p = parseInt((document.getElementById('roiSavePercent') as HTMLSelectElement)?.value) || 50;
        setHours(h);
        setRate(r);
        setToolCost(c);
        setSavePercent(p);
      };
    }
  }, []);

  return (
    <section className="roi-section" id="roiCalculator">
      <div className="container">
        <div className="section-title-wrap">
          <Calculator className="w-6 h-6 text-primary inline mr-2" />
          <h2>AI Software Investment & ROI Calculator</h2>
        </div>
        <p>Calculate labor hour reductions and financial impact for your workflow</p>
        <div className="roi-grid">
          <div className="roi-inputs">
            <div className="roi-input-group">
              <label htmlFor="roiHours">Weekly task hours spent on process</label>
              <input
                type="number"
                id="roiHours"
                value={hours}
                min="1"
                max="80"
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="roiRate">Hourly billing rate or labor cost ($)</label>
              <input
                type="number"
                id="roiRate"
                value={rate}
                min="5"
                max="500"
                onChange={(e) => setRate(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="roiToolCost">Monthly software license fee ($)</label>
              <input
                type="number"
                id="roiToolCost"
                value={toolCost}
                min="0"
                max="500"
                onChange={(e) => setToolCost(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="roi-input-group">
              <label htmlFor="roiSavePercent">Estimated workflow efficiency boost (%)</label>
              <select
                id="roiSavePercent"
                value={savePercent}
                onChange={(e) => setSavePercent(parseInt(e.target.value))}
              >
                <option value="30">30% (Baseline)</option>
                <option value="50">50% (Standard Efficiency)</option>
                <option value="70">70% (Optimized Integration)</option>
                <option value="90">90% (Automated Pipeline)</option>
              </select>
            </div>
          </div>
          <div className="roi-result">
            <div className="roi-number" id="roiMonthly">${monthlySavings.toLocaleString()}</div>
            <div className="roi-label">Estimated Monthly Value Generated</div>
            <div className="roi-breakdown">
              <div><span>Weekly time recovered:</span><span id="roiTimeSaved">{weeklyTimeSaved} hrs</span></div>
              <div><span>Monthly labor value:</span><span id="roiTimeValue">${monthlyTimeValue.toLocaleString()}</span></div>
              <div><span>Software fee:</span><span id="roiCost">-${toolCost}</span></div>
              <div><span>Net monthly savings:</span><span id="roiNet">${monthlySavings.toLocaleString()}</span></div>
              <div><span>Annualized ROI:</span><span id="roiAnnual">${annualSavings.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
