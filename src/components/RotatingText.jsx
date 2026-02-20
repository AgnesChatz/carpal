'use client';

import { useState, useEffect } from 'react';

const words = [
  'έξυπνα',
  'βιώσιμα',
  'οικονομικά',
  'γρήγορα',
  'ασφαλή',
  'οικολογικά'
];

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center h-[1.2em] overflow-hidden align-bottom ml-2">
      <span
        className="inline-block gradient-text-blue transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
      >
        {words.map((word, index) => (
          <span key={index} className="block h-[1.2em] leading-[1.2em]">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

// Mobile version - same inline style
export function RotatingTextSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center h-[1.2em] overflow-hidden align-bottom ml-1">
      <span
        className="inline-block gradient-text-blue transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
      >
        {words.map((word, index) => (
          <span key={index} className="block h-[1.2em] leading-[1.2em]">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
