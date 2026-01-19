const mongoose = require('mongoose');

const ConnectToDB = async ()=>{
    try{
       await mongoose.connect(process.env.mongo_URI);
       console.log("mongoDB connected successfully");
    }catch(err){
        console.error('Mongodb Connection failed');
        process.exit(1);
    }
}

module.exports = ConnectToDB;