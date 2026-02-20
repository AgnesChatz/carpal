'use client';

import { useState, useEffect } from 'react';

const words = [
  'έξυπνα',
  'βιώσιμα',
  'οικονομικά',
  'γρήγορα',
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
    <span className="inline-flex items-baseline overflow-hidden" style={{ height: '1.1em' }}>
      <span
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 20}%)`,
        }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="gradient-text-blue leading-none"
            style={{ height: '20%' }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

// Mobile version
export function RotatingTextSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-baseline overflow-hidden" style={{ height: '1.1em' }}>
      <span
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 20}%)`,
        }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="gradient-text-blue leading-none"
            style={{ height: '20%' }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
