const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB succesfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

const dbConnection = mongoose.connection;

dbConnection.on('error', (error) => {
    console.error('Connection error:', error);
});

module.exports = {
    dbConnection
};