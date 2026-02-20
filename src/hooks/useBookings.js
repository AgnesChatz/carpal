import { useState, useEffect, useCallback } from 'react';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'appwrite';
import useAuthStore from '@/store/authStore';

export const useBookings = (status = null) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const queries = [
        Query.equal('riderId', user.$id),
        Query.orderDesc('$createdAt')
      ];
      
      if (status) {
        queries.push(Query.equal('status', status));
      }
      
      const result = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.BOOKINGS,
        queries
      );
      
      setBookings(result.documents);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const cancelBooking = async (bookingId) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.BOOKINGS,
        bookingId,
        { status: 'CANCELLED' }
      );
      await fetchBookings();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { bookings, isLoading, error, refetch: fetchBookings, cancelBooking };
};

export const useDriverBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const result = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.BOOKINGS,
          [
            Query.equal('driverId', user.$id),
            Query.orderDesc('$createdAt')
          ]
        );
        setBookings(result.documents);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  return { bookings, isLoading };
};
