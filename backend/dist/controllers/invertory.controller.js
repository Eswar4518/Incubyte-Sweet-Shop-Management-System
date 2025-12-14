"use strict";
/**
 * Inventory Controller
 *
 * Handles inventory operations for sweets:
 * - purchaseSweet: Customer buys a sweet (decreases quantity)
 * - restockSweet: Admin restocks sweets (increases quantity)
 *
 * Business Rules:
 * - Purchase: Quantity must be > 0, decreases by 1 per purchase
 * - Restock: Admin only, can increase quantity by any amount
 *
 * Step-by-step comments explain each operation clearly.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = void 0;
const sweet_model_1 = require("../models/sweet.model");
/**
 * Purchase a sweet (Customer operation)
 * Decreases sweet quantity by 1 when customer buys it
 *
 * Business Rules:
 * - Sweet must exist
 * - Quantity must be > 0 (cannot buy out-of-stock items)
 * - Quantity decreases by 1
 *
 * Parameters:
 * - id: Sweet ID to purchase
 *
 * Steps:
 * 1. Find the sweet by ID
 * 2. Check if sweet exists
 * 3. Check if quantity is available (> 0)
 * 4. Decrease quantity by 1
 * 5. Save the sweet
 * 6. Return updated sweet or error message
 */
const purchaseSweet = async (req, res) => {
    const { id } = req.params;
    // Step 1: Find the sweet by ID
    const sweet = await sweet_model_1.Sweet.findById(id);
    // Step 2: Check if sweet exists
    if (!sweet) {
        res.status(404).json({
            success: false,
            message: 'Sweet not found. Cannot purchase a sweet that does not exist.'
        });
        return;
    }
    // Step 3: Check if quantity is available
    if (sweet.quantity <= 0) {
        res.status(400).json({
            success: false,
            message: `"${sweet.name}" is currently out of stock. Sorry!`
        });
        return;
    }
    // Step 4 & 5: Decrease quantity and save
    sweet.quantity -= 1;
    await sweet.save();
    // Step 6: Return success response
    res.json({
        success: true,
        message: `Successfully purchased "${sweet.name}"!`,
        sweet: {
            id: sweet._id,
            name: sweet.name,
            price: sweet.price,
            remainingQuantity: sweet.quantity
        }
    });
};
exports.purchaseSweet = purchaseSweet;
/**
 * Restock a sweet (Admin operation)
 * Increases sweet quantity by the specified amount
 * This endpoint is protected by requireAdmin middleware
 *
 * Business Rules:
 * - Only admin users can restock
 * - Amount to add must be provided
 * - Amount must be positive (> 0)
 * - Increases quantity by the specified amount
 *
 * Parameters:
 * - id: Sweet ID to restock
 *
 * Request body:
 * - quantity: Amount to increase by (must be positive number)
 *
 * Steps:
 * 1. Extract restock quantity from request body
 * 2. Validate that quantity is provided and positive
 * 3. Find the sweet by ID
 * 4. Check if sweet exists
 * 5. Increase sweet quantity
 * 6. Save the sweet
 * 7. Return updated sweet or error message
 */
const restockSweet = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    // Step 2: Validate restock quantity
    if (quantity === undefined || quantity === null) {
        res.status(400).json({
            success: false,
            message: 'Restock quantity is required. Please provide the amount to add.'
        });
        return;
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        res.status(400).json({
            success: false,
            message: 'Restock quantity must be a positive number (> 0).'
        });
        return;
    }
    // Step 3: Find the sweet by ID
    const sweet = await sweet_model_1.Sweet.findById(id);
    // Step 4: Check if sweet exists
    if (!sweet) {
        res.status(404).json({
            success: false,
            message: 'Sweet not found. Cannot restock a sweet that does not exist.'
        });
        return;
    }
    // Step 5 & 6: Increase quantity and save
    const previousQuantity = sweet.quantity;
    sweet.quantity += quantity;
    await sweet.save();
    // Step 7: Return success response
    res.json({
        success: true,
        message: `Successfully restocked "${sweet.name}"!`,
        sweet: {
            id: sweet._id,
            name: sweet.name,
            previousQuantity,
            addedQuantity: quantity,
            newQuantity: sweet.quantity
        }
    });
};
exports.restockSweet = restockSweet;
