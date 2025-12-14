"use strict";
/**
 * Sweet Controller
 *
 * Handles all CRUD operations for sweets (candies/sweets inventory).
 *
 * Main operations:
 * - createSweet: Add new sweet to inventory (auth required)
 * - getAllSweets: Get all sweets in inventory (public)
 * - searchSweets: Search by name, category, or price range (public)
 * - updateSweet: Update sweet details (auth required)
 * - deleteSweet: Remove sweet from inventory (admin only)
 *
 * Each function includes step-by-step comments so anyone
 * can understand the logic without needing to know code details.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSweet = exports.updateSweet = exports.searchSweets = exports.getAllSweets = exports.createSweet = void 0;
const sweet_model_1 = require("../models/sweet.model");
/**
 * Create a new sweet in the inventory
 * Only authenticated users can add sweets
 *
 * Steps:
 * 1. Extract sweet details from request body
 * 2. Validate that required fields are provided
 * 3. Create sweet in database
 * 4. Return the created sweet
 */
const createSweet = async (req, res) => {
    const { name, category, price, quantity } = req.body;
    // Step 2: Validate inputs
    if (!name || !category || price === undefined || quantity === undefined) {
        res.status(400).json({
            success: false,
            message: 'All fields (name, category, price, quantity) are required.'
        });
        return;
    }
    // Validate that price and quantity are non-negative numbers
    if (price < 0 || quantity < 0) {
        res.status(400).json({
            success: false,
            message: 'Price and quantity cannot be negative.'
        });
        return;
    }
    // Step 3: Create sweet in database
    const newSweet = await sweet_model_1.Sweet.create({
        name: name.trim(),
        category: category.trim(),
        price,
        quantity
    });
    // Step 4: Return the created sweet
    res.status(201).json({
        success: true,
        message: 'Sweet created successfully!',
        sweet: newSweet
    });
};
exports.createSweet = createSweet;
/**
 * Get all sweets from inventory
 * Public endpoint - anyone can view sweets
 *
 * Steps:
 * 1. Query all sweets from database
 * 2. Return the list
 */
const getAllSweets = async (req, res) => {
    // Step 1: Query all sweets from database
    const sweets = await sweet_model_1.Sweet.find();
    // Step 2: Return the list
    res.json({
        success: true,
        message: `Found ${sweets.length} sweets`,
        sweets
    });
};
exports.getAllSweets = getAllSweets;
/**
 * Search for sweets with filters
 * Public endpoint - anyone can search
 *
 * Query parameters:
 * - name: Search by sweet name (case-insensitive partial match)
 * - category: Filter by category (exact match)
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 *
 * Steps:
 * 1. Extract search filters from query parameters
 * 2. Build MongoDB query based on filters
 * 3. Execute query
 * 4. Return results
 */
const searchSweets = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    // Step 1 & 2: Build search query object
    // Start with an empty query and add conditions based on provided filters
    const query = {};
    // Filter by name if provided (case-insensitive search)
    if (name && typeof name === 'string') {
        query.name = { $regex: name, $options: 'i' }; // 'i' means case-insensitive
    }
    // Filter by category if provided
    if (category && typeof category === 'string') {
        query.category = category.trim();
    }
    // Filter by price range if provided
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) {
            query.price.$gte = parseFloat(minPrice); // >= minPrice
        }
        if (maxPrice) {
            query.price.$lte = parseFloat(maxPrice); // <= maxPrice
        }
    }
    // Step 3: Execute search query
    const sweets = await sweet_model_1.Sweet.find(query);
    // Step 4: Return results
    res.json({
        success: true,
        message: `Found ${sweets.length} matching sweets`,
        sweets
    });
};
exports.searchSweets = searchSweets;
/**
 * Update sweet details by ID
 * Authenticated users can update sweets
 *
 * Parameters:
 * - id: Sweet ID to update
 *
 * Request body can contain:
 * - name, category, price, quantity
 *
 * Steps:
 * 1. Extract sweet ID from URL parameter
 * 2. Extract updated fields from request body
 * 3. Find and update the sweet
 * 4. Return updated sweet or 404 if not found
 */
const updateSweet = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    // Step 2: Validate update data
    if (updateData.price !== undefined && updateData.price < 0) {
        res.status(400).json({
            success: false,
            message: 'Price cannot be negative.'
        });
        return;
    }
    if (updateData.quantity !== undefined && updateData.quantity < 0) {
        res.status(400).json({
            success: false,
            message: 'Quantity cannot be negative.'
        });
        return;
    }
    // Step 3: Find and update the sweet
    const updatedSweet = await sweet_model_1.Sweet.findByIdAndUpdate(id, { ...updateData }, { new: true, runValidators: true } // new: true returns updated document
    );
    // Step 4: Check if sweet was found and updated
    if (!updatedSweet) {
        res.status(404).json({
            success: false,
            message: 'Sweet not found. Check the ID and try again.'
        });
        return;
    }
    res.json({
        success: true,
        message: 'Sweet updated successfully!',
        sweet: updatedSweet
    });
};
exports.updateSweet = updateSweet;
/**
 * Delete a sweet from inventory
 * Only admin users can delete sweets
 * This function is protected by requireAdmin middleware
 *
 * Parameters:
 * - id: Sweet ID to delete
 *
 * Steps:
 * 1. Extract sweet ID from URL parameter
 * 2. Find and delete the sweet
 * 3. Return success or 404 if not found
 */
const deleteSweet = async (req, res) => {
    const { id } = req.params;
    // Step 2: Find and delete the sweet
    const deletedSweet = await sweet_model_1.Sweet.findByIdAndDelete(id);
    // Step 3: Check if sweet was found and deleted
    if (!deletedSweet) {
        res.status(404).json({
            success: false,
            message: 'Sweet not found. Check the ID and try again.'
        });
        return;
    }
    res.json({
        success: true,
        message: `Sweet "${deletedSweet.name}" deleted successfully!`,
        sweet: deletedSweet
    });
};
exports.deleteSweet = deleteSweet;
