import supabase from '../config/database.js';

class User {
  constructor(userData = {}) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.created_at = userData.created_at;
  }

  /**
   * Create a new user in the database
   * @param {Object} userData - User data (name, email)
   * @returns {Promise<Object>} Created user data
   */
  static async create(userData) {
    try {
      const { name, email } = userData;

      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }])
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users from the database
   * @returns {Promise<Array>} Array of user objects
   */
  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return data.map(userData => new User(userData));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw new Error(`Database error: ${error.message}`);
      }

      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw new Error(`Database error: ${error.message}`);
      }

      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user data
   * @param {number} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user object
   */
  static async update(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate user data
   * @param {Object} userData - User data to validate
   * @returns {Object} Validation result
   */
  static validate(userData) {
    const errors = [];

    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }

    if (!userData.email || typeof userData.email !== 'string') {
      errors.push('Email is required and must be a string');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        errors.push('Email must be a valid email address');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default User;
