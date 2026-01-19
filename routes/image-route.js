const express = require("express");
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-middleware");
const uploadMiddleware = require("../Middleware/upload-middleware")
const router = express.Router();
const {UploadImageController, fetchImageController, deleteImgController} = require("../controllers/image-controller")

// upload the img
router.post(
    "/upload", 
    authMiddleware, 
    adminMiddleware, 
    uploadMiddleware.single('image'),
    UploadImageController
 );

// to get all img
router.get("/get",authMiddleware, fetchImageController);

// to delete img
router.delete("/:id", authMiddleware, adminMiddleware, deleteImgController);

module.exports = router;

// 6969bc51b9e585a8509f7fa7