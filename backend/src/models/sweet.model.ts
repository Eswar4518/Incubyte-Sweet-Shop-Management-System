/**
 * Sweet Model
 * 
 * Represents a sweet/candy product in the shop inventory.
 * Each sweet has details about what it is, how much it costs, and how many we have in stock.
 */
import mongoose, { Schema, Document } from 'mongoose';

/**
 * TypeScript interface for Sweet document
 * Ensures type safety when working with sweet objects
 */
export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema definition
 * Specifies the structure and validation rules for sweets
 */
const sweetSchema = new Schema<ISweet>(
  {
    // Name of the sweet (e.g., "Chocolate Cake", "Strawberry Tart")
    name: {
      type: String,
      required: [true, 'Sweet name is required'],
      trim: true,
      minlength: [2, 'Sweet name must be at least 2 characters'],
      validate: {
        validator: (value: string) => value && value.trim().length >= 2,
        message: 'Sweet name must be at least 2 characters long'
      }
    },
    
    // Category helps organize sweets (e.g., "Chocolate", "Candy", "Cake")
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    
    // Price in currency units (e.g., dollars, rupees)
    // Must be positive - no negative prices!
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: (value: number) => value >= 0,
        message: 'Price must be a positive number'
      }
    },
    
    // Quantity available in stock
    // When someone buys a sweet, this number decreases
    // When admin restocks, this number increases
    // Cannot go below zero
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
      validate: {
        validator: (value: number) => Number.isInteger(value) && value >= 0,
        message: 'Quantity must be a non-negative integer'
      }
    },
    
    // Optional description for the sweet
    description: {
      type: String,
      trim: true
    },
    
    // Optional image URL for the sweet
    image: {
      type: String,
      trim: true
    }
  },
  { timestamps: true } // Automatically tracks when sweet was created/updated
);

// Create and export the Sweet model
export const Sweet = mongoose.model<ISweet>('Sweet', sweetSchema);
