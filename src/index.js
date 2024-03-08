const express = require('express'); // Express.js framework for building web apps
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Node.js module for working with file paths
const mongoose = require('mongoose');
const session = require('express-session'); // Middleware for managing user sessions
const swaggerUI = require('swagger-ui-express'); // Swagger UI for API documentation
// const docs = require('./docs/index');

// Importing database connection configuration
const { dbConnection } = require('./config/db');

//Creating an Express application
const app = express();

// Configuring session management
app.use(session({
    secret: process.env.SECRET_KEY || 'secret_key', // Secret key for session data encryption
    resave: false, // Dont save session data if not modified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
        secure: false, // Set to true for HTTPS-only cookies
        maxAge: 1000 * 60 *  60 * 24 * 7 // Session duration (7 days in milliseconds)
    }
}));

// Parsing URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Defining routes for handling requests
const routes = require('./routes/productRoutes');
// const authRoutes = require('./routes/auhtRoutes');

// Mounting product routes at the root URL and mounting authentication routes
app.use('/', routes);

// Serving static files from the 'public' directory
const public = path.resolve(__dirname, '..', 'public');
app.use(express.static(public));

// Establishing a database connection
dbConnection;

// Setting up Swagger documentation endpoint
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

//Defining the port for the server to listen on
const PORT = 3001;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});