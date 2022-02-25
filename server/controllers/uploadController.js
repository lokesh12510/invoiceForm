const { cloudinary } = require("../utils/cloudinary");

// @desc    Upload Image to Cloudinary
// @route   POST /api/tools/upload
// @access  Private
const uploadImage = async (req, res) => {
  console.log("File", req.file);

  // cloudinary.v2.uploader.upload(file, options, callback);
  const result = await cloudinary.uploader.upload(req.file.path);

  console.log(result, "res");

  const post_details = {
    title: new Date(),
    image: result.secure_url,
  };

  res.status(200).json(post_details);
};

module.exports = {
  uploadImage,
};
