import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  
  useEffect(() => {
    store.init();
  }, []);
  
  return store;
};

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isDriver: user?.userPublic?.roleFlags?.isDriver || false
  };
};
