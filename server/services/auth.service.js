const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  /**
   * Issue a JWT for a user
   */
  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Token expires in 7 days
    });
  }

  /**
   * Register a new user
   */
  static async registerUser(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('Email is already registered');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      provider: 'local',
    });

    await user.save();
    const token = this.generateToken(user._id);

    return { user, token };
  }

  /**
   * Authenticate a user
   */
  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    if (user.provider !== 'local') {
      const error = new Error(`Please login using ${user.provider}`);
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = this.generateToken(user._id);
    return { user, token };
  }

  /**
   * Find user by ID
   */
  static async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
  
  // Future Google OAuth support can be added here
}

module.exports = AuthService;
