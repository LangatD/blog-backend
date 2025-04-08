# Healthy Living Blog - MERN Stack

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![MERN](https://img.shields.io/badge/stack-MERN-00f.svg)](https://www.mongodb.com/mern-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack blog application focused on health and wellness topics, built with the MERN stack (MongoDB, Express, React, Node.js).

![Demo Screenshot](/screenshots/demo.png) <!-- Add your screenshot path -->

## Features

- **User Authentication**
  - Secure JWT-based registration/login
  - Protected routes for authenticated users
- **Blog Management**
  - Create blog posts
  - Image upload for posts
  - Like posts
  - Search functionality
  - Author profiles
- **Responsive Design**
  - Responsive frontend built with React.
  - Clean and modern UI

## Technologies
- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB 
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing
- **Deployment:** Render 
- **Testing:** Jest

## Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Git
- Render

### Backend Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd mern-blog/backend
   
2. Install Dependencies
```bash
cd Backend
npm install

3.Set up environmental variables # Create .env file

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
4. RUn the backedn
npm start

### Frontend Setup
1. Navigate to the Frontend Directory and install dependecies
```bash
cd ../frontend
npm install
2
REACT_APP_API_URL=http://localhost:5000
3. trrun frontend
npm start
to run frontend tests
npm test

## License
This project is licensed under the MIT License. 
