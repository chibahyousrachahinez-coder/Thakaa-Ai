import React from 'react';

interface AdSenseUnitProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slotId = 'default-slot',
  format = 'auto',
  className = ''
}) => {
  return (
    <div
      className={`adsense-wrapper my-6 p-4 rounded-xl border border-dashed border-slate-700/60 bg-slate-900/30 text-center text-xs text-slate-500 overflow-hidden ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
    >
      <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800/60">
        <span className="uppercase text-[10px] tracking-wider text-slate-400 font-semibold">
          Sponsored / Advertisement
        </span>
        <span className="text-[10px] text-slate-500">Google AdSense Prepared</span>
      </div>
      <div className="min-h-[90px] flex flex-col items-center justify-center bg-slate-950/40 rounded-lg p-3">
        <p className="font-mono text-[11px] text-slate-400">
          [ AdSense Ad Unit Placeholder: {format.toUpperCase()} ]
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          High-relevance contextual AI software advertising slot
        </p>
      </div>
    </div>
  );
};
