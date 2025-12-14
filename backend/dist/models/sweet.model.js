"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sweet = void 0;
/**
 * Sweet Model
 *
 * Represents a sweet/candy product in the shop inventory.
 * Each sweet has details about what it is, how much it costs, and how many we have in stock.
 */
const mongoose_1 = __importStar(require("mongoose"));
/**
 * Mongoose schema definition
 * Specifies the structure and validation rules for sweets
 */
const sweetSchema = new mongoose_1.Schema({
    // Name of the sweet (e.g., "Chocolate Cake", "Strawberry Tart")
    name: {
        type: String,
        required: [true, 'Sweet name is required'],
        trim: true,
        minlength: [2, 'Sweet name must be at least 2 characters']
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
        min: [0, 'Price cannot be negative']
    },
    // Quantity available in stock
    // When someone buys a sweet, this number decreases
    // When admin restocks, this number increases
    // Cannot go below zero
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    }
}, { timestamps: true } // Automatically tracks when sweet was created/updated
);
// Create and export the Sweet model
exports.Sweet = mongoose_1.default.model('Sweet', sweetSchema);
