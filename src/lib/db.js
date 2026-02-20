// Database abstraction layer - supports both Mock data and Appwrite
// When USE_MOCK_DATA = true, uses local mock data
// When USE_MOCK_DATA = false, uses Appwrite

import { databases, DATABASE_ID, COLLECTIONS } from './appwrite';
import { 
  mockDrivers, 
  mockListings, 
  mockBookings, 
  getListing, 
  getDriver, 
  createBooking as mockCreateBooking,
  searchListings as mockSearchListings,
  getListingsWithDrivers as mockGetListingsWithDrivers,
  getUserBookings as mockGetUserBookings,
  mockDelay 
} from './mockData';

// Toggle this to switch between mock and real database
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false;

// ==================== USERS ====================

export async function getUserPublic(userId) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    return getDriver(userId) || null;
  }
  
  try {
    return await databases.getDocument(DATABASE_ID, COLLECTIONS.USERS_PUBLIC, userId);
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function updateUserPublic(userId, data) {
  if (USE_MOCK_DATA) {
    await mockDelay(500);
    // Update mock data
    const driverIndex = mockDrivers.findIndex(d => d.id === userId);
    if (driverIndex !== -1) {
      mockDrivers[driverIndex] = { ...mockDrivers[driverIndex], ...data };
    }
    return mockDrivers[driverIndex];
  }
  
  return await databases.updateDocument(DATABASE_ID, COLLECTIONS.USERS_PUBLIC, userId, data);
}

// ==================== LISTINGS ====================

export async function getListings(filters = {}) {
  if (USE_MOCK_DATA) {
    await mockDelay(600);
    if (Object.keys(filters).length > 0) {
      return mockSearchListings(filters);
    }
    return mockGetListingsWithDrivers();
  }
  
  // Appwrite implementation
  const queries = [];
  if (filters.originLabel) {
    queries.push(`search('origin.label', '${filters.originLabel}')`);
  }
  if (filters.status) {
    queries.push(`equal('status', '${filters.status}')`);
  }
  
  const result = await databases.listDocuments(DATABASE_ID, COLLECTIONS.LISTINGS, queries);
  return result.documents;
}

export async function getListingById(listingId) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    return getListing(listingId);
  }
  
  return await databases.getDocument(DATABASE_ID, COLLECTIONS.LISTINGS, listingId);
}

export async function createListing(data) {
  if (USE_MOCK_DATA) {
    await mockDelay(800);
    const newListing = {
      id: `listing-${Date.now()}`,
      ...data,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    mockListings.push(newListing);
    return newListing;
  }
  
  const { ID } = await import('appwrite');
  return await databases.createDocument(DATABASE_ID, COLLECTIONS.LISTINGS, ID.unique(), data);
}

export async function updateListing(listingId, data) {
  if (USE_MOCK_DATA) {
    await mockDelay(500);
    const index = mockListings.findIndex(l => l.id === listingId);
    if (index !== -1) {
      mockListings[index] = { ...mockListings[index], ...data };
      return mockListings[index];
    }
    return null;
  }
  
  return await databases.updateDocument(DATABASE_ID, COLLECTIONS.LISTINGS, listingId, data);
}

// ==================== BOOKINGS ====================

export async function getBookings(userId, role = 'rider') {
  if (USE_MOCK_DATA) {
    await mockDelay(500);
    if (role === 'driver') {
      return mockBookings.filter(b => b.driverId === userId);
    }
    return mockGetUserBookings(userId);
  }
  
  const field = role === 'driver' ? 'driverId' : 'riderId';
  const result = await databases.listDocuments(
    DATABASE_ID, 
    COLLECTIONS.BOOKINGS, 
    [`equal('${field}', '${userId}')`]
  );
  return result.documents;
}

export async function getBookingById(bookingId) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) {
      return {
        ...booking,
        listing: getListing(booking.listingId),
        driver: getDriver(booking.driverId)
      };
    }
    return null;
  }
  
  return await databases.getDocument(DATABASE_ID, COLLECTIONS.BOOKINGS, bookingId);
}

