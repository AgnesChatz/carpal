# Appwrite Database Setup for carpal.gr

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=carpal_db
APPWRITE_API_KEY=your_api_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Database Collections

Create a database named `carpal_db` and these collections:

### 1. users_public
| Attribute | Type | Required |
|-----------|------|----------|
| userId | string | yes |
| name | string | yes |
| photo | string | no |
| phone | string | no |
| isDriver | boolean | yes |
| rating | float | no |
| reviewsCount | integer | no |
| tripsCount | integer | no |
| bio | string | no |
| createdAt | datetime | yes |

**Permissions:**
- Read: Any
- Create: Users
- Update: Owner

### 2. users_private
| Attribute | Type | Required |
|-----------|------|----------|
| userId | string | yes |
| email | email | yes |
| verified | boolean | yes |
| stripeCustomerId | string | no |
| stripeAccountId | string | no |

**Permissions:**
- Read: Owner
- Create: Users
- Update: Owner

### 3. vehicles
| Attribute | Type | Required |
|-----------|------|----------|
| driverId | string | yes |
| make | string | yes |
| model | string | yes |
| year | integer | yes |
| color | string | yes |
| seats | integer | yes |
| licensePlate | string | no |
| photos | string[] | no |

### 4. listings
| Attribute | Type | Required |
|-----------|------|----------|
| driverId | string | yes |
| type | enum(ONE_TIME, RECURRING) | yes |
| origin | object | yes |
| destination | object | yes |
| meetingPoint | object | yes |
| departureTime | string | yes |
| departureDateTime | datetime | no |
| recurringDays | integer[] | no |
| seatsAvailable | integer | yes |
| pricePerSeat | float | yes |
| exactAddressFee | float | yes |
| exactAddressAvailable | boolean | yes |
| status | enum(ACTIVE, PAUSED, CANCELLED) | yes |
| createdAt | datetime | yes |

**Indexes:**
- driverId
- status
- type

### 5. listing_occurrences
| Attribute | Type | Required |
|-----------|------|----------|
| listingId | string | yes |
| date | date | yes |
| seatsRemaining | integer | yes |
| status | enum(ACTIVE, FULL, CANCELLED) | yes |

**Indexes:**
- listingId
- date

### 6. bookings
| Attribute | Type | Required |
|-----------|------|----------|
| riderId | string | yes |
| driverId | string | yes |
| listingId | string | yes |
| occurrenceDates | string[] | yes |
| seatsBooked | integer | yes |
| totalPrice | float | yes |
| platformFee | float | yes |
| driverEarnings | float | yes |
| pickupType | enum(MEETING_POINT, EXACT_ADDRESS) | yes |
| exactAddressText | string | no |
| status | enum(PENDING_PAYMENT, PAID, CONFIRMED, COMPLETED, CANCELLED) | yes |
| stripeCheckoutSessionId | string | no |
| stripePaymentIntentId | string | no |
| createdAt | datetime | yes |
| updatedAt | datetime | yes |

**Indexes:**
- riderId
- driverId
- listingId
- status

### 7. payments
| Attribute | Type | Required |
|-----------|------|----------|
| bookingId | string | yes |
| stripePaymentIntentId | string | yes |
| amountTotal | float | yes |
| platformFee | float | yes |
| driverPayout | float | yes |
| currency | string | yes |
| status | enum(pending, completed, refunded) | yes |
| createdAt | datetime | yes |

### 8. messages
| Attribute | Type | Required |
|-----------|------|----------|
| senderId | string | yes |
| receiverId | string | yes |
| bookingId | string | no |
| text | string | yes |
| read | boolean | yes |
| createdAt | datetime | yes |

**Indexes:**
- senderId
- receiverId
- bookingId

### 9. ratings
| Attribute | Type | Required |
|-----------|------|----------|
| bookingId | string | yes |
| raterId | string | yes |
| rateeId | string | yes |
| rating | integer (1-5) | yes |
| comment | string | no |
| createdAt | datetime | yes |

## Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `charge.refunded`
4. Copy webhook secret to env

## Testing

1. Create a test user in Appwrite Auth
2. Create a test listing
3. Try booking flow with Stripe test card: `4242 4242 4242 4242`
