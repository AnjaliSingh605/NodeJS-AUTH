const User = require('../model/user');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register controller
const registerUser = async(req, res) =>{
    try{ 
        //extract user info from request body
    const {
        username, email, password, role
    } = req.body;

    // check if user already exist in our database
    const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
    if(checkExistingUser){
        return res.status(400).json({
            success: false,
            message: 'User is already exists either with same username or same email please try with different username or email'
        })
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in your database
    const newlyCreatedUser = new User({
        username,
        email,
        password : hashedPassword,
        role : role || 'user'
    })

    await newlyCreatedUser.save();

    if(newlyCreatedUser){
        res.status(201).json({
            success : true,
            messgae : 'User registration is successfully'
        })
    }else{
        res.status(400).json({
            success : false,
            message : 'Unable to register User please try again'
        });
    }

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message: "Some error occured ! Please try again",
        });
    }                    
}

// login controller

const LoginUser = async(req, res)=>{
     try{
       const {username, password} = req.body;

       // find if the current user  exists in database or not
       const user = await User.findOne({username})
       
       if(!user){
        res.status(400).json({
            success : false,
            message : "User doesn't exists"
        })
       }
       // if the password is correct or not
        const PasswordMatch = await bcrypt.compare(password, user.password);

        if(!PasswordMatch){
            res.status(400).json({
            success : false,
            message : "Invalid Credential"
        })
        }

        // create user token
        const accesstoken = jwt.sign({
         userId : user._id,
         username : user.username,
         role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : "30m"
        })

        res.status(200).json({
            success : true,
            message : "Logged in Successful",
            accesstoken
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message: "Some error occured ! Please try again",
        });
    }   
};

const changePassword = async(req, res)=>{
    try{
      const userid = req.userInfo.userId;
      
      // extract old and new password
      const {oldpassword, newpassword} = req.body;

      // find the curr logedin user
       const user = await User.findById(userid);

       if(!user){
        return res.status(400).json({
            success : false,
            message : 'User not found'
        })
       }

       // check if old password is correct
       const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);

       if(!isPasswordMatch){
        return res.status(400).json({
            success : false,
            message : 'Old password not correct . Try again'
        })
       }

       // hash the new password
       const salt = await bcrypt.genSalt(10);
       const newhashPassword = await bcrypt.hash(newpassword, salt);

       // update user password
       user.password = newhashPassword;
       await user.save();

       res.status(200).json({
        sucess: true,
        message : "Password changed successfully"
       })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message: "Some error occured ! Please try again",
        });
    }
}

module.exports = { LoginUser, registerUser , changePassword};