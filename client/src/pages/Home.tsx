import React, { useEffect } from 'react';
import { WorldCanvas } from '@/components/world/WorldCanvas';
import { WorldNavHUD } from '@/components/world/WorldNavHUD';
import { WorldEditorialLayer } from '@/components/world/WorldEditorialLayer';
import { ProjectCaseStudyDrawer } from '@/components/world/ProjectCaseStudyDrawer';
import { useWorld } from '@/contexts/WorldStateContext';

export default function Home() {
  const {
    activeDestination,
    nextDestination,
    prevDestination,
    navigateTo,
    activeCaseStudy,
    closeCaseStudy,
  } = useWorld();

  // Spatial scroll and keyboard controller
  useEffect(() => {
    let lastWheelTime = 0;

    const onWheel = (e: WheelEvent) => {
      // If a case study drawer is active, allow normal scrolling inside the drawer
      if (activeCaseStudy) return;

      const now = Date.now();
      if (now - lastWheelTime < 650) return; // Smooth pacing between camera flights

      if (Math.abs(e.deltaY) > 22) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          nextDestination();
        } else {
          prevDestination();
        }
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (activeCaseStudy) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextDestination();
        } else {
          prevDestination();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (activeCaseStudy) {
        if (e.key === 'Escape') closeCaseStudy();
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextDestination();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevDestination();
      } else if (e.key === 'Home') {
        navigateTo('origin');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCaseStudy, nextDestination, prevDestination, navigateTo, closeCaseStudy]);

  return (
    <div className="world-viewport-root">
      {/* 1. Fullscreen Unified 3D World Canvas */}
      <WorldCanvas />


      {/* 3. Minimalist Editorial World HUD (Navigation & Status) */}
      <WorldNavHUD />

      {/* 4. Layered Real HTML Editorial Content (Selectable & Accessible) */}
      <WorldEditorialLayer />

      {/* 5. Rich Editorial Project Case Study Drawer */}
      <ProjectCaseStudyDrawer />

      {/* Subtle atmospheric vignette */}
      <div className="world-vignette" aria-hidden="true" />
    </div>
  );
}
