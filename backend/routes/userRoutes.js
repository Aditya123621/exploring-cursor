import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

/**
 * User Routes
 * All routes are prefixed with /users
 */

// GET /users - Get all users
router.get('/', UserController.getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', UserController.getUserById);

// POST /users - Create new user
router.post('/', UserController.createUser);

// PUT /users/:id - Update user by ID
router.put('/:id', UserController.updateUser);

// DELETE /users/:id - Delete user by ID
router.delete('/:id', UserController.deleteUser);

export default router;
