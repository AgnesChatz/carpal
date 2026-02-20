#!/usr/bin/env node

/**
 * Test Appwrite Connection
 * Run: node scripts/test-connection.js
 */

const { Client, Databases, Account } = require('node-appwrite');

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

async function testConnection() {
  console.log('🧪 Testing Appwrite connection...\n');

  try {
    // Test 1: Get database
    console.log('1. Testing database access...');
    const db = await databases.get(DATABASE_ID);
    console.log(`   ✅ Database found: ${db.name}`);

    // Test 2: List collections
    console.log('\n2. Testing collections...');
    const collections = await databases.listCollections(DATABASE_ID);
    console.log(`   ✅ Found ${collections.total} collections:`);
    for (const col of collections.collections) {
      console.log(`      - ${col.name} (${col.$id})`);
    }

    // Test 3: Try to create a test document
    console.log('\n3. Testing document creation...');
    const testDoc = await databases.createDocument(
      DATABASE_ID,
      'users_public',
      'unique()',
      {
        userId: 'test-user-123',
        name: 'Test User',
        isDriver: false,
        rating: 0,
        reviewsCount: 0,
        tripsCount: 0,
        createdAt: new Date().toISOString()
      }
    );
    console.log(`   ✅ Test document created: ${testDoc.$id}`);

    // Test 4: Read the document back
    console.log('\n4. Testing document read...');
    const readDoc = await databases.getDocument(
      DATABASE_ID,
      'users_public',
      testDoc.$id
    );
    console.log(`   ✅ Document read: ${readDoc.name}`);

    // Test 5: Delete test document
    console.log('\n5. Testing document delete...');
    await databases.deleteDocument(
      DATABASE_ID,
      'users_public',
      testDoc.$id
    );
    console.log(`   ✅ Test document deleted`);

    console.log('\n🎉 All tests passed!');
    console.log('\nYour Appwrite database is ready to use!');
    console.log('Update src/lib/db.js: USE_MOCK_DATA = false');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 401) {
      console.log('\n💡 Tip: Check your API key is correct');
    } else if (error.code === 404) {
      console.log('\n💡 Tip: Check database ID is correct');
    }
  }
}

testConnection();
