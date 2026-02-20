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
    <span className="inline-block overflow-hidden align-middle" style={{ height: '1.4em', lineHeight: '1.4em' }}>
      <span
        className="inline-block transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 1.4}em)`,
        }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="block gradient-text-blue"
            style={{ height: '1.4em', lineHeight: '1.4em' }}
          >
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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden align-middle" style={{ height: '1.4em', lineHeight: '1.4em' }}>
      <span
        className="inline-block transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 1.4}em)`,
        }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="block gradient-text-blue"
            style={{ height: '1.4em', lineHeight: '1.4em' }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
