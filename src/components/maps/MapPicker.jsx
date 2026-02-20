'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components (client-side only)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

// Thessaloniki center
const DEFAULT_CENTER = [40.6401, 22.9444];

// Map click handler component
const MapClickHandler = dynamic(
  () => import('react-leaflet').then((mod) => {
    const Component = ({ onClick }) => {
      mod.useMapEvents({
        click: (e) => onClick(e.latlng),
      });
      return null;
    };
    return Component;
  }),
  { ssr: false }
);

export function MapPicker({ onLocationSelect, initialLocation = null, height = '300px' }) {
  const [mounted, setMounted] = useState(false);
  const [leaflet, setLeaflet] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Import Leaflet
    import('leaflet').then((L) => {
      setLeaflet(L);
      setMounted(true);
    });

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleMapClick = useCallback((latlng) => {
    const { lat, lng } = latlng;
    setPosition([lat, lng]);
    
    // Reverse geocode using Nominatim
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      .then(res => res.json())
      .then(data => {
        onLocationSelect({
          lat,
          lng,
          address: data.display_name || 'Unknown location'
        });
      })
      .catch(() => {
        onLocationSelect({
          lat,
          lng,
          address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        });
      });
  }, [onLocationSelect]);

  const icon = leaflet ? new leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }) : null;

  if (!mounted) {
    return (
      <div 
        className="w-full bg-gray-800 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-400">Φόρτωση χάρτη...</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ height }}>
      <MapContainer
        center={initialLocation ? [initialLocation.lat, initialLocation.lng] : DEFAULT_CENTER}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={handleMapClick} />
        {position && icon && <Marker position={position} icon={icon} />}
      </MapContainer>
      <p className="text-xs text-gray-500 mt-1">Κάντε κλικ στο χάρτη για επιλογή τοποθεσίας</p>
    </div>
  );
}
