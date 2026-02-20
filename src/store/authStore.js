import { create } from 'zustand';
import { mockDrivers, mockDelay } from '@/lib/mockData';

const MOCK_USER = {
  $id: 'user-123',
  name: 'Δημήτρης Τest',
  email: 'test@example.com',
  phone: '+306912345678'
};

const MOCK_USER_PUBLIC = {
  userId: 'user-123',
  displayName: 'Δημήτρης Τest',
  roleFlags: { isDriver: false },
  ratingAvgDriver: 0,
  ratingCountDriver: 0,
  ratingAvgRider: 5.0,
  ratingCountRider: 8,
  homeCity: 'Θεσσαλονίκη'
};

const MOCK_USER_PRIVATE = {
  userId: 'user-123',
  phone: '+306912345678',
  phoneVerified: true,
  idVerified: true,
  driverLicenseVerified: true,
  payoutEnabled: true,
  banned: false
};

const useAuthStore = create((set, get) => ({
  user: null,
  userPublic: null,
  userPrivate: null,
  isLoading: true,
  isAuthenticated: false,

  init: async () => {
    // Check localStorage for mock session
    const savedSession = typeof window !== 'undefined' ? localStorage.getItem('carpal_mock_session') : null;
    
    if (savedSession) {
      set({
        user: MOCK_USER,
        userPublic: MOCK_USER_PUBLIC,
        userPrivate: MOCK_USER_PRIVATE,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      set({
        user: null,
        userPublic: null,
        userPrivate: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  },

  fetchUserPublic: async (userId) => {
    return MOCK_USER_PUBLIC;
  },

  fetchUserPrivate: async (userId) => {
    return MOCK_USER_PRIVATE;
  },

  login: async (email, password) => {
    await mockDelay(800);
    
    // Accept any email/password for demo
    if (email && password) {
      localStorage.setItem('carpal_mock_session', 'true');
      set({
        user: MOCK_USER,
        userPublic: MOCK_USER_PUBLIC,
        userPrivate: MOCK_USER_PRIVATE,
        isAuthenticated: true
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  register: async (email, password, name, phone) => {
    await mockDelay(1000);
    
    if (email && password && name && phone) {
      localStorage.setItem('carpal_mock_session', 'true');
      const newUser = {
        ...MOCK_USER,
        name,
        email
      };
      set({
        user: newUser,
        userPublic: { ...MOCK_USER_PUBLIC, displayName: name },
        userPrivate: { ...MOCK_USER_PRIVATE, phone },
        isAuthenticated: true
      });
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields' };
  },

  logout: async () => {
    await mockDelay(300);
    localStorage.removeItem('carpal_mock_session');
    set({
      user: null,
      userPublic: null,
      userPrivate: null,
      isAuthenticated: false
    });
    return { success: true };
  },

  updateProfile: async (data) => {
    await mockDelay(500);
    const { userPublic } = get();
    if (userPublic) {
      const updated = { ...userPublic, ...data };
      set({ userPublic: updated });
      return { success: true };
    }
    return { success: false, error: 'Not authenticated' };
  },

  becomeDriver: async () => {
    await mockDelay(500);
    const { userPublic } = get();
    if (userPublic) {
      const updated = { ...userPublic, roleFlags: { ...userPublic.roleFlags, isDriver: true } };
      set({ userPublic: updated });
      return { success: true };
    }
    return { success: false, error: 'Not authenticated' };
  }
}));

export default useAuthStore;
