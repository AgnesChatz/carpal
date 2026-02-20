// Mock data for carpal.gr - Demo drivers and listings with car photos

export const mockDrivers = [
  {
    id: 'driver-1',
    name: 'Γιώργος Παπαδόπουλος',
    initials: 'ΓΠ',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviews: 24,
    trips: 156,
    joinedDate: '2025-06-15',
    verified: true,
    gender: 'MALE',
    responseTimeMinutes: 5,
    verifications: {
      phone: true,
      email: true,
      id: true,
      license: true
    },
    bio: 'Κάνω το ίδιο δρομολόγιο κάθε μέρα. Ασφαλής οδηγός με 10+ χρόνια εμπειρίας.',
    car: { 
      make: 'Toyota', 
      model: 'Corolla', 
      color: 'Ασημί', 
      seats: 5,
      year: 2021,
      photo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop'
      ]
    }
  },
  {
    id: 'driver-2',
    name: 'Μαρία Κωνσταντίνου',
    initials: 'ΜΚ',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    reviews: 18,
    trips: 89,
    joinedDate: '2025-08-20',
    verified: true,
    gender: 'FEMALE',
    responseTimeMinutes: 12,
    verifications: {
      phone: true,
      email: true,
      id: true,
      license: false
    },
    bio: 'Ευγενική και συνεπής. Προτιμώ πρωινές διαδρομές προς το κέντρο.',
    car: { 
      make: 'Hyundai', 
      model: 'i30', 
      color: 'Μπλε', 
      seats: 5,
      year: 2022,
      photo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1605816988064-b56b5b1b5b5b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop'
      ]
    }
  },
  {
    id: 'driver-3',
    name: 'Νίκος Αθανασιάδης',
    initials: 'ΝΑ',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    rating: 5.0,
    reviews: 31,
    trips: 203,
    joinedDate: '2025-05-10',
    verified: true,
    gender: 'MALE',
    responseTimeMinutes: 45,
    verifications: {
      phone: true,
      email: true,
      id: false,
      license: false
    },
    bio: 'Επαγγελματίας οδηγός. Ασφαλείς και άνετες διαδρομές εγγυημένες.',
    car: { 
      make: 'VW', 
      model: 'Golf', 
      color: 'Μαύρο', 
      seats: 5,
      year: 2020,
      photo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1605816988064-b56b5b1b5b5b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop'
      ]
    }
  },
  {
    id: 'driver-4',
    name: 'Ελένη Μαρκοπούλου',
    initials: 'ΕΜ',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    reviews: 12,
    trips: 45,
    joinedDate: '2025-10-05',
    verified: true,
    gender: 'FEMALE',
    responseTimeMinutes: 8,
    verifications: {
      phone: true,
      email: true,
      id: true,
      license: true
    },
    bio: 'Φοιτήτρια με ευέλικτο ωράριο. Διαθέσιμη για διαδρομές στη Θεσσαλονίκη.',
    car: { 
      make: 'Honda', 
      model: 'Civic', 
      color: 'Άσπρο', 
      seats: 5,
      year: 2023,
      photo: 'https://images.unsplash.com/photo-1605816988064-b56b5b1b5b5b?w=600&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1605816988064-b56b5b1b5b5b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop'
      ]
    }
  },
  {
    id: 'driver-5',
    name: 'Παύλος Σταματίου',
    initials: 'ΠΣ',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 4.6,
    reviews: 8,
    trips: 28,
    joinedDate: '2025-11-12',
    verified: true,
    gender: 'MALE',
    responseTimeMinutes: 120,
    verifications: {
      phone: true,
      email: false,
      id: false,
      license: false
    },
    bio: 'Πρόσφατα εντάχθηκα. Προσφέρω ανταγωνιστικές τιμές για να χτίσω reputation.',
    car: { 
      make: 'Skoda', 
      model: 'Octavia', 
      color: 'Γκρι', 
      seats: 5,
      year: 2019,
      photo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop'
      ]
    }
  }
];

