"use strict";
/**
 * Sweet Routes
 *
 * Defines all sweet management API endpoints.
 * Handles CRUD operations and inventory management.
 *
 * Public Routes:
 * GET / - Get all sweets
 * GET /search - Search and filter sweets
 *
 * Protected Routes (Authenticated users only):
 * POST / - Create new sweet
 * PUT /:id - Update sweet details
 * POST /:id/purchase - Purchase sweet (decreases inventory)
 *
 * Admin Routes (Admin only):
 * DELETE /:id - Delete sweet
 * POST /:id/restock - Restock sweet (increases inventory)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sweet_controller_1 = require("../controllers/sweet.controller");
const inventory_controller_1 = require("../controllers/inventory.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
/**
 * GET /api/sweets
 * Retrieve all available sweets from inventory
 * Public endpoint - no authentication required
 */
router.get('/', sweet_controller_1.getAllSweets);
/**
 * GET /api/sweets/search?name=...&category=...&minPrice=...&maxPrice=...
 * Search and filter sweets by name, category, and price range
 * Public endpoint - no authentication required
 */
router.get('/search', sweet_controller_1.searchSweets);
/**
 * POST /api/sweets
 * Add a new sweet to inventory
 * Protected endpoint - authentication required
 *
 * Request body:
 * {
 *   name: string (required)
 *   category: string (required)
 *   price: number (required, >= 0)
 *   quantity: number (required, >= 0)
 * }
 */
router.post('/', auth_middleware_1.authenticate, sweet_controller_1.createSweet);
/**
 * PUT /api/sweets/:id
 * Update details of an existing sweet
 * Protected endpoint - authentication required
 *
 * Request body (any combination):
 * {
 *   name?: string
 *   category?: string
 *   price?: number
 *   quantity?: number
 * }
 */
router.put('/:id', auth_middleware_1.authenticate, sweet_controller_1.updateSweet);
/**
 * POST /api/sweets/:id/purchase
 * Purchase one unit of a sweet (decrease inventory by 1)
 * Protected endpoint - authentication required
 *
 * Note: Quantity must be > 0 to allow purchase
 */
router.post('/:id/purchase', auth_middleware_1.authenticate, inventory_controller_1.purchaseSweet);
/**
 * DELETE /api/sweets/:id
 * Remove sweet from inventory permanently
 * Admin-only endpoint - authentication and admin role required
 */
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, sweet_controller_1.deleteSweet);
/**
 * POST /api/sweets/:id/restock
 * Add more units of a sweet to inventory
 * Admin-only endpoint - authentication and admin role required
 *
 * Request body:
 * {
 *   quantity: number (required, > 0)
 * }
 */
router.post('/:id/restock', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, inventory_controller_1.restockSweet);
exports.default = router;
