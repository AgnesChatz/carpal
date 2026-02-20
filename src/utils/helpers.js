import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { el } from 'date-fns/locale';
import { DAYS_OF_WEEK, DEFAULT_TIMEZONE } from './constants';

export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr, { locale: el });
};

export const formatTime = (time) => {
  if (!time) return '';
  return time.substring(0, 5);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy HH:mm', { locale: el });
};

export const getDayName = (dayValue) => {
  const day = DAYS_OF_WEEK.find(d => d.value === dayValue);
  return day ? day.label : '';
};

export const getDayShortName = (dayValue) => {
  const day = DAYS_OF_WEEK.find(d => d.value === dayValue);
  return day ? day.short : '';
};

export const formatDaysOfWeek = (days) => {
  if (!days || !Array.isArray(days)) return '';
  if (days.length === 7) return 'Καθημερινά';
  if (days.length === 5 && days.every(d => d >= 1 && d <= 5)) return 'Δευτ-Παρ';
  return days.map(d => getDayShortName(d)).join(', ');
};

export const generateOccurrences = (listing, startDate, daysAhead = 60) => {
  const occurrences = [];
  const start = new Date(startDate);
  const end = addDays(start, daysAhead);
  
  if (listing.type === 'ONE_TIME') {
    return [{
      date: format(start, 'yyyy-MM-dd'),
      departureDateTime: listing.oneTimeDepartureDateTime
    }];
  }
  
  if (listing.type === 'RECURRING' && listing.recurring?.daysOfWeek) {
    let current = start;
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      
      if (listing.recurring.daysOfWeek.includes(dayOfWeek)) {
        const dateStr = format(current, 'yyyy-MM-dd');
        const [hours, minutes] = listing.departureTimeLocal.split(':');
        const departureDateTime = new Date(current);
        departureDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        if (listing.recurring.endDate && dateStr > listing.recurring.endDate) {
          break;
        }
        
        occurrences.push({
          date: dateStr,
          departureDateTime: departureDateTime.toISOString()
        });
      }
      
      current = addDays(current, 1);
    }
  }
  
  return occurrences;
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const isWithinRadius = (lat1, lng1, lat2, lng2, radiusKm) => {
  return calculateDistance(lat1, lng1, lat2, lng2) <= radiusKm;
};

export const calculateRefund = (departureDateTime, cancellationTime = new Date()) => {
  const departure = typeof departureDateTime === 'string' ? parseISO(departureDateTime) : departureDateTime;
  const hoursUntilDeparture = (departure - cancellationTime) / (1000 * 60 * 60);
  
  if (hoursUntilDeparture >= 24) {
    return { percent: 100, label: 'Πλήρης επιστροφή' };
  } else if (hoursUntilDeparture >= 2) {
    return { percent: 50, label: '50% επιστροφή' };
  } else {
    return { percent: 0, label: 'Χωρίς επιστροφή' };
  }
};

export const formatPrice = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const sanitizePhone = (phone) => {
  return phone.replace(/[^\d+]/g, '');
};

export const validatePhone = (phone) => {
  const sanitized = sanitizePhone(phone);
  // Greek phone validation
  return /^\+30[0-9]{10}$/.test(sanitized) || /^69[0-9]{8}$/.test(sanitized);
};

export const generateThreadId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};
