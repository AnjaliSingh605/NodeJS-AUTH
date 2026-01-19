const express = require('express');
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-middleware");
const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res)=>{
    res.status(201).json({
        messgae: "Welcome to admin page"
    })
})

module.exports = router;