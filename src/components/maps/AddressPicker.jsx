'use client';

import { useState, useRef, useCallback, useId, useEffect } from 'react';
import { Input } from '@/components/ui';

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

// Extensive Greek locations database
const GREEK_LOCATIONS = [
  // Thessaloniki areas
  { name: 'Καλαμαριά, Θεσσαλονίκη', lat: 40.582, lng: 22.953, region: 'Θεσσαλονίκη' },
  { name: 'Εύοσμος, Θεσσαλονίκη', lat: 40.67, lng: 22.907, region: 'Θεσσαλονίκη' },
  { name: 'Κέντρο Θεσσαλονίκης', lat: 40.640, lng: 22.944, region: 'Θεσσαλονίκη' },
  { name: 'Αεροδρόμιο Θεσσαλονίκης (Makedonia)', lat: 40.520, lng: 22.971, region: 'Θεσσαλονίκη' },
  { name: 'Σταυρούπολη, Θεσσαλονίκη', lat: 40.667, lng: 22.936, region: 'Θεσσαλονίκη' },
  { name: 'Θέρμη, Θεσσαλονίκη', lat: 40.547, lng: 23.019, region: 'Θεσσαλονίκη' },
  { name: 'Πανεπιστήμιο Μακεδονίας', lat: 40.618, lng: 22.959, region: 'Θεσσαλονίκη' },
  { name: 'ΑΠΘ - Πανεπιστήμιο Θεσσαλονίκης', lat: 40.631, lng: 22.959, region: 'Θεσσαλονίκη' },
  { name: 'Νεάπολη, Θεσσαλονίκη', lat: 40.658, lng: 22.933, region: 'Θεσσαλονίκη' },
  { name: 'Πυλαία, Θεσσαλονίκη', lat: 40.600, lng: 22.989, region: 'Θεσσαλονίκη' },
  { name: 'Τούμπα, Θεσσαλονίκη', lat: 40.614, lng: 22.970, region: 'Θεσσαλονίκη' },
  { name: 'Χαριλάου, Θεσσαλονίκη', lat: 40.600, lng: 22.975, region: 'Θεσσαλονίκη' },
  { name: 'Άνω Τούμπα, Θεσσαλονίκη', lat: 40.628, lng: 22.978, region: 'Θεσσαλονίκη' },
  { name: 'Συκιές, Θεσσαλονίκη', lat: 40.649, lng: 22.957, region: 'Θεσσαλονίκη' },
  { name: 'Ντεπώ, Θεσσαλονίκη', lat: 40.624, lng: 22.970, region: 'Θεσσαλονίκη' },
  { name: 'Λευκός Πύργος, Θεσσαλονίκη', lat: 40.626, lng: 22.948, region: 'Θεσσαλονίκη' },
  { name: 'Πλατεία Αριστοτέλους, Θεσσαλονίκη', lat: 40.632, lng: 22.940, region: 'Θεσσαλονίκη' },
  { name: 'Μπότσαρη, Θεσσαλονίκη', lat: 40.593, lng: 22.955, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Καλαμαριάς', lat: 40.574, lng: 22.953, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Παπάφη, Θεσσαλονίκη', lat: 40.603, lng: 22.960, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Νέα Ελβετία, Θεσσαλονίκη', lat: 40.589, lng: 22.959, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Φάληρο, Θεσσαλονίκη', lat: 40.614, lng: 22.953, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Ανάληψη, Θεσσαλονίκη', lat: 40.606, lng: 22.958, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό 25ης Μαρτίου, Θεσσαλονίκη', lat: 40.595, lng: 22.959, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Παναγία Φανερωμένη, Θεσσαλονίκη', lat: 40.582, lng: 22.956, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Αμερικανικό Κολέγιο, Θεσσαλονίκη', lat: 40.568, lng: 22.953, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Αγία Σοφία, Θεσσαλονίκη', lat: 40.632, lng: 22.946, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Σιντριβάνι, Θεσσαλονίκη', lat: 40.639, lng: 22.935, region: 'Θεσσαλονίκη' },
  { name: 'Μετρό Πανεπιστήμιο, Θεσσαλονίκη', lat: 40.631, lng: 22.959, region: 'Θεσσαλονίκη' },
  
  // Athens areas
  { name: 'Κέντρο Αθήνας', lat: 37.984, lng: 23.728, region: 'Αθήνα' },
  { name: 'Πειραιάς', lat: 37.943, lng: 23.647, region: 'Αθήνα' },
  { name: 'Μαρούσι, Αθήνα', lat: 38.056, lng: 23.808, region: 'Αθήνα' },
  { name: 'Κηφισιά, Αθήνα', lat: 38.074, lng: 23.808, region: 'Αθήνα' },
  { name: 'Γλυφάδα, Αθήνα', lat: 37.862, lng: 23.758, region: 'Αθήνα' },
  { name: 'Βούλα, Αθήνα', lat: 37.848, lng: 23.776, region: 'Αθήνα' },
  { name: 'Βουλιαγμένη, Αθήνα', lat: 37.817, lng: 23.789, region: 'Αθήνα' },
  { name: 'Νέα Σμύρνη, Αθήνα', lat: 37.938, lng: 23.712, region: 'Αθήνα' },
  { name: 'Παλαιό Φάληρο, Αθήνα', lat: 37.932, lng: 23.700, region: 'Αθήνα' },
  { name: 'Αλιμος, Αθήνα', lat: 37.918, lng: 23.737, region: 'Αθήνα' },
  { name: 'Ελληνικό, Αθήνα', lat: 37.895, lng: 23.756, region: 'Αθήνα' },
  { name: 'Αεροδρόμιο Αθηνών (Ελ. Βενιζέλος)', lat: 37.936, lng: 23.944, region: 'Αθήνα' },
  { name: 'Νέα Ιωνία, Αθήνα', lat: 38.036, lng: 23.757, region: 'Αθήνα' },
  { name: 'Ηράκλειο, Αθήνα', lat: 38.050, lng: 23.767, region: 'Αθήνα' },
  { name: 'Περιστέρι, Αθήνα', lat: 38.016, lng: 23.683, region: 'Αθήνα' },
  { name: 'Ιλιον, Αθήνα', lat: 38.033, lng: 23.700, region: 'Αθήνα' },
  { name: 'Αγία Παρασκευή, Αθήνα', lat: 38.012, lng: 23.828, region: 'Αθήνα' },
  { name: 'Χαλάνδρι, Αθήνα', lat: 38.023, lng: 23.801, region: 'Αθήνα' },
  { name: 'Ζωγράφου, Αθήνα', lat: 37.974, lng: 23.770, region: 'Αθήνα' },
  { name: 'Καισαριανή, Αθήνα', lat: 37.960, lng: 23.763, region: 'Αθήνα' },
  { name: 'Βύρωνας, Αθήνα', lat: 37.960, lng: 23.753, region: 'Αθήνα' },
  { name: 'Παγκράτι, Αθήνα', lat: 37.967, lng: 23.750, region: 'Αθήνα' },
  { name: 'Κολωνάκι, Αθήνα', lat: 37.978, lng: 23.743, region: 'Αθήνα' },
  { name: 'Εξάρχεια, Αθήνα', lat: 37.986, lng: 23.736, region: 'Αθήνα' },
  { name: 'Ψυρρή, Αθήνα', lat: 37.978, lng: 23.724, region: 'Αθήνα' },
  { name: 'Γκάζι, Αθήνα', lat: 37.979, lng: 23.715, region: 'Αθήνα' },
  { name: 'Θησείο, Αθήνα', lat: 37.977, lng: 23.720, region: 'Αθήνα' },
  { name: 'Πλάκα, Αθήνα', lat: 37.972, lng: 23.728, region: 'Αθήνα' },
  { name: 'Μοναστηράκι, Αθήνα', lat: 37.976, lng: 23.726, region: 'Αθήνα' },
  { name: 'Ομόνοια, Αθήνα', lat: 37.984, lng: 23.728, region: 'Αθήνα' },
  { name: 'Σύνταγμα, Αθήνα', lat: 37.975, lng: 23.736, region: 'Αθήνα' },
  
  // Major Greek cities
  { name: 'Πάτρα', lat: 38.246, lng: 21.735, region: 'Πάτρα' },
  { name: 'Ηράκλειο Κρήτης', lat: 35.339, lng: 25.144, region: 'Κρήτη' },
  { name: 'Χανιά, Κρήτη', lat: 35.512, lng: 24.019, region: 'Κρήτη' },
  { name: 'Ρέθυμνο, Κρήτη', lat: 35.366, lng: 24.474, region: 'Κρήτη' },
  { name: 'Άγιος Νικόλαος, Κρήτη', lat: 35.189, lng: 25.717, region: 'Κρήτη' },
  { name: 'Λάρισα', lat: 39.639, lng: 22.419, region: 'Λάρισα' },
  { name: 'Βόλος', lat: 39.361, lng: 22.942, region: 'Βόλος' },
  { name: 'Ιωάννινα', lat: 39.665, lng: 20.854, region: 'Ιωάννινα' },
  { name: 'Τρίκαλα', lat: 39.555, lng: 21.768, region: 'Τρίκαλα' },
  { name: 'Καβάλα', lat: 40.937, lng: 24.412, region: 'Καβάλα' },
  { name: 'Ξάνθη', lat: 41.135, lng: 24.888, region: 'Ξάνθη' },
  { name: 'Κομοτηνή', lat: 41.117, lng: 25.405, region: 'Κομοτηνή' },
  { name: 'Αλεξανδρούπολη', lat: 40.845, lng: 25.877, region: 'Αλεξανδρούπολη' },
  { name: 'Σέρρες', lat: 41.085, lng: 23.548, region: 'Σέρρες' },
  { name: 'Κιλκίς', lat: 40.993, lng: 22.874, region: 'Κιλκίς' },
  { name: 'Έδεσσα', lat: 40.803, lng: 22.044, region: 'Έδεσσα' },
  { name: 'Γιαννιτσά', lat: 40.792, lng: 22.407, region: 'Γιαννιτσά' },
  { name: 'Κατερίνη', lat: 40.270, lng: 22.506, region: 'Κατερίνη' },
  { name: 'Βέροια', lat: 40.524, lng: 22.202, region: 'Βέροια' },
  { name: 'Νάουσα', lat: 40.630, lng: 22.068, region: 'Νάουσα' },
  { name: 'Κοζάνη', lat: 40.301, lng: 21.788, region: 'Κοζάνη' },
  { name: 'Πτολεμαΐδα', lat: 40.513, lng: 21.679, region: 'Πτολεμαΐδα' },
  { name: 'Φλώρινα', lat: 40.782, lng: 21.410, region: 'Φλώρινα' },
  { name: 'Καστοριά', lat: 40.521, lng: 21.263, region: 'Καστοριά' },
  { name: 'Γρεβενά', lat: 40.085, lng: 21.427, region: 'Γρεβενά' },
  { name: 'Λαμία', lat: 38.900, lng: 22.434, region: 'Λαμία' },
  { name: 'Χαλκίδα', lat: 38.463, lng: 23.593, region: 'Χαλκίδα' },
  { name: 'Κόρινθος', lat: 37.906, lng: 22.879, region: 'Κόρινθος' },
  { name: 'Ναύπλιο', lat: 37.568, lng: 22.808, region: 'Ναύπλιο' },
  { name: 'Τρίπολη', lat: 37.509, lng: 22.379, region: 'Τρίπολη' },
  { name: 'Καλαμάτα', lat: 37.039, lng: 22.114, region: 'Καλαμάτα' },
  { name: 'Σπάρτη', lat: 37.073, lng: 22.430, region: 'Σπάρτη' },
  { name: 'Καλαβρύτα', lat: 38.032, lng: 22.112, region: 'Καλαβρύτα' },
  { name: 'Μεσολόγγι', lat: 38.369, lng: 21.431, region: 'Μεσολόγγι' },
  { name: 'Αγρίνιο', lat: 38.624, lng: 21.409, region: 'Αγρίνιο' },
  { name: 'Άρτα', lat: 39.158, lng: 20.986, region: 'Άρτα' },
  { name: 'Πρέβεζα', lat: 38.959, lng: 20.751, region: 'Πρέβεζα' },
  { name: 'Λευκάδα', lat: 38.830, lng: 20.704, region: 'Λευκάδα' },
  { name: 'Κέρκυρα', lat: 39.625, lng: 19.922, region: 'Κέρκυρα' },
  { name: 'Ζάκυνθος', lat: 37.787, lng: 20.900, region: 'Ζάκυνθος' },
  { name: 'Κεφαλονιά (Αργοστόλι)', lat: 38.176, lng: 20.489, region: 'Κεφαλονιά' },
  { name: 'Ρόδος', lat: 36.451, lng: 28.224, region: 'Ρόδος' },
  { name: 'Κως', lat: 36.893, lng: 27.289, region: 'Κως' },
  { name: 'Σάμος', lat: 37.754, lng: 26.978, region: 'Σάμος' },
  { name: 'Χίος', lat: 38.368, lng: 26.131, region: 'Χίος' },
  { name: 'Λέσβος (Μυτιλήνη)', lat: 39.107, lng: 26.555, region: 'Λέσβος' },
  { name: 'Λήμνος (Μύρινα)', lat: 39.874, lng: 25.058, region: 'Λήμνος' },
  { name: 'Σκιάθος', lat: 39.162, lng: 23.491, region: 'Σκιάθος' },
  { name: 'Σκόπελος', lat: 39.123, lng: 23.728, region: 'Σκόπελος' },
  { name: 'Αλόννησος', lat: 39.151, lng: 23.860, region: 'Αλόννησος' },
  { name: 'Σαντορίνη (Θήρα)', lat: 36.393, lng: 25.462, region: 'Σαντορίνη' },
  { name: 'Μύκονος', lat: 37.447, lng: 25.329, region: 'Μύκονος' },
  { name: 'Πάρος', lat: 37.085, lng: 25.148, region: 'Πάρος' },
  { name: 'Νάξος', lat: 37.103, lng: 25.377, region: 'Νάξος' },
  { name: 'Σύρος (Ερμούπολη)', lat: 37.445, lng: 24.943, region: 'Σύρος' },
  { name: 'Τήνος', lat: 37.537, lng: 25.163, region: 'Τήνος' },
  { name: 'Άνδρος', lat: 37.833, lng: 24.940, region: 'Άνδρος' },
  { name: 'Ιος', lat: 36.723, lng: 25.336, region: 'Ιος' },
  { name: 'Μήλος', lat: 36.746, lng: 24.423, region: 'Μήλος' },
  { name: 'Σίφνος', lat: 36.973, lng: 24.404, region: 'Σίφνος' },
  { name: 'Σέριφος', lat: 37.150, lng: 24.504, region: 'Σέριφος' },
  { name: 'Κύθνος', lat: 37.388, lng: 24.424, region: 'Κύθνος' },
  { name: 'Κέα (Τζια)', lat: 37.619, lng: 24.337, region: 'Κέα' },
  { name: 'Αίγινα', lat: 37.751, lng: 23.431, region: 'Αίγινα' },
  { name: 'Πόρος', lat: 37.500, lng: 23.458, region: 'Πόρος' },
  { name: 'Ύδρα', lat: 37.351, lng: 23.467, region: 'Ύδρα' },
  { name: 'Σπέτσες', lat: 37.261, lng: 23.140, region: 'Σπέτσες' },
  { name: 'Μονεμβασιά', lat: 36.687, lng: 23.056, region: 'Μονεμβασιά' },
  { name: 'Γύθειο', lat: 36.763, lng: 22.564, region: 'Γύθειο' },
  { name: 'Νεάπολη Λακωνίας', lat: 36.651, lng: 23.046, region: 'Νεάπολη' },
  { name: 'Καρπενήσι', lat: 38.917, lng: 21.789, region: 'Καρπενήσι' },
  { name: 'Λιβαδειά', lat: 38.436, lng: 22.874, region: 'Λιβαδειά' },
  { name: 'Θήβα', lat: 38.323, lng: 23.319, region: 'Θήβα' },
  { name: 'Άμφισσα', lat: 38.528, lng: 22.377, region: 'Άμφισσα' },
  { name: 'Δελφοί', lat: 38.482, lng: 22.501, region: 'Δελφοί' },
  { name: 'Αράχωβα', lat: 38.480, lng: 22.582, region: 'Αράχωβα' },
  { name: 'Λουτράκι', lat: 37.973, lng: 22.978, region: 'Λουτράκι' },
  { name: 'Μέγαρα', lat: 37.994, lng: 23.344, region: 'Μέγαρα' },
  { name: 'Ελευσίνα', lat: 38.041, lng: 23.542, region: 'Ελευσίνα' },
  { name: 'Ασπρόπυργος', lat: 38.061, lng: 23.590, region: 'Ασπρόπυργος' },
  { name: 'Μάνδρα, Αττική', lat: 38.061, lng: 23.500, region: 'Μάνδρα' },
  { name: 'Αχαρνές (Μενίδι)', lat: 38.083, lng: 23.733, region: 'Αχαρνές' },
  { name: 'Ανθούσα, Αττική', lat: 38.016, lng: 23.867, region: 'Ανθούσα' },
  { name: 'Παλλήνη, Αττική', lat: 38.006, lng: 23.883, region: 'Παλλήνη' },
  { name: 'Γέρακας, Αττική', lat: 38.017, lng: 23.850, region: 'Γέρακας' },
  { name: 'Σπάτα, Αττική', lat: 37.963, lng: 23.917, region: 'Σπάτα' },
  { name: 'Αρτέμιδα (Λούτσα)', lat: 37.967, lng: 24.000, region: 'Αρτέμιδα' },
  { name: 'Ραφήνα', lat: 38.021, lng: 24.006, region: 'Ραφήνα' },
  { name: 'Νέα Μάκρη', lat: 38.087, lng: 23.976, region: 'Νέα Μάκρη' },
  { name: 'Μαραθώνας', lat: 38.155, lng: 23.964, region: 'Μαραθώνας' },
  { name: 'Ωρωπός', lat: 38.303, lng: 23.788, region: 'Ωρωπός' },
  { name: 'Χαλκούτσι, Αττική', lat: 38.328, lng: 23.758, region: 'Χαλκούτσι' },
  { name: 'Καπανδρίτι, Αττική', lat: 38.217, lng: 23.883, region: 'Καπανδρίτι' },
  { name: 'Πολυδένδρι, Αττική', lat: 38.217, lng: 23.833, region: 'Πολυδένδρι' },
  { name: 'Αφίδνες, Αττική', lat: 38.200, lng: 23.833, region: 'Αφίδνες' },
  { name: 'Μαλακάσα, Αττική', lat: 38.217, lng: 23.800, region: 'Μαλακάσα' },
  { name: 'Οινόη, Αττική', lat: 38.317, lng: 23.617, region: 'Οινόη' },
  { name: 'Βίλια, Αττική', lat: 38.100, lng: 23.467, region: 'Βίλια' },
  { name: 'Μέγαρα, Αττική', lat: 37.994, lng: 23.344, region: 'Μέγαρα' },
  { name: 'Κινέτα, Αττική', lat: 38.000, lng: 23.217, region: 'Κινέτα' },
  { name: 'Ψάθα, Αττική', lat: 38.067, lng: 23.217, region: 'Ψάθα' },
  { name: 'Πόρτο Γερμενό, Αττική', lat: 38.117, lng: 23.233, region: 'Πόρτο Γερμενό' },
];

