const Image = require("../model/image");
const { uploadToCloudinary } = require("../helper/cloudinary-helper");
const fs = require('fs');
const cloudinary = require("../config/cloudinary");

const UploadImageController = async(req, res)=>{
    try{
       // check if file is missing in reqq obj
       if(!req.file){
        return res.status(400).json({
            success: false,
            message: "File is required. Please upload an image"
        })
       }

       // upload to cloudinary
       const{url, publicId} = await uploadToCloudinary(req.file.path);

       // store img url and publicID along with uploaded userID in Database
       const newImg = new Image({
        url,
        publicId,
        uploadedBy : req.userInfo.userId
       })

       await newImg.save();

       // delete file from local storgae
       fs.unlinkSync(req.file.path);

       res.status(201).json({
        success : true,
        message : "Img uploaded successfully",
        Img : newImg
       })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again"
        })
    }
};

const fetchImageController = async(req, res)=>{
    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page-1)*limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                success : true,
                totalImages : totalImages,
                currentPage : page,
                totalPages : totalPages,
                data : images,
            });
        }

    }catch(err){
           console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again"
        })
    }
}

const deleteImgController = async(req, res)=>{
    try{
        const getCurrImgIdtoDelete = req.params.id;
        const userid = req.userInfo.userId;

        const image = await Image.findById(getCurrImgIdtoDelete);

        if(!image){
            return res.status(404).json({
                success : false,
                message : "Image not found. Try different ID"
            })
        }

        if(image.uploadedBy.toString()!==userid){
            return res.status(403).json({
                success : false,
                message : "You are not autherized to delete someone else uploaded Img"
            })
        }

        // delete img from cloudinary first
         await cloudinary.uploader.destroy(image.publicId);

         // delete from mongodb database
         await Image.findByIdAndDelete(getCurrImgIdtoDelete);

         res.status(200).json({
            success : true,
            message : "Image deleted successfully"
         })
                                                                              

    }catch(err){
      console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again"
        })
    }
}

module.exports = {
    UploadImageController,
    fetchImageController,
    deleteImgController
};