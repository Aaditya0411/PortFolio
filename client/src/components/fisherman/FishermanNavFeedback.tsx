import React from 'react';
import { useFisherman } from '@/contexts/FishermanContext';

export const FishermanNavFeedback: React.FC = () => {
  const { isCasting, castProgress, castTarget, directNav } = useFisherman();

  if (!isCasting || !castTarget || directNav) return null;

  return (
    <aside
      className="fisherman-cast-hud"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Fisherman Navigation Status"
    >
      <div className="fisherman-cast-hud-box">
        <div className="fisherman-cast-tag">
          <span className="signal-dot pulse" />
          <span>FISHERMAN INTERACTION / LIVE CAST</span>
        </div>
        <div className="fisherman-cast-body">
          <p className="fisherman-cast-target">
            HOOKING <strong>{castTarget.label}</strong>
          </p>
          <div className="fisherman-cast-progress-bar">
            <div
              className="fisherman-cast-progress-fill"
              style={{ width: `${Math.round(castProgress * 100)}%` }}
            />
          </div>
          <span className="fisherman-cast-phase">
            {castProgress < 0.25 && 'AIMING ROD & WINDING UP...'}
            {castProgress >= 0.25 && castProgress < 0.65 && 'CASTING HOOK THROUGH VOID...'}
            {castProgress >= 0.65 && castProgress < 0.78 && 'HOOK CONNECTED / LINE TAUT'}
            {castProgress >= 0.78 && 'REELING IN OBJECT / TRANSITIONING...'}
          </span>
        </div>
      </div>
    </aside>
  );
};
