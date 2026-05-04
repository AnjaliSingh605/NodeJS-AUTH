# 🔐 Node.js Auth API – JWT Authentication & Image Upload

A production-ready authentication REST API built with Node.js and Express. Features JWT-based auth, role-based access control, secure password hashing, and Cloudinary image management.

## Features

- **User Authentication** – Register and login with JWT tokens (30min expiry)
- **Password Security** – Bcrypt hashing with salt rounds
- **Change Password** – Secure password update for logged-in users
- **Role-Based Access** – User, Admin, and SuperAdmin roles
- **Protected Routes** – Middleware-based route guarding
- **Image Upload** – Multer handling with 5MB limit
- **Cloud Storage** – Cloudinary integration for image hosting
- **Image Management** – Paginated fetch, sort, and delete
- **Owner Protection** – Users can only delete their own images

## Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT (jsonwebtoken)** – Token-based authentication
- **bcryptjs** – Password hashing
- **Multer** – File upload middleware
- **Cloudinary** – Cloud image storage

## API Endpoints

### Auth Routes
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| POST | `/api/auth/change-password` | Private | Update password |

### Image Routes
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/images/upload` | Private | Upload image |
| GET | `/api/images` | Private | Fetch images (paginated) |
| DELETE | `/api/images/:id` | Private | Delete own image |

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/AnjaliSingh605/nodejs-auth-api.git
cd nodejs-auth-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
CLOUDINARY_Cloud_Name=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

API will run on [http://localhost:5000](http://localhost:5000)

## Author

Anjali Singh
