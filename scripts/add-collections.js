#!/usr/bin/env node

/**
 * Add missing collections for new features
 */

const { Client, Databases, ID } = require('node-appwrite');

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = 'carpal';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = 'carpal_db';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

const newCollections = [
  {
    id: 'notifications',
    name: 'Notifications',
    attributes: [
      { key: 'userId', type: 'string', size: 255, required: true },
      { key: 'type', type: 'string', size: 50, required: true }, // booking, message, system, review
      { key: 'title', type: 'string', size: 255, required: true },
      { key: 'message', type: 'string', size: 1000, required: true },
      { key: 'read', type: 'boolean', required: false, default: false },
      { key: 'actionUrl', type: 'string', size: 500, required: false },
      { key: 'relatedId', type: 'string', size: 255, required: false }, // bookingId, messageId, etc.
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'userId_idx', type: 'key', attributes: ['userId'] },
      { key: 'read_idx', type: 'key', attributes: ['read'] },
      { key: 'createdAt_idx', type: 'key', attributes: ['createdAt'] },
    ],
    permissions: {
      create: ['Users'],
      read: ['Users'],
      update: ['Users'],
      delete: ['Users'],
    }
  },
  {
    id: 'push_subscriptions',
    name: 'Push Subscriptions',
    attributes: [
      { key: 'userId', type: 'string', size: 255, required: true },
      { key: 'endpoint', type: 'string', size: 500, required: true },
      { key: 'p256dh', type: 'string', size: 255, required: true },
      { key: 'auth', type: 'string', size: 255, required: true },
      { key: 'createdAt', type: 'datetime', required: true },
    ],
    indexes: [
      { key: 'userId_idx', type: 'key', attributes: ['userId'] },
      { key: 'endpoint_idx', type: 'key', attributes: ['endpoint'] },
    ],
    permissions: {
      create: ['Users'],
      read: ['Users'],
      update: ['Users'],
      delete: ['Users'],
    }
  },
];

async function addCollections() {
  console.log('🔧 Adding new collections...\n');

  for (const collection of newCollections) {
    try {
      console.log(`📦 Creating '${collection.id}'...`);
      
      // Create collection
      try {
        await databases.createCollection(
          DATABASE_ID,
          collection.id,
          collection.name
        );
        console.log(`  ✅ Collection created`);
      } catch (e) {
        if (e.code === 409) {
          console.log(`  Collection already exists`);
        } else {
          throw e;
        }
      }

      // Create attributes
      for (const attr of collection.attributes) {
        try {
          if (attr.type === 'string') {
            await databases.createStringAttribute(
              DATABASE_ID,
              collection.id,
              attr.key,
              attr.size,
              attr.required,
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
        } catch (e) {
          if (e.code === 409) {
            console.log(`  Attribute '${attr.key}' already exists`);
          } else {
            console.error(`  ❌ Error creating '${attr.key}':`, e.message);
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
        } catch (e) {
          if (e.code === 409) {
            console.log(`  Index '${index.key}' already exists`);
          } else {
            console.error(`  ❌ Error creating index:`, e.message);
          }
        }
      }

      console.log(`✅ '${collection.id}' complete\n`);
    } catch (error) {
      console.error(`❌ Error with '${collection.id}':`, error.message);
    }
  }

  console.log('🎉 Done!');
  console.log('\nNew collections:');
  console.log('  - notifications (for notification center)');
  console.log('  - push_subscriptions (for browser push notifications)');
}

addCollections().catch(console.error);
