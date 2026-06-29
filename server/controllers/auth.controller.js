const AuthService = require('../services/auth.service');

class AuthController {
  /**
   * Register User
   * @route POST /api/v1/auth/register
   */
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      
      // Basic validation (will be improved with a validator middleware later)
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password',
        });
      }

      const { user, token } = await AuthService.registerUser({ name, email, password });

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   * @route POST /api/v1/auth/login
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password',
        });
      }

      const { user, token } = await AuthService.loginUser(email, password);

      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Current User
   * @route GET /api/v1/auth/me
   */
  static async getMe(req, res, next) {
    try {
      const user = await AuthService.getUserById(req.user.id);
      
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Google Login
   * @route POST /api/v1/auth/google
   */
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid Google token',
        });
      }

      const { user, token: appToken } = await AuthService.googleLogin(token);

      res.status(200).json({
        success: true,
        message: 'Logged in with Google successfully',
        data: { user, token: appToken },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
