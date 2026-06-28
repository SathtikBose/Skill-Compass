const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary');

class UserService {
  /**
   * Get user profile by ID
   */
  static async getProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  /**
   * Update user profile text fields
   */
  static async updateProfile(userId, profileData) {
    const allowedFields = ['name', 'jobTitle', 'bio', 'linkedIn', 'github'];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (profileData[field] !== undefined) {
        updateData[field] = profileData[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  /**
   * Upload and update user avatar
   */
  static async updateAvatar(userId, fileBuffer) {
    // Note: If they had an old avatar, we could delete it from Cloudinary here
    // using deleteFromCloudinary if we store the public_id in the DB.
    
    const result = await uploadToCloudinary(fileBuffer);
    
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    ).select('-password');

    return user;
  }
}

module.exports = UserService;
