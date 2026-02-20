import { create } from 'zustand';
import { mockDrivers, mockDelay } from '@/lib/mockData';
import { account } from '@/lib/appwrite';
import { OAuthProvider } from 'appwrite';

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

// Check if we're in mock data mode
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const useAuthStore = create((set, get) => ({
  user: null,
  userPublic: null,
  userPrivate: null,
  isLoading: true,
  isAuthenticated: false,

  init: async () => {
    if (USE_MOCK_DATA) {
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
      return;
    }

    // Real Appwrite session check
    try {
      const session = await account.get();
      set({
        user: session,
        isAuthenticated: true,
        isLoading: false
      });
      // Fetch user public/private data here
    } catch (error) {
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
    if (USE_MOCK_DATA) {
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
    }

    // Real Appwrite login
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      set({
        user: session,
        isAuthenticated: true
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  loginWithGoogle: () => {
    if (USE_MOCK_DATA) {
      localStorage.setItem('carpal_mock_session', 'true');
      set({
        user: { ...MOCK_USER, name: 'Google User', email: 'user@gmail.com' },
        userPublic: { ...MOCK_USER_PUBLIC, displayName: 'Google User' },
        userPrivate: MOCK_USER_PRIVATE,
        isAuthenticated: true
      });
      // Redirect manually in mock mode
      if (typeof window !== 'undefined') {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
        window.location.href = `${baseUrl}/main/search`;
      }
      return;
    }

    // Real Google OAuth via Appwrite - this redirects the browser
    // Using try-catch to handle any errors
    try {
      // Use carpal.gr domain for production, fallback to current origin for development
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      account.createOAuth2Session(
        OAuthProvider.Google,
        `${baseUrl}/main/search`, // Success URL
        `${baseUrl}/auth/login`,  // Failure URL
      );
    } catch (error) {
      console.error('Google OAuth error:', error);
    }
  },

  register: async (email, password, name, phone) => {
    if (USE_MOCK_DATA) {
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
    }

    // Real Appwrite registration
    try {
      await account.create('unique()', email, password, name);
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      set({
        user: session,
        isAuthenticated: true
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay(300);
      localStorage.removeItem('carpal_mock_session');
      set({
        user: null,
        userPublic: null,
        userPrivate: null,
        isAuthenticated: false
      });
      return { success: true };
    }

    // Real Appwrite logout
    try {
      await account.deleteSession('current');
      set({
        user: null,
        userPublic: null,
        userPrivate: null,
        isAuthenticated: false
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
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
