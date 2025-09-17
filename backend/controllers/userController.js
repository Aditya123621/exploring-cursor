import User from '../models/User.js';

/**
 * User Controller
 * Handles all user-related business logic
 */
class UserController {
  /**
   * Create a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static async createUser(req, res, next) {
    try {
      const { name, email } = req.body;

      // Validate input data
      const validation = User.validate({ name, email });
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed - looks like your data needs some validation therapy! 😅',
            details: validation.errors
          }
        });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: {
            message: 'User with this email already exists. Please use a different email address.',
            details: 'This email address is already taken - looks like someone beat you to the punch! 📧'
          }
        });
      }

      // Create new user
      const newUser = await User.create({ name: name.trim(), email: email.trim().toLowerCase() });

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          user: newUser
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: {
          users,
          count: users.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid user ID',
            details: 'User ID must be a valid number'
          }
        });
      }

      const user = await User.findById(parseInt(id));

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found',
            details: `No user found with ID ${id}`
          }
        });
      }

      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid user ID',
            details: 'User ID must be a valid number'
          }
        });
      }

      // Check if user exists
      const existingUser = await User.findById(parseInt(id));
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found',
            details: `No user found with ID ${id}`
          }
        });
      }

      // Validate update data
      if (updateData.name || updateData.email) {
        const validation = User.validate({
          name: updateData.name || existingUser.name,
          email: updateData.email || existingUser.email
        });

        if (!validation.isValid) {
          return res.status(400).json({
            success: false,
            error: {
              message: 'Validation failed',
              details: validation.errors
            }
          });
        }
      }

      // Check for email uniqueness if email is being updated
      if (updateData.email && updateData.email !== existingUser.email) {
        const userWithEmail = await User.findByEmail(updateData.email);
        if (userWithEmail) {
          return res.status(409).json({
            success: false,
            error: {
              message: 'Email already exists',
              details: 'Another user with this email already exists'
            }
          });
        }
      }

      // Prepare clean update data
      const cleanUpdateData = {};
      if (updateData.name) cleanUpdateData.name = updateData.name.trim();
      if (updateData.email) cleanUpdateData.email = updateData.email.trim().toLowerCase();

      // Update user
      const updatedUser = await User.update(parseInt(id), cleanUpdateData);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: {
          user: updatedUser
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid user ID',
            details: 'User ID must be a valid number'
          }
        });
      }

      // Check if user exists
      const existingUser = await User.findById(parseInt(id));
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found',
            details: `No user found with ID ${id}`
          }
        });
      }

      // Delete user
      await User.delete(parseInt(id));

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: {
          deletedUserId: parseInt(id)
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
