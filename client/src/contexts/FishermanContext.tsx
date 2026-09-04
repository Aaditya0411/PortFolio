import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

export type CastTargetType = 'section' | 'project';

export interface CastTarget {
  id: string;
  label: string;
  type: CastTargetType;
  projectData?: any;
  position?: [number, number, number];
}

export type IntroPhase = 
  | 'dark'
  | 'reveal'
  | 'windup'
  | 'cast'
  | 'hook'
  | 'pull'
  | 'transition'
  | 'done';

interface FishermanContextType {
  introActive: boolean;
  introPhase: IntroPhase;
  skipIntro: () => void;
  replayIntro: () => void;
  isCasting: boolean;
  castProgress: number;
  castTarget: CastTarget | null;
  strikeCount: number;
  directNav: boolean;
  setDirectNav: (direct: boolean) => void;
  triggerFishingNav: (target: CastTarget, onComplete?: () => void) => void;
  registerNavCallback: (id: string, cb: () => void) => void;
}

const FishermanContext = createContext<FishermanContextType | null>(null);

const SESSION_KEY = 'aditya_fisherman_intro_v4';

export const FishermanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return false;
    const seen = sessionStorage.getItem(SESSION_KEY);
    return !seen;
  });

  const [introPhase, setIntroPhase] = useState<IntroPhase>('dark');
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [castProgress, setCastProgress] = useState<number>(0);
  const [castTarget, setCastTarget] = useState<CastTarget | null>(null);
  const [strikeCount, setStrikeCount] = useState<number>(0);
  const [directNav, setDirectNav] = useState<boolean>(false);

  const navCallbacks = useRef<Map<string, () => void>>(new Map());
  const activeCallback = useRef<(() => void) | null>(null);

  const registerNavCallback = useCallback((id: string, cb: () => void) => {
    navCallbacks.current.set(id, cb);
  }, []);

  const skipIntro = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setIntroPhase('done');
    setIntroActive(false);
  }, []);

  const replayIntro = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIntroActive(true);
    setIntroPhase('dark');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut: Escape to skip intro
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && introActive) {
        skipIntro();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [introActive, skipIntro]);

  // Intro choreograph timer: Exact 8.5 second cinematic sequence
  useEffect(() => {
    if (!introActive) {
      setIntroPhase('done');
      return;
    }

    setIntroPhase('dark');
    const t1 = setTimeout(() => setIntroPhase('reveal'), 1000);     // 1.0s: Reveal fisherman & target
    const t2 = setTimeout(() => setIntroPhase('windup'), 2200);     // 2.2s: Fisherman windup & rod back
    const t3 = setTimeout(() => setIntroPhase('cast'), 3500);       // 3.5s: Whip cast & hook flight
    const t4 = setTimeout(() => setIntroPhase('hook'), 4500);       // 4.5s: Hook connects with Developer Core
    const t5 = setTimeout(() => setIntroPhase('pull'), 5500);       // 5.5s: Fisherman pulls & rod bends
    const t6 = setTimeout(() => setIntroPhase('transition'), 7000); // 7.0s: Target expands / transition
    const t7 = setTimeout(() => {                                   // 8.5s: Done -> Reveal portfolio hero
      setIntroPhase('done');
      setIntroActive(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [introActive]);

  // Trigger signature fishing navigation
  const triggerFishingNav = useCallback(
    (target: CastTarget, onComplete?: () => void) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      const executeNavigation = () => {
        if (onComplete) {
          onComplete();
        } else {
          const registered = navCallbacks.current.get(target.id);
          if (registered) registered();
          else {
            const el = document.getElementById(target.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      // Direct navigation fallback if user preferred or reduced motion is active
      if (directNav || prefersReduced) {
        executeNavigation();
        return;
      }

      // If already casting, finish immediately
      if (isCasting) {
        executeNavigation();
        setIsCasting(false);
        setCastTarget(null);
        return;
      }

      setCastTarget(target);
      setIsCasting(true);
      setCastProgress(0);
      activeCallback.current = executeNavigation;

      // Cast duration: snappier on mobile (1.1s), cinematic on desktop (1.85s)
      const duration = isMobile ? 1100 : 1850;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCastProgress(progress);

        // Hook impact moment (at ~65% of cast duration)
        if (progress >= 0.65 && progress < 0.72) {
          setStrikeCount((c) => c + 1);
        }

        // At 85% of duration, begin page navigation / modal reveal
        if (progress >= 0.85 && activeCallback.current) {
          activeCallback.current();
          activeCallback.current = null;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            setIsCasting(false);
            setCastTarget(null);
            setCastProgress(0);
          }, 250);
        }
      };

      requestAnimationFrame(animate);
    },
    [directNav, isCasting]
  );

  return (
    <FishermanContext.Provider
      value={{
        introActive,
        introPhase,
        skipIntro,
        replayIntro,
        isCasting,
        castProgress,
        castTarget,
        strikeCount,
        directNav,
        setDirectNav,
        triggerFishingNav,
        registerNavCallback,
      }}
    >
      {children}
    </FishermanContext.Provider>
  );
};

export const useFisherman = () => {
  const context = useContext(FishermanContext);
  if (!context) {
    throw new Error('useFisherman must be used within a FishermanProvider');
  }
  return context;
};
