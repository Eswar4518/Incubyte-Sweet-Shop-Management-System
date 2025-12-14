"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
/**
 * Database Configuration Module
 *
 * This module handles MongoDB connection setup.
 * All database initialization happens here in one simple function.
 *
 * Why: Centralizing DB connection logic makes it easy to maintain
 * and switch databases if needed in the future.
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Connects to MongoDB database
 *
 * @throws Error if connection fails
 * @returns Promise that resolves when connected
 */
const connectToDatabase = async () => {
    // Get MongoDB connection string from environment or use default for local development
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop';
    try {
        await mongoose_1.default.connect(uri);
        console.log('✓ Successfully connected to MongoDB database');
    }
    catch (error) {
        console.error('✗ Failed to connect to MongoDB:', error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
/**
 * Disconnects from MongoDB
 * Useful for testing and graceful shutdowns
 */
const disconnectFromDatabase = async () => {
    await mongoose_1.default.disconnect();
    console.log('✓ Disconnected from MongoDB');
};
exports.disconnectFromDatabase = disconnectFromDatabase;