export const mockListings = [
  // Route 1: Kalamaria → Evosmos (Morning commute)
  {
    id: 'listing-1',
    driverId: 'driver-1',
    type: 'RECURRING',
    origin: { label: 'Καλαμαριά', lat: 40.582, lng: 22.950, address: 'Καλαμαριά, Θεσσαλονίκη' },
    destination: { label: 'Εύοσμος', lat: 40.670, lng: 22.910, address: 'Εύοσμος, Θεσσαλονίκη' },
    meetingPoint: { label: 'Μετρό Καλαμαριάς', address: 'Μετρό Καλαμαριάς, Θεσσαλονίκη', lat: 40.582, lng: 22.950 },
    departureTime: '08:00',
    recurringDays: [1, 2, 3, 4, 5], // Mon-Fri
    seatsAvailable: 3,
    pricePerSeat: 2.50,
    exactAddressFee: 0,
    status: 'ACTIVE',
    createdAt: '2026-01-15',
    genderPreference: 'ANY',
    timeFlexibility: 15,
    pickupRadius: 500,
    instantBooking: true
  },
  // Route 2: Center → Airport (Ladies only option)
  {
    id: 'listing-2',
    driverId: 'driver-2',
    type: 'RECURRING',
    origin: { label: 'Κέντρο', lat: 40.640, lng: 22.944, address: 'Πλατεία Αριστοτέλους, Θεσσαλονίκη' },
    destination: { label: 'Αεροδρόμιο', lat: 40.520, lng: 22.970, address: 'Αεροδρόμιο Μακεδονία, Θεσσαλονίκη' },
    meetingPoint: { label: 'Πλατεία Αριστοτέλους', address: 'Πλατεία Αριστοτέλους, Θεσσαλονίκη', lat: 40.640, lng: 22.944 },
    departureTime: '06:30',
    recurringDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
    seatsAvailable: 2,
    pricePerSeat: 4.00,
    exactAddressFee: 2.00,
    status: 'ACTIVE',
    createdAt: '2026-01-20',
    genderPreference: 'LADIES_ONLY',
    timeFlexibility: 30,
    pickupRadius: 1000,
    instantBooking: false
  },
  // Route 3: Stavroupoli → Thermi (Flexible time)
  {
    id: 'listing-3',
    driverId: 'driver-3',
    type: 'RECURRING',
    origin: { label: 'Σταυρούπολη', lat: 40.750, lng: 22.900, address: 'Σταυρούπολη, Θεσσαλονίκη' },
    destination: { label: 'Θέρμη', lat: 40.620, lng: 22.950, address: 'Θέρμη, Θεσσαλονίκη' },
    meetingPoint: { label: 'Πλατεία Σταυρούπολης', address: 'Πλατεία Σταυρούπολης, Θεσσαλονίκη', lat: 40.750, lng: 22.900 },
    departureTime: '07:45',
    recurringDays: [1, 2, 3, 4, 5],
    seatsAvailable: 3,
    pricePerSeat: 3.00,
    exactAddressFee: 0,
    status: 'ACTIVE',
    createdAt: '2026-01-10',
    genderPreference: 'ANY',
    timeFlexibility: 60,
    pickupRadius: 2000,
    instantBooking: true
  },
  // Route 4: University → Serres (One-time weekend trip - Ladies only)
  {
    id: 'listing-4',
    driverId: 'driver-4',
    type: 'ONE_TIME',
    origin: { label: 'Πανεπιστήμιο', lat: 40.600, lng: 22.965, address: 'Πανεπιστήμιο Μακεδονίας, Θεσσαλονίκη' },
    destination: { label: 'Σέρρες', lat: 40.850, lng: 22.680, address: 'Σέρρες' },
    meetingPoint: { label: 'Εγνατία', address: 'Εγνατία, Θεσσαλονίκη', lat: 40.600, lng: 22.965 },
    departureDateTime: '2026-02-20T09:00:00',
    departureTime: '09:00',
    seatsAvailable: 4,
    pricePerSeat: 8.00,
    exactAddressFee: 0,
    status: 'ACTIVE',
    createdAt: '2026-02-10',
    genderPreference: 'LADIES_ONLY',
    timeFlexibility: 0,
    pickupRadius: 500,
    instantBooking: true
  },
  // Route 5: Eukarpia → Center
  {
    id: 'listing-5',
    driverId: 'driver-5',
    type: 'RECURRING',
    origin: { label: 'Εύκαρπία', lat: 40.680, lng: 22.820, address: 'Εύκαρπία, Θεσσαλονίκη' },
    destination: { label: 'Κέντρο', lat: 40.640, lng: 22.944, address: 'Κέντρο, Θεσσαλονίκη' },
    meetingPoint: { label: 'Κόμβος Ευκαρπίας', address: 'Κόμβος Ευκαρπίας, Θεσσαλονίκη', lat: 40.680, lng: 22.820 },
    departureTime: '07:30',
    recurringDays: [1, 2, 3, 4, 5],
    seatsAvailable: 2,
    pricePerSeat: 2.50,
    exactAddressFee: 0,
    status: 'ACTIVE',
    createdAt: '2026-01-25',
    genderPreference: 'ANY',
    timeFlexibility: 15,
    pickupRadius: 1000,
    instantBooking: false
  },
  // Route 6: Nea Krini → Airport (Flexible time)
  {
    id: 'listing-6',
    driverId: 'driver-1',
    type: 'ONE_TIME',
    origin: { label: 'Νέα Κρήνη', lat: 40.580, lng: 22.930, address: 'Νέα Κρήνη, Καλαμαριά' },
    destination: { label: 'Αεροδρόμιο', lat: 40.520, lng: 22.970, address: 'Αεροδρόμιο Μακεδονία, Θεσσαλονίκη' },
    meetingPoint: { label: 'Αφετηρία Λεωφορείου', address: 'Νέα Κρήνη, Καλαμαριά', lat: 40.580, lng: 22.930 },
    departureDateTime: '2026-02-18T14:00:00',
    departureTime: '14:00',
    seatsAvailable: 3,
    pricePerSeat: 3.50,
    exactAddressFee: 1.50,
    status: 'ACTIVE',
    createdAt: '2026-02-12',
    genderPreference: 'ANY',
    timeFlexibility: 30,
    pickupRadius: 1000,
    instantBooking: true
  }
];

