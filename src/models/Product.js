const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, 
        required: [true, 'You must input a name for this product'] 
    },
    description: String, 
    // imageUrl: String,
    category: {
        type: String, 
        enum: ['shirts', 'pants', 'shoes', 'accessories'],
        required: [true, 'You must input a category for this product']
    },
    size: {
        type: String, required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: [true, 'You must input a size for this product']
    },
    price: { type: Number, 
        required: [true, 'You must input a price for this product'],
        min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);