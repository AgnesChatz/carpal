import { useState, useEffect, useCallback } from 'react';
import { getListings, getListingById } from '@/lib/db';

export const useListings = (filters = {}) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await getListings(filters);
      setListings(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, isLoading, error, refetch: fetchListings };
};

export const useListing = (listingId) => {
  const [listing, setListing] = useState(null);
  const [occurrences, setOccurrences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!listingId) return;
    
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const result = await getListingById(listingId);
        
        if (result) {
          // Transform to match expected format
          const transformed = {
            ...result,
            $id: result.id || result.$id,
            driverName: result.driver?.name || result.driverName,
            driverRating: result.driver?.rating || result.driverRating,
            driverTripCount: result.driver?.trips || result.driverTripCount,
            originPin: result.origin || result.originPin,
            destinationPin: result.destination || result.destinationPin,
            meetingPointPin: result.meetingPoint || result.meetingPointPin,
            departureTimeLocal: result.departureTime || result.departureTimeLocal,
            oneTimeDepartureDateTime: result.departureDateTime || result.oneTimeDepartureDateTime,
            recurring: result.type === 'RECURRING' ? {
              daysOfWeek: result.recurringDays,
              startDate: '2026-01-01'
            } : null
          };
          
          setListing(transformed);
          
          // Generate occurrences for recurring listings
          if (result.type === 'RECURRING') {
            const occs = [];
            for (let i = 0; i < 14; i++) {
              const date = new Date();
              date.setDate(date.getDate() + i);
              if (result.recurringDays?.includes(date.getDay())) {
                occs.push({
                  date: date.toISOString().split('T')[0],
                  seatsRemaining: result.seatsAvailable,
                  status: 'ACTIVE'
                });
              }
            }
            setOccurrences(occs);
          } else {
            setOccurrences([{
              date: result.departureDateTime?.split('T')[0],
              departureDateTime: result.departureDateTime,
              seatsRemaining: result.seatsAvailable,
              status: 'ACTIVE'
            }]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListing();
  }, [listingId]);

  return { listing, occurrences, isLoading, error };
};
