import { Client, Account, Databases, Storage, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'carpal_db';

const COLLECTIONS = {
  USERS_PUBLIC: 'users_public',
  USERS_PRIVATE: 'users_private',
  VEHICLES: 'vehicles',
  LISTINGS: 'listings',
  LISTING_OCCURRENCES: 'listing_occurrences',
  BOOKINGS: 'bookings',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
  RATINGS: 'ratings',
  REPORTS: 'reports',
  ADMIN_AUDIT: 'admin_audit',
  PUSH_SUBSCRIPTIONS: 'push_subscriptions'
};

export { client, account, databases, storage, functions, DATABASE_ID, COLLECTIONS };
