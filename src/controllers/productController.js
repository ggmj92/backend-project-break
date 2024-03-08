const Product = require('../models/Product');

const getProductCards = (product) => {
    return `
        <a href=/products/${product._id} class="productCard">
           <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>${product.size}<p>
            <p>${product.description}</p>
        </a>
    `;
};

const navBar = () => {
    return `
    <div class="navbar">
        <a href="/home">Home</a>
        <a href="/category/shirts">Shirts</a>
        <a href="/category/pants">Pants</a>
        <a href="/category/shoes">Shoes</a>
        <a href="/category/accessories">Accessories</a>
        <a href="/dashboard/products/new">Create New Product</a>
    </div>
`;
}

exports.getSingleProductCard = (product) => {
    return `
        <div class="singleProduct">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <a href="/products/${product._id}/edit">Edit Product</a>
            <form action="/products/${product._id}" method="post">
                <input type="hidden" name="_method" value="DELETE">
                <button type="submit">Delete Product</button>
            </form>
        </div>
    `;
};

exports.getNewProductForm = () => {
    return `
        <form action="/dashboard" method="post">
            <input type="text" name="productName" placeholder="Product Name" required>
            <input type="text" name="productDescription" placeholder="Description" required>
            <input type="text" name="productCategory" placeholder="Category" required>
            <input type="text" name="productSize" placeholder="Size" required>
            <input type="number" name="productPrice" placeholder="Price" required>
            <button type="submit">Add Product</button>
        </form>
    `;
};

const getEditProductForm = (product) => {
    return `
        <form action="/products/${product._id}" method="put">
            <input type="text" name="productName" value="${product.name}" required>
            <input type="text" name="productDescription" value="${product.description}" required>
            <input type="text" name="productCategory" value="${product.category}" required>
            <input type="text" name="productSize" value="${product.size}" required>
            <input type="number" name="productPrice" value="${product.price}" required>
            <button type="submit">Update Product</button>
            <input type="hidden" name="_method" value="DELETE">
            <button type="submit">Delete Product</button>
        </form>
    `;
};

exports.updateProductAndRedirect = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = req.body;

        const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Redirect to the single product view
        res.redirect(`/products/${productId}`);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// CREATE BASE HTML PAGE FOR PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        const productCards = products.map(getProductCards).join('');

        const baseHtml = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" type="text/css" href="/styles.css">
                </head>
                <body>
                ${navBar()}
                <div class="productContainer">
                    ${productCards}
                </div>
                </body>
            </html>
            `;

        res.send(baseHtml);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

};

exports.editProductForm = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const editFormHtml = getEditProductForm(product);
        res.send(editFormHtml);
    } catch (error) {
        console.error('Error fetching product for editing:', error);
        res.status(500).json({ error: 'Server error' });
    }
    res.send(editFormHtml);
};


// GET ALL PRODUCTS:
// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error.message);
//     }
// };

// GET ALL PRODUCTS FROM ONE CATEGORY:
exports.getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category: category });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
    }
};

// GET ONE PRODUCT BY ID:
exports.getProductById = async (req, res) => {
    let editFormHtml = '';
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return (404).json({ error: 'Product not found' });
        }

        editFormHtml = getEditProductForm(product);

        res.send(editFormHtml);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// CREATE A NEW PRODUCT:
exports.createProduct = async (req, res) => {
    try {
        const { productName, productDescription, productCategory, productSize, productPrice, productImage } = req.body;

        const newProduct = new Product({
            name: productName,
            description: productDescription,
            category: productCategory,
            size: productSize,
            price: productPrice,
            // image: '/images/'+ productImage
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct,
        });
    } catch (error) {
        console.error('Failed at creating a new product:', error);
        res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
};

// UPDATE ONE PRODUCT BY ID:
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = req.body;

        const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.redirect(`/products/${productId}`);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// DELETE ONE PRODUCT BY ID:
exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};