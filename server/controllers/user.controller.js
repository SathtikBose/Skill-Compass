const UserService = require('../services/user.service');

class UserController {
  /**
   * Get Current User Profile
   * @route GET /api/v1/users/profile
   */
  static async getProfile(req, res, next) {
    try {
      const user = await UserService.getProfile(req.user.id);
      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update User Profile (Text data)
   * @route PUT /api/v1/users/profile
   */
  static async updateProfile(req, res, next) {
    try {
      const user = await UserService.updateProfile(req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload User Avatar
   * @route POST /api/v1/users/avatar
   */
  static async uploadAvatar(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image provided',
        });
      }

      const user = await UserService.updateAvatar(req.user.id, req.file.buffer);
      
      res.status(200).json({
        success: true,
        message: 'Avatar updated successfully',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
