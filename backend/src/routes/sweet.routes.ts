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

import { Router } from 'express';
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} from '../controllers/sweet.controller';
import { purchaseSweet, restockSweet } from '../controllers/inventory.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

/**
 * GET /api/sweets
 * Retrieve all available sweets from inventory
 * Public endpoint - no authentication required
 */
router.get('/', getAllSweets);

/**
 * GET /api/sweets/search?name=...&category=...&minPrice=...&maxPrice=...
 * Search and filter sweets by name, category, and price range
 * Public endpoint - no authentication required
 */
router.get('/search', searchSweets);

/**
 * POST /api/sweets
 * Add a new sweet to inventory
 * Admin-only endpoint - authentication and admin role required
 *
 * Request body:
 * {
 *   name: string (required)
 *   category: string (required)
 *   price: number (required, >= 0)
 *   quantity: number (required, >= 0)
 * }
 */
router.post('/', authenticate, requireAdmin, createSweet);

/**
 * PUT /api/sweets/:id
 * Update details of an existing sweet
 * Admin-only endpoint - authentication and admin role required
 *
 * Request body (any combination):
 * {
 *   name?: string
 *   category?: string
 *   price?: number
 *   quantity?: number
 * }
 */
router.put('/:id', authenticate, requireAdmin, updateSweet);

/**
 * POST /api/sweets/:id/purchase
 * Purchase one unit of a sweet (decrease inventory by 1)
 * Protected endpoint - authentication required
 *
 * Note: Quantity must be > 0 to allow purchase
 */
router.post('/:id/purchase', authenticate, purchaseSweet);

/**
 * DELETE /api/sweets/:id
 * Remove sweet from inventory permanently
 * Admin-only endpoint - authentication and admin role required
 */
router.delete('/:id', authenticate, requireAdmin, deleteSweet);

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
router.post('/:id/restock', authenticate, requireAdmin, restockSweet);

export default router;
