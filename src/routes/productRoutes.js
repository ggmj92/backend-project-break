const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ---- ROUTES ---- //
// Get *all products
router.get('/products', productController.getProducts)

// Get *all products from *one category
router.get('/category/:category', productController.getProductsByCategory);

// Get *one product by its ID
router.get('/products/:productId', productController.getProductById);
// router.get('/dashboard/:productId', productController.getProductById);

// Create a new product
router.post('/dashboard', productController.createProduct);

// Update *one product by its ID
router.put('/products/:productId', productController.updateProductById)
router.put('/dashboard/:productId', productController.updateProductById)

// Delete *one product by its ID
router.delete('/products/:productId', productController.deleteProductById);

// ---- ADMIN DASHBOARD ROUTES ---- //
// // Admin Dashboard Route showing all products
router.get('/dashboard', productController.getProducts);
// router.get('/dashboard', productController.getDashboard);

// // Form for creating a new product
router.get('/dashboard/products/new', productController.getNewProductForm);

// // Form for updating a product
router.get('/products/:productId/edit', productController.editProductForm);
// router.post('/products/:productId/edit', productController.updateProductAndRedirect);
router.put('/products/:productId', productController.updateProductById);

module.exports = router;