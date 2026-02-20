# carpal.gr

A modern carpooling platform for Greece - share fuel costs, not profits.

## Features

- **Web-first** with React Native/Expo mobile app ready architecture
- **Black minimal UI** with high contrast and accessibility
- **Appwrite Pro** backend (Auth, Database, Realtime, Functions)
- **Stripe** payments with weekly payouts to drivers
- **Recurring rides** support (daily commutes)
- **Seat-based booking** with availability management
- **Real-time chat** between drivers and riders
- **Ratings & reviews** system
- **Admin dashboard** for user management
- **Greek-first** with i18n-ready structure

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Appwrite (Auth, Database, Storage, Realtime, Functions)
- **Payments**: Stripe (Checkout, Connect for payouts)
- **Maps**: Google Maps API
- **State**: Zustand
- **Date Utils**: date-fns

## Quick Start

### 1. Prerequisites

- Node.js 18+
- Appwrite Cloud account
- Stripe account
- Google Maps API key

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_API_KEY=your-api-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

### 3. Database Setup

Run the setup script to create all collections:

```bash
npm install
export APPWRITE_API_KEY=your-api-key
node scripts/setup-appwrite.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (Stripe webhooks)
│   │   ├── auth/              # Login, Register pages
│   │   ├── main/              # Main app pages
│   │   │   ├── search/        # Search rides
│   │   │   ├── listings/      # Create/view listings
│   │   │   ├── bookings/      # My bookings
│   │   │   ├── messages/      # Chat
│   │   │   ├── profile/       # User profile
│   │   │   └── driver/        # Driver management
│   │   ├── admin/             # Admin dashboard
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Landing page
│   ├── components/
│   │   ├── ui/                # UI components (Button, Input, etc.)
│   │   ├── maps/              # Map components
│   │   ├── listings/          # Listing components
│   │   ├── bookings/          # Booking components
│   │   ├── chat/              # Chat components
│   │   └── Navbar.jsx         # Navigation
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # External lib configs
│   │   ├── appwrite.js        # Appwrite client
│   │   └── stripe.js          # Stripe config
│   ├── store/                 # Zustand stores
│   ├── utils/                 # Utilities
│   └── app.css               # Global styles
├── scripts/
│   └── setup-appwrite.js      # Database setup script
└── appwrite-functions/        # Appwrite Cloud Functions
```

## Data Model

### Collections

1. **users_public** - Public user profiles
2. **users_private** - Sensitive user data
3. **vehicles** - Vehicle information
4. **listings** - Ride listings (one-time or recurring)
5. **listing_occurrences** - Materialized ride dates
6. **bookings** - Seat bookings
7. **payments** - Payment records
8. **messages** - Chat messages
9. **ratings** - User ratings
10. **reports** - User reports
11. **admin_audit** - Admin actions log
12. **push_subscriptions** - Web push subscriptions

### Key Features

#### Route Matching
- Simple matching within 2km radius by default
- Origin and destination pins with geolocation

#### Cancellation Policy
- > 24h before: Full refund
- 2-24h before: 50% refund
- < 2h: No refund
- Driver cancellation: Full refund

#### Payment Flow
1. Rider creates booking (PENDING_PAYMENT)
2. Stripe Checkout session created
3. Webhook confirms payment → booking becomes PAID
4. Seats decremented atomically
5. Weekly payouts to drivers via Stripe Connect

## API Routes

- `POST /api/stripe/webhook` - Stripe webhook handler
- `POST /api/create-checkout-session` - Create Stripe checkout

## Mobile App (Future)

The architecture supports easy Expo/React Native migration:
- Reuse Appwrite SDK
- Reuse business logic hooks
- Same database collections
- Stripe React Native SDK

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

MIT License - see LICENSE file

## Support

For issues and questions, please use GitHub Issues.

---

Built with ❤️ for Greece 🇬🇷
