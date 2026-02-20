// Cancellation policy
export const CANCELLATION_POLICY = {
  FREE_HOURS: 24,
  PARTIAL_HOURS: 2,
  FREE_REFUND_PERCENT: 100,
  PARTIAL_REFUND_PERCENT: 50,
  NO_REFUND_PERCENT: 0
};

// Listing types
export const LISTING_TYPE = {
  ONE_TIME: 'ONE_TIME',
  RECURRING: 'RECURRING'
};

// Booking statuses
export const BOOKING_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PAID: 'PAID',
  CONFIRMED: 'CONFIRMED',
  DRIVER_ASSIGNED: 'DRIVER_ASSIGNED',
  DRIVER_ARRIVING: 'DRIVER_ARRIVING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED_PARTIAL: 'REFUNDED_PARTIAL',
  REFUNDED_FULL: 'REFUNDED_FULL'
};

// Trip statuses for tracking
export const TRIP_STATUS = {
  SCHEDULED: 'SCHEDULED',
  DRIVER_ASSIGNED: 'DRIVER_ASSIGNED',
  DRIVER_ARRIVING: 'DRIVER_ARRIVING',
  DRIVER_ARRIVED: 'DRIVER_ARRIVED',
  PASSENGER_PICKED_UP: 'PASSENGER_PICKED_UP',
  IN_PROGRESS: 'IN_PROGRESS',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

// Gender preferences
export const GENDER_PREFERENCE = {
  ANY: 'ANY',
  LADIES_ONLY: 'LADIES_ONLY',
  MEN_ONLY: 'MEN_ONLY'
};

// Flexibility options (in minutes)
export const TIME_FLEXIBILITY = {
  NONE: 0,
  FIFTEEN: 15,
  THIRTY: 30,
  SIXTY: 60
};

// Listing statuses
export const LISTING_STATUS = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED'
};

// Occurrence statuses
export const OCCURRENCE_STATUS = {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

// Pickup types
export const PICKUP_TYPE = {
  MEETING_POINT: 'MEETING_POINT',
  EXACT_ADDRESS: 'EXACT_ADDRESS'
};

// Days of week
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Κυριακή', short: 'Κυρ' },
  { value: 1, label: 'Δευτέρα', short: 'Δευ' },
  { value: 2, label: 'Τρίτη', short: 'Τρι' },
  { value: 3, label: 'Τετάρτη', short: 'Τετ' },
  { value: 4, label: 'Πέμπτη', short: 'Πεμ' },
  { value: 5, label: 'Παρασκευή', short: 'Παρ' },
  { value: 6, label: 'Σάββατο', short: 'Σαβ' }
];

// Search defaults
export const SEARCH_DEFAULTS = {
  ORIGIN_RADIUS_KM: 2,
  DEST_RADIUS_KM: 2,
  DEFAULT_SEATS: 1,
  DEFAULT_FLEXIBILITY: 30
};

// Pickup radius options (in meters)
export const PICKUP_RADIUS_OPTIONS = [
  { value: 250, label: '250μ' },
  { value: 500, label: '500μ' },
  { value: 1000, label: '1χλμ' },
  { value: 2000, label: '2χλμ' }
];

// Timezone
export const DEFAULT_TIMEZONE = 'Europe/Athens';

// Greek translations
export const TRANSLATIONS = {
  fuelContribution: 'Συνεισφορά καυσίμων ανά θέση',
  meetingPoint: 'Σημείο συνάντησης',
  recurringRoute: 'Επαναλαμβανόμενη διαδρομή',
  oneTimeRoute: 'Μεμονωμένη διαδρομή',
  bookDates: 'Κράτηση ημερών',
  cancelAndRefund: 'Ακύρωση & επιστροφή χρημάτων',
  findRoute: 'Βρες διαδρομή',
  createRoute: 'Δημιούργησε διαδρομή',
  myBookings: 'Οι κρατήσεις μου',
  messages: 'Μηνύματα',
  profile: 'Προφίλ',
  search: 'Αναζήτηση',
  from: 'Από',
  to: 'Προς',
  date: 'Ημερομηνία',
  seats: 'Θέσεις',
  price: 'Τιμή',
  driver: 'Οδηγός',
  passenger: 'Επιβάτης',
  bookNow: 'Κράτηση τώρα',
  continue: 'Συνέχεια',
  back: 'Πίσω',
  cancel: 'Ακύρωση',
  save: 'Αποθήκευση',
  edit: 'Επεξεργασία',
  delete: 'Διαγραφή',
  confirm: 'Επιβεβαίωση',
  close: 'Κλείσιμο',
  loading: 'Φόρτωση...',
  error: 'Σφάλμα',
  success: 'Επιτυχία',
  noResults: 'Δεν βρέθηκαν αποτελέσματα',
  tryAgain: 'Δοκιμάστε ξανά'
};
