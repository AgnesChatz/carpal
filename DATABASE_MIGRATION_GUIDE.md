# Database Migration Guide

## Current State

The app now uses a **database abstraction layer** (`src/lib/db.js`) that supports both:
- **Mock data** (for development/demo) - `USE_MOCK_DATA = true`
- **Appwrite** (for production) - `USE_MOCK_DATA = false`

## To Connect to Appwrite

### 1. Set Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=carpal_db
APPWRITE_API_KEY=your_api_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Create Collections in Appwrite

See `APPWRITE_SETUP.md` for full schema.

Quick checklist:
- [ ] users_public
- [ ] users_private  
- [ ] vehicles
- [ ] listings
- [ ] listing_occurrences
- [ ] bookings
- [ ] payments
- [ ] messages
- [ ] ratings

### 3. Switch to Appwrite

Edit `src/lib/db.js`:

```javascript
// Change this line
const USE_MOCK_DATA = false; // <-- Set to false
```

### 4. Test

1. Create a test user in Appwrite Auth
2. Create a test listing
3. Try the booking flow
4. Use Stripe test card: `4242 4242 4242 4242`

## API Functions Available

### Listings
- `getListings(filters)` - Search listings
- `getListingById(id)` - Get single listing
- `createListing(data)` - Create new listing
- `updateListing(id, data)` - Update listing

### Bookings
- `getBookings(userId, role)` - Get user's bookings
- `getBookingById(id)` - Get single booking
- `createBooking(data)` - Create new booking
- `updateBooking(id, data)` - Update booking
- `cancelBooking(id, reason)` - Cancel booking

### Users
- `getUserPublic(userId)` - Get public user info
- `updateUserPublic(userId, data)` - Update user
- `getDriverStats(driverId)` - Get driver statistics

### Messages
- `getMessages(userId, otherUserId, bookingId)` - Get conversation
- `sendMessage(data)` - Send message

### Ratings
- `createRating(data)` - Create rating
- `getUserRatings(userId)` - Get user's ratings

## Data Flow

```
User Action → Component → db.js → Appwrite/Mock
                                    ↓
                              Response → UI Update
```

## Pages Updated

- ✅ `/main/search` - Search listings
- ✅ `/main/listings/detail` - Listing detail
- ✅ `/main/bookings` - My bookings
- ✅ `/main/bookings/[id]` - Booking detail
- ✅ `/main/bookings/new` - Booking confirmation
- ✅ `/main/driver/bookings` - Driver bookings view

## Next Steps for Production

1. **Set up Appwrite project**
2. **Create collections** with proper indexes
3. **Set up Stripe** webhook endpoint
4. **Test all flows** with real data
5. **Add error handling** for network failures
6. **Add loading states** for better UX
7. **Set up real-time** subscriptions for messages

## Troubleshooting

### "Collection not found"
- Check collection IDs match `COLLECTIONS` in `appwrite.js`
- Verify database ID is correct

### "Permission denied"
- Check collection permissions in Appwrite Console
- Ensure user is authenticated

### "Document not found"
- Check document ID format
- Verify document exists in collection
