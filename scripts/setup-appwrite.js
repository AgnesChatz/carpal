#!/usr/bin/env node

/**
 * Appwrite Database Setup Script
 * Run: node scripts/setup-appwrite.js
 */

const { Client, Databases, ID } = require('node-appwrite');

// Configuration
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = 'carpal';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = 'carpal_db';

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY environment variable is required');
  console.log('Run: APPWRITE_API_KEY=your_key node scripts/setup-appwrite.js');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

// Collection definitions
const collections = [
  {
    id: 'users_public',
    name: 'Users Public',
    attributes: [
      { key: 'userId', type: 'string', size: 255, required: true },
      { key: 'name', type: 'string', size: 255, required: true },
      { key: 'photo', type: 'string', size: 1000, required: false },
      { key: 'phone', type: 'string', size: 50, required: false },
      { key: 'isDriver', type: 'boolean', required: true, default: false },
      { key: 'rating', type: 'double', required: false, default: 0 },
      { key: 'reviewsCount', type: 'integer', required: false, default: 0 },
      { key: 'tripsCount', type: 'integer', required: false, default: 0 },
      { key: 'bio', type: 'string', size: 2000, required: false },
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'userId_idx', type: 'key', attributes: ['userId'] },
    ]
  },
  {
    id: 'users_private',
    name: 'Users Private',
    attributes: [
      { key: 'userId', type: 'string', size: 255, required: true },
      { key: 'email', type: 'string', size: 255, required: true },
      { key: 'verified', type: 'boolean', required: true, default: false },
      { key: 'stripeCustomerId', type: 'string', size: 255, required: false },
      { key: 'stripeAccountId', type: 'string', size: 255, required: false },
    ],
    indexes: [
      { key: 'userId_idx', type: 'key', attributes: ['userId'] },
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    attributes: [
      { key: 'driverId', type: 'string', size: 255, required: true },
      { key: 'make', type: 'string', size: 100, required: true },
      { key: 'model', type: 'string', size: 100, required: true },
      { key: 'year', type: 'integer', required: true },
      { key: 'color', type: 'string', size: 50, required: true },
      { key: 'seats', type: 'integer', required: true },
      { key: 'licensePlate', type: 'string', size: 20, required: false },
      { key: 'photos', type: 'string', size: 5000, array: true, required: false },
    ],
    indexes: [
      { key: 'driverId_idx', type: 'key', attributes: ['driverId'] },
    ]
  },
  {
    id: 'listings',
    name: 'Listings',
    attributes: [
      { key: 'driverId', type: 'string', size: 255, required: true },
      { key: 'type', type: 'string', size: 50, required: true }, // ONE_TIME or RECURRING
      { key: 'origin', type: 'string', size: 5000, required: true }, // JSON string
      { key: 'destination', type: 'string', size: 5000, required: true }, // JSON string
      { key: 'meetingPoint', type: 'string', size: 5000, required: true }, // JSON string
      { key: 'departureTime', type: 'string', size: 10, required: true },
      { key: 'departureDateTime', type: 'datetime', required: false },
      { key: 'recurringDays', type: 'integer', array: true, required: false },
      { key: 'seatsAvailable', type: 'integer', required: true },
      { key: 'pricePerSeat', type: 'double', required: true },
      { key: 'exactAddressFee', type: 'double', required: true, default: 0 },
      { key: 'exactAddressAvailable', type: 'boolean', required: true, default: false },
      { key: 'status', type: 'string', size: 50, required: true, default: 'ACTIVE' },
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'driverId_idx', type: 'key', attributes: ['driverId'] },
      { key: 'status_idx', type: 'key', attributes: ['status'] },
      { key: 'type_idx', type: 'key', attributes: ['type'] },
    ]
  },
  {
    id: 'bookings',
    name: 'Bookings',
    attributes: [
      { key: 'riderId', type: 'string', size: 255, required: true },
      { key: 'driverId', type: 'string', size: 255, required: true },
      { key: 'listingId', type: 'string', size: 255, required: true },
      { key: 'occurrenceDates', type: 'string', size: 100, array: true, required: true },
      { key: 'seatsBooked', type: 'integer', required: true },
      { key: 'totalPrice', type: 'double', required: true },
      { key: 'platformFee', type: 'double', required: true },
      { key: 'driverEarnings', type: 'double', required: true },
      { key: 'pickupType', type: 'string', size: 50, required: true },
      { key: 'exactAddressText', type: 'string', size: 500, required: false },
      { key: 'status', type: 'string', size: 50, required: true },
      { key: 'stripeCheckoutSessionId', type: 'string', size: 255, required: false },
      { key: 'stripePaymentIntentId', type: 'string', size: 255, required: false },
      { key: 'createdAt', type: 'datetime', required: true },
      { key: 'updatedAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'riderId_idx', type: 'key', attributes: ['riderId'] },
      { key: 'driverId_idx', type: 'key', attributes: ['driverId'] },
      { key: 'listingId_idx', type: 'key', attributes: ['listingId'] },
      { key: 'status_idx', type: 'key', attributes: ['status'] },
    ]
  },
  {
    id: 'messages',
    name: 'Messages',
    attributes: [
      { key: 'senderId', type: 'string', size: 255, required: true },
      { key: 'receiverId', type: 'string', size: 255, required: true },
      { key: 'bookingId', type: 'string', size: 255, required: false },
      { key: 'text', type: 'string', size: 5000, required: true },
      { key: 'read', type: 'boolean', required: true, default: false },
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'senderId_idx', type: 'key', attributes: ['senderId'] },
      { key: 'receiverId_idx', type: 'key', attributes: ['receiverId'] },
      { key: 'bookingId_idx', type: 'key', attributes: ['bookingId'] },
    ]
  },
  {
    id: 'ratings',
    name: 'Ratings',
    attributes: [
      { key: 'bookingId', type: 'string', size: 255, required: true },
      { key: 'raterId', type: 'string', size: 255, required: true },
      { key: 'rateeId', type: 'string', size: 255, required: true },
      { key: 'rating', type: 'integer', required: true },
      { key: 'comment', type: 'string', size: 2000, required: false },
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'bookingId_idx', type: 'key', attributes: ['bookingId'] },
      { key: 'rateeId_idx', type: 'key', attributes: ['rateeId'] },
    ]
  },
];

