import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryUploadResult {
    secure_url: string;
    display_name: string;
    public_id: string;
}


export async function uploadToCloudinary(buffer: Buffer): Promise<CloudinaryUploadResult> {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!buffer || buffer.length === 0) {
        throw new Error('Invalid buffer provided for upload');
    }

    try {

        // Upload an image
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error('No result from Cloudinary'));
                const cloudinaryUploadResult: CloudinaryUploadResult = {
                    secure_url: result.secure_url,
                    display_name: result.display_name, 
                    public_id: result.public_id
                };
                resolve(cloudinaryUploadResult);
            })
            uploadStream.end(buffer);
        })

        //Optimize delivery by resizing and applying auto-format and auto-quality
        cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });


        // // Transform the image: auto-crop to square aspect_ratio
        cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        return uploadResult
    } catch (e) {
        console.error("Cloudinary upload error:", e);
        throw e;
    }
};