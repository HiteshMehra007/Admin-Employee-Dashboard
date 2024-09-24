import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

const uploadToCloudinary = async (localFilePath) => {
    try{
        // No file path found
        if(!localFilePath){
            console.log("No file path found !!");
            return null;
        }
        // otherwise uplaod the file
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        // file has been succesfully uploaded
        // console.log("File has been uplaoded, URL: ", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    }
    catch(error){
        console.error("Error uploading to Cloudinary: ", error);

        // Attempt to remove the local file if it exists
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error("Error removing local file: ", unlinkError);
        }

        return null;

    }
}

export {uploadToCloudinary};