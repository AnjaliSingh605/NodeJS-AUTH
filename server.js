require('dotenv').config();
const express = require('express');
const ConnectToDB = require('./Database/db');
const authRoutes = require('./routes/auth-route');
const homeRoutes = require('./routes/home-route');
const adminRoutes = require('./routes/admin-route');
const uploadImageRoutes = require('./routes/image-route');
ConnectToDB();

const app = express();
const PORT = process.env.PORT || 3000

// MIddleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);


app.listen(PORT, ()=>{
    console.log(`server is now running at port ${PORT}`);
})
