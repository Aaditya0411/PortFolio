import React from 'react';

interface GoswamiMonogramProps {
  className?: string;
  size?: number;
}

export const GoswamiMonogram: React.FC<GoswamiMonogramProps> = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
      style={{
        width: size ? `${size}px` : '100%',
        height: size ? `${size}px` : '100%',
        display: 'block',
      }}
      aria-label="Adityagiri Goswami Monogram"
    >
      <rect width="120" height="120" fill="#0d0f13" rx="10" />
      <rect x="6" y="6" width="108" height="108" fill="none" stroke="#262932" strokeWidth="1.5" rx="6" />
      <line x1="6" y1="20" x2="20" y2="20" stroke="#d6483e" strokeWidth="2" />
      <line x1="20" y1="6" x2="20" y2="20" stroke="#d6483e" strokeWidth="2" />
      <line x1="100" y1="6" x2="100" y2="20" stroke="#363a46" strokeWidth="2" />
      <line x1="100" y1="20" x2="114" y2="20" stroke="#363a46" strokeWidth="2" />
      <line x1="6" y1="100" x2="20" y2="100" stroke="#363a46" strokeWidth="2" />
      <line x1="20" y1="100" x2="20" y2="114" stroke="#363a46" strokeWidth="2" />
      <line x1="100" y1="100" x2="114" y2="100" stroke="#d6483e" strokeWidth="2" />
      <line x1="100" y1="100" x2="100" y2="114" stroke="#d6483e" strokeWidth="2" />
      <path d="M42 86 L60 34 L78 86" fill="none" stroke="#f0ece1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="48" y1="68" x2="72" y2="68" stroke="#d6483e" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M86 52 C80 40 64 38 52 48 C40 58 40 76 52 84 C64 90 80 88 88 76 L88 64 L70 64" fill="none" stroke="#f0ece1" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx="70" cy="64" r="3" fill="#d6483e" />
    </svg>
  );
};

export default GoswamiMonogram;
