#!/usr/bin/env node

/**
 * Fix missing attributes in Appwrite
 */

const { Client, Databases } = require('node-appwrite');

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = 'carpal';
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = 'carpal_db';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

async function fixAttributes() {
  console.log('🔧 Fixing attributes...\n');

  // Fix users_public - add isDriver (not required, no default - handle in code)
  try {
    console.log('Adding isDriver to users_public...');
    await databases.createBooleanAttribute(
      DATABASE_ID,
      'users_public',
      'isDriver',
      false,  // not required
      false   // default
    );
    console.log('✅ isDriver added');
  } catch (e) {
    if (e.code === 409) console.log('isDriver already exists');
    else console.error('Error:', e.message);
  }

  // Fix users_private - add verified
  try {
    console.log('Adding verified to users_private...');
    await databases.createBooleanAttribute(
      DATABASE_ID,
      'users_private',
      'verified',
      false,
      false
    );
    console.log('✅ verified added');
  } catch (e) {
    if (e.code === 409) console.log('verified already exists');
    else console.error('Error:', e.message);
  }

  // Fix listings - add exactAddressFee, exactAddressAvailable, status
  try {
    console.log('Adding exactAddressFee to listings...');
    await databases.createFloatAttribute(
      DATABASE_ID,
      'listings',
      'exactAddressFee',
      false,  // not required
      0       // default
    );
    console.log('✅ exactAddressFee added');
  } catch (e) {
    if (e.code === 409) console.log('exactAddressFee already exists');
    else console.error('Error:', e.message);
  }

  try {
    console.log('Adding exactAddressAvailable to listings...');
    await databases.createBooleanAttribute(
      DATABASE_ID,
      'listings',
      'exactAddressAvailable',
      false,
      false
    );
    console.log('✅ exactAddressAvailable added');
  } catch (e) {
    if (e.code === 409) console.log('exactAddressAvailable already exists');
    else console.error('Error:', e.message);
  }

  try {
    console.log('Adding status to listings...');
    await databases.createStringAttribute(
      DATABASE_ID,
      'listings',
      'status',
      50,
      false,
      'ACTIVE'
    );
    console.log('✅ status added');
  } catch (e) {
    if (e.code === 409) console.log('status already exists');
    else console.error('Error:', e.message);
  }

  // Fix messages - add read
  try {
    console.log('Adding read to messages...');
    await databases.createBooleanAttribute(
      DATABASE_ID,
      'messages',
      'read',
      false,
      false
    );
    console.log('✅ read added');
  } catch (e) {
    if (e.code === 409) console.log('read already exists');
    else console.error('Error:', e.message);
  }

  console.log('\n✅ Done!');
}

fixAttributes();
