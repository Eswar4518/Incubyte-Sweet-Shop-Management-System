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
exports.User = void 0;
/**
 * User Model
 *
 * Represents a user in the Sweet Shop system.
 * Each user has:
 * - email: unique email address (login credential)
 * - password: hashed password for security (NEVER stored as plain text)
 * - role: "customer" for regular users, "admin" for privileged access
 */
const mongoose_1 = __importStar(require("mongoose"));
/**
 * Mongoose schema definition
 * Specifies the structure and validation rules for users
 */
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
// Create and export the User model
exports.User = mongoose_1.default.model('User', userSchema);
