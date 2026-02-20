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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
      <span
        className={`inline-block gradient-text-blue transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'
        }`}
      >
        {words[currentIndex]}.
      </span>
    </span>
  );
}

// Simpler version for mobile
export function RotatingTextSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="gradient-text-blue animate-pulse">
      {words[currentIndex]}.
    </span>
  );
}
