'use client';

import { useEffect, useRef } from 'react';

export function RouteMiniMap({ origin, destination, height = '120px' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    // Use Leaflet for the mini map
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Add origin marker (green)
      const originIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="width:12px;height:12px;background:#22c55e;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2)"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      // Add destination marker (blue)
      const destIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="width:12px;height:12px;background:#3b82f6;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2)"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const originLat = origin.lat || 40.64;
      const originLng = origin.lng || 22.94;
      const destLat = destination.lat || 40.65;
      const destLng = destination.lng || 22.95;

      L.marker([originLat, originLng], { icon: originIcon }).addTo(map);
      L.marker([destLat, destLng], { icon: destIcon }).addTo(map);

      // Fit bounds to show both markers
      const bounds = L.latLngBounds(
        [originLat, originLng],
        [destLat, destLng]
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }}
      className="rounded-xl overflow-hidden bg-gray-100"
    />
  );
}

export default RouteMiniMap;
