# Backend Project Break
This is a simple e-commerce application built using Express.js, Mongoose, and Swagger. It allows you to create, read, update, and delete products.

## Table of Contents
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
You will need the following tools installed on your computer:
- Node.js
- MongoDB

# Installing
1. Clone the project repository:
- git clone https://github.com/your-username/your-repo.git
2. Install the dependencies:
- cd your-repo
- npm install
3. Create a .env file in the project root directory and add the following content:
- MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-db-name
- PORT=3001
Replace the values with your actual MongoDB URI and desired port number.
4. Start the application:
- npm start
- The application will be available at http://localhost:3001.

# Technologies Used
- Express.js: A web application framework for Node.js.
- Mongoose: An Object-Document Mapping (ODM) library for MongoDB and Node.js.
- Swagger: A documentation tool for RESTful APIs.

# API Endpoints
The API endpoints are defined in the src/routes/productRoutes.js file.

- Products
- GET /products: Retrieve all products.
- GET /category/:category: Retrieve all products from a specific category.
- GET /products/:productId: Retrieve a single product by its ID.
- POST /dashboard: Create a new product.
- PUT /products/:productId: Update an existing product by its ID.
- DELETE /products/:productId: Delete a product by its ID.

# Running the Application
To run the application, follow the instructions in the Getting Started section. Once the application is running, you can use a tool like Postman to test the API endpoints.

To view the Swagger documentation, visit http://localhost:3001/api-docs in your browser.