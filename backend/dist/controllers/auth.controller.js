"use strict";
/**
 * Authentication Controller
 *
 * Handles user registration and login operations.
 *
 * Security practices:
 * - Passwords are hashed using bcrypt (one-way encryption)
 * - JWTs are used for stateless authentication
 * - Tokens expire after 24 hours for security
/**
 * Authentication Controller
 *
 * Handles user registration and login operations.
 * Each function is simple and easy to understand:
 * - register: Creates a new user with hashed password and returns a token
 * - login: Verifies credentials and returns a token if valid
 *
 * Security practices:
 * - Passwords are hashed using bcrypt (one-way encryption)
 * - JWTs are used for stateless authentication
 * - Tokens expire after 24 hours for security
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';
const JWT_EXPIRY = '24h'; // Token valid for 24 hours
/**
 * User Registration Handler
 * Creates a new user account with email and password
 *
 * Steps:
 * 1. Extract email and password from request body
 * 2. Validate that both fields are provided
 * 3. Check if user already exists to prevent duplicates
 * 4. Hash the password for security (bcrypt)
 * 5. Create user in database
 * 6. Generate JWT token for immediate login
 * 7. Return token to client
 */
const register = async (req, res) => {
    const { email, password } = req.body;
    // Step 1 & 2: Validate inputs
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required. Please provide both.'
        });
        return;
    }
    // Step 3: Check if user exists
    const existingUser = await user_model_1.User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        res.status(409).json({
            success: false,
            message: 'This email is already registered. Please use a different email or log in.'
        });
        return;
    }
    // Step 4: Hash password using bcrypt
    // Salt rounds: 10 means password is hashed 10 times for security
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Step 5: Create new user in database
    const newUser = await user_model_1.User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'customer' // New users are always customers
    });
    // Step 6: Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: newUser._id.toString(), role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    // Step 7: Return success response with token
    res.status(201).json({
        success: true,
        message: 'User registered successfully!',
        token,
        user: {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role
        }
    });
};
exports.register = register;
/**
 * User Login Handler
 * Authenticates user with email and password
 *
 * Steps:
 * 1. Extract email and password from request body
 * 2. Find user in database by email
 * 3. If user not found, return error
 * 4. Compare provided password with hashed password in database
 * 5. If password doesn't match, return error
 * 6. Generate JWT token
 * 7. Return token to client
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    // Step 1: Validate inputs
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required. Please provide both.'
        });
        return;
    }
    // Step 2: Find user by email
    const user = await user_model_1.User.findOne({ email: email.toLowerCase() }).select('+password');
    // Step 3: Check if user exists
    if (!user) {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password. Please try again.'
        });
        return;
    }
    // Step 4: Compare password using bcrypt
    // bcrypt.compare handles the comparison securely
    const passwordMatches = await bcryptjs_1.default.compare(password, user.password);
    // Step 5: Check if password is correct
    if (!passwordMatches) {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password. Please try again.'
        });
        return;
    }
    // Step 6: Generate JWT token
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    // Step 7: Return success response with token
    res.json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });
};
exports.login = login;
