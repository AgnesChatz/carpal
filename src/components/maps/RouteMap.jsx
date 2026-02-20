'use client';

import { useEffect, useState, useRef } from 'react';

// Load Leaflet CSS and JS dynamically
let leafletLoaded = false;
const loadLeaflet = () => {
  if (leafletLoaded) return Promise.resolve();
  
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      leafletLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });
};

// Thessaloniki center
const DEFAULT_CENTER = [40.6401, 22.9444];

export function RouteMap({ origin, destination, meetingPoint, height = '300px' }) {
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Wait for ref to be ready
  useEffect(() => {
    if (mapRef.current) {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady || !mapRef.current) return;
    
    const initMap = async () => {
      await loadLeaflet();
      const L = window.L;
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Determine center based on available points
      let center = DEFAULT_CENTER;
      let zoom = 12;
      
      if (meetingPoint) {
        center = [meetingPoint.lat, meetingPoint.lng];
        zoom = 15;
      } else if (origin) {
        center = [origin.lat, origin.lng];
        zoom = 12;
      }

      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(center, zoom);

      // Add zoom control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapInstanceRef.current);

      // Beautiful CartoDB Voyager tiles (same as form)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);

      // Clear previous markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Custom marker icons
      const createIcon = (color, label) => L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, ${color} 0%, ${shadeColor(color, -20)} 100%);
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px ${color}66;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 12px;
              font-weight: bold;
            ">${label}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      // Helper to darken color
      function shadeColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
          (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
          (B < 255 ? B < 1 ? 0 : B : 255))
          .toString(16).slice(1);
      }

      // Add markers
      if (origin) {
        const marker = L.marker([origin.lat, origin.lng], {
          icon: createIcon('#10B981', 'Α') // Green for origin
        }).addTo(mapInstanceRef.current)
          .bindPopup('<b>Αφετηρία</b><br>' + origin.label);
        markersRef.current.push(marker);
      }

      if (destination) {
        const marker = L.marker([destination.lat, destination.lng], {
          icon: createIcon('#3B82F6', 'Π') // Blue for destination
        }).addTo(mapInstanceRef.current)
          .bindPopup('<b>Προορισμός</b><br>' + destination.label);
        markersRef.current.push(marker);
      }

      if (meetingPoint) {
        const marker = L.marker([meetingPoint.lat, meetingPoint.lng], {
          icon: createIcon('#F59E0B', 'Σ') // Amber for meeting point
        }).addTo(mapInstanceRef.current)
          .bindPopup('<b>Σημείο συνάντησης</b><br>' + meetingPoint.label);
        markersRef.current.push(marker);
      }

      // Draw route line if we have origin and destination
      if (origin && destination) {
        const latlngs = [[origin.lat, origin.lng], [destination.lat, destination.lng]];
        
        // Create a curved line effect with multiple points
        const midPoint = [
          (origin.lat + destination.lat) / 2,
          (origin.lng + destination.lng) / 2
        ];
        
        const polyline = L.polyline(latlngs, {
          color: '#3B82F6',
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 10',
          lineCap: 'round'
        }).addTo(mapInstanceRef.current);

        // Fit bounds to show all markers
        const group = new L.featureGroup([...markersRef.current, polyline]);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }

      setMounted(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isReady, origin, destination, meetingPoint]);

  return (
    <div 
      ref={mapRef}
      className="w-full rounded-xl overflow-hidden bg-gray-100"
      style={{ height }}
    >
      {!mounted && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-400 text-sm">Φόρτωση χάρτη...</p>
          </div>
        </div>
      )}
    </div>
  );
}