export const mockBookings = [
  {
    id: 'booking-1',
    listingId: 'listing-1',
    driverId: 'driver-1',
    riderId: 'rider-1',
    dates: ['2026-02-17', '2026-02-18', '2026-02-19'],
    seatsBooked: 1,
    totalPrice: 7.50,
    status: 'CONFIRMED',
    pickupType: 'MEETING_POINT',
    createdAt: '2026-02-10',
    tripStatus: 'SCHEDULED',
    tripUpdates: [
      { status: 'SCHEDULED', timestamp: '2026-02-10T10:00:00', message: 'Η κράτηση επιβεβαιώθηκε' }
    ]
  },
  {
    id: 'booking-2',
    listingId: 'listing-2',
    driverId: 'driver-2',
    riderId: 'rider-1',
    dates: ['2026-02-20'],
    seatsBooked: 1,
    totalPrice: 4.00,
    status: 'CONFIRMED',
    pickupType: 'MEETING_POINT',
    createdAt: '2026-02-15',
    tripStatus: 'DRIVER_ARRIVING',
    tripUpdates: [
      { status: 'SCHEDULED', timestamp: '2026-02-15T14:30:00', message: 'Η κράτηση επιβεβαιώθηκε' },
      { status: 'DRIVER_ASSIGNED', timestamp: '2026-02-20T06:00:00', message: 'Ο οδηγός είναι στο δρόμο' },
      { status: 'DRIVER_ARRIVING', timestamp: '2026-02-20T06:15:00', message: 'Ο οδηγός φτάνει σε 5 λεπτά' }
    ]
  },
  {
    id: 'booking-3',
    listingId: 'listing-3',
    driverId: 'driver-3',
    riderId: 'rider-1',
    dates: ['2026-02-15'],
    seatsBooked: 2,
    totalPrice: 6.00,
    status: 'COMPLETED',
    pickupType: 'MEETING_POINT',
    createdAt: '2026-02-10',
    tripStatus: 'COMPLETED',
    tripUpdates: [
      { status: 'SCHEDULED', timestamp: '2026-02-10T09:00:00', message: 'Η κράτηση επιβεβαιώθηκε' },
      { status: 'DRIVER_ASSIGNED', timestamp: '2026-02-15T07:30:00', message: 'Ο οδηγός είναι στο δρόμο' },
      { status: 'DRIVER_ARRIVED', timestamp: '2026-02-15T07:42:00', message: 'Ο οδηγός έφτασε' },
      { status: 'PASSENGER_PICKED_UP', timestamp: '2026-02-15T07:45:00', message: 'Ο επιβάτης επιβιβάστηκε' },
      { status: 'ARRIVED', timestamp: '2026-02-15T08:15:00', message: 'Φτάσατε στον προορισμό' },
      { status: 'COMPLETED', timestamp: '2026-02-15T08:20:00', message: 'Η διαδρομή ολοκληρώθηκε' }
    ]
  }
];

