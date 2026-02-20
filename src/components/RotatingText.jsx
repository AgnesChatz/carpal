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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden h-[1.1em] align-bottom relative">
      {words.map((word, index) => (
        <span
          key={index}
          className="block gradient-text-blue transition-all duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

// Mobile version - same inline style
export function RotatingTextSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden h-[1.1em] align-bottom relative">
      {words.map((word, index) => (
        <span
          key={index}
          className="block gradient-text-blue transition-all duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
