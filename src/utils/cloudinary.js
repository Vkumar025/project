import cloudinary  from 'cloudinary'
import fs from 'fs' //file system to read write sinc asycn etc to change perssions for file etc

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Auto-detect if it's an image, video, etc.
        });

        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        // UPLOAD FAILED:
        // We must remove the locally saved temporary file because the operation failed.
        // If we don't, our server will fill up with garbage files.
        fs.unlinkSync(localFilePath); 
        console.log("CLOUDINARY UPLOAD FAILED: ", error); // <--- Add this line!
        return null;
    }
} 
export {uploadOnCloudinary}