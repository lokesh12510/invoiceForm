const { cloudinary } = require("../utils/cloudinary");

// @desc    Upload Image to Cloudinary
// @route   POST /api/tools/upload
// @access  Private
const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  const post_details = {
    title: new Date(),
    image: result.secure_url,
  };

  res.status(200).json(post_details);
};

module.exports = {
  uploadImage,
};
