const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file stream to Cloudinary
 * @param {Buffer} fileBuffer
 * @param {String} folder
 * @returns {Promise<Object>}
 */
const uploadToCloudinary = (fileBuffer, folder = 'skillcompass/avatars') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Delete a file from Cloudinary by public ID
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

/**
 * Uploads a raw file stream (like PDF) to Cloudinary
 * @param {Buffer} fileBuffer
 * @param {String} folder
 * @returns {Promise<Object>}
 */
const uploadRawToCloudinary = (fileBuffer, folder = 'skillcompass/resumes') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw', // For PDFs
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  uploadRawToCloudinary,
  deleteFromCloudinary,
};

