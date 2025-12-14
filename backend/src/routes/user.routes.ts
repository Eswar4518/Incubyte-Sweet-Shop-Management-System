import { Router } from 'express';
import { getAllUsers, createUser, deleteUser, updateUser, updateUserRole } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

// Admin-only routes for user management
router.get('/', authenticate, requireAdmin, getAllUsers);
router.post('/', authenticate, requireAdmin, createUser);
router.put('/:id', authenticate, requireAdmin, updateUser);
router.delete('/:id', authenticate, requireAdmin, deleteUser);
router.put('/:id/role', authenticate, requireAdmin, updateUserRole);

export default router;