async function setupDatabase() {
  console.log('🚀 Setting up Appwrite database...\n');

  // Check if database exists
  try {
    await databases.get(DATABASE_ID);
    console.log(`✅ Database '${DATABASE_ID}' already exists`);
  } catch (error) {
    if (error.code === 404) {
      console.log(`Creating database '${DATABASE_ID}'...`);
      await databases.create(DATABASE_ID, DATABASE_ID);
      console.log(`✅ Database created`);
    } else {
      throw error;
    }
  }

  // Create collections
  for (const collection of collections) {
    try {
      console.log(`\n📦 Setting up '${collection.id}'...`);
      
      // Check if collection exists
      try {
        await databases.getCollection(DATABASE_ID, collection.id);
        console.log(`  Collection already exists`);
      } catch (error) {
        if (error.code === 404) {
          await databases.createCollection(
            DATABASE_ID,
            collection.id,
            collection.name
          );
          console.log(`  ✅ Collection created`);
        } else {
          throw error;
        }
      }

      // Create attributes
      for (const attr of collection.attributes) {
        try {
          if (attr.type === 'string' && attr.array) {
            await databases.createStringAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.size,
              attr.required,
              undefined,
              true // array
            );
          } else if (attr.type === 'string') {
            await databases.createStringAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.size,
              attr.required,
              attr.default
            );
          } else if (attr.type === 'integer') {
            if (attr.array) {
              await databases.createIntegerAttribute(
                DATABASE_ID,
                collection.id,
                attr.key,
                attr.required,
                undefined,
                undefined,
                undefined,
                true // array
              );
            } else {
              await databases.createIntegerAttribute(
                DATABASE_ID,
                collection.id,
                attr.key,
                attr.required,
                undefined,
                undefined,
                attr.default
              );
            }
          } else if (attr.type === 'double') {
            await databases.createFloatAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.required,
              undefined,
              undefined,
              attr.default
            );
          } else if (attr.type === 'boolean') {
            await databases.createBooleanAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.required,
              attr.default
            );
          } else if (attr.type === 'datetime') {
            await databases.createDatetimeAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.required
            );
          }
          console.log(`  ✅ Attribute '${attr.key}'`);
        } catch (error) {
          if (error.code === 409) {
            console.log(`  Attribute '${attr.key}' already exists`);
          } else {
            console.error(`  ❌ Error creating attribute '${attr.key}':`, error.message);
          }
        }
      }

      // Create indexes
      for (const index of collection.indexes || []) {
        try {
          await databases.createIndex(
            DATABASE_ID,
            collection.id,
            index.key,
            index.type,
            index.attributes
          );
          console.log(`  ✅ Index '${index.key}'`);
        } catch (error) {
          if (error.code === 409) {
            console.log(`  Index '${index.key}' already exists`);
          } else {
            console.error(`  ❌ Error creating index '${index.key}':`, error.message);
          }
        }
      }

      console.log(`✅ '${collection.id}' setup complete`);
    } catch (error) {
      console.error(`❌ Error setting up '${collection.id}':`, error.message);
    }
  }

  console.log('\n🎉 Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Go to Appwrite Console → Database → Collections');
  console.log('2. Set permissions for each collection');
  console.log('3. Update src/lib/db.js: set USE_MOCK_DATA = false');
}

setupDatabase().catch(console.error);