export const mockMessages = [
  {
    id: 'msg-1',
    senderId: 'driver-1',
    receiverId: 'rider-1',
    text: 'Γεια σου! Θα είμαι στην ώρα μου στο σημείο συνάντησης.',
    createdAt: '2026-02-10T18:30:00'
  },
  {
    id: 'msg-2',
    senderId: 'rider-1',
    receiverId: 'driver-1',
    text: 'Τέλεια, σε ευχαριστώ! Θα είμαι εκεί.',
    createdAt: '2026-02-10T18:35:00'
  }
];

// Demo user account for testing
export const DEMO_USER = {
  id: 'user-demo-1',
  email: 'demo@carpal.gr',
  password: 'demo123',
  name: 'Δημήτρης Τέστ',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  phone: '+30 690 123 4567',
  createdAt: '2025-01-15'
};

// Store current logged in user (persists during session)
export let currentUser = null;

export const loginUser = (email, password) => {
  // Demo account login
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    currentUser = { ...DEMO_USER };
    delete currentUser.password; // Don't expose password
    return { success: true, user: currentUser };
  }
  // Accept any other credentials for demo purposes
  if (email && password) {
    currentUser = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      photo: null
    };
    return { success: true, user: currentUser };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const logoutUser = () => {
  currentUser = null;
  return { success: true };
};

export const getCurrentUser = () => currentUser;

// Helper to get driver by ID
export const getDriver = (id) => mockDrivers.find(d => d.id === id);

// Helper to get listing by ID
export const getListing = (id) => mockListings.find(l => l.id === id);

// Helper to get listings with driver info
export const getListingsWithDrivers = () => {
  return mockListings.map(listing => {
    const driver = getDriver(listing.driverId);
    return {
      ...listing,
      $id: listing.id,
      driverName: driver?.name,
      driverPhoto: driver?.photo,
      driverRating: driver?.rating,
      driverTripCount: driver?.trips,
      driverGender: driver?.gender,
      carPhoto: driver?.car?.photo,
      carMake: driver?.car?.make,
      carModel: driver?.car?.model,
      originPin: listing.origin,
      destinationPin: listing.destination,
      meetingPointPin: listing.meetingPoint,
      departureTimeLocal: listing.departureTime,
      oneTimeDepartureDateTime: listing.departureDateTime,
      recurring: listing.type === 'RECURRING' ? {
        daysOfWeek: listing.recurringDays,
        startDate: '2026-01-01'
      } : null
    };
  });
};

