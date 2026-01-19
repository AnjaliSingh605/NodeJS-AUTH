const express = require('express');
const  {LoginUser, registerUser, changePassword} = require('../controllers/auth-controller');
const router = express.Router();
const authMiddleware = require("../Middleware/auth-middleware")

// all routes are related to authentication & authorization
router.post('/register', registerUser);
router.post('/login', LoginUser);
router.post('/change-password', authMiddleware, changePassword);


module.exports = router;