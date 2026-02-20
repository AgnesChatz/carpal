#!/usr/bin/env node

/**
 * Seed Appwrite with test data
 * Run: node scripts/seed-data.js
 */

const { Client, Databases, ID } = require('node-appwrite');

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = 'carpal';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = 'carpal_db';

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY environment variable is required');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

const drivers = [
  {
    userId: 'driver-1',
    name: 'Γιώργος Παπαδόπουλος',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    phone: '+30 690 123 4567',
    isDriver: true,
    rating: 4.9,
    reviewsCount: 24,
    tripsCount: 156,
    bio: 'Επαγγελματίας οδηγός με 10+ χρόνια εμπειρίας. Ασφαλείς διαδρομές καθημερινά.',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'driver-2',
    name: 'Μαρία Κωνσταντίνου',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    phone: '+30 690 234 5678',
    isDriver: true,
    rating: 4.8,
    reviewsCount: 18,
    tripsCount: 89,
    bio: 'Ευγενική και συνεπής. Προτιμώ πρωινές διαδρομές προς το κέντρο.',
    createdAt: new Date().toISOString()
  }
];

const vehicles = [
  {
    driverId: 'driver-1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    color: 'Ασημί',
    seats: 5,
    licensePlate: 'ΝΚΗ-1234',
    photos: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop'
    ]
  },
  {
    driverId: 'driver-2',
    make: 'Hyundai',
    model: 'i30',
    year: 2022,
    color: 'Μπλε',
    seats: 5,
    licensePlate: 'ΝΚΗ-5678',
    photos: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop'
    ]
  }
];

const listings = [
  {
    driverId: 'driver-1',
    type: 'RECURRING',
    origin: JSON.stringify({ label: 'Καλαμαριά', address: 'Καλαμαριά, Θεσσαλονίκη', lat: 40.582, lng: 22.950 }),
    destination: JSON.stringify({ label: 'Εύοσμος', address: 'Εύοσμος, Θεσσαλονίκη', lat: 40.670, lng: 22.910 }),
    meetingPoint: JSON.stringify({ label: 'Μετρό Καλαμαριάς', address: 'Μετρό Καλαμαριάς, Θεσσαλονίκη', lat: 40.582, lng: 22.950 }),
    departureTime: '08:00',
    recurringDays: [1, 2, 3, 4, 5],
    seatsAvailable: 3,
    pricePerSeat: 2.50,
    exactAddressFee: 0,
    exactAddressAvailable: false,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  },
  {
    driverId: 'driver-2',
    type: 'RECURRING',
    origin: JSON.stringify({ label: 'Κέντρο', address: 'Πλατεία Αριστοτέλους, Θεσσαλονίκη', lat: 40.640, lng: 22.944 }),
    destination: JSON.stringify({ label: 'Αεροδρόμιο', address: 'Αεροδρόμιο Μακεδονία, Θεσσαλονίκη', lat: 40.520, lng: 22.970 }),
    meetingPoint: JSON.stringify({ label: 'Πλατεία Αριστοτέλους', address: 'Πλατεία Αριστοτέλους, Θεσσαλονίκη', lat: 40.640, lng: 22.944 }),
    departureTime: '06:30',
    recurringDays: [1, 2, 3, 4, 5, 6],
    seatsAvailable: 2,
    pricePerSeat: 4.00,
    exactAddressFee: 2.00,
    exactAddressAvailable: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  }
];

async function seedData() {
  console.log('🌱 Seeding Appwrite database...\n');

  // Seed drivers
  console.log('Creating drivers...');
  for (const driver of drivers) {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        'users_public',
        ID.unique(),
        driver
      );
      console.log(`  ✅ ${driver.name} (${doc.$id})`);
    } catch (e) {
      console.error(`  ❌ ${driver.name}: ${e.message}`);
    }
  }

  // Seed vehicles
  console.log('\nCreating vehicles...');
  for (const vehicle of vehicles) {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        'vehicles',
        ID.unique(),
        vehicle
      );
      console.log(`  ✅ ${vehicle.make} ${vehicle.model} (${doc.$id})`);
    } catch (e) {
      console.error(`  ❌ ${vehicle.make}: ${e.message}`);
    }
  }

  // Seed listings
  console.log('\nCreating listings...');
  for (const listing of listings) {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        'listings',
        ID.unique(),
        listing
      );
      console.log(`  ✅ ${JSON.parse(listing.origin).label} → ${JSON.parse(listing.destination).label} (${doc.$id})`);
    } catch (e) {
      console.error(`  ❌ Listing: ${e.message}`);
    }
  }

  console.log('\n🎉 Seeding complete!');
  console.log('\nTest the app at: http://localhost:3001');
  console.log('You should see the listings in search results.');
}

seedData().catch(console.error);
