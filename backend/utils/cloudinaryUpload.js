const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

async function cloudinaryUpload(ImageInBase64, public_id, imageFormat = 'png') {
    try {
        if (!ImageInBase64 || !imageFormat || !public_id) {
            throw new Error("Image/Image-Format/Image-ID could not be detected.");
        }

        // Configuration
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Remove spaces and newlines from Base64 string
        ImageInBase64 = ImageInBase64.replace(/\s/g, '');

        // Ensure Base64 has the required format prefix
        const base64Image = ImageInBase64.startsWith('data:image')
            ? ImageInBase64
            : `data:image/${imageFormat};base64,${ImageInBase64}`;

        console.log("Uploading to Cloudinary...");

        // Upload the image
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            public_id: public_id,
            resource_type: 'image'
        });

        console.log("Upload successful:", uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log("Optimized URL:", optimizeUrl);

        return {
            success: true,
            data: uploadResult
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return {
            success: false,
            message: error.message || "Something went wrong with image upload."
        };
    }
};

module.exports = cloudinaryUpload;