export async function createBooking(data) {
  if (USE_MOCK_DATA) {
    await mockDelay(800);
    return mockCreateBooking(data);
  }
  
  const { ID } = await import('appwrite');
  return await databases.createDocument(DATABASE_ID, COLLECTIONS.BOOKINGS, ID.unique(), {
    ...data,
    status: 'PENDING_PAYMENT',
    createdAt: new Date().toISOString()
  });
}

export async function updateBooking(bookingId, data) {
  if (USE_MOCK_DATA) {
    await mockDelay(500);
    const index = mockBookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      mockBookings[index] = { ...mockBookings[index], ...data, updatedAt: new Date().toISOString() };
      return mockBookings[index];
    }
    return null;
  }
  
  return await databases.updateDocument(DATABASE_ID, COLLECTIONS.BOOKINGS, bookingId, {
    ...data,
    updatedAt: new Date().toISOString()
  });
}

export async function cancelBooking(bookingId, reason = '') {
  return updateBooking(bookingId, { 
    status: 'CANCELLED', 
    cancelledAt: new Date().toISOString(),
    cancelReason: reason 
  });
}

// ==================== MESSAGES ====================

export async function getMessages(userId, otherUserId, bookingId = null) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    // Return mock messages
    return [
      {
        id: 'msg-1',
        senderId: otherUserId,
        receiverId: userId,
        text: 'Γεια σου! Θα είμαι στην ώρα μου.',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      {
        id: 'msg-2',
        senderId: userId,
        receiverId: otherUserId,
        text: 'Τέλεια, ευχαριστώ!',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        read: true
      }
    ];
  }
  
  // Appwrite: Get messages between two users
  const queries = [
    `or([equal('senderId', '${userId}'), equal('receiverId', '${userId}')])`,
    `or([equal('senderId', '${otherUserId}'), equal('receiverId', '${otherUserId}')])`
  ];
  
  if (bookingId) {
    queries.push(`equal('bookingId', '${bookingId}')`);
  }
  
  const result = await databases.listDocuments(DATABASE_ID, COLLECTIONS.MESSAGES, queries);
  return result.documents;
}

export async function sendMessage(data) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    return {
      id: `msg-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      read: false
    };
  }
  
  const { ID } = await import('appwrite');
  return await databases.createDocument(DATABASE_ID, COLLECTIONS.MESSAGES, ID.unique(), {
    ...data,
    read: false,
    createdAt: new Date().toISOString()
  });
}

// ==================== RATINGS ====================

export async function createRating(data) {
  if (USE_MOCK_DATA) {
    await mockDelay(500);
    return {
      id: `rating-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
  }
  
  const { ID } = await import('appwrite');
  return await databases.createDocument(DATABASE_ID, COLLECTIONS.RATINGS, ID.unique(), data);
}

export async function getUserRatings(userId) {
  if (USE_MOCK_DATA) {
    await mockDelay(300);
    return [];
  }
  
  const result = await databases.listDocuments(
    DATABASE_ID, 
    COLLECTIONS.RATINGS, 
    [`equal('rateeId', '${userId}')`]
  );
  return result.documents;
}

// ==================== STATS ====================

export async function getDriverStats(driverId) {
  if (USE_MOCK_DATA) {
    await mockDelay(400);
    const driverBookings = mockBookings.filter(b => b.driverId === driverId);
    return {
      totalBookings: driverBookings.length,
      upcoming: driverBookings.filter(b => ['CONFIRMED', 'PAID'].includes(b.status)).length,
      completed: driverBookings.filter(b => b.status === 'COMPLETED').length,
      totalEarnings: driverBookings
        .filter(b => ['CONFIRMED', 'PAID', 'COMPLETED'].includes(b.status))
        .reduce((sum, b) => sum + (b.totalPrice * 0.9), 0)
    };
  }
  
  // Appwrite: Use aggregation or calculate from bookings
  const bookings = await getBookings(driverId, 'driver');
  return {
    totalBookings: bookings.length,
    upcoming: bookings.filter(b => ['CONFIRMED', 'PAID'].includes(b.status)).length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
    totalEarnings: bookings
      .filter(b => ['CONFIRMED', 'PAID', 'COMPLETED'].includes(b.status))
      .reduce((sum, b) => sum + (b.driverEarnings || 0), 0)
  };
}
