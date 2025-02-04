const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

async function cloudinaryUpload(ImageInBase64) {
    try {

        // Configuration
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                'https://placehold.co/600x400.jpg', {
                public_id: 'shoes',
            }
            )
            .catch((error) => {
                console.log(error);
            });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        // const autoCropUrl = cloudinary.url('shoes', {
        //     crop: 'auto',
        //     gravity: 'auto',
        //     width: 500,
        //     height: 500,
        // });

        // console.log(autoCropUrl);    

        return {
            success: true,
            data: uploadResult
        }
    }
    catch (error) {
        return {
            success: false,
            data: error.message || "Something went wrong with image upload."
        }
    }
};

module.exports = cloudinaryUpload;