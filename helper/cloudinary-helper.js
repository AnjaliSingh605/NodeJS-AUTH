const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async(filepath)=>{
    try{

        const result = await cloudinary.uploader.upload(filepath);

        return {
            url : result.secure_url,
            publicId : result.public_id,
        }

    }catch(err){
        console.log("Error while uploading to cloudinary", err);
        throw new Error("Error while uploading to cloudinary");
    }
}

module.exports = {
    uploadToCloudinary
}