export function AddressPicker({ 
  label, 
  placeholder = "π.χ. Καλαμαριά, Θεσσαλονίκη",
  onLocationSelect,
  value = '',
  required = false
}) {
  const uniqueId = useId();
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function - prioritizes Greek locations
  const searchLocations = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const lowerQuery = searchQuery.toLowerCase();
    
    try {
      // 1. First, search our extensive Greek database
      const localMatches = GREEK_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.region.toLowerCase().includes(lowerQuery)
      ).slice(0, 10);

      // 2. Then fetch from Nominatim with Greece-focused parameters
      let apiResults = [];
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` + 
          `format=json&` +
          `q=${encodeURIComponent(searchQuery)}&` +
          `limit=5&` +
          `countrycodes=gr&` +  // Only Greece
          `accept-language=el&` +  // Greek language results
          `dedupe=1`,  // Remove duplicates
          { 
            headers: { 'Accept-Language': 'el,en' },
            signal: AbortSignal.timeout(3000)  // 3 second timeout
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          apiResults = data
            .filter(item => 
              // Filter out results that are already in our local database
              !localMatches.some(local => 
                item.display_name.toLowerCase().includes(local.name.toLowerCase())
              )
            )
            .slice(0, 5);
        }
      } catch (apiError) {
        console.log('API search failed, using local database only');
      }
      
      // Combine results - local first, then API
      const combined = [
        ...localMatches.map(loc => ({
          ...loc,
          display_name: loc.name,
          source: 'local'
        })),
        ...apiResults.map(item => ({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          display_name: item.display_name,
          name: item.name || item.display_name.split(',')[0],
          source: 'api'
        }))
      ].slice(0, 12);
      
      setSuggestions(combined);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local database only
      const fallbackMatches = GREEK_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(lowerQuery)
      ).slice(0, 10).map(loc => ({
        ...loc,
        display_name: loc.name,
        source: 'local'
      }));
      setSuggestions(fallbackMatches);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(searchLocations, 150), [searchLocations]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelected(null);
    setShowSuggestions(true);
    debouncedSearch(value);
  };

  const handleSelect = (suggestion) => {
    const location = {
      lat: suggestion.lat,
      lng: suggestion.lng,
      address: suggestion.display_name,
      label: suggestion.name || suggestion.display_name.split(',')[0]
    };
    
    setQuery(suggestion.display_name);
    setSelected(location);
    setShowSuggestions(false);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const handleClear = () => {
    setQuery('');
    setSelected(null);
    setSuggestions([]);
    onLocationSelect(null);
    inputRef.current?.focus();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          id={`address-${uniqueId}`}
          label={label}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.length >= 2) {
              setShowSuggestions(true);
              searchLocations(query);
            }
          }}
          onKeyDown={handleKeyDown}
          required={required}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute right-10 top-[38px] text-gray-400">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto animate-fade-in">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${uniqueId}-${index}`}
              type="button"
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-4 py-3 text-left transition-colors border-b border-gray-100 last:border-0 flex items-start gap-3 ${
                highlightedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {suggestion.source === 'local' ? (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900">
                  {suggestion.name || suggestion.display_name.split(',')[0]}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {suggestion.display_name}
                </div>
                {suggestion.region && (
                  <div className="text-xs text-blue-600 mt-0.5">
                    {suggestion.region}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.length >= 2 && suggestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-center">
          <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-500">Δεν βρέθηκαν αποτελέσματα</p>
          <p className="text-xs text-gray-400 mt-1">Δοκιμάστε άλλη περιοχή στην Ελλάδα</p>
        </div>
      )}

      {selected && (
        <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Επιλέχθηκε: {selected.label}
        </div>
      )}
    </div>
  );
}
