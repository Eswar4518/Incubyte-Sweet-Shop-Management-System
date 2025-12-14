/**
 * Database Configuration Module
 * 
 * This module handles MongoDB connection setup.
 * All database initialization happens here in one simple function.
 * 
 * Why: Centralizing DB connection logic makes it easy to maintain
 * and switch databases if needed in the future.
 */
import mongoose from 'mongoose';

/**
 * Connects to MongoDB database
 * 
 * @throws Error if connection fails
 * @returns Promise that resolves when connected
 */
export const connectToDatabase = async (): Promise<void> => {
  // Get MongoDB connection string from environment or use default for local development
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop';
  
  try {
    await mongoose.connect(uri);
    console.log('✓ Successfully connected to MongoDB database');
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error);
    throw error;
  }
};

/**
 * Disconnects from MongoDB
 * Useful for testing and graceful shutdowns
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('✓ Disconnected from MongoDB');
};
