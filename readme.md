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
  - Create/Edit/Delete blog posts
  - Rich text content support
  - Image upload for posts
- **Social Features**
  - Like posts
  - Search functionality
  - Author profiles
- **Responsive Design**
  - Mobile-first approach
  - Clean and modern UI

## Technologies

**Frontend**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245)
![Axios](https://img.shields.io/badge/-Axios-5A29E4)

**Backend**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

**Other**  
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens)
![Bcrypt](https://img.shields.io/badge/-Bcrypt-525252)
![Render](https://img.shields.io/badge/-Render-46E3B7?logo=render)

## Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000" > .env

npm run dev