// Simulate search with filters
export const searchListings = (filters = {}) => {
  let results = getListingsWithDrivers();
  
  // Filter by origin proximity (simplified - just check if label matches)
  if (filters.originLabel) {
    const searchTerm = filters.originLabel.toLowerCase();
    results = results.filter(l => 
      l.origin.label.toLowerCase().includes(searchTerm) ||
      l.origin.address.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by destination proximity
  if (filters.destLabel) {
    const searchTerm = filters.destLabel.toLowerCase();
    results = results.filter(l => 
      l.destination.label.toLowerCase().includes(searchTerm) ||
      l.destination.address.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by seats
  if (filters.seats) {
    results = results.filter(l => l.seatsAvailable >= filters.seats);
  }
  
  // Filter by date (simplified)
  if (filters.date) {
    const searchDate = new Date(filters.date);
    const dayOfWeek = searchDate.getDay();
    results = results.filter(l => {
      if (l.type === 'ONE_TIME') {
        const listingDate = new Date(l.departureDateTime);
        return listingDate.toDateString() === searchDate.toDateString();
      }
      return l.recurringDays.includes(dayOfWeek);
    });
  }
  
  // Filter by gender preference
  if (filters.genderPreference && filters.genderPreference !== 'ANY') {
    results = results.filter(l => 
      l.genderPreference === filters.genderPreference || 
      l.genderPreference === 'ANY'
    );
  }
  
  // Filter by time flexibility
  if (filters.timeFlexibility !== undefined && filters.timeFlexibility !== null) {
    const requestedFlex = parseInt(filters.timeFlexibility);
    if (requestedFlex > 0) {
      // Show listings where driver offers at least the requested flexibility
      results = results.filter(l => l.timeFlexibility >= requestedFlex);
    }
  }
  
  // Filter by pickup radius (walking distance preference)
  if (filters.maxPickupRadius) {
    results = results.filter(l => l.pickupRadius <= parseInt(filters.maxPickupRadius));
  }
  
  // Filter by instant booking
  if (filters.instantBooking === true) {
    results = results.filter(l => l.instantBooking === true);
  }
  
  return results;
};

// Simulate delay for realistic feel
export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock booking creation
export const createBooking = async (bookingData) => {
  await mockDelay(800);
  
  // Support both old format (listing, driver, user, seats, dates, totalPrice)
  // and new format ({ listingId, driverId, riderId, dates, seats, totalAmount, ... })
  let newBooking;
  
  if (arguments.length > 1) {
    // Old format
    const [listing, driver, user, seats, dates, totalPrice] = arguments;
    newBooking = {
      id: 'booking-' + Date.now(),
      listingId: listing.id,
      driverId: driver.id,
      riderId: user.id,
      dates: dates,
      seatsBooked: seats,
      totalPrice: totalPrice,
      status: 'CONFIRMED',
      pickupType: 'MEETING_POINT',
      driverName: driver.name,
      driverPhoto: driver.photo,
      origin: listing.origin,
      destination: listing.destination,
      departureTime: listing.departureTime || listing.departureDateTime,
      createdAt: new Date().toISOString()
    };
  } else {
    // New format
    newBooking = {
      id: 'booking-' + Date.now(),
      ...bookingData,
      totalPrice: bookingData.totalAmount || bookingData.totalPrice,
      seatsBooked: bookingData.seats,
      createdAt: new Date().toISOString()
    };
  }
  
  mockBookings.push(newBooking);
  return newBooking;
};

// Get user's bookings
export const getUserBookings = (userId) => {
  return mockBookings.filter(b => b.riderId === userId);
};
