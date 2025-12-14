/**
 * User Model
 * 
 * Represents a user in the Sweet Shop system.
 * Each user has:
 * - email: unique email address (login credential)
 * - password: hashed password for security (NEVER stored as plain text)
 * - role: "customer" for regular users, "admin" for privileged access
 */
import mongoose, { Schema, Document } from 'mongoose';

/**
 * TypeScript interface for User document
 * This helps with type safety when working with user objects
 */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string; // This will be hashed using bcrypt
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema definition
 * Specifies the structure and validation rules for users
 */
const userSchema = new Schema<IUser>(
  {
    // Username field: unique and required
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters']
    },
    
    // Email field: unique and required for login
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    
    // Password field: will be hashed before storage
    // We never store plain text passwords
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false // Don't return password by default when querying
    },
    
    // Role determines access level in the system
    // - "customer": can view and purchase sweets
    // - "admin": can also add, update, delete sweets and restock inventory
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the User model
export const User = mongoose.model<IUser>('User', userSchema);
