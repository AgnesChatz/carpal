'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Input, Card } from '@/components/ui';

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

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

// Shorten address to max words
function shortenAddress(address, maxWords = 10) {
  const words = address.split(/[\s,]+/).filter(w => w.length > 0);
  if (words.length <= maxWords) return address;
  return words.slice(0, maxWords).join(' ') + '...';
}

export function MapAddressPicker({ 
  label, 
  placeholder = "π.χ. Ολυμπιάδος 59, Εύοσμος",
  onLocationSelect,
  required = false,
  value = ''
}) {
  const [query, setQuery] = useState(value);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Update query when value prop changes (for editing)
  useEffect(() => {
    if (value && value !== query) {
      setQuery(value);
    }
  }, [value]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // House number editing state
  const [houseNumberInput, setHouseNumberInput] = useState('');
  const [showNumberEditor, setShowNumberEditor] = useState(false);
  const [tempStreet, setTempStreet] = useState('');
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const containerRef = useRef(null);
  const numberInputRef = useRef(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search address
  const searchAddress = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `format=json&` +
        `q=${encodeURIComponent(searchQuery + ', Greece')}&` +
        `limit=8&` +
        `countrycodes=gr&` +
        `accept-language=el&` +
        `addressdetails=1`,
        { headers: { 'Accept-Language': 'el,en' } }
      );
      
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(searchAddress, 400), [searchAddress]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedLocation(null);
    setShowNumberEditor(false);
    debouncedSearch(value);
  };

  // Initialize map with beautiful tiles
  const initMap = async (lat, lng) => {
    await loadLeaflet();
    const L = window.L;
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const centerLat = lat || 40.64;
    const centerLng = lng || 22.94;
    const zoom = lat ? 18 : 12;

    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([centerLat, centerLng], zoom);

    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapInstanceRef.current);

    // Beautiful CartoDB Voyager tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapInstanceRef.current);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="transform: rotate(45deg);">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    if (lat && lng) {
      markerRef.current = L.marker([lat, lng], { 
        draggable: true,
        icon: customIcon
      }).addTo(mapInstanceRef.current);
      
      markerRef.current.on('dragend', async () => {
        const pos = markerRef.current.getLatLng();
        await reverseGeocode(pos.lat, pos.lng);
      });
    }

    // Click on map to place marker
    mapInstanceRef.current.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { 
          draggable: true,
          icon: customIcon
        }).addTo(mapInstanceRef.current);
      }

      await reverseGeocode(lat, lng);
    });
  };

  // Update marker position on map
  const updateMapMarker = (lat, lng) => {
    const L = window.L;
    if (!mapInstanceRef.current) return;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="transform: rotate(45deg);">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    mapInstanceRef.current.setView([lat, lng], 18);

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { 
        draggable: true,
        icon: customIcon
      }).addTo(mapInstanceRef.current);
      
      markerRef.current.on('dragend', async () => {
        const pos = markerRef.current.getLatLng();
        await reverseGeocode(pos.lat, pos.lng);
      });
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
        `format=json&` +
        `lat=${lat}&` +
        `lon=${lng}&` +
        `accept-language=el&` +
        `addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        const currentNum = houseNumberInput || selectedLocation?.houseNumber || '';
        const addr = data.address || {};
        const street = addr.road || addr.street || addr.pedestrian || '';
        
        let fullAddress = data.display_name;
        if (currentNum && street && !fullAddress.includes(currentNum)) {
          fullAddress = fullAddress.replace(street, `${street} ${currentNum}`);
        }
        
        setQuery(fullAddress);
        setTempStreet(street);
        setSelectedLocation({
          lat,
          lng,
          address: fullAddress,
          label: fullAddress.split(',')[0],
          houseNumber: currentNum,
          street: street
        });
      }
    } catch (e) {
      console.error('Reverse geocode error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectResult = (result) => {
    const addr = result.address || {};
    const street = addr.road || addr.street || addr.pedestrian || result.display_name.split(',')[0];
    const houseNum = addr.house_number || '';
    
    const location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name,
      label: result.display_name.split(',')[0],
      houseNumber: houseNum,
      street: street,
      suburb: addr.suburb || addr.city_district || '',
      city: addr.city || addr.town || addr.village || ''
    };
    
    setQuery(result.display_name);
    setSelectedLocation(location);
    setHouseNumberInput(houseNum);
    setShowResults(false);
    
    if (!houseNum) {
      setShowNumberEditor(true);
      setTempStreet(street);
      setTimeout(() => numberInputRef.current?.focus(), 100);
    }
  };

  const handleApplyHouseNumber = () => {
    if (!selectedLocation) return;
    
    const street = tempStreet || selectedLocation.street || query.split(/\s+\d/)[0];
    const newLabel = houseNumberInput ? `${street} ${houseNumberInput}` : street;
    
    const addressParts = selectedLocation.address.split(',');
    addressParts[0] = newLabel;
    const newFullAddress = addressParts.join(',');
    
    setQuery(newFullAddress);
    setSelectedLocation({
      ...selectedLocation,
      address: newFullAddress,
      label: newLabel,
      houseNumber: houseNumberInput
    });
    
    setShowNumberEditor(false);
  };

  const handleOpenMap = async () => {
    setShowMap(true);
    setTempStreet(selectedLocation?.street || query.split(/\s+\d/)[0] || '');
    setHouseNumberInput(selectedLocation?.houseNumber || '');
    
    setTimeout(() => {
      initMap(selectedLocation?.lat, selectedLocation?.lng);
    }, 100);
  };

  // Apply address in map modal - searches and moves pin
  const handleApplyInMap = async () => {
    const searchQuery = houseNumberInput ? `${tempStreet} ${houseNumberInput}` : tempStreet;
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `format=json&` +
        `q=${encodeURIComponent(searchQuery + ', Greece')}&` +
        `limit=1&` +
        `countrycodes=gr&` +
        `accept-language=el&` +
        `addressdetails=1`
      );
      
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const addr = result.address || {};
        const street = addr.road || addr.street || addr.pedestrian || result.display_name.split(',')[0];
        const houseNum = houseNumberInput || addr.house_number || '';
        
        // Build full address with number
        let fullAddress = result.display_name;
        if (houseNum && street && !fullAddress.includes(houseNum)) {
          fullAddress = fullAddress.replace(street, `${street} ${houseNum}`);
        }
        
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Update state
        setQuery(fullAddress);
        setSelectedLocation({
          lat,
          lng,
          address: fullAddress,
          label: fullAddress.split(',')[0],
          houseNumber: houseNum,
          street: street
        });
        
        // Move map marker
        updateMapMarker(lat, lng);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmMap = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setShowMap(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSelectedLocation(null);
    setHouseNumberInput('');
    setShowNumberEditor(false);
    setTempStreet('');
    onLocationSelect(null);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Main Input Field */}
      <div className="relative">
        <Input
          label={label}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 3 && setShowResults(true)}
          required={required}
          autoComplete="off"
        />
        
        {/* Action buttons */}
        <div className="absolute right-2 top-[38px] flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleOpenMap}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Επιλογή στο χάρτη"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-20 top-[38px] text-gray-400">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-40 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectResult(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="font-medium text-sm text-gray-900">
                {result.display_name.split(',')[0]}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 truncate">
                {result.display_name}
              </div>
              {result.address?.house_number && (
                <div className="text-xs text-blue-600 mt-0.5">
                  Αριθμός: {result.address.house_number}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* House Number Editor */}
      {showNumberEditor && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <label className="text-sm font-medium text-amber-800">
            Προσθέστε αριθμό διεύθυνσης:
          </label>
          <div className="flex gap-2 mt-2">
            <input
              ref={numberInputRef}
              type="text"
              value={houseNumberInput}
              onChange={(e) => setHouseNumberInput(e.target.value)}
              placeholder="π.χ. 59 ή 59Α"
              className="flex-1 px-3 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyHouseNumber();
                }
              }}
            />
            <button
              type="button"
              onClick={handleApplyHouseNumber}
              disabled={!houseNumberInput.trim()}
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Εφαρμογή
            </button>
          </div>
        </div>
      )}

      {/* Selected indicator */}
      {selectedLocation && !showNumberEditor && (
        <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Επιβεβαιωμένη: {selectedLocation.label}</span>
          {selectedLocation.houseNumber && (
            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1">
              Αριθμός: {selectedLocation.houseNumber}
            </span>
          )}
        </div>
      )}

      {/* Beautiful Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Επιλέξτε διεύθυνση</h3>
                  <p className="text-sm text-gray-300">Κάντε κλικ στο χάρτη για ακριβή τοποθεσία</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Address Edit Bar */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Οδός</label>
                  <input
                    type="text"
                    value={tempStreet}
                    onChange={(e) => setTempStreet(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Όνομα οδού"
                  />
                </div>
                <div className="w-28">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Αριθμός</label>
                  <input
                    type="text"
                    value={houseNumberInput}
                    onChange={(e) => setHouseNumberInput(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="59"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleApplyInMap}
                    disabled={!tempStreet.trim() || isLoading}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Αναζήτηση
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative">
              <div 
                ref={mapRef} 
                className="w-full h-[400px]"
              />
              
              {/* Map overlay hint */}
              {!selectedLocation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm text-gray-600">
                    Κάντε κλικ στο χάρτη για να επιλέξετε τοποθεσία
                  </div>
                </div>
              )}
            </div>

            {/* Selected Address Card - Shortened */}
            {selectedLocation && (
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-lg">{selectedLocation.label}</p>
                    <p className="text-sm text-gray-600 mt-0.5 truncate">
                      {shortenAddress(selectedLocation.address, 10)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                type="button"
                onClick={handleConfirmMap}
                disabled={!selectedLocation}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
              >
                Επιβεβαίωση διεύθυνσης
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
