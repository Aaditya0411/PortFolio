import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type DestinationId = 
  | 'origin' 
  | 'about' 
  | 'stack' 
  | 'work' 
  | 'experience' 
  | 'resume' 
  | 'contact';

export interface DestinationConfig {
  id: DestinationId;
  index: string;
  label: string;
  navTitle: string;
  camPos: [number, number, number];
  camLookAt: [number, number, number];
}

export const DESTINATIONS: DestinationConfig[] = [
  {
    id: 'origin',
    index: '01',
    label: 'ORIGIN / CORE',
    navTitle: '01 CORE',
    camPos: [-0.4, 1.2, 4.8],
    camLookAt: [0.2, 0.35, 0],
  },
  {
    id: 'about',
    index: '02',
    label: 'IDENTITY / ARCHITECTURE',
    navTitle: '02 ABOUT',
    camPos: [-10.5, 1.6, -1.8],
    camLookAt: [-12.2, 1.2, -6.0],
  },
  {
    id: 'stack',
    index: '03',
    label: 'SYSTEMS / INFRASTRUCTURE',
    navTitle: '03 STACK',
    camPos: [-7.2, 2.4, -16.5],
    camLookAt: [-8.0, 1.5, -22.0],
  },
  {
    id: 'work',
    index: '04',
    label: 'PROJECT ARCHIPELAGO',
    navTitle: '04 WORK',
    camPos: [7.5, 2.8, -14.0],
    camLookAt: [8.5, 1.4, -20.5],
  },
  {
    id: 'experience',
    index: '05',
    label: 'ENGINEERING PATHWAY',
    navTitle: '05 EXPERIENCE',
    camPos: [13.8, 1.8, 0.2],
    camLookAt: [16.0, 1.0, -4.0],
  },
  {
    id: 'resume',
    index: '06',
    label: 'VERIFIED ARCHIVE',
    navTitle: '06 RESUME',
    camPos: [10.2, 1.5, 12.0],
    camLookAt: [12.0, 0.9, 8.0],
  },
  {
    id: 'contact',
    index: '07',
    label: 'SIGNAL BEACON',
    navTitle: '07 CONTACT',
    camPos: [0.0, 3.2, 22.0],
    camLookAt: [0.0, 1.6, 12.0],
  },
];

interface WorldStateContextType {
  activeDestination: DestinationId;
  activeDestinationConfig: DestinationConfig;
  destinationIndex: number;
  navigateTo: (dest: DestinationId, direct?: boolean) => void;
  nextDestination: () => void;
  prevDestination: () => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  activeCaseStudy: any | null;
  openCaseStudy: (project: any) => void;
  closeCaseStudy: () => void;
  isNavigating: boolean;
  isOpeningActive: boolean;
  skipOpening: () => void;
  replayOpening: () => void;
  reducedMotion: boolean;
  directMode: boolean;
  setDirectMode: (direct: boolean) => void;
}

const WorldStateContext = createContext<WorldStateContextType | null>(null);

const SESSION_KEY = 'aditya_world_seen_v1';

export const WorldStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDestination, setActiveDestination] = useState<DestinationId>('origin');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<any | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [directMode, setDirectMode] = useState<boolean>(false);
  const navTimeout = useRef<NodeJS.Timeout | null>(null);

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [isOpeningActive, setIsOpeningActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  const destinationIndex = DESTINATIONS.findIndex((d) => d.id === activeDestination);
  const activeDestinationConfig = DESTINATIONS[destinationIndex] || DESTINATIONS[0];

  const navigateTo = useCallback((dest: DestinationId, direct = false) => {
    if (isOpeningActive) {
      setIsOpeningActive(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
    setActiveDestination(dest);
    setIsNavigating(true);

    if (navTimeout.current) clearTimeout(navTimeout.current);
    const duration = direct || reducedMotion ? 200 : 1400;
    navTimeout.current = setTimeout(() => {
      setIsNavigating(false);
    }, duration);
  }, [isOpeningActive, reducedMotion]);

  const nextDestination = useCallback(() => {
    const nextIdx = (destinationIndex + 1) % DESTINATIONS.length;
    navigateTo(DESTINATIONS[nextIdx].id);
  }, [destinationIndex, navigateTo]);

  const prevDestination = useCallback(() => {
    const prevIdx = (destinationIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length;
    navigateTo(DESTINATIONS[prevIdx].id);
  }, [destinationIndex, navigateTo]);

  const openCaseStudy = useCallback((project: any) => {
    setActiveCaseStudy(project);
    setSelectedProjectId(project.id);
  }, []);

  const closeCaseStudy = useCallback(() => {
    setActiveCaseStudy(null);
  }, []);

  const skipOpening = useCallback(() => {
    setIsOpeningActive(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  }, []);

  const replayOpening = useCallback(() => {
    setActiveDestination('origin');
    setIsOpeningActive(true);
  }, []);

  return (
    <WorldStateContext.Provider
      value={{
        activeDestination,
        activeDestinationConfig,
        destinationIndex,
        navigateTo,
        nextDestination,
        prevDestination,
        selectedProjectId,
        setSelectedProjectId,
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,
        isNavigating,
        isOpeningActive,
        skipOpening,
        replayOpening,
        reducedMotion,
        directMode,
        setDirectMode,
      }}
    >
      {children}
    </WorldStateContext.Provider>
  );
};

export const useWorld = () => {
  const ctx = useContext(WorldStateContext);
  if (!ctx) {
    throw new Error('useWorld must be used within a WorldStateProvider');
  }
  return ctx;
};
