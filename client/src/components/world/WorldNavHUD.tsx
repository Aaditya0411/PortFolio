import React from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useWorld, DESTINATIONS, DestinationId } from '@/contexts/WorldStateContext';
import { GoswamiMonogram } from '@/components/brand/GoswamiMonogram';

export const WorldNavHUD: React.FC = () => {
  const { activeDestination, navigateTo, replayOpening } = useWorld();

  return (
    <nav className="world-hud-layer" aria-label="Portfolio Navigation">
      {/* Top Header Bar */}
      <header className="world-header">
        <button
          className="world-brand"
          onClick={() => navigateTo('origin')}
          aria-label="Adityagiri Goswami Origin"
        >
          <span className="world-brand-mark">
            <GoswamiMonogram />
          </span>
          <span className="world-brand-title">
            ADITYAGIRI GOSWAMI
          </span>
        </button>

        {/* Minimal Editorial Destination Track */}
        <div className="world-nav-destinations">
          {DESTINATIONS.map((dest) => {
            const isActive = activeDestination === dest.id;
            return (
              <button
                key={dest.id}
                className={`world-nav-dest-btn ${isActive ? 'active' : ''}`}
                onClick={() => navigateTo(dest.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span>{dest.navTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Connect Link */}
        <div className="world-header-actions">
          <a
            href="mailto:goswamiaaditya61@gmail.com"
            className="world-connect-btn"
          >
            <span>GET IN TOUCH</span> <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      {/* Bottom Subtle Status & Scroll Hint */}
      <footer className="world-bottom-hud">
        <div className="world-coords">
          <button
            type="button"
            className="world-replay-trigger"
            onClick={replayOpening}
            title="Replay cinematic prologue"
            aria-label="Replay intro sequence"
          >
            <RotateCcw size={10} />
            <span>REPLAY INTRO</span>
          </button>
          <span className="coord-dot">·</span>
          <span>{(() => {
            const dest = DESTINATIONS.find((d) => d.id === activeDestination);
            return dest ? `ZONE ${dest.index} // ${dest.label}` : 'ZONE 01 // ORIGIN / CORE';
          })()}</span>
          <span className="coord-dot">·</span>
          <span>THE DIGITAL ESTUARY</span>
          <span className="coord-dot">·</span>
          <span>VADODARA / IN</span>
          <span className="coord-dot">·</span>
          <span className="coord-muted">LAT 22°18'N LON 73°12'E</span>
        </div>

        <div className="world-scroll-cue">
          <span>SCROLL TO EXPLORE ARCHIPELAGO</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </footer>
    </nav>
  );
};
