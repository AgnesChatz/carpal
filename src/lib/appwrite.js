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
  USERS_PUBLIC: 'Users Public',
  USERS_PRIVATE: 'Users Private',
  VEHICLES: 'Vehicles',
  LISTINGS: 'Listings',
  LISTING_OCCURRENCES: 'Listing Occurrences',
  BOOKINGS: 'Bookings',
  PAYMENTS: 'Payments',
  MESSAGES: 'Messages',
  RATINGS: 'Ratings',
  REPORTS: 'Reports',
  ADMIN_AUDIT: 'Admin Audit',
  PUSH_SUBSCRIPTIONS: 'Push Subscriptions'
};

export { client, account, databases, storage, functions, DATABASE_ID, COLLECTIONS };
